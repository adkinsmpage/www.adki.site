import '../../styles/yue.css'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../components/Loading'

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
        loading === true ? window.blogInfo = blogInfo : null
    }, [loading])

    return loading === true ? 
        <div className="relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 of-x-hidden">
            <div className="pt-6 pb-6 mb-0">
                <h1
                    data-cursor="block"
                    className="mb-8 slide-enter-50 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
                >
                    {blogInfo.posts.at(pid).title}
                </h1>
                <time className='opacity-50 !-mt-6 slide-enter-50'>{dayjs(blogInfo.posts.at(pid).date).format("YYYY-MM-DD")}</time>
            </div>
            <div className="">
                <div className="mb-8 w-full lg:max-w-7xl">
                    <div>
                        <div
                            className="yue text-base leading-7 text-gray-700 dark:text-slate-300 max-w-2xl px-0"
                            dangerouslySetInnerHTML={{ __html: blogInfo.posts.at(pid).content }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div> : <LoadingComponent />
}
