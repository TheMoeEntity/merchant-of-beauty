import { defineField, defineType } from 'sanity'

function tileFields() {
  return [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Shop Now',
    }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
  ]
}

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'leftTop',
      title: 'Left Column — Top',
      type: 'object',
      fields: tileFields(),
    }),
    defineField({
      name: 'leftBottom',
      title: 'Left Column — Bottom',
      type: 'object',
      fields: tileFields(),
    }),
    defineField({
      name: 'center',
      title: 'Center — Tall',
      type: 'object',
      fields: tileFields(),
    }),
    defineField({
      name: 'rightTop',
      title: 'Right Column — Top',
      type: 'object',
      fields: tileFields(),
    }),
    defineField({
      name: 'rightBottom',
      title: 'Right Column — Bottom',
      type: 'object',
      fields: tileFields(),
    }),
  ],
})
