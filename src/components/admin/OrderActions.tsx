'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  updateOrderStatusAction,
  generateInvoiceAction,
} from '@/actions/admin.actions'
import { OrderStatus } from '@/types/order.types'
import { InvoiceData } from '@/types/invoice.types'
import Link from 'next/link'

const STATUS_OPTIONS: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

interface Props {
  orderId: string
  currentStatus: OrderStatus
  invoice: InvoiceData | null
}

const statusInitial = { error: null, success: false }
const invoiceInitial = { error: null, success: false }

export function OrderActions({ orderId, currentStatus, invoice }: Props) {
  const [statusState, statusAction, statusPending] = useActionState(
    updateOrderStatusAction,
    statusInitial
  )
  const [invoiceState, invoiceAction, invoicePending] = useActionState(
    generateInvoiceAction,
    invoiceInitial
  )

  useEffect(() => {
    if (statusState.success) toast.success('Order status updated')
    if (statusState.error) toast.error(statusState.error)
  }, [statusState])

  useEffect(() => {
    if (invoiceState.success) toast.success('Invoice generated successfully')
    if (invoiceState.error) toast.error(invoiceState.error)
  }, [invoiceState])

  return (
    <div>
      <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
        Update Status
      </h2>
      <form action={statusAction} className="space-y-3">
        <input type="hidden" name="orderId" value={orderId} />
        <select
          key={currentStatus}
          name="status"
          defaultValue={currentStatus}
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={statusPending}
          className="w-full bg-[var(--color-ink)] text-[var(--color-surface)] py-2.5 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
        >
          {statusPending ? 'Updating...' : 'Update Status'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-[var(--color-ink)]/10">
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
          Invoice
        </h2>
        {invoice ? (
          <div>
            <p className="text-sm text-[var(--color-ink)] mb-3">
              Invoice <span className="font-display">{invoice.id}</span>{' '}
              generated on{' '}
              {new Date(invoice.issuedAt).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <Link
              href={`/api/invoices/${orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[var(--color-ink)] text-[var(--color-ink)] px-4 py-2 text-sm hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-colors"
            >
              View Invoice PDF
            </Link>
          </div>
        ) : (
          <form action={invoiceAction}>
            <input type="hidden" name="orderId" value={orderId} />
            <button
              type="submit"
              disabled={invoicePending}
              className="w-full border border-[var(--color-ink)] text-[var(--color-ink)] py-2.5 text-sm font-medium hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-colors disabled:opacity-50"
            >
              {invoicePending ? 'Generating...' : 'Generate Invoice'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
