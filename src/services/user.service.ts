import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { Role } from '@/types/auth.types'
import { generateOrderId } from '@/lib/utils'

export async function createUser(input: {
    name: string
    email: string
    password: string
    role: Role
}): Promise<void> {
    const hashed = await bcrypt.hash(input.password, 12)
    await db.insert(users).values({
        id: generateOrderId(),
        name: input.name,
        email: input.email,
        password: hashed,
        role: input.role,
    })
}

export async function getUsers() {
    return db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
    }).from(users)
}

export async function deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id))
}