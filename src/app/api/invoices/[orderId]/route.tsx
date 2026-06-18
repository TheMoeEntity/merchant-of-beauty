import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { getOrderById } from '@/services/order.service'
import { getInvoiceByOrderId } from '@/services/invoice.service'
import { InvoicePDF } from '@/components/admin/InvoicePDF'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params

  const order = await getOrderById(orderId)
  const invoice = await getInvoiceByOrderId(orderId)

  if (!order || !invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  const buffer = await renderToBuffer(
    <InvoicePDF order={order} invoice={invoice} />
  )

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="invoice-${invoice.id}.pdf"`,
    },
  })
}
