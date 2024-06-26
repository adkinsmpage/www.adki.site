'use client'

import '@/app/page.css'
import '@/app/waves.min.css'
import Properties from '@/components/properties/Properties'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSnapshot } from 'valtio'
import { store } from '@/utils/state'

const TypewriterEffect = dynamic(() => import('@/components/typeWriter'), {
    ssr: false,
})

export default function Home() {
    const { hitokoto } = useSnapshot(store)
    const words = [
        {
            text: 'Front-end',
        },
        {
            text: 'Developer',
        },
        {
            text: '/',
        },
        {
            text: 'Open',
        },
        {
            text: 'Sourceror',
        },
        {
            text: '/',
        },
        {
            text: 'Blogger',
        },
        {
            text: '/',
        },
        {
            text: 'Android',
        },
        {
            text: 'Player',
        },
    ]

    useEffect(() => {
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => (store.hitokoto = data.hitokoto))
            .catch(console.error)

        import('@/app/waves.min.js').then(Waves => Waves.init())
    }, [])

    return (
        <div className='mx-auto py-32 sm:py-48 lg:py-56'>
            <div className='text-center'>
                <div className='banner'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-slate-300'>
                        Hello, Here's{' '}
                        <mark className='highLightMark' data-cursor='block'>
                            Adkimsm
                        </mark>
                    </h1>
                    <div
                        className='mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300'
                        data-cursor='block'
                    >
                        <TypewriterEffect words={words} />A Student from China
                    </div>
                    <section className='absolute inset-x-0 bottom-32 p-7 waves-effect'>
                        <figure className='mx-auto'>
                            <blockquote className='font-serif text-xl font-medium leading-8 tracking-tight dark:text-white/80 text-gray-700 sm:text-2xl sm:leading-9'>
                                <p>{hitokoto}</p>
                            </blockquote>
                        </figure>
                    </section>
                </div>

                <div className='text-3xl font-medium relative pl-5 mb-2 text-left'>
                    属性点全集
                </div>
                <Properties
                    Properties={{
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
                    }}
                />
            </div>
        </div>
    )
}
