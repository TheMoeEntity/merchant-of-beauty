export interface InvoiceData {
    id: string
    orderId: string
    issuedAt: Date
    pdfUrl: string | null
    notes: string | null
}

export interface InvoicePDFProps {
    order: {
        id: string
        customerName: string
        customerEmail: string
        customerPhone: string | null
        customerAddress: string | null
        totalAmount: number
        createdAt: Date
        items: {
            productTitle: string
            quantity: number
            unitPrice: number
        }[]
    }
    invoice: {
        id: string
        issuedAt: Date
        notes: string | null
    }
}