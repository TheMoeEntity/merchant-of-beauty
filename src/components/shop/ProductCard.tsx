import Link from 'next/link'
import Image from 'next/image'
import { SanityProduct } from '@/types/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { formatNaira } from '@/lib/utils'

interface Props {
  product: SanityProduct
}

export default function ProductCard({ product }: Props) {
  const image = product.images?.[0]

  return (
    <Link href={`/products/${product.slug.current}`} className="group block">
      <div className="aspect-square bg-[var(--color-ivory)] overflow-hidden mb-3">
        {image ? (
          <Image
            src={urlFor(image).width(400).height(400).url()}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-plum)]/30 text-sm">
            No image
          </div>
        )}
      </div>
      <p className="text-xs text-[var(--color-brass)] uppercase tracking-widest mb-1">
        {product.category.title}
      </p>
      <h3 className="text-sm font-medium text-[var(--color-plum)] mb-1 group-hover:text-[var(--color-brass)] transition-colors">
        {product.title}
      </h3>
      <p className="text-sm text-[var(--color-plum)]/70">
        {formatNaira(product.price)}
      </p>
    </Link>
  )
}
