export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue }

export interface JsonLdObject {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: JsonLdValue
}

export interface BreadcrumbItem {
  name: string
  path: string
}
