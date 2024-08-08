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
import rehypeTOC from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'

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
    .use(rehypeTOC, {
        headings: ['h1', 'h2'], // Only include <h1> and <h2> headings in the TOC
        cssClasses: {
            toc: 'toc hidden', // Change the CSS class for the TOC
            list: 'px-8 leading-6 fixed z-20 top-[3.8125rem] bottom-0 left-0 w-[19.5rem] py-10 overflow-y-auto',
            link: 'block py-1 font-medium', // Change the CSS class for links in the TOC
        },
    })
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
        console.error('Error reading directory:', err)
        return []
    }
}

export const getPostInfo = async (slug, type = 'posts') => {
    const postMarkdown = await read(
        path.resolve(
            process.cwd(),
            type === 'posts' ? 'posts' : 'pages',
            slug + '.md',
        ),
        'utf8',
    )

    const content = await render.process(postMarkdown)

    return content
}
