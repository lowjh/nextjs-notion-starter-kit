import { type NavigationLink, type NavigationStyle } from './types'

// ----------------------------------------------------------------------------
// Site config
// ----------------------------------------------------------------------------

// Your Notion page ID
export const rootNotionPageId: string = '7875426197cf461698809def95960ebf'

// Optional: Your Notion space ID
export const rootNotionSpaceId: string | null = null

// ----------------------------------------------------------------------------
// Optional site search
// ----------------------------------------------------------------------------

export const isSearchEnabled: boolean = true

// ----------------------------------------------------------------------------
// Optional redis instance for persisting preview images
// ----------------------------------------------------------------------------

export const isRedisEnabled: boolean =
  getSiteConfig('isRedisEnabled', false) || !!getEnv('REDIS_ENABLED', null)

// Support both REDIS_URL (Vercel KV/Upstash) and individual REDIS_* variables
export const redisUrl: string | null =
  getEnv('REDIS_URL', null) ||
  (isRedisEnabled
    ? `redis://${getEnv('REDIS_USER', 'default')}:${getEnv('REDIS_PASSWORD', '')}@${getEnv('REDIS_HOST', '')}`
    : null)

export const redisNamespace: string = getEnv('REDIS_NAMESPACE', 'preview-images')

// Backwards compatibility exports
export const redisHost: string | null = getEnv('REDIS_HOST', null)
export const redisPassword: string | null = getEnv('REDIS_PASSWORD', null)
export const redisUser: string = getEnv('REDIS_USER', 'default')

// ----------------------------------------------------------------------------

export const isServer = typeof window === 'undefined'

// ----------------------------------------------------------------------------
// Helper functions
// ----------------------------------------------------------------------------

function getSiteConfig<T>(key: string, defaultValue: T): T {
  // This will be overridden by site.config.ts
  return defaultValue
}

function getEnv(key: string, defaultValue: string | null): string | null {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] ?? defaultValue
  }
  return defaultValue
}
