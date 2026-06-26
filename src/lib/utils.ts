import { OrderStatus } from '@/types/order.types'

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function generateInvoiceId(orderCount: number): string {
  return `INV-${String(orderCount).padStart(4, '0')}`
}

export function generateItemId(): string {
  return `ITEM-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase()
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function calculateOrderTotal(
  items: { quantity: number; unitPrice: number }[]
): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
}

export const ORDER_STATUS_MAP: Record<
  OrderStatus,
  { label: string; color: string }
> = {
  pending: { label: 'Pending', color: '#F59E0B' },
  confirmed: { label: 'Confirmed', color: '#3B82F6' },
  processing: { label: 'Processing', color: '#8B5CF6' },
  shipped: { label: 'Shipped', color: '#06B6D4' },
  delivered: { label: 'Delivered', color: '#10B981' },
  cancelled: { label: 'Cancelled', color: '#EF4444' },
}

export function standardizeWhatsappNumber(number: string): string {
  // Remove all spaces and dashes
  let cleaned = number.replace(/[\s-]/g, '')

  // Convert international '00' prefix to '+'
  if (cleaned.startsWith('00')) {
    cleaned = '+' + cleaned.slice(2)
  }

  // If it already has a country code, ensure it uses '+'
  if (cleaned.startsWith('+')) {
    return cleaned
  }

  // If it is a local Nigerian number, strip the leading 0 and add +234
  if (cleaned.startsWith('0')) {
    return `+234${cleaned.slice(1)}`
  }

  // Fallback default for raw local numbers missing the leading zero
  return `+234${cleaned}`
}
