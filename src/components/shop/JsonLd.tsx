import { JsonLdObject } from '@/types/seo.types'

// "<" is escaped so user-supplied text (e.g. a review) can never close the
// script tag and inject markup.
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
