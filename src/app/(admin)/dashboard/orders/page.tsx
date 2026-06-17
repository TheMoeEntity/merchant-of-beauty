import Link from 'next/link'
import { getOrders } from '@/services/order.service'
import { StatusPill } from '@/components/admin/StatusPill'
import { formatNaira } from '@/lib/utils'
import { OrderStatus } from '@/types/order.types'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

export default async function OrdersListPage({ searchParams }: Props) {
  const { status } = await searchParams
  const allOrders = await getOrders()

  const orders =
    status && status !== 'all'
      ? allOrders.filter((o) => o.status === status)
      : allOrders

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
        Orders
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-6">
        {allOrders.length} total orders
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((filter) => {
          const active = (status ?? 'all') === filter.value
          return (
            <Link
              key={filter.value}
              href={
                filter.value === 'all'
                  ? '/dashboard/orders'
                  : `/dashboard/orders?status=${filter.value}`
              }
              className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                active
                  ? 'bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)]'
                  : 'border-[var(--color-ink)]/20 text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]'
              }`}
            >
              {filter.label}
            </Link>
          )
        })}
      </div>

      <div
        className="bg-[var(--color-card)]"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        {orders.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)] py-12 text-center">
            No orders found.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-ink)]/10 text-left">
                <th className="px-6 py-3 text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Order
                </th>
                <th className="px-6 py-3 text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Date
                </th>
                <th className="px-6 py-3 text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Total
                </th>
                <th className="px-6 py-3 text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[var(--color-ink)]/5 last:border-0 hover:bg-[var(--color-gold-light)]/20 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="font-display text-base text-[var(--color-ink)] hover:text-[var(--color-gold-dark)]"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-ink)]">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {new Date(order.createdAt).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-ink)]">
                    {formatNaira(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
