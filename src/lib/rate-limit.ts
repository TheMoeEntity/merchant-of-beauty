import { redis } from './redis'

interface RateLimitOptions {
  key: string // unique identifier e.g. `checkout:127.0.0.1`
  limit: number // max attempts allowed
  windowMs: number // time window in milliseconds
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetMs: number
}

// ----------------------------------------------------------------
// checkRateLimit
// Uses Redis INCR + EXPIRE to count attempts within a sliding
// window. INCR is atomic — no race conditions even under concurrent
// requests. The key auto-expires after windowMs, resetting the
// count automatically without any cleanup job needed.
// ----------------------------------------------------------------

export async function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.pexpire(key, windowMs)
  }

  const ttlMs = await redis.pttl(key)

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetMs: ttlMs > 0 ? ttlMs : windowMs,
  }
}
