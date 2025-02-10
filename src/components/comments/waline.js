'use client'

import React, { useEffect, useRef } from 'react'
import { init } from '@waline/client'

import '@waline/client/style'
import config from 'configJS'

export const Waline = props => {
    const walineInstanceRef = useRef(null)
    const containerRef = React.createRef()

    useEffect(() => {
        walineInstanceRef.current = init({
            ...props,
            serverURL: config.comments.waline.serverURL,
            el: containerRef.current,
        })

        return () => walineInstanceRef.current?.destroy()
    }, [])

    useEffect(() => {
        walineInstanceRef.current?.update(props)
    }, [props])

    return <div ref={containerRef} />
}
