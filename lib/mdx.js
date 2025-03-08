// lib/mdx.js
import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { matter } from 'vfile-matter'
import { VFile } from 'vfile'
import consola from 'consola'
import path from 'path'

export async function compileMDX(slug, type="posts") {
  consola.info(slug, type)
  try {
    const { readFile } = await import('fs/promises')
    const filePath = path.join(process.cwd(), type, `${slug}.mdx`)
    const rawContent = await readFile(filePath, 'utf8')
    
    // 构建纯remark处理管道 
    const processor = unified()
      .use(remarkParse) // 基础解析器
      .use(remarkRehype, {allowDangerousHtml: true})
      .use(rehypeStringify)
      .use(remarkFrontmatter) // 支持多种frontmatter格式 
      .use(remarkGfm) // GitHub风格Markdown
    
      const html = await processor.process(rawContent.toString());

    // 创建虚拟文件实例
    const file = new VFile({
      value: rawContent,
      path: `${slug}.mdx`
    })
    
    // 解析并提取frontmatter
    const ast = processor.parse(file)
    const processedAST = await processor.run(ast, file)
    matter(file) // 自动提取到file.data.matter 


    return {
      ast: processedAST, // 返回标准mdast语法树
      content: String(file), // 原始内容
      frontmatter: file.data.matter || {},
      html: html.toString()
    }
  } catch (error) {
    consola.error(`Remark处理失败: ${slug}`, error)
  }
}