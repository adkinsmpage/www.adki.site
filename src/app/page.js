import '@/app/page.css'
import Properties from '@/components/Properties'

export default function Home() {
    return <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
            <div className='banner'>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-slate-300">
                    Hello, Here's <mark className='highLightMark' data-cursor="block">Adkimsm</mark>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300" data-cursor="block">
                    Front-end Developer / Open Sourceror / Blogger / Android Player
                    <br />
                    A Student from China
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        data-cursor="block"
                        href="https://blog.adki.site"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Blog
                    </a>
                    <a data-cursor="block" href="https://github.com/adkimsm" className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-300 px-3.5 py-2.5 ">
                        GitHub
                    </a>
                </div>
            </div>

            <div className="text-3xl font-medium relative pl-5 mb-2 text-left">属性点全集</div>
            <Properties Properties={{
                title: '咕咕属性值',
                content: [
                    {
                        title: '智力状况',
                        value: 40,
                        tip: '神经经常打结，并不聪明的样子( ´_ゝ`)',
                    },
                    {
                        title: '精神状态',
                        value: 80,
                        tip: '对大家都很感兴趣呢！',
                    },
                    {
                        title: '脑细胞活跃度',
                        value: 50,
                        tip: '不善于设计东西，不善于蹦出新点子，坏！',
                    },
                    {
                        title: '社交能力',
                        value: 90,
                        tip: '除了偶尔会说错话，咱还是很外向的说！',
                    },
                ],
            }} />
        </div>
    </div>;
}
