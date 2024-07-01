'use client'

import { useEffect } from 'react'
import { store } from '@/utils/state'
import { useSnapshot } from 'valtio'

export default function DarkMode() {
    let { darkMode } = useSnapshot(store)

    useEffect(() => {
        if (localStorage.dark === "true" && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
            store.darkMode = true
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('dark', darkMode.toString())
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return;
}
