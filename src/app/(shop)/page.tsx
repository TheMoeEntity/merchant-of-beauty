import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ProductCard from '@/components/shop/ProductCard'
import { getFeaturedProducts, getHeroBanner } from '@/sanity/queries'
import { urlFor } from '@/sanity/lib/image'
import { getProducts } from '@/sanity/queries'
import { CategoryStrip } from '@/components/shop/CategoryStrip'
import { JsonLd } from '@/components/shop/JsonLd'
import { getSiteSettings } from '@/sanity/queries'
import { buildOrganizationJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

function HeroTile({
  tile,
  tall = false,
  priority = false,
}: {
  tile?: import('@/types/sanity.types').HeroTile
  tall?: boolean
  priority?: boolean
}) {
  if (!tile?.image)
    return (
      <div
        className={`bg-[var(--color-gold-light)] ${tall ? 'h-full' : 'aspect-[4/3]'}`}
      />
    )

  return (
    <div
      className={`relative overflow-hidden group ${tall ? 'h-full' : 'aspect-[4/3]'}`}
    >
      <Image
        src={urlFor(tile.image)
          .width(tall ? 700 : 500)
          .height(tall ? 1000 : 375)
          .url()}
        alt={tile.label ?? 'Hero'}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
      />
      {tile.label && (
        <span className="absolute top-3 left-3 bg-[var(--color-card)] text-[var(--color-ink)] text-xs px-3 py-1 uppercase tracking-wide">
          {tile.label}
        </span>
      )}
      {tile.ctaText && (
        <Link
          href={tile.ctaLink ?? '/products'}
          className="absolute bottom-4 left-4 bg-[var(--color-card)] text-[var(--color-ink)] text-xs font-medium px-4 py-1 md:py-2 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
        >
          {tile.ctaText}
        </Link>
      )}
    </div>
  )
}

async function HeroSection() {
  const hero = await getHeroBanner()

  if (!hero) return null

  return (
    <section className="max-w-7xl mx-auto pt-6 grid grid-cols-3 gap-2 md:gap-4 bg-[var(--color-hero-bg,transparent)]">
      <div className="grid grid-rows-2 gap-1 md:gap-4">
        <HeroTile tile={hero.leftTop} priority />
        <HeroTile tile={hero.leftBottom} />
      </div>

      <HeroTile tile={hero.center} tall priority />

      <div className="grid grid-rows-2 gap-1 md:gap-4">
        <HeroTile tile={hero.rightTop} priority />
        <HeroTile tile={hero.rightBottom} />
      </div>
    </section>
  )
}

async function NewArrivals() {
  const products = (await getProducts()).slice(0, 8)

  if (!products.length) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2">
            Just In
          </p>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">
            New Arrivals
          </h2>
        </div>
        <Link
          href="/products"
          className="rounded-full border border-[var(--color-ink)] px-5 py-2 text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-colors"
        >
          All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}
async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  if (!products.length) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2">
            Handpicked
          </p>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">
            Featured Products
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm text-[var(--color-gold-dark)] hover:text-[var(--color-ink)] transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

function HeroSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-3 gap-4">
      <div className="grid grid-rows-2 gap-4">
        <div className="aspect-[4/3] bg-[var(--color-gold-light)] animate-pulse" />
        <div className="aspect-[4/3] bg-[var(--color-gold-light)] animate-pulse" />
      </div>
      <div className="bg-[var(--color-gold-light)] animate-pulse" />
      <div className="grid grid-rows-2 gap-4">
        <div className="aspect-[4/3] bg-[var(--color-gold-light)] animate-pulse" />
        <div className="aspect-[4/3] bg-[var(--color-gold-light)] animate-pulse" />
      </div>
    </section>
  )
}

function FeaturedSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="h-8 w-48 bg-[var(--color-ink)]/10 rounded animate-pulse mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-[var(--color-ink)]/10 rounded animate-pulse" />
            <div className="h-4 bg-[var(--color-ink)]/10 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-[var(--color-ink)]/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default async function HomePage() {
  const settings = await getSiteSettings()

  return (
    <>
      <JsonLd data={buildOrganizationJsonLd(settings)} />
      <h1 className="sr-only">
        Merchant of Beauty: Spa, Salon &amp; Tattoo Equipment in Nigeria
      </h1>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <CategoryStrip />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<FeaturedSkeleton />}>
        <NewArrivals />
      </Suspense>
    </>
  )
}
