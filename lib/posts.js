import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'
import { compileMDX } from '@/lib/mdx'

// 简单的并发限制实现
function pLimit(concurrency) {
  const queue = []
  let activeCount = 0

  const next = () => {
    if (activeCount < concurrency && queue.length > 0) {
      const { fn, resolve, reject } = queue.shift()
      activeCount++
      Promise.resolve(fn())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeCount--
          next()
        })
    }
  }

  return (fn) => {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject })
      next()
    })
  }
}

/**
 * 获取所有内容（文章或页面）的slug列表
 * @param {string} type 'posts' 或 'pages'
 * @returns {Promise<Array>} 包含slug和文件元数据的数组
 */
export async function getAllPostSlugs(type="posts") {
  try {
    const contentDir = path.join(process.cwd(), type)
    const mdxFiles = await glob('**/*.mdx', {
      cwd: contentDir,
      ignore: ['**/draft/**', '**/archived/**'] // 忽略草稿和归档目录
    })

    const slugs = await Promise.all(
      mdxFiles.map(async (relativePath) => {
        const filePath = path.join(contentDir, relativePath)
        const stats = await fs.stat(filePath)

        const slug = relativePath
          .replace(/\.mdx$/, '')
          .replace(/\\/g, '/') // Windows路径兼容
          .split('/')
          .map(segment => encodeURIComponent(segment)) // 处理特殊字符
          .join('/')

        return { slug, filePath, stats }
      })
    )

    return slugs.sort((a, b) => b.stats.mtimeMs - a.stats.mtimeMs)
  } catch (error) {
    console.error(`获取${type}列表失败:`, error)
    return []
  }
}

/**
 * 获取所有内容（文章或页面）
 * @param {string} type 'posts' 或 'pages'
 * @returns {Promise<Array>} 包含内容数据的数组
 */
export async function getAllPosts(type="posts") {
  const limit = pLimit(5) // 限制并发数
  try {
    const slugs = await getAllPostSlugs(type)
    const content = await Promise.all(
      slugs.map(({ slug }) => 
        limit(async () => {
          try {
            const { frontmatter, html } = await compileMDX(slug, type)

            const title = frontmatter?.title || 'Untitled'
            const date = validateDate(frontmatter?.date) 
              || new Date().toISOString()

            return {
              slug,
              title,
              date,
              content: html,
              excerpt: frontmatter?.excerpt ?? generateExcerpt(html),
              thumbnail: frontmatter?.thumbnail ?? null,
              category: frontmatter?.category ?? null,
              tags: frontmatter?.tags ?? null
            }
          } catch (error) {
            console.warn(`${type.slice(0, -1)}解析失败: ${slug}`, error)
            return null
          }
        })
      )
    )
    return content.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error(`${type}加载系统故障:`, error)
    return []
  }
}

// 辅助函数：日期验证
function validateDate(dateStr) {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date) ? null : date.toISOString()
}

// 辅助函数：生成摘要
function generateExcerpt(html, maxLength = 200) {
  const textContent = html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return textContent.length > maxLength 
    ? `${textContent.slice(0, maxLength)}...` 
    : textContent
}