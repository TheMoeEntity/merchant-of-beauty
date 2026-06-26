import { db } from '@/lib/db'
import { standaloneInvoices } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'
import {
  StandaloneInvoice,
  StandaloneInvoiceItem,
  CreateStandaloneInvoiceInput,
} from '@/types/standalone-invoice.types'
import { calculateOrderTotal } from '@/lib/utils'

// ----------------------------------------------------------------
// ID generation for standalone invoices
// Separate from generateOrderId() since these are a distinct
// document type and should have their own sequential namespace.
// ----------------------------------------------------------------
function generateStandaloneInvoiceId(count: number): string {
  return `SI-${String(count).padStart(4, '0')}`
}

function parseItems(raw: string): StandaloneInvoiceItem[] {
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function toStandaloneInvoice(
  row: typeof standaloneInvoices.$inferSelect
): StandaloneInvoice {
  return {
    ...row,
    items: parseItems(row.items),
  }
}

export async function createStandaloneInvoice(
  input: CreateStandaloneInvoiceInput
): Promise<string> {
  const [{ value: invoiceCount }] = await db
    .select({ value: count() })
    .from(standaloneInvoices)

  const id = generateStandaloneInvoiceId(Number(invoiceCount) + 1)
  const total = calculateOrderTotal(input.items)
  await db.insert(standaloneInvoices).values({
    id,
    customerName: input.customerName,
    customerEmail: input.customerEmail ?? null,
    customerPhone: input.customerPhone ?? null,
    customerAddress: input.customerAddress ?? null,
    notes: input.notes ?? null,
    items: JSON.stringify(input.items),
    totalAmount: total,
    status: 'draft',
  })

  return id
}

export async function getStandaloneInvoices(): Promise<StandaloneInvoice[]> {
  const rows = await db
    .select()
    .from(standaloneInvoices)
    .orderBy(standaloneInvoices.issuedAt)

  return rows.map(toStandaloneInvoice)
}

export async function getStandaloneInvoiceById(
  id: string
): Promise<StandaloneInvoice | null> {
  const [row] = await db
    .select()
    .from(standaloneInvoices)
    .where(eq(standaloneInvoices.id, id))

  return row ? toStandaloneInvoice(row) : null
}

export async function markStandaloneInvoiceAsSent(id: string): Promise<void> {
  await db
    .update(standaloneInvoices)
    .set({ status: 'sent' })
    .where(eq(standaloneInvoices.id, id))
}
