import { proxy } from 'valtio'

export const store = proxy({
    darkMode: null,
    hitokoto: 'Loading...',
    mobileMenuOpen: false,
    navItems: [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts' },
        { name: 'Links', link: '/pages/links' },
        { name: 'About', link: '/pages/about' },
    ],
})
