'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function loginAction(
  prevState: { error: string | null },
  formData: FormData
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    })
    return { error: null }
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: 'Invalid email or password' }
    }
    throw err
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/login' })
}
