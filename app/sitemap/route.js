import { XMLBuilder } from 'fast-xml-parser'
import { getAllPosts } from '@/lib/posts'

 export async function GET() {
     const builder = new XMLBuilder({
         ignoreAttributes: false,
         format: true,
         arrayNodeName: 'url',
         suppressBooleanAttributes: false,
     })
 
     const posts = await getAllPosts()
 
     const pages = await getAllPosts('pages')
 
     const sitemap = {
         urlset: {
             '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
             '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
             '@_xsi:schemaLocation':
                 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
             url: [
                {
                    loc: "htts://www.adkinsm.asia",
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily',
                    priority: '1.0',
                },
                {
                    loc: "htts://www.adkinsm.asia/posts",
                    lastmod: new Date().toISOString(),
                    changefreq: 'weekly',
                    priority: '1.0',
                },
                {
                    loc: "htts://www.adkinsm.asia/pages/tweets",
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily',
                    priority: '1.0',
                },
                 ...pages.map(path => ({
                     loc: `htts://www.adkinsm.asia/pages/${path.slug}`,
                     lastmod: new Date().toISOString(),
                     changefreq: 'monthly',
                     priority: '0.8',
                 })),
                 ...posts.map(post => ({
                     loc: `htts://www.adkinsm.asia/posts/${post.slug}`,
                     lastmod: new Date(post.date).toISOString(),
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