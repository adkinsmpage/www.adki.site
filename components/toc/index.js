'use client'

import { useEffect, useState, useRef } from 'react'
import Fade from '../animation/fade'

export const TableOfContents = () => {
    const [headings, setHeadings] = useState([])
    const [activeId, setActiveId] = useState('')
    const tocRef = useRef(null)
    const activeItemRef = useRef(null)

    useEffect(() => {
        // 获取所有文章标题
        const elements = Array.from(document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3'))
        const headingElements = elements.map(element => ({
            id: element.id,
            text: element.textContent,
            level: Number(element.tagName.substring(1))
        }))
        setHeadings(headingElements)

        // 创建 Intersection Observer
        const callback = (entries) => {
            // 找到最后一个进入视口的标题
            const visibleHeadings = entries
                .filter(entry => entry.isIntersecting)
                .map(entry => entry.target.id)

            if (visibleHeadings.length > 0) {
                // 使用最后一个可见的标题作为当前活动标题
                setActiveId(visibleHeadings[visibleHeadings.length - 1])
            }
        }

        const observer = new IntersectionObserver(callback, {
            rootMargin: '-20% 0px -35% 0px',
            threshold: [0, 1] // 添加阈值以更精确地检测可见性
        })

        // 观察所有标题元素
        elements.forEach(element => observer.observe(element))

        return () => observer.disconnect()
    }, [])

    // 当活动项改变时，滚动目录
    useEffect(() => {
        if (activeItemRef.current && tocRef.current) {
            const tocContainer = tocRef.current
            const activeItem = activeItemRef.current

            // 计算滚动位置
            const containerHeight = tocContainer.clientHeight
            const itemTop = activeItem.offsetTop
            const itemHeight = activeItem.clientHeight
            const scrollTop = tocContainer.scrollTop

            // 如果活动项不在可视区域内，滚动到合适的位置
            if (itemTop < scrollTop || itemTop + itemHeight > scrollTop + containerHeight) {
                tocContainer.scrollTo({
                    top: itemTop - containerHeight / 2 + itemHeight / 2,
                    behavior: 'smooth'
                })
            }
        }
    }, [activeId])

    if (headings.length === 0) {
        return null
    }

    return (
        <Fade>
            <nav className="hidden lg:block">
                <div
                    ref={tocRef}
                    className="fixed top-36 w-full max-h-[calc(100vh-9rem)] overflow-y-auto p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                >
                    <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">目录</h4>
                    <ul className="space-y-2 text-sm">
                        {headings.map(heading => (
                            <li
                                key={heading.id}
                                ref={heading.id === activeId ? activeItemRef : null}
                                style={{
                                    paddingLeft: `${(heading.level - 1) * 1}rem`
                                }}
                            >
                                <a
                                    href={`#${heading.id}`}
                                    className={`block truncate py-1 transition-all duration-200 ${activeId === heading.id
                                            ? 'text-blue-500 dark:text-blue-400 translate-x-1 font-medium'
                                            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.querySelector(`#${heading.id}`).scrollIntoView({
                                            behavior: 'smooth'
                                        })
                                    }}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </Fade>
    )
}