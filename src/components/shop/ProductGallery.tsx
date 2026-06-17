'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SanityImage } from '@/types/sanity.types'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  images: SanityImage[]
  title: string
}

export default function ProductGallery({ images, title }: Props) {
  const [active, setActive] = useState(0)

  if (!images?.length) {
    return (
      <div className="aspect-square bg-[var(--color-gold-light)] flex items-center justify-center text-[var(--color-muted)]">
        No images
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square overflow-hidden bg-[var(--color-gold-light)]">
        <Image
          src={urlFor(images[active]).width(600).height(600).url()}
          alt={title}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
                i === active
                  ? 'border-[var(--color-gold)]'
                  : 'border-transparent'
              }`}
            >
              <Image
                src={urlFor(img).width(80).height(80).url()}
                alt={`${title} ${i + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
