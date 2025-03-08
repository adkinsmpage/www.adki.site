import Link from 'next/link'
import dayjs from 'dayjs'
import { Divider } from '@/components/ui/divider'

export const Footer = () => {
    return (
        <footer
            data-hide-print
            className='text-muted-foreground relative z-[1] border-t border-x-uk-separator-opaque-light py-6 text-base-content/80 dark:border-uk-separator-opaque-dark'
        >
            <div className='px-4 sm:px-8'>
                <div className='relative mx-auto max-w-7xl lg:px-8'>
                    <div className='space-y-3 text-center md:text-left'>
                        <p>
                            <span>© {dayjs().year()} </span>
                            <a href='/'>Adkinsm</a>
                            <Divider />
                            <span className='mt-3 block md:mt-0 md:inline'>
                                人生得意须尽欢
                            </span>
                            <Divider />
                            <span><a href="/rss">RSS</a></span>
                            <Divider />
                            <span><a href="/sitemap">SiteMap</a></span>
                        </p>
                        <div>
                            如无特殊声明，本站内容均为站长{' '} Adkinsm 原创，且采用{' '}
                            <Link href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
                                CC BY-NS-SA 4.0 协议
                            </Link>
                            进行公开。
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}