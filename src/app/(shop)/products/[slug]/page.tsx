import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/shop/AddToCartButton'
import ProductGallery from '@/components/shop/ProductGallery'
import { getProductBySlug, getProducts } from '@/sanity/queries'
import { formatNaira } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug.current }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-3">
            {product.category.title}
          </p>
          <h1 className="font-display text-4xl text-[var(--color-ink)] mb-4">
            {product.title}
          </h1>
          <p className="text-2xl text-[var(--color-ink)] mb-6">
            {formatNaira(product.price)}
          </p>

          {product.description && (
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          <div className="mb-6">
            {product.inStock ? (
              <span className="text-xs text-[var(--color-success)] uppercase tracking-widest">
                ● In Stock
              </span>
            ) : (
              <span className="text-xs text-[var(--color-status-cancelled)] uppercase tracking-widest">
                ● Out of Stock
              </span>
            )}
          </div>

          {product.inStock && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  )
}
