'use client'

import Link from 'next/link'
import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { MoonIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'

export default function HeaderNav({ children }) {
    let navigations = [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'Links', href: '/pages/links' },
        { name: 'About', href: '/pages/about' }
    ]

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false),
        [darkMode, setDarkMode] = useState(false),
        pathname = usePathname()


    useEffect(() => {
        if (localStorage.dark === "true" && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
            setDarkMode(true)
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    useEffect(()=> {
        console.log(pathname)
    })

    useEffect(() => {
        localStorage.setItem('dark', darkMode.toString())
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <div className="">
            <header className="z-40 fixed backdrop-blur-lg inset-x-0 top-0">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5" data-cursor="block">
                            <span className="sr-only">Adkimsm</span>
                            <img
                                className="h-8 w-auto rounded-full"
                                src="http://q1.qlogo.cn/g?b=qq&nk=3248546325&s=100"
                                alt="Avatar"
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700  dark:text-slate-300"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigations.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                data-cursor="block"
                                className={`px-3.5 py-2.5 text-sm font-semibold rounded-2xl border border-transparent leading-6 ${pathname === item.href ? "text-indigo-600 dark:text-indigo-500" : "dark:text-slate-300 text-gray-900"}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <button
                            className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-300"
                            onClick={() => setDarkMode(mode => !mode)}
                        >
                            <MoonIcon className="w-6 h-6" />
                        </button>
                    </div>
                </nav>
                <Transition
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={mobileMenuOpen}
                    as={Fragment}
                >
                    <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="z-40 fixed inset-y-0 right-0 w-full overflow-y-auto bg-white dark:bg-gray-950 dark:text-slate-300 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-1.5 p-1.5"
                                        data-cursor="block">
                                        <span className="sr-only">Adkimsm</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="http://q1.qlogo.cn/g?b=qq&nk=3248546325&s=100"
                                            alt=""
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-slate-300"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            {navigations.map((item) => (
                                                <Link
                                                    data-cursor="block"
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900  dark:text-slate-300 dark:hover:bg-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="py-6">
                                            <button
                                                onClick={() => setDarkMode(mode => !mode)}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-slate-300 dark:hover:bg-gray-900 hover:bg-gray-50"
                                            >
                                                <MoonIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </Dialog>
                </Transition>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8 -z-10">
                <div className="fixed isolate px-6 pt-14 lg:px-8">
                    <div
                        className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>

                    <div
                        className="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
