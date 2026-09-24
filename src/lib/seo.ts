import { LOGO_SRC, SITE_URL } from '@/lib/site'
import { SanityProduct, SiteSettings } from '@/types/sanity.types'
import { ProductRatingSummary, Review } from '@/types/review.types'
import { BreadcrumbItem, JsonLdObject, JsonLdValue } from '@/types/seo.types'

const CONTEXT = 'https://schema.org' as const
const MAX_REVIEWS_IN_MARKUP = 10

function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '' : path}`
}

function postalAddress(streetAddress: string): JsonLdValue {
  return {
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  }
}

export function buildOrganizationJsonLd(
  settings: SiteSettings | null
): JsonLdObject[] {
  const name = settings?.storeName ?? 'Merchant of Beauty'
  const sameAs = [settings?.instagram, settings?.twitter, settings?.facebook].filter(
    (url): url is string => Boolean(url)
  )

  const store: JsonLdObject = {
    '@context': CONTEXT,
    '@type': 'Store',
    '@id': `${SITE_URL}/#organization`,
    name,
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_SRC}`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      'Supplier of premium spa, salon, skincare and tattoo equipment in Nigeria, with nationwide delivery.',
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    ...(settings?.contactPhone && { telephone: settings.contactPhone }),
    ...(settings?.contactEmail && { email: settings.contactEmail }),
    ...(settings?.address && { address: postalAddress(settings.address) }),
    ...(settings?.showroomAddress && {
      location: {
        '@type': 'Place',
        name: `${name} Showroom`,
        address: postalAddress(settings.showroomAddress),
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  }

  const website: JsonLdObject = {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }

  return [store, website]
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

interface ProductJsonLdInput {
  product: SanityProduct
  imageUrls: string[]
  summary: ProductRatingSummary
  reviews: Review[]
}

export function buildProductJsonLd({
  product,
  imageUrls,
  summary,
  reviews,
}: ProductJsonLdInput): JsonLdObject {
  const url = absoluteUrl(`/products/${product.slug.current}`)

  return {
    '@context': CONTEXT,
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.title,
    url,
    sku: product._id,
    category: product.category.title,
    ...(product.description && { description: product.description }),
    ...(imageUrls.length > 0 && { image: imageUrls }),
    brand: { '@type': 'Brand', name: 'Merchant of Beauty' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'NGN',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    ...(summary.count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Number(summary.average.toFixed(1)),
        reviewCount: summary.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.slice(0, MAX_REVIEWS_IN_MARKUP).map((review) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: review.customerName },
        datePublished: new Date(review.createdAt).toISOString().slice(0, 10),
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        ...(review.comment && { reviewBody: review.comment }),
      })),
    }),
  }
}
