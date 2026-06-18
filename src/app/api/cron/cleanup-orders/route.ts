import { NextRequest, NextResponse } from 'next/server'
import { cancelAbandonedOrders } from '@/services/order.service'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const cancelled = await cancelAbandonedOrders()

    console.log(`[cron] Cancelled ${cancelled} abandoned orders`)

    return NextResponse.json({
      success: true,
      cancelled,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[cron] Cleanup failed:', err)
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}
