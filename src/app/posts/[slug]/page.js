// app/posts/[slug]/page.js
import { cache } from 'react'
import '@/app/page.css'
import '@/assets/css/markdown.css'
import dayjs from 'dayjs'
import { getPostInfo, getPosts } from '@/utils/posts'
import { notFound } from 'next/navigation'
import { Waline } from '@/components/comments/waline'
import config from 'configJS'
import { htmlToText } from '@/utils/htmlParser'
import { TOC } from '@/components/post/toc'

const getCachedPost = cache(async slug => {
    const post = await getPostInfo(slug)
    if (!post) notFound()
    return post
})

export async function generateMetadata({ params }) {
    const post = await getCachedPost(params.slug)

    return {
        title: `${post.data.title} | ${config.global.title}`,
        description: htmlToText(post.toString()).slice(0, 150),
        generator: config.global.author,
        referrer: 'origin-when-cross-origin',
        keywords: post.data.tags,
        authors: [{ name: config.global.author, url: config.global.url }],
    }
}

// 修改页面结构
export default async function Page({ params }) {
    const post = await getCachedPost(params.slug)

    return (
        <div className='flex justify-center flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4'>
            {/* TOC侧边栏 */}
            {post.toc ? <TOC toc={post.toc} /> : null}

            {/* 文章主体 */}
            <article className='flex-1 prose dark:prose-invert max-w-3xl'>
                <header className='mb-12'>
                    <h1 className='text-4xl font-bold'>{post.data.title}</h1>
                    <time className='text-gray-500 mt-2 block'>
                        {dayjs(post.data.date).format('YYYY-MM-DD')}
                    </time>
                </header>

                <section
                    className='markdown-body'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {config.comments.waline.enable && <Waline />}
            </article>
        </div>
    )
}
