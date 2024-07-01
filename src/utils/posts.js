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
    .use(rehypeStringify)

export async function getPosts(
    directoryPath = path.join(process.cwd(), 'posts'),
) {
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
        console.error('Error reading directory:', err)
        return []
    }
}

export const getPostInfo = async slug => {
    const postMarkdown = await read(
        path.resolve(process.cwd(), 'posts', slug + '.md'),
        'utf8',
    )

    const content = await render.process(postMarkdown)

    return content
}
