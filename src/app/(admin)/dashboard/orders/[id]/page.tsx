import { notFound } from 'next/navigation'
import { getOrderById } from '@/services/order.service'
import { getInvoiceByOrderId } from '@/services/invoice.service'
import { StatusPill } from '@/components/admin/StatusPill'
import { OrderActions } from '@/components/admin/OrderActions'
import { formatNaira } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params
  const order = await getOrderById(id)
  if (!order) notFound()
  const invoice = await getInvoiceByOrderId(id)

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Order
          </p>
          <h1 className="font-display text-3xl text-[var(--color-ink)]">
            {order.id}
          </h1>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          className="bg-[var(--color-card)] p-6"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Customer
          </h2>
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
          {order.notes && (
            <div className="mt-4 pt-4 border-t border-[var(--color-ink)]/10">
              <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Notes
              </p>
              <p className="text-sm text-[var(--color-ink)]">{order.notes}</p>
            </div>
          )}
        </div>

        <div
          className="bg-[var(--color-card)] p-6"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <OrderActions
            orderId={order.id}
            currentStatus={order.status}
            invoice={invoice}
          />
        </div>
      </div>

      <div
        className="bg-[var(--color-card)] p-6"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
          Items
        </h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-sm py-2 border-b border-[var(--color-ink)]/5 last:border-0"
            >
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
          <div className="flex justify-between font-medium pt-3">
            <span className="text-[var(--color-ink)]">Total</span>
            <span className="font-display text-lg text-[var(--color-ink)]">
              {formatNaira(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
