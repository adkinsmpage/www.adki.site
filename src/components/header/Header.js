'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import useDarkMode from '@/utils/hooks/useDarkMode'
import config from 'configJS'

export default function HeaderNav() {
    const pathname = usePathname()
    const [_isDarkMode, _setIsDarkMode] = useDarkMode()

    return (
        <div className=''>
            <div className='fixed top-6 inset-x-0 flex justify-center items-center gap-8 w-fit mx-auto px-8 rounded-3xl bg-white/70 dark:bg-black/45 backdrop-blur-lg backdrop-saturate-150 border border-transparent shadow-sm z-50'>
                {config.global.nav.map((item, i) => (
                    <Link
                        key={i}
                        href={item.link}
                        className={`transition-all duration-300 block py-2 text-center relative ${pathname === item.link ? 'border-gradient text-blue-500 drop-shadow-[0_0_16px_rgba(0,120,231,1)] dark:text-sky-400' : 'text-black dark:text-white/70 '}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
