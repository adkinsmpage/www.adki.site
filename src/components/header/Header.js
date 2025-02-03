'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import useDarkMode from '@/utils/hooks/useDarkMode'
import config from 'configJS'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

export default function HeaderNav() {
    const pathname = usePathname()
    const [_isDarkMode, _setIsDarkMode] = useDarkMode()

    return (
        <div className=''>
            <div className='bg-gray-300/50 lg:bg-transparent fixed top-6 inset-x-0 flex justify-center items-center gap-8 w-fit mx-auto px-8 rounded-3xl backdrop-blur-lg backdrop-saturate-150 border border-transparent shadow-sm z-50'>
                <Popover>
                    <PopoverButton className='outline-0 z-30 rounded-full border border-transparent lg:hidden'>
                        <svg
                            className='size-6 stroke-black dark:stroke-white'
                            fill='none'
                        >
                            <path
                                d='M4 8h16M4 16h16'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            ></path>
                        </svg>
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor='bottom'
                        className='backdrop-blur-2xl backdrop-saturate-150 rounded-xl text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0'
                    >
                        <div className='p-3'>
                            {config.global.nav.map((item, i) => (
                                <Link
                                    className='block rounded-lg py-2 px-3 transition'
                                    href={item.link}
                                    key={i}
                                >
                                    <p
                                        className={`transition-all duration-300 block py-2 text-center relative ${pathname === item.link ? 'border-gradient text-blue-500 drop-shadow-[0_0_16px_rgba(0,120,231,1)] dark:text-sky-400' : 'text-black dark:text-white/70 '}`}
                                    >
                                        {item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </PopoverPanel>
                </Popover>
            </div>
            <div className='hidden lg:flex fixed top-6 inset-x-0 justify-center items-center gap-8 w-fit mx-auto px-8 rounded-3xl bg-white/70 dark:bg-black/45 backdrop-blur-lg backdrop-saturate-150 border border-transparent shadow-sm z-50'>
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
