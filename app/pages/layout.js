'use client'

import Fade from '@/components/animation/fade'

const Layout = ({ children }) => {
    return <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 mx-auto">
        <article className="pt-36 px-4 rounded-2xl">
            <Fade>
                {children}
            </Fade>
        </article>
    </div>
}

export default Layout