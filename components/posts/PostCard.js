'use client'

import { ArrowRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

/**
 * 博客文章卡片组件
 */
export default function PostCard({ post }) {
  return (
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
          阅读更多
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
} 