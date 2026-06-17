import { defineField, defineType } from 'sanity'

export const heroBanner = defineType({
    name: 'heroBanner',
    title: 'Hero Banner',
    type: 'document',
    fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    ],
})