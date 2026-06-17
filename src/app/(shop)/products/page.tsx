import { Suspense } from 'react'
import ProductCard from '@/components/shop/ProductCard'
import { getProducts, getCategories } from '@/sanity/queries'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ category?: string }>
}

async function ProductGrid({ category }: { category?: string }) {
  const products = category
    ? await import('@/sanity/queries').then((m) =>
        m.getProductsByCategory(category)
      )
    : await getProducts()

  if (!products.length) {
    return (
      <div className="col-span-full text-center py-20">
        <p className="text-[var(--color-muted)]">No products found.</p>
      </div>
    )
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  )
}

async function CategoryFilter({ active }: { active?: string }) {
  const categories = await getCategories()

  return (
    <div className="flex gap-3 flex-wrap">
      <Link
        href="/products"
        className={`px-4 py-1.5 text-sm border transition-colors ${
          !active
            ? 'bg-[var(--color-plum)] text-[var(--color-ivory)] border-[var(--color-plum)]'
            : 'border-[var(--color-plum)]/20 text-[var(--color-plum)]/60 hover:border-[var(--color-plum)] hover:text-[var(--color-plum)]'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <a
          key={cat._id}
          href={`/products?category=${cat.slug.current}`}
          className={`px-4 py-1.5 text-sm border transition-colors ${
            active === cat.slug.current
              ? 'bg-[var(--color-plum)] text-[var(--color-ivory)] border-[var(--color-plum)]'
              : 'border-[var(--color-plum)]/20 text-[var(--color-plum)]/60 hover:border-[var(--color-plum)] hover:text-[var(--color-plum)]'
          }`}
        >
          {cat.title}
        </a>
      ))}
    </div>
  )
}

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brass)] mb-2">
          Our Collection
        </p>
        <h1 className="font-display text-4xl text-[var(--color-plum)] mb-6">
          Shop
        </h1>
        <Suspense
          fallback={
            <div className="h-8 animate-pulse bg-[var(--color-plum)]/10 rounded w-64" />
          }
        >
          <CategoryFilter active={category} />
        </Suspense>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense
          fallback={
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square bg-[var(--color-plum)]/10 animate-pulse" />
                  <div className="h-4 bg-[var(--color-plum)]/10 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-[var(--color-plum)]/10 animate-pulse rounded" />
                </div>
              ))}
            </>
          }
        >
          <ProductGrid category={category} />
        </Suspense>
      </div>
    </div>
  )
}
