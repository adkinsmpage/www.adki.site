import consola from 'consola'

// 增加缓存时间
export const revalidate = 300; // 5分钟

// 优化缓存实现
const cache = new Map();
const MAX_CACHE_SIZE = 100;

export async function getCachedData(key, fetchFn, ttl = 300000) {
  const now = Date.now();
  const cached = cache.get(key);
  
  if (cached && now - cached.timestamp < ttl) {
    return cached.data;
  }

  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = [...cache.entries()]
      .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
    cache.delete(oldestKey);
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: now });
  return data;
}

export async function compileMDX(slug, type="posts") {
  try {
    // 这部分需要根据实际的compileMDX函数实现来填写
    // 以下为占位代码
    const { mdxCompiler } = await import('./mdx');
    const result = await mdxCompiler(slug, type);
    return result;
  } catch (error) {
    consola.error(`Remark处理失败: ${slug}`, error);
    throw error; // 或者返回一个默认值
  }
} 