import type { Metadata } from 'next'
import { getProducts, getCategories } from '@/sanity/queries'
import ProductsClient from '@/components/shop/ProductsClient'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: 'Shop Spa, Salon & Tattoo Equipment',
  description:
    'Browse premium spa, salon and tattoo equipment from Merchant of Beauty. Nationwide delivery across Nigeria.',
  alternates: { canonical: '/products' },
}

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams

  // Fetch everything upfront — filtering happens client-side with animation
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2">
          Our Collection
        </p>
        <h1 className="font-display text-4xl text-[var(--color-ink)] mb-6">
          Shop
        </h1>
      </div>

      <ProductsClient
        products={products}
        categories={categories}
        initialCategory={category}
      />
    </div>
  )
}
