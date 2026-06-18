import { db } from '@/lib/db'
import { orders, orderItems } from '@/lib/db/schema'
import { CreateOrderInput, OrderWithItems } from '@/types/order.types'
import {
  generateOrderId,
  generateItemId,
  calculateOrderTotal,
} from '@/lib/utils'
import { eq, and, lt } from 'drizzle-orm'

export async function createOrder(input: CreateOrderInput): Promise<string> {
  const orderId = generateOrderId()
  const total = calculateOrderTotal(input.items)

  await db.transaction(async (tx) => {
    await tx.insert(orders).values({
      id: orderId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone ?? null,
      customerAddress: input.customerAddress ?? null,
      notes: input.notes ?? null,
      totalAmount: total,
      status: 'pending',
    })

    await tx.insert(orderItems).values(
      input.items.map((item) => ({
        id: generateItemId(),
        orderId: orderId,
        productId: item.productId,
        productTitle: item.productTitle,
        productImage: item.productImage ?? null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))
    )
  })

  return orderId
}

export async function getOrders(): Promise<OrderWithItems[]> {
  const rows = await db.query.orders.findMany({
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    with: { items: true },
  })
  return rows as OrderWithItems[]
}

export async function getOrderById(id: string): Promise<OrderWithItems | null> {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: { items: true },
  })
  return (order as OrderWithItems) ?? null
}

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<void> {
  await db
    .update(orders)
    .set({ status: status as never, updatedAt: new Date() })
    .where(eq(orders.id, id))
}

export async function cancelAbandonedOrders(): Promise<number> {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000)

  const result = await db
    .update(orders)
    .set({ status: 'cancelled', updatedAt: new Date() })
    .where(and(eq(orders.status, 'pending'), lt(orders.createdAt, cutoff)))
    .returning({ id: orders.id })

  return result.length
}
