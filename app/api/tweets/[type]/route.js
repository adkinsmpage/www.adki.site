// app/api/tweets/[type]/route.js
import { getCachedData } from '@/lib/cache'

// 分页参数校验函数
const validateParams = (searchParams) => {
  const page = Math.max(1, parseInt(searchParams.get('page')) || 1)
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get('limit')) || 30))
  return { page, limit }
}

// Mastodon API分页处理
const buildMastodonUrl = (baseUrl, params) => {
  const url = new URL(baseUrl)
  url.searchParams.set('exclude_replies', true)
  url.searchParams.set('exclude_reblogs', true)
  url.searchParams.set('limit', params.limit)
  
  if (params.page > 1) {
    const offset = (params.page - 1) * params.limit
    url.searchParams.set('max_id', offset.toString(36))
  }
  
  return url.toString()
}

// 带超时的fetch封装
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw new Error(error.name === 'AbortError' ? '请求超时' : '网络错误')
  }
}

// 推文获取函数（添加分页支持）
async function fetchTweets(searchParams) {
  try {
    const params = validateParams(searchParams)
    const mastodonUrl = buildMastodonUrl(
      'https://o3o.ca/api/v1/accounts/110492424833061986/statuses',
      params
    )
    
    const response = await fetchWithTimeout(mastodonUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) throw new Error(`HTTP错误 ${response.status}`)

    const tweets = await response.json()
    const linkHeader = response.headers.get('Link')
    const hasMore = linkHeader?.includes('rel="next"') || false

    return {
      data: tweets.filter(t => !t.in_reply_to_id),
      hasMore,
      timestamp: Date.now(),
      page: params.page,
      limit: params.limit
    }
  } catch (error) {
    console.error('获取推文失败:', error.message)
    return { 
      data: [], 
      error: error.message,
      hasMore: false 
    }
  }
}

// 表情符号获取函数（添加缓存优化）
async function fetchEmojis() {
  try {
    const response = await fetchWithTimeout(
      'https://o3o.ca/api/v1/custom_emojis',
      { cache: 'no-store' }
    )

    if (!response.ok) throw new Error(`HTTP错误 ${response.status}`)

    const data = await response.json()
    return {
      data: data.map(e => ({
        shortcode: e.shortcode,
        url: e.url.startsWith('/') 
          ? `https://o3o.ca${e.url}`
          : e.url,
        static_url: e.static_url.startsWith('/')
          ? `https://o3o.ca${e.static_url}`
          : e.static_url
      })),
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('获取表情失败:', error.message)
    return { 
      data: [],
      error: error.message
    }
  }
}

export const revalidate = 30

export async function GET(request, { params }) {
  const { type } = await params
  const { searchParams } = new URL(request.url)
  
  // 参数验证
  if (!["tweets", "emojis"].includes(type)) {
    return Response.json(
      { error: "无效的请求类型，只支持 tweets 或 emojis" },
      { status: 400 }
    )
  }

  try {
    // 缓存键生成策略
    const cacheKey = type === 'tweets' 
      ? `tweets-${searchParams.get('page')}-${searchParams.get('limit')}`
      : 'emojis'

    const data = await getCachedData(
      () => type === 'tweets' 
        ? fetchTweets(searchParams) 
        : fetchEmojis(),
      cacheKey,
      revalidate * 1000
    )

    return Response.json({
      success: true,
      ...data
    }, {
      headers: {
        'CDN-Cache-Control': `max-age=${revalidate}, s-maxage=${revalidate * 2}`,
        'Vercel-CDN-Cache-Control': `max-age=${revalidate}, s-maxage=${revalidate * 2}`
      }
    })
    
  } catch (error) {
    console.error(`API错误 (${type}):`, error)
    return Response.json(
      { 
        success: false,
        error: error.message || '服务器内部错误',
        code: error.code || 500
      },
      { status: 500 }
    )
  }
}
