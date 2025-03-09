'use client'

import {
    useEffect,
    useState,
    useCallback,
    useRef,
    useMemo,
    memo
} from 'react'
import {
    useVirtualizer
} from '@tanstack/react-virtual'
import Fancybox from '@/components/fancybox'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'
import { ChevronDown, AlertCircle } from 'lucide-react'
import Fade from '@/components/animation/fade'

// 配置参数
const CONFIG = {
    INITIAL_PAGE: 1,
    PAGE_SIZE: 30,
    SCROLL_THRESHOLD: 0.85,
    ITEM_HEIGHT: {
        MIN: 280,
        DEFAULT: 320,
        MAX: 400
    },
    LOAD_DELAY: 300
}

// 完整的数据获取实现
const fetchPaginatedData = async (page = 1, signal) => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const [tweetsRes, emojisRes] = await Promise.all([
            fetch(`/api/tweets/tweets?page=${page}&limit=${CONFIG.PAGE_SIZE}`, {
                cache: 'no-cache',
                signal: signal || controller.signal
            }),
            fetch("/api/tweets/emojis", {
                cache: 'no-cache',
                signal: signal || controller.signal
            })
        ])

        clearTimeout(timeoutId)

        const [tweetsData, emojisData] = await Promise.all([
            tweetsRes.json(),
            emojisRes.json()
        ])

        return {
            tweets: tweetsData.data || [],
            emojis: emojisData.data || [],
            hasMore: tweetsData.hasMore || false,
            error: null
        }
    } catch (error) {
        return {
            tweets: [],
            emojis: [],
            hasMore: false,
            error: error.name === 'AbortError'
                ? new Error('请求超时')
                : error
        }
    }
}

// 完整的表情解析实现
const parseEmojis = (content, emojis) => {
    if (!emojis || !content) return content
    const emojiPattern = /:\w+:/g
    const emojiMap = emojis.reduce((map, emoji) => {
        map[`:${emoji.shortcode}:`] = emoji
        return map
    }, {})

    return content.replace(emojiPattern, match => {
        const emoji = emojiMap[match]
        return emoji
            ? `<img class="inline-block h-6 w-6 align-text-bottom" 
           src="${emoji.url}" 
           alt="${emoji.shortcode}"
           loading="lazy"
           decoding="async">`
            : match
    })
}

