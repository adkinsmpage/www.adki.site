// app/pages/[slug]/page.js
import { notFound } from 'next/navigation'
import { compileMDX } from '@/lib/mdx'
import consola from 'consola'
import 'star-markdown-css/dist/yun/yun-markdown.min.css'
import { AnimatedCardBackgroundHover } from '@/app/pages/links/_page'
import { generatePageMetadata, generatePageStaticParams } from '@/lib/pageUtils'
import PostLayout from '@/components/posts/layout/PostLayout'

export const dynamicParams = false // 禁用动态路由生成

export async function generateMetadata({ params }) {
  return generatePageMetadata({ params }, 'pages')
}

export async function generateStaticParams() {
  return generatePageStaticParams('pages')
}

export default async function PageContent({ params }) {
  // 确保params是已解析的
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  try {
    const { html, frontmatter } = await compileMDX(slug, "pages")

    // 对于links页面，我们需要额外添加AnimatedCardBackgroundHover组件
    const extraContent = slug === "links" ? 
      <AnimatedCardBackgroundHover items={frontmatter.links} /> : 
      null

    return (
      <PostLayout 
        frontmatter={frontmatter}
        extraContent={extraContent}
      >
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }}></div>
      </PostLayout>
    )
  } catch (error) {
    consola.error(error)
    notFound()
  }
}
