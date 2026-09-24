import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const CATEGORIES = [
  { title: 'Spa Equipment', slug: 'spa-equipment' },
  { title: 'Salon Equipment', slug: 'salon-equipment' },
  { title: 'Tattoo Equipment', slug: 'tattoo-equipment' },
]

const PRODUCTS = [
  {
    title: 'Professional Tattoo Machine Kit',
    slug: 'tattoo-machine-kit',
    price: 85000,
    category: 'tattoo-equipment',
    description:
      'A complete rotary tattoo machine kit built for precision linework and consistent shading, trusted by working studios.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80',
  },
  {
    title: 'Back & Neck Massage Chair Pad',
    slug: 'massage-chair-pad',
    price: 65000,
    category: 'spa-equipment',
    description:
      'Heated shiatsu massage pad with adjustable intensity, designed for in-studio relaxation treatments.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  },
  {
    title: 'Hydraulic Salon Styling Chair',
    slug: 'salon-styling-chair',
    price: 120000,
    category: 'salon-equipment',
    description:
      'Sturdy hydraulic styling chair with 360° swivel and adjustable height, built for all-day professional use.',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
  },
  {
    title: 'Facial Steamer Pro',
    slug: 'facial-steamer-pro',
    price: 45000,
    category: 'spa-equipment',
    description:
      'Ozone facial steamer with precise temperature control for deep pore cleansing treatments.',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  },
  {
    title: 'Tattoo Ink Set — 12 Colors',
    slug: 'tattoo-ink-set',
    price: 32000,
    category: 'tattoo-equipment',
    description:
      'Vivid, long-lasting pigment set formulated for professional tattoo artists.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80',
  },
  {
    title: 'Salon Sink with Shampoo Bowl',
    slug: 'salon-sink-bowl',
    price: 95000,
    category: 'salon-equipment',
    description:
      'Ceramic shampoo bowl with adjustable neck rest and sprayer, built for client comfort.',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
  },
  {
    title: 'LED Facial Light Therapy Mask',
    slug: 'led-facial-mask',
    price: 38000,
    category: 'spa-equipment',
    description:
      'Multi-wavelength LED mask for skin rejuvenation treatments, a popular spa add-on service tool.',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
  },
  {
    title: 'Tattoo Sterilizer Autoclave',
    slug: 'tattoo-autoclave',
    price: 150000,
    category: 'tattoo-equipment',
    description:
      'Medical-grade autoclave for sterilizing tattoo equipment between clients, essential for studio compliance.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
  },
]

async function uploadImageFromUrl(url: string, filename: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, { filename })
  return asset._id
}

async function seedCategories() {
  console.log('🌱 Seeding categories...')
  const created: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    const doc = await client.createIfNotExists({
      _id: `category-${cat.slug}`,
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
    })
    created[cat.slug] = doc._id
    console.log(`  ✓ ${cat.title}`)
  }

  return created
}

async function seedProducts(categoryMap: Record<string, string>) {
  console.log(
    '🌱 Seeding products (this uploads real image assets, may take a minute)...'
  )

  for (const product of PRODUCTS) {
    console.log(`  ⬆ Uploading image for "${product.title}"...`)
    const assetId = await uploadImageFromUrl(
      product.image,
      `${product.slug}.jpg`
    )

    await client.createIfNotExists({
      _id: `product-${product.slug}`,
      _type: 'product',
      title: product.title,
      slug: { _type: 'slug', current: product.slug },
      price: product.price,
      category: { _type: 'reference', _ref: categoryMap[product.category] },
      description: product.description,
      inStock: true,
      featured: product.featured,
      images: [
        {
          _type: 'image',
          _key: `${product.slug}-img-0`,
          asset: { _type: 'reference', _ref: assetId },
        },
      ],
    })
    console.log(`  ✓ ${product.title}`)
  }
}

async function seedSiteSettings() {
  console.log('🌱 Seeding site settings...')
  await client.createIfNotExists({
    _id: 'siteSettings',
    _type: 'siteSettings',
    storeName: 'Merchant of Beauty',
    contactEmail: 'hello@merchantofbeauty.com',
    contactPhone: '+234 800 000 0000',
    address: 'A5 Plateau Plaza, Trade Fair Complex, Lagos',
    showroomAddress:
      'Nze Odera Plaza, Sea Breeze, beside Polystar Building, Trade Fair Complex, Lagos',
  })
  console.log('  ✓ Site settings')
}

async function seed() {
  const categoryMap = await seedCategories()
  await seedProducts(categoryMap)
  await seedSiteSettings()
  console.log('✅ Seed complete')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
