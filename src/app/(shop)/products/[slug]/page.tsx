import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/shop/AddToCartButton'
import ProductGallery from '@/components/shop/ProductGallery'
import { StarRating } from '@/components/shop/StarRating'
import { ProductReviews } from '@/components/shop/ProductReviews'
import { getProductBySlug, getProducts } from '@/sanity/queries'
import { getRatingSummaryForProduct } from '@/services/review.service'
import { formatNaira } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const description =
    product.description?.slice(0, 160) ||
    `Buy ${product.title} from Merchant of Beauty. Nationwide delivery in Nigeria.`
  const image = product.images[0]
    ? urlFor(product.images[0]).width(1200).height(630).url()
    : undefined

  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.slug.current}` },
    openGraph: {
      title: product.title,
      description,
      type: 'website',
      url: `/products/${product.slug.current}`,
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const ratingSummary = await getRatingSummaryForProduct(product._id)

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
          {ratingSummary.count > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={ratingSummary.average} />
              <span className="text-xs text-[var(--color-muted)]">
                {ratingSummary.average.toFixed(1)} ({ratingSummary.count} review
                {ratingSummary.count === 1 ? '' : 's'})
              </span>
            </div>
          )}
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

      <ProductReviews
        productId={product._id}
        productSlug={product.slug.current}
        productTitle={product.title}
      />
    </div>
  )
}
