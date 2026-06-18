import Redis from 'ioredis'

// ----------------------------------------------------------------
// Redis singleton
// In Next.js, hot reloading in dev can re-execute module-level
// code repeatedly, creating multiple Redis connections. The global
// pattern prevents that — if an instance already exists on the
// global object, reuse it; otherwise create a new one.
// ----------------------------------------------------------------

declare global {
  var redis: Redis | undefined
}

const redis =
  global.redis ?? new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379')

if (process.env.NODE_ENV !== 'production') {
  global.redis = redis
}

export { redis }
