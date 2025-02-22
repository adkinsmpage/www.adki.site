// app/pages/[slug]/page.js
import { cache } from 'react'
import '@/app/page.css'
import '@/assets/css/markdown.css'
import Links from '@/app/pages/[slug]/links'
import dayjs from 'dayjs'
import { getPostInfo, getPosts } from '@/utils/posts'
import { notFound } from 'next/navigation'
import config from 'configJS'
import { Waline } from '@/components/comments/waline'
import { htmlToText } from '@/utils/htmlParser'

const getCachedPage = cache(async slug => {
    const post = await getPostInfo(slug, 'pages')
    if (!post) notFound()
    return post
})

export async function generateStaticParams() {
    const slugs = await getPosts('pages')
    return slugs.map(slug => ({
        slug: slug.file.replace('.md', ''),
    }))
}

export async function generateMetadata({ params }) {
    const post = await getCachedPage(params.slug)

    return {
        title: `${post.data.matter.title} | ${config.global.siteName}`,
        description: htmlToText(String(post)).slice(0, 160),
        keywords: post.data.matter.tags?.join(',') || config.global.keywords,
        alternates: {
            canonical: `${config.global.url}/${params.slug}`,
        },
    }
}

export default async function Page({ params }) {
    const post = await getCachedPage(params.slug)

    return (
        <div className='mx-auto relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 flex items-center flex-col'>
            <article className='w-full max-w-3xl'>
                <header className='pt-6 pb-6 mb-0'>
                    <h1 className='mb-8 text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                        {post.data.matter.title}
                    </h1>
                    <time
                        dateTime={dayjs(post.data.matter.date).format(
                            'YYYY-MM-DD',
                        )}
                        className='opacity-50 !-mt-6 slide-enter-50'
                    >
                        {dayjs(post.data.matter.date).format('YYYY-MM-DD')}
                    </time>
                </header>

                <section className='mb-8 w-full'>
                    {params.slug === 'links' ? (
                        <Links
                            links={post.data.matter.links}
                            postContent={post}
                        />
                    ) : (
                        <div
                            className='markdown-body text-base leading-7 text-gray-700 dark:text-slate-300 px-0'
                            dangerouslySetInnerHTML={{ __html: String(post) }}
                            itemProp='articleBody' // 添加结构化数据
                        />
                    )}
                </section>

                {config.comments.waline.enable && (
                    <footer className='w-full mt-12 border-t pt-8'>
                        <Waline />
                    </footer>
                )}
            </article>
        </div>
    )
}
