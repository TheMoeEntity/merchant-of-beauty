import Link from 'next/link'
import { getSiteSettings } from '@/sanity/queries'

interface Props {
  searchParams: Promise<{ orderId?: string; customerName?: string }>
}

export default async function OrderConfirmedPage({ searchParams }: Props) {
  const { orderId, customerName } = await searchParams
  const settings = await getSiteSettings()

  const whatsappMessage = orderId
    ? encodeURIComponent(
        `Hi, I just placed an order on Merchant of Beauty.\n\nOrder ID: ${orderId}${customerName ? `\nName: ${customerName}` : ''}\n\nPlease confirm my order. Thank you!`
      )
    : null

  const whatsappUrl =
    settings?.whatsapp && whatsappMessage
      ? `https://wa.me/${settings.whatsapp}?text=${whatsappMessage}`
      : null

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--color-success-light)] flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-[var(--color-success)]"
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

      <h1 className="font-display text-4xl text-[var(--color-ink)] mb-3">
        Order Placed!
      </h1>
      <p className="text-[var(--color-muted)] mb-6">
        Thank you for your order. Please confirm via WhatsApp so we can process
        it quickly.
      </p>

      {orderId && (
        <div className="bg-[var(--color-gold-light)] px-6 py-4 mb-8 inline-block">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Order ID
          </p>
          <p className="font-display text-2xl text-[var(--color-ink)]">
            {orderId}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 items-center">
        {whatsappUrl && (
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-sm font-medium hover:bg-[#1ebe5d] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirm Order on WhatsApp
          </Link>
        )}

        <div className="flex gap-3 w-full max-w-xs">
          <Link
            href="/track"
            className="flex-1 px-4 py-2.5 border border-[var(--color-ink)] text-sm text-[var(--color-ink)] text-center hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/products"
            className="flex-1 px-4 py-2.5 bg-[var(--color-ink)] text-[var(--color-surface)] text-sm text-center hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
          >
            Shop More
          </Link>
        </div>
      </div>
    </div>
  )
}
