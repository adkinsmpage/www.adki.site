import { proxy } from 'valtio'

export const store = proxy({
    darkMode: null,
    hitokoto: 'Loading...',
    mobileMenuOpen: false,
})
