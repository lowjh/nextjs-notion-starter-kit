// ... (保留原有内容)

// Optional redis instance for persisting preview images
export const isRedisEnabled: boolean =
  getSiteConfig('isRedisEnabled', false) || !!getEnv('REDIS_ENABLED', null)

// Support both REDIS_URL (Vercel KV/Upstash) and individual REDIS_* variables
export const redisUrl = getEnv(
  'REDIS_URL',
  isRedisEnabled ? undefined : null
) || (isRedisEnabled ? `redis://${getEnv('REDIS_USER', 'default')}:${getEnv('REDIS_PASSWORD', '')}@${getEnv('REDIS_HOST', '')}` : null)

export const redisNamespace = getEnv('REDIS_NAMESPACE', 'preview-images')

// Backwards compatibility
export const redisHost = getEnv('REDIS_HOST', isRedisEnabled ? undefined : null)
export const redisPassword = getEnv(
  'REDIS_PASSWORD',
  isRedisEnabled ? undefined : null
)
export const redisUser: string = getEnv('REDIS_USER', 'default')
