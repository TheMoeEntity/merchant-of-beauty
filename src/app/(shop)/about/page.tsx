import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings } from '@/sanity/queries'
import { urlFor } from '@/sanity/lib/image'
import { SiInstagram, SiFacebook, SiX } from '@icons-pack/react-simple-icons'

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-3">
          About Us
        </p>
        <h1 className="font-display text-5xl text-[var(--color-ink)] mb-6">
          {settings?.storeName ?? 'Merchant of Beauty'}
        </h1>
        <p className="text-base text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
          Merchant of Beauty is a leading supplier of premium spa, salon,
          skincare, and aesthetic equipment in Nigeria. We help beauty
          professionals, entrepreneurs, and wellness brands access quality
          equipment, innovative technology, and reliable business solutions to
          grow their businesses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4">
            Our Mission
          </h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            With a focus on quality, authenticity, and customer satisfaction, we
            provide trusted products, expert guidance, and nationwide delivery
            to support your success.
          </p>
          <p className="font-display text-lg text-[var(--color-gold-dark)] mt-6">
            Empowering Beauty Businesses. Delivering Excellence. ✨
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4">
            What We Offer
          </h2>
          <ul className="space-y-3">
            {[
              'Spa Equipment',
              'Salon Furniture',
              'Tattoo accessories',
              'Beauty Business Solutions',
              'Nationwide Delivery',
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

      {settings?.ceo && (
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2 text-center">
            Leadership
          </p>
          <h2 className="font-display text-3xl text-[var(--color-ink)] mb-10 text-center">
            Meet the Founder
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-10 bg-[var(--color-gold-light)]/10 p-8">
            {settings.ceo.photo && (
              <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={urlFor(settings.ceo.photo).width(160).height(160).url()}
                  alt={settings.ceo.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div>
              <h3 className="font-display text-2xl text-[var(--color-ink)] mb-1">
                {settings.ceo.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[var(--color-gold-dark)] mb-4">
                {settings.ceo.title}
              </p>
              {settings.ceo.bio && (
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {settings.ceo.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="border-t-2 border-[var(--color-gold)] bg-[var(--color-card)] px-10 py-12 text-center mb-12"
        // style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <h2 className="font-display text-3xl text-[var(--color-ink)] mb-4">
          Get In Touch
        </h2>
        <p className="text-[var(--color-muted)] text-sm mb-6">
          Have questions about a product or need a custom order? Reach out to
          us.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          {settings?.contactEmail && (
            <a
              href={`mailto:${settings.contactEmail}`}
              className="text-sm text-[var(--color-ink)] hover:text-[var(--color-gold-dark)] transition-colors"
            >
              {settings.contactEmail}
            </a>
          )}
          {settings?.contactPhone && (
            <a
              href={`tel:${settings.contactPhone}`}
              className="text-sm text-[var(--color-ink)] hover:text-[var(--color-gold-dark)] transition-colors"
            >
              {settings.contactPhone}
            </a>
          )}
          {settings?.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-ink)] hover:text-[var(--color-gold-dark)] transition-colors"
            >
              WhatsApp Us
            </a>
          )}
        </div>
      </div>

      {(settings?.instagram || settings?.twitter || settings?.facebook) && (
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
            Follow Us
          </p>
          <div className="flex justify-center gap-6">
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors"
              >
                <SiInstagram size={22} />
              </a>
            )}
            {settings.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors"
              >
                <SiX size={22} />
              </a>
            )}
            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors"
              >
                <SiFacebook size={22} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
