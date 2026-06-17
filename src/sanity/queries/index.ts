import { groq } from 'next-sanity'
import { client } from '../lib/client'
import { SanityProduct, SanityCategory, SiteSettings, HeroBanner } from '@/types/sanity.types'

export async function getProducts(): Promise<SanityProduct[]> {
    return client.fetch(groq`*[_type == "product"] | order(_createdAt desc)`, {}, { next: { tags: ['products'] } })
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
    return client.fetch(groq`*[_type == "product" && featured == true][0...6]`, {}, { next: { tags: ['products'] } })
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
    return client.fetch(groq`*[_type == "product" && slug.current == $slug][0]`, { slug }, { next: { tags: ['products'] } })
}

export async function getProductsByCategory(category: string): Promise<SanityProduct[]> {
    return client.fetch(groq`*[_type == "product" && category == $category]`, { category }, { next: { tags: ['products'] } })
}

export async function getCategories(): Promise<SanityCategory[]> {
    return client.fetch(groq`*[_type == "category"] | order(title asc)`, {}, { next: { tags: ['categories'] } })
}

export async function getHeroBanner(): Promise<HeroBanner | null> {
    return client.fetch(groq`*[_type == "heroBanner"][0]`, {}, { next: { tags: ['hero'] } })
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
    return client.fetch(
        groq`*[_type == "siteSettings"][0] { storeName, contactEmail, contactPhone, address, instagram, twitter, facebook }`,
        {},
        { next: { tags: ['settings'] } }
    )
}