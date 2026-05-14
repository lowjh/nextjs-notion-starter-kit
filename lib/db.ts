import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'

import { isRedisEnabled, redisNamespace, redisUrl } from './config'

let db: Keyv
if (isRedisEnabled) {
  // 优先使用 KV_URL (Vercel KV)，否则使用 redisUrl
  const connectionUrl = process.env.KV_URL || redisUrl
  if (connectionUrl) {
    const keyvRedis = new KeyvRedis(connectionUrl)
    db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
  } else {
    console.warn('Redis enabled but no connection URL found')
    db = new Keyv()
  }
} else {
  db = new Keyv()
}

export { db }
