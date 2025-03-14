import { getAllPostSlugs } from '@/lib/posts'
import ContentLayout from '@/components/posts/layout/ContentLayout'

export async function generatePreloadLinks() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({
    href: `/posts/${slug}`,
    as: 'document'
  }))
}

const Layout = ({ children }) => {
  return <ContentLayout>{children}</ContentLayout>
}

export default Layout