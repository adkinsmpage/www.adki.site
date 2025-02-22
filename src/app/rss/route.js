import RSS from 'rss'
import config from 'configJS'
import { getPostInfo, getPosts } from '@/utils/posts'

export async function GET() {
    const feed = new RSS({
        title: config.global.title,
        description: config.global.description,
        site_url: config.global.url,
        feed_url: `${config.global.url}/rss`,
        language: 'zh-CN',
        generator: 'Prefect',
    })

    try {
        const posts = await getPosts()

        await Promise.all(
            posts.map(async post => {
                try {
                    const postSlug = post.file.replace('.md', '')
                    const postDetail = await getPostInfo(postSlug)

                    feed.item({
                        title: postDetail.data.title,
                        guid: postSlug,
                        url: `${config.global.url}/posts/${postSlug}`,
                        categories: post.frontmatter.categories,
                        description: postDetail.toString(),
                        date: post.date,
                    })
                } catch (error) {
                    console.error(`Error processing post ${post.file}:`, error)
                }
            }),
        )

        return new Response(feed.xml(), {
            headers: {
                'content-type': 'application/xml',
                'cache-control': 'public, max-age=3600',
            },
        })
    } catch (error) {
        console.error('RSS generation failed:', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}
