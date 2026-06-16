import { db } from '@/lib/db'
import { invoices, orders } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'
import { InvoiceData } from '@/types/invoice.types'
import { generateInvoiceId } from '@/lib/utils'

export async function generateInvoice(orderId: string): Promise<InvoiceData> {
    // Idempotent — return existing invoice if already generated
    const existing = await db.query.invoices.findFirst({
        where: eq(invoices.orderId, orderId),
    })

    if (existing) return existing as InvoiceData

    // Count existing invoices to generate sequential ID
    const [{ value: invoiceCount }] = await db.select({ value: count() }).from(invoices)
    const invoiceId = generateInvoiceId(Number(invoiceCount) + 1)

    await db.insert(invoices).values({
        id: invoiceId,
        orderId: orderId,
    })

    const created = await db.query.invoices.findFirst({
        where: eq(invoices.id, invoiceId),
    })

    return created as InvoiceData
}

export async function getInvoiceByOrderId(orderId: string): Promise<InvoiceData | null> {
    const invoice = await db.query.invoices.findFirst({
        where: eq(invoices.orderId, orderId),
    })
    return (invoice as InvoiceData) ?? null
}