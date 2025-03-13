import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export async function GET() {
    const posts = await getAllPosts()
    const pages = await getAllPosts('pages')

    // 使用模板字符串生成 XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>https://www.adkinsm.asia</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.adkinsm.asia/posts</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.adkinsm.asia/pages/tweets</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    ${pages.map(path => `
    <url>
        <loc>https://www.adkinsm.asia/pages/${path.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
    ${posts.map(post => `
    <url>
        <loc>https://www.adkinsm.asia/posts/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`).join('')}
</urlset>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600'
        }
    })
}