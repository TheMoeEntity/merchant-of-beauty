import 'dotenv/config'
import { db } from '../src/lib/db'
import { users } from '../src/lib/db/schema'
import bcrypt from 'bcryptjs'
import { generateOrderId } from '../src/lib/utils'

async function seed() {
    console.log('🌱 Seeding database...')

    const hashed = await bcrypt.hash('admin123', 12)

    await db.insert(users).values({
        id: generateOrderId(),
        name: 'Store Owner',
        email: 'owner@merchantofbeauty.com',
        password: hashed,
        role: 'owner',
    }).onConflictDoNothing()

    console.log('✅ Owner account created')
    console.log('   Email:    owner@merchantofbeauty.com')
    console.log('   Password: admin123')
    console.log('⚠️  Change this password after first login')
    process.exit(0)
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
})