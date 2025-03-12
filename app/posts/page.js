import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { getAllPosts } from '@/lib/posts'
import Link from "next/link";
import Fade from '@/components/animation/fade'

export const metadata = {
  title: '博客文章 | Adkins的个人网站',
  description: '探索最新的技术趋势、开发技巧和最佳实践',
}

const BlogPage = async () => {
    const posts = await getAllPosts()
    return (
        <section className="py-32">
            <Fade>
                <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                    <div className="text-center">
                        <Badge variant="secondary" className="mb-6">
                            Latest Updates
                        </Badge>
                        <h2
                            className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
                            Blog Posts
                        </h2>
                        <p
                            className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
                            Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
                        {posts.map((post) => (
                            <Card key={post.slug} className="grid grid-rows-[auto_auto_1fr_auto]">
                                <div className="aspect-[16/9] w-full">
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="transition-opacity duration-200 fade-in hover:opacity-70"
                                    >
                                        <img
                                            src={post.thumbnail ?? "https://www.ihewro.com/usr/uploads/2019/01/762065921.jpg"}
                                            alt={post.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </Link>
                                </div>
                                <CardHeader>
                                    <h3 className="text-lg font-semibold hover:underline md:text-xl">
                                        <Link href={`/posts/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{post.excerpt}</p>
                                </CardContent>
                                <CardFooter>
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="flex items-center text-foreground hover:underline">
                                        Read more
                                        <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </Fade>
        </section>
    );
};

export default BlogPage