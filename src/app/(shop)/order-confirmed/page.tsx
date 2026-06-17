import Link from 'next/link'

interface Props {
  searchParams: Promise<{ orderId?: string }>
}

export default async function OrderConfirmedPage({ searchParams }: Props) {
  const { orderId } = await searchParams

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--color-sage-light)] flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-[var(--color-sage)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="font-display text-4xl text-[var(--color-plum)] mb-3">
        Order Placed!
      </h1>
      <p className="text-[var(--color-muted)] mb-6">
        Thank you for your order. We&#39;ll be in touch shortly to confirm.
      </p>

      {orderId && (
        <div className="bg-[var(--color-blush-light)] px-6 py-4 mb-8 inline-block">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Order ID
          </p>
          <p className="font-display text-2xl text-[var(--color-plum)]">
            {orderId}
          </p>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <Link
          href="/track"
          className="px-6 py-2.5 border border-[var(--color-plum)] text-sm text-[var(--color-plum)] hover:bg-[var(--color-plum)] hover:text-[var(--color-ivory)] transition-colors"
        >
          Track Order
        </Link>
        <Link
          href="/products"
          className="px-6 py-2.5 bg-[var(--color-brass)] text-[var(--color-ivory)] text-sm hover:bg-[var(--color-brass-dark)] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
