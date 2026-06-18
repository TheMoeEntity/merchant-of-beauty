'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { createUser, deleteUser } from '@/services/user.service'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
})

export async function changePasswordAction(
  prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  const session = await auth()
  if (!session?.user) {
    return { error: 'Not authenticated', success: false }
  }

  const parsed = ChangePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false }
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  if (!user) {
    return { error: 'User not found', success: false }
  }

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.password)
  if (!valid) {
    return { error: 'Current password is incorrect', success: false }
  }

  const newHash = await bcrypt.hash(parsed.data.newPassword, 12)
  await db
    .update(users)
    .set({ password: newHash })
    .where(eq(users.id, session.user.id))

  return { error: null, success: true }
}

const CreateStaffSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// ----------------------------------------------------------------
// Defense in depth: even though the staff page UI only renders
// the "create/delete" controls for owners, that's just hiding a
// button — it does nothing to stop someone from crafting a raw
// POST request to this action directly. The real authorization
// check has to happen here, server-side, on every call.
// ----------------------------------------------------------------

async function requireOwner() {
  const session = await auth()
  if (session?.user.role !== 'owner') {
    throw new Error('Only the store owner can manage staff accounts')
  }
}

export async function createStaffAction(
  prevState: { error: string | null },
  formData: FormData
) {
  await requireOwner()

  const parsed = CreateStaffSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    await createUser({ ...parsed.data, role: 'staff' })
  } catch {
    return { error: 'A user with that email may already exist' }
  }

  revalidatePath('/dashboard/staff')
  return { error: null }
}

export async function deleteStaffAction(formData: FormData) {
  await requireOwner()

  const userId = formData.get('userId') as string
  await deleteUser(userId)

  revalidatePath('/dashboard/staff')
}
