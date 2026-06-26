import Link from 'next/link'
import { getStandaloneInvoices } from '@/services/standalone-invoice.service'
import { formatNaira } from '@/lib/utils'

export default async function InvoicesListPage() {
  const invoices = await getStandaloneInvoices()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
            Invoices
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {invoices.length} standalone invoices
          </p>
        </div>
        <Link
          href="/dashboard/invoices/new"
          className="bg-[var(--color-ink)] text-[var(--color-surface)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
        >
          + New Invoice
        </Link>
      </div>

      <div
        className="bg-[var(--color-card)]"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        {invoices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--color-muted)] text-sm mb-4">
              No invoices yet.
            </p>
            <Link
              href="/dashboard/invoices/new"
              className="text-sm text-[var(--color-gold-dark)] hover:underline"
            >
              Create your first invoice →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-ink)]/10 text-left">
                <th className="px-6 py-3 text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Invoice
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
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-[var(--color-ink)]/5 last:border-0 hover:bg-[var(--color-gold-light)]/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/invoices/${invoice.id}`}
                      className="font-display text-base text-[var(--color-ink)] hover:text-[var(--color-gold-dark)]"
                    >
                      {invoice.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-ink)]">
                    {invoice.customerName}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {new Date(invoice.issuedAt).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-ink)]">
                    {formatNaira(invoice.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs uppercase tracking-wider font-medium ${
                        invoice.status === 'sent'
                          ? 'text-[var(--color-success)]'
                          : 'text-[var(--color-muted)]'
                      }`}
                    >
                      {invoice.status}
                    </span>
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
