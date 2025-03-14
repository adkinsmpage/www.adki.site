import { compileMDX } from './mdx'
import { getAllPostSlugs } from './posts'
import consola from 'consola'

/**
 * 生成页面元数据
 * @param {object} params 页面参数
 * @param {string} type 页面类型，'posts' 或 'pages'
 * @param {string} baseTitle 基本标题
 * @returns {object} 页面元数据
 */
export async function generatePageMetadata({ params }, type = 'posts', baseTitle = 'Adkinsm Home') {
  // 确保params是已解析的
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  try {
    const { frontmatter } = await compileMDX(slug, type === 'pages' ? 'pages' : undefined)
    return {
      title: `${frontmatter.title} | ${baseTitle}`,
      description: frontmatter.excerpt || frontmatter.description || `阅读${type === 'pages' ? '页面' : '文章'}：${frontmatter.title}`,
    }
  } catch (error) {
    consola.error(`生成元数据错误: ${error.message}`)
    return {
      title: `${type === 'pages' ? '页面' : '文章'}未找到 | ${baseTitle}`,
      description: `抱歉，您请求的${type === 'pages' ? '页面' : '文章'}不存在。`,
    }
  }
}

/**
 * 生成静态路径参数
 * @param {string} type 页面类型，'posts' 或 'pages'
 * @returns {Array} 静态路径参数数组
 */
export async function generatePageStaticParams(type = 'posts') {
  const slugs = await getAllPostSlugs(type === 'pages' ? 'pages' : undefined)
  return slugs.map(slug => ({ slug: slug.slug }))
} 