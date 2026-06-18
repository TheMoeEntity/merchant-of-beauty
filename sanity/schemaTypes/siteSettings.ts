import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'storeName', title: 'Store Name', type: 'string' }),
    defineField({
      name: 'ceo',
      title: 'CEO / Founder',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Full Name', type: 'string' }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Founder & CEO',
        }),
        defineField({ name: 'bio', title: 'Bio', type: 'text' }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code, no + or spaces. E.g. 2348012345678',
    }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'twitter', title: 'Twitter URL', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
  ],
})