export default function TweetsPage() {
    const [state, setState] = useState({
        isLoading: true,
        isFetchingMore: false,
        tweets: [],
        emojis: [],
        currentPage: CONFIG.INITIAL_PAGE,
        hasMore: true,
        error: null
    })

    const containerRef = useRef(null)
    const abortController = useRef(new AbortController())
    const loadTimeout = useRef(null)

    const rowVirtualizer = useVirtualizer({
        count: state.tweets.length,
        getScrollElement: () => containerRef.current,
        estimateSize: (index) => {
            const tweet = state.tweets[index]
            const mediaHeight = tweet.media_attachments?.length > 0 ? 140 : 0
            return Math.min(
                CONFIG.ITEM_HEIGHT.MAX,
                Math.max(
                    CONFIG.ITEM_HEIGHT.MIN,
                    CONFIG.ITEM_HEIGHT.DEFAULT + mediaHeight
                )
            )
        },
        overscan: 5
    })

    const loadData = useCallback(async (page, isInitial = false) => {
        if ((!isInitial && !state.hasMore) || state.isFetchingMore) return

        try {
            setState(prev => ({
                ...prev,
                isLoading: isInitial,
                isFetchingMore: !isInitial,
                error: null
            }))

            const { tweets, emojis, hasMore, error } = await fetchPaginatedData(
                page,
                abortController.current.signal
            )

            clearTimeout(loadTimeout.current)

            setState(prev => ({
                ...prev,
                isLoading: false,
                isFetchingMore: false,
                tweets: [
                    ...(isInitial ? [] : prev.tweets),
                    ...tweets.filter(t => !t.in_reply_to_id)
                ],
                emojis: isInitial ? emojis : prev.emojis,
                currentPage: page,
                hasMore,
                error
            }))

            // 自动滚动位置恢复
            if (isInitial && containerRef.current) {
                containerRef.current.scrollTo(0, 0)
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    isFetchingMore: false,
                    error
                }))
            }
        }
    }, [state.hasMore, state.isFetchingMore])

    // 滚动事件处理
    useEffect(() => {
        const scrollContainer = containerRef.current
        if (!scrollContainer) return

        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = scrollContainer
            const scrollPosition = (scrollTop + clientHeight) / scrollHeight

            if (
                scrollPosition > CONFIG.SCROLL_THRESHOLD &&
                state.hasMore &&
                !state.isFetchingMore
            ) {
                clearTimeout(loadTimeout.current)
                loadTimeout.current = setTimeout(() => {
                    loadData(state.currentPage + 1)
                }, CONFIG.LOAD_DELAY)
            }
        }

        scrollContainer.addEventListener('scroll', handleScroll)
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }, [state.hasMore, state.isFetchingMore, loadData])

    useEffect(() => {
        loadData(CONFIG.INITIAL_PAGE, true)
        return () => {
            abortController.current.abort()
            clearTimeout(loadTimeout.current)
        }
    }, [])

    return (
        <div className="mx-auto px-7 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">
                Mastodon推文
            </h1>

            {state.error ? (
                <div className="text-red-500 text-center flex flex-col items-center gap-2 p-6">
                    <AlertCircle className="w-8 h-8" />
                    <span className="max-w-prose">{state.error.message}</span>
                    <button
                        onClick={() => loadData(CONFIG.INITIAL_PAGE, true)}
                        className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                    >
                        重新加载
                    </button>
                </div>
            ) : state.isLoading ? (
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <TextShimmerWave className="[--base-color:#0D74CE] w-3/4 h-6 mb-4">Loading Tweets...</TextShimmerWave>
                    </div>
                </div>
            ) : (
                <Fade>
                    <div
                        ref={containerRef}
                        className="h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                    >
                        <div
                            className="relative w-full"
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map(virtualItem => {
                                const tweet = state.tweets[virtualItem.index]
                                return (
                                    <div
                                        key={tweet.id}
                                        className="absolute top-0 left-0 w-full"
                                        style={{
                                            height: `${virtualItem.size}px`,
                                            transform: `translateY(${virtualItem.start}px)`
                                        }}
                                    >
                                        <TweetItem
                                            tweet={tweet}
                                            emojis={state.emojis}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="h-24 flex items-center justify-center">
                            {state.isFetchingMore ? (
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full animate-spin" />
                                    正在加载更多推文...
                                </div>
                            ) : !state.hasMore && (
                                <div className="text-gray-500 dark:text-gray-400 text-sm py-6">
                                    已加载全部{state.tweets.length}条推文
                                </div>
                            )}
                        </div>
                    </div>
                </Fade>
            )}
        </div>
    )
}

const TweetItem = memo(({ tweet, emojis }) => {
    const parsedContent = useMemo(() =>
        parseEmojis(tweet.content, emojis),
        [tweet.content, emojis]
    )

    const formattedDate = useMemo(() =>
        new Date(tweet.created_at).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        [tweet.created_at]
    )

    return (
        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
            <div
                className="prose dark:prose-invert break-words"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
            />

            {tweet.media_attachments?.length > 0 && (
                <Fancybox>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {tweet.media_attachments.map((img, index) => (
                            <a
                                key={`${img.id}-${index}`}
                                href={img.url}
                                data-fancybox={`gallery-${tweet.id}`}
                                className="hover:opacity-80 transition-opacity"
                                data-caption={tweet.content?.substring(0, 50)}
                            >
                                <img
                                    src={img.preview_url}
                                    alt={`推文附件 ${index + 1}`}
                                    className="rounded-lg w-full h-32 object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        ))}
                    </div>
                </Fancybox>
            )}

            <div className="mt-4 flex flex-wrap gap-2 text-sm justify-end items-center">
                <time
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    dateTime={tweet.created_at}
                >
                    {formattedDate}
                </time>

                {tweet.replies_count > 0 && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                        {tweet.replies_count} 条回复
                    </span>
                )}

                {tweet.favourites_count > 0 && (
                    <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-400">
                        {tweet.favourites_count} 个喜欢
                    </span>
                )}

                <a
                    href={tweet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors inline-flex items-center gap-1"
                >
                    查看原文
                    <ChevronDown className="w-4 h-4 transform rotate-270" />
                </a>
            </div>
        </article>
    )
})
