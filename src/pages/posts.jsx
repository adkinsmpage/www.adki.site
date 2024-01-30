import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Link } from "react-router-dom";

function App() {
    const [blogInfo, setBlogInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => { document.title = "Adkimsm Blog" })

    useEffect(() => {
        document.location.href.toString().search(/localhost/) !== -1 ? null : document.domain = 'adki.site';
        fetch('https://blog.adki.site/content.json')
            .then(res => res.json())
            .then(res => {
                setBlogInfo(res)
                setLoading(true)
            })
    }, [])

    useEffect(() => {
        console.log(blogInfo)
    }, [blogInfo])

    return (<div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-slate-300">The <mark className='hSqPQ' data-cursor="block">Blog</mark></h2>
                <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-slate-300">
                    Some posts by Adkimsm, usually written in Chinese
                </p>
            </div>
            {loading ? <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {blogInfo.posts.map((post, i) => (
                    <article data-cursor="block" key={i} className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                            <time dateTime={post.datetime} className="text-gray-500">
                                {dayjs(post.date).format("YYYY-MM-DD")}
                            </time>
                            <a
                                href={post.categories[0].permalink}
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-slate-300"
                            >
                                {post.categories[0].name}
                            </a>
                        </div>
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-slate-300">
                                <Link to={`/post/${i}`}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-slate-300">{post.excerpt}</p>
                        </div>
                    </article>
                ))}
            </div> : <><br /><h2 className='text-2xl font-bold leading-7 text-gray-900 dark:text-slate-300 sm:truncate sm:text-3xl sm:tracking-tight'>Loading...</h2></>}
        </div>
    </div>)
}

export default App
