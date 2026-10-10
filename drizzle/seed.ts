import 'dotenv/config'
import { db } from '../src/lib/db'
import { users } from '../src/lib/db/schema'
import bcrypt from 'bcryptjs'
import { generateOrderId } from '../src/lib/utils'

/**
 * Creates the initial owner account.
 *
 * Credentials come from the environment (.env.local), never from source code:
 *   SEED_OWNER_EMAIL     e.g. owner@yourstore.com
 *   SEED_OWNER_PASSWORD  at least 12 characters
 *
 * Safe to re-run: an existing account with the same email is left untouched.
 */
const MIN_PASSWORD_LENGTH = 12

function readSeedCredentials() {
    const email = process.env.SEED_OWNER_EMAIL?.trim()
    const password = process.env.SEED_OWNER_PASSWORD

    if (!email || !password) {
        throw new Error('SEED_OWNER_EMAIL and SEED_OWNER_PASSWORD must be set in .env.local')
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(`SEED_OWNER_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters`)
    }
    return { email, password }
}

async function seed() {
    console.log('🌱 Seeding database...')

    const { email, password } = readSeedCredentials()
    const hashed = await bcrypt.hash(password, 12)

    await db.insert(users).values({
        id: generateOrderId(),
        name: 'Store Owner',
        email,
        password: hashed,
        role: 'owner',
    }).onConflictDoNothing()

    // The password is never logged.
    console.log(`✅ Owner account ready for ${email}`)
    process.exit(0)
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err instanceof Error ? err.message : err)
    process.exit(1)
})
