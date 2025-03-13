export const metadata = {
    title: 'Mastodon推文 | Adkinsm Home',
    description: '我的Mastodon动态和分享',
}

export default function TweetsLayout({ children }) {
    return <div className="mx-auto px-4 sm:px-7 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">
            Mastodon推文
        </h1>
        {children}
    </div>
} 