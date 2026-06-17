import { groq } from 'next-sanity'
import { client } from '../lib/client'
import {
  SanityProduct,
  SanityCategory,
  SiteSettings,
  HeroBanner,
} from '@/types/sanity.types'

export async function getProducts(): Promise<SanityProduct[]> {
  return client.fetch(
    groq`*[_type == "product"] | order(_createdAt desc) {
      ...,
      category->{ _id, title, slug }
    }`,
    {},
    { next: { tags: ['products'] } }
  )
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  return client.fetch(
    groq`*[_type == "product" && featured == true][0...6] {
      ...,
      category->{ _id, title, slug }
    }`,
    {},
    { next: { tags: ['products'] } }
  )
}

export async function getProductBySlug(
  slug: string
): Promise<SanityProduct | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      ...,
      category->{ _id, title, slug }
    }`,
    { slug },
    { next: { tags: ['products'] } }
  )
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<SanityProduct[]> {
  return client.fetch(
    groq`*[_type == "product" && category->slug.current == $categorySlug] {
      ...,
      category->{ _id, title, slug }
    }`,
    { categorySlug },
    { next: { tags: ['products'] } }
  )
}

export async function getCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc)`,
    {},
    { next: { tags: ['categories'] } }
  )
}

export async function getHeroBanner(): Promise<HeroBanner | null> {
  return client.fetch(
    groq`*[_type == "heroBanner"][0]{ leftTop, leftBottom, center, rightTop, rightBottom }`,
    {},
    { next: { tags: ['hero'] } }
  )
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    groq`*[_type == "siteSettings"][0] { storeName, contactEmail, contactPhone, address, instagram, twitter, facebook }`,
    {},
    { next: { tags: ['settings'] } }
  )
}
