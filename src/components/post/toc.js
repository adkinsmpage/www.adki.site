'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

const TocItem = ({ item, activeId }) => {
    const hasChildren = item.children?.length > 0
    const isActive = activeId === item.id

    return (
        <li
            className={clsx('ml-2', {
                'pl-2 border-l-2 border-primary': hasChildren,
            })}
        >
            <a
                href={`#${item.id}`}
                className={clsx(
                    'block py-1 transition-colors',
                    isActive
                        ? 'text-primary font-medium'
                        : 'text-gray-600 hover:text-primary',
                )}
            >
                {item.text}
            </a>
            {hasChildren && (
                <ul className='mt-1 space-y-1'>
                    {item.children.map(child => (
                        <TocItem
                            key={child.id}
                            item={child}
                            activeId={activeId}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export const TOC = ({ toc }) => {
    const [activeId, setActiveId] = useState(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '0px 0px -80% 0px' },
        )

        toc.forEach(item => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [toc])

    return (
        <aside className='hidden lg:block w-64 pl-8 text-sm sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto'>
            <nav aria-label='Table of contents'>
                <ul className='space-y-2'>
                    {toc.map(item => (
                        <TocItem
                            key={item.id}
                            item={item}
                            activeId={activeId}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
