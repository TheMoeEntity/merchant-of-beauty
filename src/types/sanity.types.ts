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
    category: string
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

export interface HeroBanner {
    _id: string
    headline: string
    subtext: string | null
    ctaText: string | null
    ctaLink: string | null
    image: SanityImage | null
}