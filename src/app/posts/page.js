import '@/app/page.css'
import dayjs from 'dayjs'
import Link from 'next/link'

let loading = true

const setLoading = bool => loading = bool

async function getData() {
    const res = await fetch('https://blog.adki.site/content.json')
    await setLoading(false)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const data = await getData()
    console.log(!loading?data:"not loaded")

    return <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-slate-300">The <mark className='highLightMark' data-cursor="block">Blog</mark></h2>
                <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-slate-300">
                    Some posts by Adkimsm, usually written in Chinese
                </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                { !loading ? data.posts.map((post, i) => (
                    <article data-cursor="block" key={i} className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                            <time dateTime={post.datetime} className="text-gray-500">
                                {dayjs(post.date).format("YYYY-MM-DD")}
                            </time>
                            <div
                                className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-slate-300"
                            >
                                {post.categories.at(0).name}
                            </div>
                        </div>
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-slate-300">
                                <Link href={`/posts/${i}`}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-slate-300">{post.excerpt}</p>
                        </div>
                    </article>
                )) : <h2>Loading...</h2>}
            </div>
        </div>
    </div>
}