export interface StandaloneInvoiceItem {
  productId: string
  productTitle: string
  quantity: number
  unitPrice: number
}

export type StandaloneInvoiceStatus = 'draft' | 'sent'

export interface StandaloneInvoice {
  id: string
  customerName: string
  customerEmail: string | null
  customerPhone: string | null
  customerAddress: string | null
  items: StandaloneInvoiceItem[]
  totalAmount: number
  notes: string | null
  status: StandaloneInvoiceStatus
  issuedAt: Date
}

export interface CreateStandaloneInvoiceInput {
  customerName: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  notes?: string
  items: StandaloneInvoiceItem[]
}

export interface StandaloneInvoicePDFProps {
  invoice: StandaloneInvoice
  storeName?: string
}
