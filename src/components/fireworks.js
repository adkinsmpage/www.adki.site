'use client'

import { createFireworks } from '@explosions/fireworks'
import { useEffect } from 'react'

export default function Fireworks() {
    useEffect(() => {
        createFireworks({
            selector: 'canvas.fireworks',
        })
    }, [])

    return <canvas className='top-0 left-0 fixed fireworks -z-40' />
}
