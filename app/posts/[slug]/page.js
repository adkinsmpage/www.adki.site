// app/posts/[slug]/page.js
import { notFound } from 'next/navigation'
import dayjs from 'dayjs'
import { compileMDX } from '@/lib/mdx'
import { getAllPostSlugs } from '@/lib/posts'
import consola from 'consola'
import 'star-markdown-css/dist/yun/yun-markdown.min.css'
import Fade from '@/components/animation/fade'
import { Waline } from '@/components/comments/waline'
import { TableOfContents } from '@/components/toc'

export const dynamicParams = false // 禁用动态路由生成

export async function generateStaticParams() {
  // 动态获取所有文章slug（需实现getAllPostSlugs）
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({ slug: slug.slug }))
}

export async function generateMetadata({ params }) {
  try {
    const { frontmatter } = await compileMDX(params.slug)
    return {
      title: `${frontmatter.title} | Adkins的个人网站`,
      description: frontmatter.excerpt || frontmatter.description || `阅读文章：${frontmatter.title}`,
    }
  } catch (error) {
    return {
      title: '文章未找到 | Adkins的个人网站',
      description: '抱歉，您请求的文章不存在。',
    }
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  try {
    const { html, frontmatter } = await compileMDX(slug)

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="relative">
          <article className="pt-36 rounded-2xl">
            <Fade>
              <header className='text-center'>
                <h1 className='text-3xl pb-5 leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                  {frontmatter.title}
                </h1>
                <time className='my-2 block text-base leading-6 font-medium text-gray-500 dark:text-gray-300'>
                  {dayjs(frontmatter.date).format('YYYY-MM-DD')}
                </time>
              </header>
              <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }}></div>
              <Waline />
            </Fade>
          </article>
          <div className="absolute top-0 right-[-19rem] w-64">
            <TableOfContents />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    consola.error(error)
    notFound()
  }
}
