'use client'

import Fade from '@/components/animation/fade'

/**
 * 通用内容布局组件，用于各种页面
 */
export default function ContentLayout({ children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 mx-auto">
      <article className="pt-36 px-4 rounded-2xl">
        <Fade>
          {children}
        </Fade>
      </article>
    </div>
  )
} 