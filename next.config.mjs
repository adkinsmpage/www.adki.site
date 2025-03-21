import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
  // Optionally, add any other Next.js config below
} 

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [],
      providerImportSource: "@mdx-js/react"
    },
  })
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)