// app/posts/[slug]/page.js

import '@/app/page.css';
import '@/assets/css/markdown.css';
import dayjs from 'dayjs';
import { getPostInfo, getPosts } from '@/utils/posts';

export async function generateStaticParams() {
    const slugs = await getPosts();
    return slugs.map(slug => ({ slug: slug.file }));
}

export default async function Page({ params }) {
    const { slug } = params;
    const post = await getPostInfo(slug);

    return (
        <div className="mx-auto relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 flex items-center flex-col">
            <div>
                <div className="pt-6 pb-6 mb-0">
                    <h1
                        data-cursor="block"
                        className="mb-8 text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
                    >
                        {post.data.matter.title}
                    </h1>
                    <time className='opacity-50 !-mt-6 slide-enter-50'>{dayjs(post.data.matter.date).format("YYYY-MM-DD")}</time>
                </div>
                <div className="mb-8 w-full">
                    <div>
                        <div
                            className="markdown-body text-base leading-7 text-gray-700 dark:text-slate-300 max-w-2xl px-0"
                            dangerouslySetInnerHTML={{ __html: String(post) }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
