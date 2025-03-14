'use client'

import Fade from '@/components/animation/fade'
import dayjs from 'dayjs'
import { TableOfContents } from '@/components/toc'
import { Waline } from '@/components/comments/waline'

/**
 * 通用文章布局组件，用于博客文章和页面
 */
export default function PostLayout({ 
  frontmatter, 
  children, 
  showTableOfContents = true,
  showComments = true,
  extraContent = null
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="relative">
        <article className="pt-36 rounded-2xl">
          <Fade>
            <header className='text-center'>
              <h1 className='text-3xl pb-5 leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                {frontmatter.title}
              </h1>
              {frontmatter.date && (
                <time className='my-2 block text-base leading-6 font-medium text-gray-500 dark:text-gray-300'>
                  {dayjs(frontmatter.date).format('YYYY-MM-DD')}
                </time>
              )}
            </header>
            
            {children}
            
            {extraContent}
            
            {showComments && <Waline />}
          </Fade>
        </article>
        
        {showTableOfContents && (
          <div className="absolute top-0 right-[-19rem] w-64">
            <TableOfContents />
          </div>
        )}
      </div>
    </div>
  )
} 