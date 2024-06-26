import fs from 'node:fs/promises'
import { join, resolve } from 'path';
import {read} from 'to-vfile'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkFrontmatterYaml from '@/app/posts/remarkFrontmatter'

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
    }
  })
  .use(rehypeStringify)

const getPosts = async () => await fs.readdir(resolve(process.cwd(), 'posts'))

export const getPostsInfo = async () => {
  let posts = [],
      titles = []

  const postDir = await getPosts()

  for (const post of postDir) {
      titles.push(post.replace(".md", ""))
      const fileContent = await read(join(process.cwd(), 'posts', post), 'utf8')
      const postContent = await render.process(fileContent)
      posts.push(postContent)
  }

  return { posts, titles }
}

export const getPostInfo = async slug => {
    const postMarkdown = await read(resolve(process.cwd(), 'posts', slug + ".md"), 'utf8')

    const content = await render.process(postMarkdown)
    
    return content
}