import '@/app/page.css'
import '@/app/posts/[pid]/yue.css'
import '@/app/posts/[pid]/prism.css'
import dayjs from 'dayjs'

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

export default async function Page({ params }) {
    const { pid } = params
    const data = await getData()
    console.log(!loading ? data : "not loaded")

    return !loading ?
        <div className="mx-auto relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 flex items-center flex-col">
            <div>
                <div className="pt-6 pb-6 mb-0">
                    <h1
                        data-cursor="block"
                        className="mb-8 text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
                    >
                        {data.posts.at(pid).title}
                    </h1>
                    <time className='opacity-50 !-mt-6 slide-enter-50'>{dayjs(data.posts.at(pid).date).format("YYYY-MM-DD")}</time>
                </div>
                <div className="mb-8 w-full">
                    <div>
                        <div
                            className="yue text-base leading-7 text-gray-700 dark:text-slate-300 max-w-2xl px-0"
                            dangerouslySetInnerHTML={{ __html: data.posts.at(pid).content }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div> : <h2>Loading...</h2>
}