'use client'

import { useEffect, useState, useCallback, memo } from 'react'
import Fancybox from '@/components/fancybox'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'
import { ChevronDown, AlertCircle } from 'lucide-react'
import Fade from '@/components/animation/fade'

// 简化配置
const CONFIG = {
    PAGE_SIZE: 30,
    GAP: 12
}

// 简化数据获取
const fetchTweets = async (page = 1) => {
    try {
        const [tweetsRes, emojisRes] = await Promise.all([
            fetch(`/api/tweets/tweets?page=${page}&limit=${CONFIG.PAGE_SIZE}`, { cache: 'no-store' }),
            fetch("/api/tweets/emojis", { cache: 'no-store' })
        ])

        const [tweetsData, emojisData] = await Promise.all([
            tweetsRes.json(),
            emojisRes.json()
        ])

        if (tweetsData.error && emojisData.error) {
            throw new Error(`${tweetsData.error} ${emojisData.error}`)
        }

        return {
            tweets: tweetsData.data || [],
            emojis: emojisData.data || [],
            hasMore: tweetsData.hasMore || false
        }
    } catch (error) {
        throw new Error('加载失败，请重试')
    }
}

// 表情解析组件
const EmojiContent = memo(({ content, emojis }) => {
    if (!emojis?.length || !content) return content

    const emojiMap = Object.fromEntries(
        emojis.map(emoji => [`:${emoji.shortcode}:`, emoji])
    )

    const parts = content.split(/(:[\w-]+:)/)

    return parts.map((part, i) => {
        const emoji = emojiMap[part]
        return emoji ? (
            <img
                key={`i-${Math.random()}`}
                className="inline-block h-6 w-6 align-text-bottom"
                src={emoji.url}
                alt={emoji.shortcode}
                loading="lazy"
            />
        ) : <div key={`i-${Math.random()}`} className='inline-block' dangerouslySetInnerHTML={{ __html: part }}></div>
    })
})

// 推文组件
const Tweet = memo(({ tweet, emojis }) => {
    const date = new Date(tweet.created_at).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <article className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col mb-4">
            <div className="flex-1">
                <div className="prose dark:prose-invert max-w-none">
                    <EmojiContent content={tweet.content} emojis={emojis} />
                </div>

                {tweet.media_attachments?.length > 0 && (
                    <Fancybox>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {tweet.media_attachments.map((img, i) => (
                                <a
                                    key={`${tweet.id}-${i}`}
                                    href={img.url}
                                    data-fancybox={`gallery-${tweet.id}`}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src={img.preview_url}
                                        alt={`附件 ${i + 1}`}
                                        className="rounded-lg w-full h-[120px] object-cover"
                                        loading="lazy"
                                    />
                                </a>
                            ))}
                        </div>
                    </Fancybox>
                )}
            </div>

            <div className="flex gap-2 justify-end text-sm border-t dark:border-gray-700 mt-2 pt-2">
                <time className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {date}
                </time>
                <a
                    href={tweet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                    原文
                    <ChevronDown className="w-3 h-3 transform rotate-270" />
                </a>
            </div>
        </article>
    )
})

// 主页面组件
export default function TweetsPage() {
    const [state, setState] = useState({
        tweets: [],
        emojis: [],
        page: 1,
        hasMore: true,
        isLoading: false,
        error: null
    })

    const loadMore = useCallback(async () => {
        if (!state.hasMore || state.isLoading) return

        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }))
            const data = await fetchTweets(state.page)

            setState(prev => ({
                ...prev,
                tweets: [...prev.tweets, ...data.tweets],
                emojis: prev.emojis.length ? prev.emojis : data.emojis,
                page: prev.page + 1,
                hasMore: data.hasMore,
                isLoading: false
            }))
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message,
                isLoading: false
            }))
        }
    }, [state.hasMore, state.isLoading, state.page])

    useEffect(() => {
        loadMore()
    }, [])

    // 滚动加载处理
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = window.innerHeight || document.documentElement.clientHeight

            if (scrollHeight - scrollTop <= clientHeight * 1.5) {
                loadMore()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loadMore])

    if (state.error) {
        return (
            <div className="text-red-500 text-center flex flex-col items-center gap-2 p-6">
                <AlertCircle className="w-8 h-8" />
                <span>{state.error}</span>
                <button
                    onClick={() => setState(prev => ({ ...prev, page: 1, hasMore: true }))}
                    className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                    重新加载
                </button>
            </div>
        )
    }

    return (<>
        {state.isLoading && !state.tweets.length ? (
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <TextShimmerWave className="w-3/4 h-6 mb-4">加载中...</TextShimmerWave>
                </div>
            </div>
        ) : (
            <Fade>
                <div>
                    {state.tweets.map((tweet, i) => (
                        <Tweet
                            key={`${tweet.id}-${i}`}
                            tweet={tweet}
                            emojis={state.emojis}
                        />
                    ))}

                    {state.isLoading && (
                        <div className="h-24 flex items-center justify-center">
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-5 h-5 border-2 border-blue-500 rounded-full animate-spin" />
                                加载中...
                            </div>
                        </div>
                    )}
                </div>
            </Fade>
        )}
    </>
    )
}
