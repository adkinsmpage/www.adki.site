'use client'

import { useEffect } from 'react'

export default function WavesInitializer() {
    useEffect(() => {
        import('@/app/waves.min.js').then(Waves => {
            Waves.init()
            return () => Waves.destroy() // 可选清理函数
        })
    }, [])

    return null
}
