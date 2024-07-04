'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { store } from '@/utils/state'
import { useSnapshot } from 'valtio'

export default function HeaderNav() {
    const { navItems } = useSnapshot(store)
    const pathname = usePathname()
    const [_isDarkMode, _setIsDarkMode] = useDarkMode()

    return (
        <div className=''>
            <div className='fixed top-6 inset-x-0 flex justify-center items-center gap-8 w-fit mx-auto px-8 rounded-3xl bg-white/70 backdrop-blur-lg backdrop-saturate-150 border border-gray-100 shadow-sm z-50'>
                {navItems.map((item, i) => (
                    <Link
                        key={i}
                        href={item.link}
                        className={`block py-2 text-center text-black relative ${pathname === item.link ? 'border-gradient text-blue-500 drop-shadow-[0_0_16px_rgba(0,120,231,1)]' : ''}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
