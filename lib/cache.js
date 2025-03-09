// lib/cache.js
const cache = {
    data: null,
    timestamp: 0,
    ttl: 5 * 1000, // 5秒缓存时间
  }
  
  export async function getCachedData(fetchFn) {
    const now = Date.now()
    if (!cache.data || now - cache.timestamp > cache.ttl) {
      cache.data = await fetchFn()
      cache.timestamp = now
    }
    return cache.data
  }
  