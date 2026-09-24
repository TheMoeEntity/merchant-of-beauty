import Link from 'next/link'
import { getSiteSettings } from '@/sanity/queries'
import { Logo } from '@/components/shop/Logo'
import { SiInstagram, SiFacebook, SiX } from '@icons-pack/react-simple-icons'

export async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="mt-20 border-t border-[var(--color-ink)]/10 bg-[var(--color-gold-light)]/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <Link href="/" className="inline-block mb-3" aria-label="Home">
            <Logo height={64} />
          </Link>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">
            Premium spa, salon & aesthetic equipment. Nationwide delivery across
            Nigeria.
          </p>
          {(settings?.instagram || settings?.twitter || settings?.facebook) && (
            <div className="flex gap-4">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-gold-dark)] transition-colors"
                >
                  <SiInstagram size={18} />
                </a>
              )}
              {settings.twitter && (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-gold-dark)] transition-colors"
                >
                  <SiX size={18} />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-gold-dark)] transition-colors"
                >
                  <SiFacebook size={18} />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-gold-dark)]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-[var(--color-gold-dark)]"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[var(--color-gold-dark)]"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/track"
                className="hover:text-[var(--color-gold-dark)]"
              >
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] mb-4">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            {settings?.contactPhone && (
              <li>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="hover:text-[var(--color-gold-dark)]"
                >
                  {settings.contactPhone}
                </a>
              </li>
            )}
            {settings?.contactEmail && (
              <li>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-[var(--color-gold-dark)]"
                >
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {settings?.whatsapp && (
              <li>
                <Link
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-gold-dark)]"
                >
                  WhatsApp
                </Link>
              </li>
            )}
            {settings?.address && (
              <li>
                <span className="block text-[var(--color-ink)] font-medium">
                  Office
                </span>
                {settings.address}
              </li>
            )}
            {settings?.showroomAddress && (
              <li>
                <span className="block text-[var(--color-ink)] font-medium">
                  Showroom
                </span>
                {settings.showroomAddress}
              </li>
            )}
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
