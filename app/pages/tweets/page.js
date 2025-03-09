'use client'

import { useEffect, useState } from 'react'
import Fancybox from '@/components/fancybox'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'

// 工具函数：解析表情符号
const parseEmojis = (content, emojis) => {
    if (!emojis) return content
    const emojiMap = emojis.reduce((acc, emoji) =>
        ({ ...acc, [`:${emoji.shortcode}:`]: emoji.url }), {})
    return content.replace(/:\w+:/g, match =>
        emojiMap[match]
            ? `<img class="!inline h-6 w-6" src="${emojiMap[match]}" alt="${match.slice(1, -1)}"/>`
            : match
    )
}

// 工具函数：统一数据获取
const fetchData = async () => {
    try {
        const [tweetsRes, emojisRes] = await Promise.all([
            fetch("/api/tweets/tweets", { cache: 'no-cache' }),
            fetch("/api/tweets/emojis", { cache: 'no-cache' })
        ])
        return {
            tweets: await tweetsRes.json(),
            emojis: await emojisRes.json(),
            error: null
        }
    } catch (error) {
        return { tweets: [], emojis: [], error }
    }
}

// 主组件
export default function TweetsPage() {
    const [state, setState] = useState({
        isLoading: true,
        tweets: [],
        emojis: [],
        error: null
    })

    useEffect(() => {
        const load = async () => {
            const { tweets, emojis, error } = await fetchData()
            setState({
                isLoading: false,
                tweets: tweets.filter(t => !t.in_reply_to_id),
                emojis,
                error
            })
        }
        load()
    }, [])

    return (
        <div className="mx-auto px-7 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">
                Mastodon推文
            </h1>

            {state.error ? (
                <div className="text-red-500 text-center">加载失败：{state.error.message}</div>
            ) : state.isLoading ? (
                <TextShimmerWave className="[--base-color:#0D74CE]">
                    正在加载推文...
                </TextShimmerWave>
            ) : (
                <div className="space-y-8">
                    {state.tweets.map(tweet => (
                        <article key={tweet.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div
                                className="prose dark:prose-invert"
                                dangerouslySetInnerHTML={{
                                    __html: parseEmojis(tweet.content, state.emojis)
                                }}
                            />

                            {tweet.media_attachments?.length > 0 && (
                                <Fancybox>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                        {tweet.media_attachments.map(img => (
                                            <a
                                                key={img.id}
                                                href={img.url}
                                                data-fancybox
                                                className="hover:opacity-80 transition-opacity"
                                            >
                                                <img
                                                    src={img.preview_url}
                                                    alt="推文媒体"
                                                    className="rounded-lg w-full h-32 object-cover"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </Fancybox>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2 text-sm justify-end">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    {new Date(tweet.created_at).toLocaleDateString('zh-CN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                                {tweet.replies_count !== 0 && (
                                    <span className='inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400'>
                                        {tweet.replies_count} 条评论
                                    </span>
                                )}
                                {tweet.favourites_count !== 0 && (
                                    <span className='inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-400'>
                                        {tweet.favourites_count} 个赞
                                    </span>
                                )}
                                <a
                                    href={tweet.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    查看原文 →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
