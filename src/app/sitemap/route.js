import { XMLBuilder } from 'fast-xml-parser'
import { getPostInfo, getPosts } from '@/utils/posts'
import config from 'configJS'

export async function GET() {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        format: true,
        arrayNodeName: 'url',
        suppressBooleanAttributes: false,
    })

    const posts = await getPosts()

    const pages = await getPosts('pages')

    const sitemap = {
        urlset: {
            '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '@_xsi:schemaLocation':
                'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
            url: [
                {
                    loc: config.global.url,
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily',
                    priority: '1.0',
                },
                ...pages.map(path => ({
                    loc: `${config.global.url}/pages/${path.file.replace('.md', '')}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'monthly',
                    priority: '0.8',
                })),
                ...posts.map(post => ({
                    loc: `${config.global.url}/posts/${post.file.replace('.md', '')}`,
                    lastmod: new Date(post.frontmatter.date).toISOString(),
                    changefreq: 'weekly',
                    priority: '0.9',
                })),
            ],
        },
    }

    return new Response(
        '<?xml version="1.0" encoding="UTF-8"?>' + builder.build(sitemap),
        { headers: { 'Content-Type': 'application/xml' } },
    )
}
