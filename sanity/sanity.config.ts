import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
    name: 'merchant-of-beauty',
    title: 'Merchant of Beauty',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: 'production',
    basePath: '/admin-studio',
    plugins: [structureTool(), visionTool()],
    schema: { types: schemaTypes },
})