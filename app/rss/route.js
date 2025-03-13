import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export async function GET() {
    try {
        const posts = await getAllPosts("posts", "rss")
        const now = new Date().toISOString()

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Adkinsm Home</title>
        <link>https://www.adkinsm.asia</link>
        <description>人生得意须尽欢</description>
        <language>zh-CN</language>
        <lastBuildDate>${now}</lastBuildDate>
        <atom:link href="https://www.adkinsm.asia/rss" rel="self" type="application/rss+xml" />
        ${posts.map(post => `
        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>https://www.adkinsm.asia/posts/${post.slug}</link>
            <guid>https://www.adkinsm.asia/posts/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description><![CDATA[${post.excerpt} <p>访问 <a href="https://www.adkinsm.asia/posts/${post.slug}" target="_blank">https://www.adkinsm.asia/posts/${post.slug}</a> 阅读全文。</p>]]></description>
            ${post.category ? `<category>${post.category}</category>` : ''}
        </item>`).join('')}
    </channel>
</rss>`

        return new Response(rss, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600'
            }
        })
    } catch (error) {
        console.error('RSS generation failed:', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}