'use client'

import { useState, useEffect } from 'react'

export default function DarkMode() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (localStorage.dark === "true" && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
            setDarkMode(true)
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
