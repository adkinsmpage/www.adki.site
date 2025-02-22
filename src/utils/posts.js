import fs from 'node:fs/promises'
import path from 'path'
import { read } from 'to-vfile'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkFrontmatterYaml from '@/utils/remark/remarkFrontmatter'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

// 新增TOC提取插件
const extractTOC = () => (tree, file) => {
    const headings = []
    visit(tree, 'element', node => {
        if (/^h[1-6]$/.test(node.tagName)) {
            headings.push({
                depth: parseInt(node.tagName.replace('h', '')),
                text: toString(node),
                id: node.properties.id,
            })
        }
    })
    file.data.toc = generateTOCStructure(headings) // 结构化处理
}

// 生成嵌套目录结构
const generateTOCStructure = headings => {
    const toc = []
    const stack = []
    let lastDepth = 0

    headings.forEach(h => {
        while (h.depth < lastDepth) {
            stack.pop()
            lastDepth--
        }

        const node = { ...h, children: [] }
        if (stack.length === 0) {
            toc.push(node)
        } else {
            stack[stack.length - 1].children.push(node)
        }

        if (h.depth > lastDepth) {
            stack.push(node)
            lastDepth = h.depth
        }
    })

    return toc
}

const render = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkFrontmatterYaml)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
        themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        },
    })
    .use(rehypeSlug)
    .use(extractTOC)
    .use(rehypeStringify)

export async function getPosts(type = 'posts') {
    const directoryPath = path.join(
        process.cwd(),
        type === 'posts' ? 'posts' : 'pages',
    )
    try {
        const files = await fs.readdir(directoryPath)

        const fileDetails = await Promise.all(
            files.map(async file => {
                const filePath = path.join(directoryPath, file)
                const fileContent = await read(filePath, 'utf8')
                const postContent = await render.process(fileContent)
                const frontmatter = postContent.data.matter
                return { file, date: new Date(frontmatter.date), frontmatter }
            }),
        )

        fileDetails.sort((a, b) => b.date - a.date)

        return fileDetails
    } catch (err) {
        console.error(err)
        return false
    }
}

export const getPostInfo = async (slug, type = 'posts') => {
    try {
        const postMarkdown = await read(
            path.resolve(
                process.cwd(),
                type === 'posts' ? 'posts' : 'pages',
                slug + '.md',
            ),
            'utf8',
        )
        const processor = render()

        // 分离处理流程
        const content = await processor.process(postMarkdown)

        return {
            content: String(content),
            toc: content.data.toc || [],
            data: content.data.matter,
        }
    } catch {
        return false
    }
}
