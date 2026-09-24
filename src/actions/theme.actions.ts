'use server'

import { z } from 'zod'
import { revalidatePath, updateTag } from 'next/cache'
import { auth } from '@/lib/auth'
import { writeClient } from '@/sanity/lib/write-client'
import { THEME_IDS } from '@/lib/themes'

const ThemeSchema = z.enum(THEME_IDS)

interface ThemeActionResult {
  error: string | null
  success: boolean
}

export async function updateThemeAction(
  themeId: string
): Promise<ThemeActionResult> {
  const session = await auth()
  if (session?.user?.role !== 'owner') {
    return { error: 'Only the owner can change the website theme', success: false }
  }

  const parsed = ThemeSchema.safeParse(themeId)
  if (!parsed.success) {
    return { error: 'Unknown theme', success: false }
  }

  try {
    await writeClient
      .patch('siteSettings')
      .set({ theme: parsed.data })
      .commit()
  } catch (err) {
    console.error('Failed to save theme to Sanity:', err)
    return { error: 'Could not save the theme. Please try again.', success: false }
  }

  updateTag('settings')
  revalidatePath('/', 'layout')

  return { error: null, success: true }
}
