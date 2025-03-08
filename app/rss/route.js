import RSS from 'rss'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
    const feed = new RSS({
        title: "Adkinsm Home",
        description: "人生得意须尽欢",
        site_url: "https://www.adkinsm.asia",
        feed_url: `https://www.adkinsm.asia/rss`,
        language: 'zh-CN',
    })

    try {
        const posts = await getAllPosts("posts", "rss")

        await Promise.all(
            posts.map(async post => {
                try {
                    const postSlug = post.slug
                    feed.item({
                        title: post.title,
                        guid: postSlug,
                        url: `https://www.adkinsm.asia/posts/${postSlug}`,
                        categories: post.category,
                        description: `${post.excerpt} <p>访问 <a href="https://www.adkinsm.asia/posts/${postSlug}" target="_blank">https://www.adkinsm.asia/posts/${postSlug}</a> 阅读全文。</p>`,
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