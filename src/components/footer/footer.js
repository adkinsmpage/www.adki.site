import clsx from 'clsx'
import config from 'configJS'
import Link from 'next/link'
import dayjs from 'dayjs'

export const Footer = () => {
    return (
        <footer
            data-hide-print
            className='relative z-[1] border-t border-x-uk-separator-opaque-light bg-[var(--root-bg)] py-6 text-base-content/80 dark:border-uk-separator-opaque-dark'
        >
            <div className='px-4 sm:px-8'>
                <div className='relative mx-auto max-w-7xl lg:px-8'>
                    <div className='space-y-3 text-center md:text-left'>
                        <p>
                            <span>© {dayjs().year()} </span>
                            <a href='/'>{config.global.author}</a>
                            <Divider />
                            <span className='mt-3 block md:mt-0 md:inline'>
                                {config.global.description}
                            </span>
                            <Divider />
                            <Link href='/rss' target='_blank'>
                                RSS
                            </Link>
                            <Divider />
                            <Link href='/sitemap' target='_blank'>
                                站点地图
                            </Link>
                        </p>
                        <div>
                            如无特殊声明，本站内容均为站长{' '}
                            {config.global.author} 原创，且采用{' '}
                            <Link
                                target='_blank'
                                href='http://creativecommons.org/licenses/by-nc-sa/4.0/'
                            >
                                CC BY-NS-SA 4.0 协议
                            </Link>
                            进行公开。
                        </div>
                        <div>
                            <span className='my-3 block md:my-0 md:inline'>
                                Powered by{' '}
                                <Link
                                    target='_blank'
                                    className='hover-link link'
                                    href='https://github.com/adkinsmpage/www.adki.site'
                                >
                                    Prefect
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const Divider = ({ className }) => {
    return (
        <span
            className={clsx('select-none whitespace-pre opacity-50', className)}
        >
            {' '}
            |{' '}
        </span>
    )
}
