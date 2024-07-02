// useDarkMode.js
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { store } from '../state'

const useDarkMode = () => {
    const snap = useSnapshot(store)

    const setDarkMode = mode => {
        if (mode === null)
            store.darkMode = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
        else store.darkMode = mode
    }

    useEffect(() => {
        store.darkMode = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches
    }, [])

    useEffect(() => {
        if (snap.darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [snap.darkMode])

    return [snap.darkMode, setDarkMode]
}

export default useDarkMode
