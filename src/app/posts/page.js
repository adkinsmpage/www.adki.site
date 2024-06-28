import '@/app/page.css'
import dayjs from 'dayjs'
import Link from 'next/link'
import { getPostsInfo } from '@/utils/posts'
import { Suspense } from 'react'
import Loading from '@/components/loading'

export default async function Page() {
    const data = await getPostsInfo()

    return <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-slate-300">The <mark className='highLightMark' data-cursor="block">Blog</mark></h2>
                <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-slate-300">
                    Some posts by Adkimsm, usually written in Chinese
                </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <Suspense fallback={<Loading />}>
                    {data.posts.map((post, i) => (
                        <Link
                            key={i}
                            href={`/posts/${data.titles.at(i)}`}
                        >
                            <div
                                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/45 dark:bg-gray-900/45 dark:text-white/80 transition-all hover:scale-[1.03] ease-linear hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.17)]"
                            >
                                <div className="flex items-center gap-x-4 border-b border-gray-900/5 p-6">
                                    <div className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
                                        {post.data.matter.title}
                                    </div>
                                </div>
                                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                    <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500 dark:text-white/80">标签</dt>
                                        <dd className="flex items-start gap-x-2 overflow-y-auto">{
                                            post.data.matter.tags.map((tag, i) => (
                                                <span key={i}
                                                    className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500 dark:text-white/80">分类</dt>
                                        <dd className="flex items-start gap-x-2">
                                            <div
                                                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                                {post.data.matter.categories.at(0)}
                                            </div>
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500 dark:text-white/80">最新更新时间</dt>
                                        <dd className="text-gray-700 dark:text-white/80">
                                            <span>{dayjs(post.data.matter.date).format("YYYY-MM-DD")}</span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </Link>
                    ))}</Suspense>
            </div>
        </div>
    </div>
}