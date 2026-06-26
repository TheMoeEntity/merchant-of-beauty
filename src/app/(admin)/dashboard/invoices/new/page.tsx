import { getProducts } from '@/sanity/queries'
import { InvoiceBuilder } from '@/components/admin/InvoiceBuilder'

export default async function NewInvoicePage() {
  const products = await getProducts()

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
        New Invoice
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        Select products, fill in customer details, and create the invoice.
      </p>
      <div
        className="bg-[var(--color-card)] p-6"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <InvoiceBuilder products={products} />
      </div>
    </div>
  )
}
