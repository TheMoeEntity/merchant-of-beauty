import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({ name: 'storeName', title: 'Store Name', type: 'string' }),
        defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
        defineField({ name: 'contactPhone', title: 'Contact Phone', type: 'string' }),
        defineField({ name: 'address', title: 'Address', type: 'text' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    ],
})