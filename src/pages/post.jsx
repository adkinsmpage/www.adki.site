import '../styles/yue.css'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

export default function Example() {
    const { pid } = useParams()
    const [blogInfo, setBlogInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.location.href.toString().search(/localhost/) !== -1 ? null : document.domain = 'adki.site';
        fetch('https://blog.adki.site/content.json')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setBlogInfo(res)
                setLoading(true)
            })
    }, [])

    useEffect(() => {
        console.log(loading)
        console.log(blogInfo)
        loading === true ? document.title = `${blogInfo.posts.at(pid).title} | Adkimsm Blog` : null
    }, [loading])

    return (<><header class="pt-6 xl:pb-6">
        <div class="space-y-1 text-center">
            <dl class="space-y-10">
                <div>
                    <dt class="sr-only">Published on</dt>
                    <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time datetime="2023-08-05T00:00:00.000Z">{loading === true ? dayjs(blogInfo.posts.at(pid).date).format("YYYY-MM-DD") : ""}</time>
                    </dd>
                </div>
            </dl>
            <div>
                <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">{loading === true ? blogInfo.posts.at(pid).title : ""}</h1>
            </div>
        </div>
    </header>
        <div className="relative isolate overflow-hidden px-6 py-12 sm:py-12 lg:overflow-visible lg:px-0">
            <div className="mx-auto">
                <div className="lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
                    <div className="lg:pr-4">
                        <div
                            className="yue max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg"
                            dangerouslySetInnerHTML={{ __html: loading === true ? (blogInfo.posts.at(pid) ? blogInfo.posts.at(pid).content : "Loading...") : "Loading..." }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    )
}