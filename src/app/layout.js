import { Inter } from 'next/font/google'
import '@fontsource/noto-color-emoji'
import './globals.css'
import Providers from './providers'
import HeaderNav from '@/components/header/Header'
import Background from '@/components/background'
import Fireworks from '@/components/fireworks'
import { Footer } from '@/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang='en' className={`scroll-smooth ${inter.className}`}>
            <body className='bg-white dark:bg-slate-900 dark:text-white'>
                <Providers>
                    <HeaderNav />
                    <Background />
                    <div id='root'>{children}</div>
                    <Fireworks />
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
