import { proxy } from 'valtio'

export const store = proxy({
    darkMode: false,
    hitokoto: "Loading...",
    mobileMenuOpen: false
})