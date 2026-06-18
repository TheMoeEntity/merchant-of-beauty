import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!SANITY_WEBHOOK_SECRET || secret !== SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()

    const type: string = body._type ?? ''
    const tagMap: Record<string, string[]> = {
      product: ['products'],
      category: ['categories', 'products'],
      heroBanner: ['hero'],
      siteSettings: ['settings'],
    }

    const tags = tagMap[type] ?? ['products']

    for (const tag of tags) {
      revalidateTag(tag, 'max')
    }

    console.log(`Revalidated tags: ${tags.join(', ')} for type: ${type}`)

    return NextResponse.json({ revalidated: true, tags })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
