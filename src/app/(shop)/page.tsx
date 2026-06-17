import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ProductCard from '@/components/shop/ProductCard'
import { getFeaturedProducts, getHeroBanner } from '@/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

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
        className={`bg-[var(--color-blush-light)] ${tall ? 'h-full' : 'aspect-[4/3]'}`}
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
          className="absolute bottom-4 left-4 bg-[var(--color-card)] text-[var(--color-ink)] text-xs font-medium px-4 py-2 hover:bg-[var(--color-brass)] hover:text-[var(--color-surface)] transition-colors"
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
    <section className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-3 gap-4">
      <div className="grid grid-rows-2 gap-4">
        <HeroTile tile={hero.leftTop} priority />
        <HeroTile tile={hero.leftBottom} />
      </div>

      <HeroTile tile={hero.center} tall priority />

      <div className="grid grid-rows-2 gap-4">
        <HeroTile tile={hero.rightTop} priority />
        <HeroTile tile={hero.rightBottom} />
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
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brass)] mb-2">
            Handpicked
          </p>
          <h2 className="font-display text-3xl text-[var(--color-plum)]">
            Featured Products
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm text-[var(--color-brass)] hover:text-[var(--color-brass-dark)] transition-colors"
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
        <div className="aspect-[4/3] bg-[var(--color-blush-light)] animate-pulse" />
        <div className="aspect-[4/3] bg-[var(--color-blush-light)] animate-pulse" />
      </div>
      <div className="bg-[var(--color-blush-light)] animate-pulse" />
      <div className="grid grid-rows-2 gap-4">
        <div className="aspect-[4/3] bg-[var(--color-blush-light)] animate-pulse" />
        <div className="aspect-[4/3] bg-[var(--color-blush-light)] animate-pulse" />
      </div>
    </section>
  )
}

function FeaturedSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="h-8 w-48 bg-[var(--color-plum)]/10 rounded animate-pulse mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-[var(--color-plum)]/10 rounded animate-pulse" />
            <div className="h-4 bg-[var(--color-plum)]/10 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-[var(--color-plum)]/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
