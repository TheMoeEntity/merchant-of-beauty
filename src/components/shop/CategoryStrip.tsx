import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '@/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

export async function CategoryStrip() {
  const categories = await getCategories()

  if (!categories.length) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2 text-center">
        Shop by Category
      </p>
      <h2 className="font-display text-3xl text-[var(--color-ink)] mb-10 text-center">
        Find What You Need
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/products?category=${cat.slug.current}`}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--color-gold-light)] flex items-center justify-center overflow-hidden group-hover:bg-[var(--color-gold)] transition-colors">
              {cat.icon ? (
                <Image
                  src={urlFor(cat.icon).width(40).height(40).url()}
                  alt={cat.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <span className="text-[var(--color-gold-dark)] text-xl font-display">
                  {cat.title.charAt(0)}
                </span>
              )}
            </div>
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink)] group-hover:text-[var(--color-gold-dark)] transition-colors">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
