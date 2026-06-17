import Link from 'next/link'
import { getSiteSettings } from '@/sanity/queries'

export async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="mt-20 border-t border-[var(--color-ink)]/10 bg-[var(--color-blush-light)]/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-xl text-[var(--color-plum)]">
            {settings?.storeName ?? 'Merchant of Beauty'}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-brass)]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-[var(--color-brass)]"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--color-brass)]">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]">
            Information
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>Spa Equipment</li>
            <li>Salon Equipment</li>
            <li>Tattoo Equipment</li>
            <li>Delivery Information</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            {settings?.contactPhone && <li>{settings.contactPhone}</li>}
            {settings?.contactEmail && <li>{settings.contactEmail}</li>}
            {settings?.address && <li>{settings.address}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-ink)]/10 px-6 py-5 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()}{' '}
        {settings?.storeName ?? 'Merchant of Beauty'}. All rights reserved.
      </div>
    </footer>
  )
}
