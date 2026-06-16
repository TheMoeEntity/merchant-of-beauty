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