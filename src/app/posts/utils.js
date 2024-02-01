
import fs from 'fs'
import { join, resolve } from 'path';
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import markdownItFrontMatter from 'markdown-it-front-matter'
import yml from 'yaml'

let fms = []

const md = MarkdownIt({
    html: true,
    breaks: true,
}).use(await Shiki({
    themes: {
        light: 'github-light',
        dark: 'github-dark',
    }
})).use(markdownItFrontMatter, function (fm) {
    fms.push(yml.parse(fm))
})

const getPosts = () => fs.readdirSync(resolve(process.cwd(), 'posts'))

export const getPostsInfo = () => {
    let posts = [],
        titles = []
    getPosts().map(post => {
        titles.push(post.replace(".md", ""))
        const postContent = fs.readFileSync(join(process.cwd(), 'posts', post), 'utf8')
        posts.push(postContent)
    })
    posts.map(post => md.render(post))
    let fmsN = fms
    fms = []
    return { fms: fmsN, titles }
}

export const getPostInfo = slug => {
    console.log(resolve(process.cwd(), 'posts', slug + ".md"))
    let postMarkdown = fs.readFileSync(resolve(process.cwd(), 'posts', slug + ".md"), 'utf8')
    let content = md.render(postMarkdown)
    console.log("fms:", fms)
    let fmsN = fms
    fms = []
    return {
        content,
        fms: fmsN[0]
    }
}