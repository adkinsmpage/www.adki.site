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
            </div>

            <div className="text-3xl font-medium relative pl-5 mb-2 text-left">属性点全集</div>
            <Properties Properties={{
                content: [
                    {
                        title: '智力状况',
                        value: 40,
                        tip: '半痴呆（雾',
                    },
                    {
                        title: '精神状态',
                        value: 30,
                        tip: '某些时候有点抑郁的样子（？',
                    },
                    {
                        title: '脑细胞活跃度',
                        value: 10,
                        tip: '喜欢设计一些 shit',
                    },
                    {
                        title: '社交能力',
                        value: 20,
                        tip: '内向腼腆小男孩（bushi',
                    },
                ],
            }} />
        </div>
    </div>;
}
