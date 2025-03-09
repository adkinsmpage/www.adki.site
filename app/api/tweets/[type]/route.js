// app/api/tweets/route.js
import { getCachedData } from '@/lib/cache'

async function fetchTweets() {
    try {
        const response = await fetch(
            `https://o3o.ca/api/v1/accounts/110492424833061986/statuses`,
            { cache: 'no-store' } // 禁用缓存，确保每次请求都获取最新数据
        )
        return response.json()
    } catch {
        console.error('Fetch Tweets Error')
    }
}

async function fetchEmojis() {
    try {
        const response = await fetch(
            `https://o3o.ca/api/v1/custom_emojis`,
            { cache: 'no-store' } // 禁用缓存，确保每次请求都获取最新数据
        )
        return response.json()
    } catch {
        console.error('Fetch Emoji Error')
    }
}

export const revalidate = 30 // 30秒增量更新

export async function GET(_request, { params }) {
    const { type } = await params
    if (!["tweets", "emojis"].some(element => element === type))
        return Response.json({ error: 'Type must be emojis or tweets' }, { status: 403 })
    const data = await getCachedData(type === "tweets" ? fetchTweets : fetchEmojis)
    return Response.json(data)
}
