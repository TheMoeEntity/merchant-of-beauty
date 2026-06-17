export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityProduct {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  price: number
  category: SanityCategory
  description: string
  images: SanityImage[]
  inStock: boolean
  featured: boolean
}

export interface SanityCategory {
  _id: string
  title: string
  slug: { current: string }
}
export interface SiteSettings {
  storeName: string
  contactEmail: string | null
  contactPhone: string | null
  address: string | null
  instagram: string | null
  twitter: string | null
  facebook: string | null
}

export interface HeroTile {
  image: SanityImage
  label?: string
  ctaText?: string
  ctaLink?: string
}

export interface HeroBanner {
  _id: string
  leftTop: HeroTile
  leftBottom: HeroTile
  center: HeroTile
  rightTop: HeroTile
  rightBottom: HeroTile
}
