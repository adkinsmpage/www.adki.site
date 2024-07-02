'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import {
    Dialog,
    Transition,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { MoonIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { store } from '@/utils/state'
import { useSnapshot } from 'valtio'
import useDarkMode from '@/utils/hooks/useDarkMode'

const company = [
    { name: 'About us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' },
]

export default function Nav() {
    let { mobileMenuOpen } = useSnapshot(store)
    const [isDarkMode, setIsDarkMode] = useDarkMode()

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    const pathname = usePathname()
    let navigations = [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'Links', href: '/pages/links' },
        { name: 'About', href: '/pages/about' },
    ]

    return (
        <>
            <nav
                className='flex items-center justify-between p-6 lg:px-8'
                aria-label='Global'
            >
                <div className='flex lg:flex-1'>
                    <Link href='/' className='-m-1.5 p-1.5' data-cursor='block'>
                        <span className='sr-only'>Adkimsm</span>
                        <img
                            className='h-8 w-auto rounded-full'
                            src='https://q1.qlogo.cn/g?b=qq&nk=3248546325&s=100'
                            alt='Avatar'
                        />
                    </Link>
                </div>
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700  dark:text-slate-300'
                        onClick={() => (store.mobileMenuOpen = true)}
                    >
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
                <div className='hidden lg:flex lg:gap-x-12'>
                    {navigations.map(item => (
                        <Link
                            key={item.name}
                            href={item.href}
                            data-cursor='block'
                            className={`px-3.5 py-2.5 text-sm font-semibold rounded-2xl border border-transparent leading-6 ${pathname === item.href ? 'text-indigo-600 dark:text-indigo-500' : 'dark:text-slate-300 text-gray-900'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <PopoverGroup className='hidden lg:flex lg:flex-1 lg:justify-end bg-gray-50/45 dark:bg-gray-900/45 dark:text-white/80 text-slate-900'>
                    <Popover className='relative'>
                        <PopoverButton className='flex items-center gap-x-1 text-sm font-semibold leading-6'>
                            <MoonIcon className='w-6 h-6' />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className='absolute transition duration-300 right-0 top-full z-10 mt-3 w-56 rounded-xl p-2 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
                        >
                            <div
                                onClick={() => setIsDarkMode(false)}
                                className='flex justify-around align-center rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-gray-50 dark:hover:bg-gray-700'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                                    />
                                </svg>{' '}
                                总是浅色
                            </div>
                            <div
                                onClick={() => setIsDarkMode(true)}
                                className='flex justify-around align-center rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-gray-50 dark:hover:bg-gray-700'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                                    />
                                </svg>
                                总是深色
                            </div>

                            <div
                                onClick={() => setIsDarkMode()}
                                className='flex justify-around align-center rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-gray-50 dark:hover:bg-gray-700'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25'
                                    />
                                </svg>
                                跟随系统
                            </div>
                        </PopoverPanel>
                    </Popover>
                </PopoverGroup>
            </nav>
            <Transition
                enter='transition-opacity duration-75'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-150'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                show={mobileMenuOpen}
                as={Fragment}
            >
                <Dialog
                    as='div'
                    className='lg:hidden'
                    onClose={() => (store.mobileMenuOpen = false)}
                >
                    <Transition.Child as={Fragment}>
                        <div className='fixed inset-0' />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <Dialog.Panel className='z-40 fixed inset-y-0 right-0 w-full overflow-y-auto bg-white dark:bg-gray-950 dark:text-slate-300 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                            <div className='flex items-center justify-between'>
                                <button
                                    onClick={() =>
                                        (store.mobileMenuOpen = false)
                                    }
                                    className='-m-1.5 p-1.5'
                                    data-cursor='block'
                                >
                                    <span className='sr-only'>Adkimsm</span>
                                    <img
                                        className='h-8 w-auto rounded-full'
                                        src='https://q1.qlogo.cn/g?b=qq&nk=3248546325&s=100'
                                        alt=''
                                    />
                                </button>
                                <button
                                    type='button'
                                    className='-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-slate-300'
                                    onClick={() =>
                                        (store.mobileMenuOpen = false)
                                    }
                                >
                                    <span className='sr-only'>Close menu</span>
                                    <XMarkIcon
                                        className='h-6 w-6'
                                        aria-hidden='true'
                                    />
                                </button>
                            </div>
                            <div className='mt-6 flow-root'>
                                <div className='-my-6 divide-y divide-gray-500/10'>
                                    <div className='space-y-2 py-6'>
                                        {navigations.map(item => (
                                            <Link
                                                data-cursor='block'
                                                key={item.name}
                                                href={item.href}
                                                onClick={() =>
                                                    (store.mobileMenuOpen = false)
                                                }
                                                className={`${pathname === item.href ? 'text-indigo-600 dark:text-indigo-500' : 'dark:text-slate-300 text-gray-900'} -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-slate-300 dark:hover:bg-gray-900 hover:bg-gray-50`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className='py-6'>
                                        <button
                                            onClick={toggleDarkMode}
                                            className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-slate-300 dark:hover:bg-gray-900 hover:bg-gray-50'
                                        >
                                            <MoonIcon className='w-6 h-6' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}
