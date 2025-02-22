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
import { TOC } from '@/components/post/toc' // 新增TOC组件导入

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
        title: `${post.data.title} | ${config.global.siteName}`,
        description: htmlToText(post.content).slice(0, 160), // 修改为使用post.content
        keywords: post.data.tags?.join(',') || config.global.keywords,
        alternates: {
            canonical: `${config.global.url}/${params.slug}`,
        },
    }
}

export default async function Page({ params }) {
    const post = await getCachedPage(params.slug)

    return (
        <div className='flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4'>
            {post.toc ? <TOC toc={post.toc} /> : null}

            <article className='flex-1 prose dark:prose-invert max-w-3xl'>
                <header className='mb-12'>
                    <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
                        {post.data.title}
                    </h1>
                    <time
                        dateTime={dayjs(post.data.date).format('YYYY-MM-DD')}
                        className='text-gray-500 mt-2 block'
                    >
                        {dayjs(post.data.date).format('YYYY-MM-DD')}
                    </time>
                </header>

                <section className='mb-8 w-full'>
                    {params.slug === 'links' ? (
                        <Links
                            className='markdown-body'
                            links={post.data.links}
                            postContent={post.content} // 修改为使用post.content
                        />
                    ) : (
                        <div
                            className='markdown-body'
                            dangerouslySetInnerHTML={{ __html: post.content }} // 修改为使用post.content
                            itemProp='articleBody'
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
