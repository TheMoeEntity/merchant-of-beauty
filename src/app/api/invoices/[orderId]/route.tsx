import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { getOrderById } from '@/services/order.service'
import { getInvoiceByOrderId } from '@/services/invoice.service'
import { InvoicePDF } from '@/components/admin/InvoicePDF'
import { auth } from '@/lib/auth'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // if (session.user.role !== 'admin') {
  //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  // }

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
