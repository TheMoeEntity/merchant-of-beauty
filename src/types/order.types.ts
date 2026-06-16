export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'

export interface OrderItem {
    productId: string
    productTitle: string
    productImage?: string
    quantity: number
    unitPrice: number
}

export interface CreateOrderInput {
    customerName: string
    customerEmail: string
    customerPhone?: string
    customerAddress?: string
    notes?: string
    items: OrderItem[]
}

export interface OrderWithItems {
    id: string
    customerName: string
    customerEmail: string
    customerPhone: string | null
    customerAddress: string | null
    status: OrderStatus
    totalAmount: number
    notes: string | null
    createdAt: Date
    updatedAt: Date
    items: OrderItem[]
}