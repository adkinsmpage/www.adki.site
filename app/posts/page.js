import { getAllPosts } from '@/lib/posts'
import Link from "next/link";
import Fade from '@/components/animation/fade'
import PostCard from '@/components/posts/PostCard'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: '博客文章 | Adkinsm Home',
  description: '探索最新的技术趋势、开发技巧和最佳实践',
}

const BlogPage = async () => {
    const posts = await getAllPosts()
    return (
        <section className="py-32">
            <Fade>
                <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                    <PageHeader 
                      badge="Latest Updates"
                      title="Blog Posts"
                      description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights."
                    />
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
                </div>
            </Fade>
        </section>
    );
};

export default BlogPage