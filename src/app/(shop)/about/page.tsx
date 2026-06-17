import { getSiteSettings } from '@/sanity/queries'
import Link from 'next/link'

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-3">
          Our Story
        </p>
        <h1 className="font-display text-5xl text-[var(--color-ink)]">
          {settings?.storeName ?? 'Merchant of Beauty'}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4">
            Who We Are
          </h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            We are a dedicated supplier of professional beauty equipment for
            spa, salon, and tattoo businesses across Nigeria. Our mission is to
            bring world-class tools to the modern beauty professional.
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Whether&apos;sre setting up a new studio or upgrading your existing
            setup, we stock only the equipment that meets professional standards
            — because your clients deserve the best.
          </p>
        </div>

        <div className="">
          <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4">
            What We Offer
          </h2>
          <ul className="space-y-3">
            {[
              'Spa Equipment',
              'Salon Equipment',
              'Tattoo Equipment',
              'Nationwide Delivery',
              'Invoice & Documentation',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-[var(--color-muted)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(settings?.contactEmail || settings?.contactPhone) && (
        <div className="bg-[var(--color-ink)] text-[var(--color-surface)] px-10 py-12 text-center">
          <h2 className="font-display text-3xl mb-4">Get In Touch</h2>
          <p className="text-[var(--color-surface)]/70 text-sm mb-6">
            Have questions about a product or need a custom order? Reach out to
            us.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            {settings?.contactEmail && (
              <Link
                href={`mailto:${settings.contactEmail}`}
                className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] transition-colors"
              >
                {settings.contactEmail}
              </Link>
            )}
            {settings?.contactPhone && (
              <Link
                href={`tel:${settings.contactPhone}`}
                className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] transition-colors"
              >
                {settings.contactPhone}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
