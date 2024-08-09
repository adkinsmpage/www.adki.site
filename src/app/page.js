'use client'

import '@/app/page.css'
import '@/app/waves.min.css'
import Properties from '@/components/properties/Properties'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSnapshot } from 'valtio'
import { store } from '@/utils/state'
import config from 'configJS'

const TypewriterEffect = dynamic(() => import('@/components/typeWriter'), {
    ssr: false,
})

export default function Home() {
    const { hitokoto } = useSnapshot(store)
    const words = config.home.banner.typeWriter

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
                            {config.global.author}
                        </mark>
                    </h1>
                    <div
                        className='mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300'
                        data-cursor='block'
                    >
                        <TypewriterEffect words={words} />
                        {config.global.description}
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
                    {config.home.properties.title}
                </div>
                <Properties Properties={config.home.properties.items} />
            </div>
        </div>
    )
}
