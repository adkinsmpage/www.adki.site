import '@/app/page.css'
import '@/assets/css/markdown.css'
import Fancybox from '@/components/fancybox'
import dayjs from 'dayjs'
import Link from 'next/link'
import config from 'configJS'

function findUrlByShortcode(array, shortcode) {
    const item = array.find(item => item.shortcode === shortcode)
    return item ? item.url : null
}

function replaceEmojisWithImages(article, emojis) {
    const regex = /:\w+:/g
    return article.replace(regex, match => {
        const shortcode = match.slice(1, -1)
        const url = findUrlByShortcode(emojis, shortcode)
        return url
            ? `<img class="!inline" src="${url}" alt="${shortcode}" />`
            : match
    })
}

async function fetchTweets() {
    const response = await fetch(
        `${config.tweets.mastodonInstance}/api/v1/accounts/110492424833061986/statuses`,
        { next: { revalidate: 0 } },
    )
    return response.json()
}

async function fetchEmojis() {
    const response = await fetch(
        `${config.tweets.mastodonInstance}/api/v1/custom_emojis`,
        { next: { revalidate: 60 } },
    )
    return response.json()
}

export default async function Page() {
    const [MastJSON, emojiJSON] = await Promise.all([
        fetchTweets(),
        fetchEmojis(),
    ])

    return (
        <div className='mx-auto relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 flex items-center flex-col'>
            <div>
                <div className='pt-6 pb-6 mb-0'>
                    <h1
                        data-cursor='block'
                        className='mb-8 text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'
                    >
                        Tweets
                    </h1>
                    <time className='opacity-50 !-mt-6 slide-enter-50'>
                        Tweets from Mastodon (Doge)
                    </time>
                </div>
                <div className='mb-8 w-full'>
                    <div>
                        <div className='markdown-body w-full max-w-6xl mx-auto space-y-16 sm:space-y-20'>
                            <div className='flow-root'>
                                <div className='-mb-8 divide-y divide-gray-900 dark:divide-neutral-200'>
                                    {MastJSON.map(
                                        (mastTweet, eventIdx) =>
                                            !mastTweet.in_reply_to_id && (
                                                <div
                                                    key={eventIdx}
                                                    className='text-gray-900 dark:text-neutral-200 first:pt-0 last:pb-0 flex flex-col min-w-0 relative tracking-wider font-extralight width-full transition-transform duration-700 ease-out hover:scale-[1.03] leading-relaxed'
                                                >
                                                    <div
                                                        className='text-2xl markdown-body'
                                                        dangerouslySetInnerHTML={{
                                                            __html: replaceEmojisWithImages(
                                                                mastTweet.content.toString(),
                                                                emojiJSON,
                                                            ),
                                                        }}
                                                    />
                                                    {mastTweet.media_attachments
                                                        .length > 0 && (
                                                        <Fancybox>
                                                            <div className='flex my-5'>
                                                                {mastTweet.media_attachments.map(
                                                                    (
                                                                        image,
                                                                        item,
                                                                    ) => (
                                                                        <a
                                                                            key={
                                                                                item
                                                                            }
                                                                            data-fancybox='gallery'
                                                                            href={
                                                                                image.url
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    image.preview_url
                                                                                }
                                                                                className='!m-0'
                                                                                width='200'
                                                                                height='150'
                                                                            />
                                                                        </a>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </Fancybox>
                                                    )}
                                                    <div className='text-sm justify-end flex flex-wrap gap-x-2 gap-y-4 mb-5'>
                                                        <span className='inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400'>
                                                            <time
                                                                dateTime={
                                                                    mastTweet.created_at
                                                                }
                                                            >
                                                                {dayjs(
                                                                    mastTweet.created_at,
                                                                )
                                                                    .add(
                                                                        8,
                                                                        'hour',
                                                                    )
                                                                    .format(
                                                                        'YYYY-MM-DD HH:mm:ss',
                                                                    )}
                                                            </time>
                                                        </span>
                                                        {mastTweet.replies_count !==
                                                            0 && (
                                                            <span className='inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400'>
                                                                {
                                                                    mastTweet.replies_count
                                                                }{' '}
                                                                条评论
                                                            </span>
                                                        )}
                                                        {mastTweet.favourites_count !==
                                                            0 && (
                                                            <span className='inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-400'>
                                                                {
                                                                    mastTweet.favourites_count
                                                                }{' '}
                                                                个赞
                                                            </span>
                                                        )}
                                                        <Link
                                                            href={mastTweet.url}
                                                            target='_blank'
                                                        >
                                                            <span className='inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400'>
                                                                原嘟文
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
