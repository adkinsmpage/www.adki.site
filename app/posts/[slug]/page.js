// app/posts/[slug]/page.js
import { notFound } from 'next/navigation'
import { compileMDX } from '@/lib/mdx'
import consola from 'consola'
import 'star-markdown-css/dist/yun/yun-markdown.min.css'
import { generatePageMetadata, generatePageStaticParams } from '@/lib/pageUtils'
import PostLayout from '@/components/posts/layout/PostLayout'

export const dynamicParams = false // 禁用动态路由生成

export async function generateStaticParams() {
  return generatePageStaticParams('posts')
}

export async function generateMetadata({ params }) {
  return generatePageMetadata({ params }, 'posts')
}

export default async function PostPage({ params }) {
  // 确保params是已解析的
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  try {
    const { html, frontmatter } = await compileMDX(slug)

    return (
      <PostLayout frontmatter={frontmatter}>
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }}></div>
      </PostLayout>
    )
  } catch (error) {
    consola.error(error)
    notFound()
  }
}
