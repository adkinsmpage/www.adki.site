import { getAllPostSlugs } from '@/lib/posts'

export async function generatePreloadLinks() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({
    href: `/posts/${slug}`,
    as: 'document'
  }))
}

const Layout = ({ children }) => {
    return <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 mx-auto">{ children }</div>
}

export default Layout