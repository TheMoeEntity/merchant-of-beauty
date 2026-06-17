import { getOrders } from '@/services/order.service'
import { ORDER_STATUS_MAP, formatNaira } from '@/lib/utils'
import { StatusPill } from '@/components/admin/StatusPill'
import Link from 'next/link'
import { OrderStatus } from '@/types/order.types'

export default async function DashboardOverviewPage() {
  const orders = await getOrders()

  const statusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] ?? 0) + 1
      return acc
    },
    {} as Record<OrderStatus, number>
  )

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0)

  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
        Overview
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        Here&#39;s what&apos;s happening with your store.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div
          className="bg-[var(--color-card)] p-5"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Total Orders
          </p>
          <p className="font-display text-3xl text-[var(--color-ink)]">
            {orders.length}
          </p>
        </div>
        <div
          className="bg-[var(--color-card)] p-5"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Revenue
          </p>
          <p className="font-display text-3xl text-[var(--color-ink)]">
            {formatNaira(totalRevenue)}
          </p>
        </div>
        <div
          className="bg-[var(--color-card)] p-5"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Pending
          </p>
          <p className="font-display text-3xl text-[var(--color-ink)]">
            {statusCounts.pending ?? 0}
          </p>
        </div>
        <div
          className="bg-[var(--color-card)] p-5"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Delivered
          </p>
          <p className="font-display text-3xl text-[var(--color-ink)]">
            {statusCounts.delivered ?? 0}
          </p>
        </div>
      </div>

      <div
        className="bg-[var(--color-card)] p-6"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]">
            Recent Orders
          </h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-[var(--color-gold-dark)] hover:underline"
          >
            View All →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)] py-8 text-center">
            No orders yet.
          </p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between py-3 border-b border-[var(--color-ink)]/5 last:border-0 hover:bg-[var(--color-gold-light)]/30 -mx-2 px-2 rounded transition-colors"
              >
                <div>
                  <p className="font-display text-base text-[var(--color-ink)]">
                    {order.id}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {order.customerName}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--color-ink)]">
                    {formatNaira(order.totalAmount)}
                  </span>
                  <StatusPill status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
