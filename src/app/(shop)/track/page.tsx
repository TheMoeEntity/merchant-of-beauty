import type { Metadata } from 'next'
import { getOrderById } from '@/services/order.service'
import { formatNaira } from '@/lib/utils'
import { RefreshButton } from '@/components/shop/RefreshButton'

interface Props {
  searchParams: Promise<{ orderId?: string }>
}

const STEPS = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
] as const

function StatusTimeline({ status }: { status: string }) {
  const currentIndex = STEPS.indexOf(status as (typeof STEPS)[number])

  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                i <= currentIndex
                  ? 'bg-[var(--color-ink)] text-[var(--color-surface)]'
                  : 'bg-[var(--color-ink)]/10 text-[var(--color-muted)]'
              }`}
            >
              {i < currentIndex ? '✓' : i + 1}
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-1 capitalize hidden sm:block">
              {step}
            </p>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-1 transition-colors ${
                i < currentIndex
                  ? 'bg-[var(--color-ink)]'
                  : 'bg-[var(--color-ink)]/10'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

async function OrderDetails({ orderId }: { orderId: string }) {
  const order = await getOrderById(orderId)

  if (!order) {
    return (
      <div className="text-center py-10">
        <p className="text-[var(--color-muted)]">
          No order found with that ID.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Order
          </p>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">
            {order.id}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Placed
          </p>
          <p className="text-sm text-[var(--color-ink)]">
            {new Date(order.createdAt).toLocaleDateString('en-NG', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <RefreshButton />
      </div>
      {order.status !== 'cancelled' && <StatusTimeline status={order.status} />}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div
          className="bg-[var(--color-card)] p-6"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <h3 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Customer
          </h3>
          <p className="text-sm font-medium text-[var(--color-ink)] mb-1">
            {order.customerName}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            {order.customerEmail}
          </p>
          {order.customerPhone && (
            <p className="text-sm text-[var(--color-muted)]">
              {order.customerPhone}
            </p>
          )}
          {order.customerAddress && (
            <p className="text-sm text-[var(--color-muted)] mt-2">
              {order.customerAddress}
            </p>
          )}
        </div>

        <div
          className="bg-[var(--color-card)] p-6"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <h3 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Items
          </h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[var(--color-ink)]">
                  {item.productTitle}{' '}
                  <span className="text-[var(--color-muted)]">
                    × {item.quantity}
                  </span>
                </span>
                <span className="text-[var(--color-ink)]">
                  {formatNaira(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-[var(--color-ink)]/10 pt-3 flex justify-between font-medium">
              <span className="text-[var(--color-ink)]">Total</span>
              <span className="font-display text-lg text-[var(--color-ink)]">
                {formatNaira(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Track Your Order',
  robots: { index: false, follow: false },
}

export default async function TrackPage({ searchParams }: Props) {
  const { orderId } = await searchParams

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2">
          Track
        </p>
        <h1 className="font-display text-4xl text-[var(--color-ink)]">
          Your Order
        </h1>
      </div>

      {!orderId ? (
        <form className="flex gap-3 mb-12">
          <input
            name="orderId"
            placeholder="Enter your Order ID e.g. ORD-ABC123"
            className="flex-1 border border-[var(--color-ink)]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
          <button
            type="submit"
            className="bg-[var(--color-ink)] text-[var(--color-surface)] px-6 py-2.5 text-sm hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
          >
            Track
          </button>
        </form>
      ) : (
        <OrderDetails orderId={orderId} />
      )}
    </div>
  )
}
