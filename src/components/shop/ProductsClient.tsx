'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SanityProduct, SanityCategory } from '@/types/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { formatNaira } from '@/lib/utils'

interface Props {
  products: SanityProduct[]
  categories: SanityCategory[]
  initialCategory?: string
}

function AnimatedProductCard({
  product,
  index,
}: {
  product: SanityProduct
  index: number
}) {
  const image = product.images?.[0]
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    // reset then animate in
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px) scale(0.97)'
    const timeout = setTimeout(() => {
      el.style.transition = 'opacity 0.35s ease, transform 0.35s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0) scale(1)'
    }, index * 45) // stagger

    return () => clearTimeout(timeout)
  }, [index, product._id])

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <Link href={`/products/${product.slug.current}`} className="group block">
        <div className="aspect-square bg-[var(--color-gold-light)] overflow-hidden mb-3">
          {image ? (
            <Image
              src={urlFor(image).width(400).height(400).url()}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] text-sm">
              No image
            </div>
          )}
        </div>
        <p className="text-xs text-[var(--color-gold-dark)] uppercase tracking-widest mb-1">
          {product.category.title}
        </p>
        <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-gold-dark)] transition-colors duration-200">
          {product.title}
        </h3>
        <p className="text-sm text-[var(--color-muted)]">
          {formatNaira(product.price)}
        </p>
      </Link>
    </div>
  )
}

export default function ProductsClient({
  products,
  categories,
  initialCategory,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    initialCategory
  )
  const [animating, setAnimating] = useState(false)

  const filtered =
    activeCategory
      ? products.filter((p) => p.category.slug.current === activeCategory)
      : products

  function handleCategoryClick(slug?: string) {
    if (slug === activeCategory) return

    setAnimating(true)
    // tiny pause to let exit start, then swap
    setTimeout(() => {
      setActiveCategory(slug)
      setAnimating(false)
      // keep URL in sync (no reload, just history)
      const url = slug ? `${pathname}?category=${slug}` : pathname
      router.replace(url, { scroll: false })
    }, 180)
  }

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex gap-3 flex-wrap mb-10">
        <button
          onClick={() => handleCategoryClick(undefined)}
          className={`px-4 py-1.5 text-sm border transition-all duration-200 ${
            !activeCategory
              ? 'bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)] scale-[1.03]'
              : 'border-[var(--color-ink)]/20 text-[var(--color-ink)]/60 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] hover:scale-[1.03]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryClick(cat.slug.current)}
            className={`px-4 py-1.5 text-sm border transition-all duration-200 ${
              activeCategory === cat.slug.current
                ? 'bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)] scale-[1.03]'
                : 'border-[var(--color-ink)]/20 text-[var(--color-ink)]/60 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] hover:scale-[1.03]'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{
          transition: 'opacity 0.18s ease',
          opacity: animating ? 0 : 1,
        }}
      >
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-[var(--color-muted)]">No products found.</p>
          </div>
        ) : (
          filtered.map((product, i) => (
            <AnimatedProductCard key={product._id} product={product} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
