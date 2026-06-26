import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { auth } from '@/lib/auth'
import { getStandaloneInvoiceById } from '@/services/standalone-invoice.service'
import { getSiteSettings } from '@/sanity/queries'
import { StandaloneInvoicePDF } from '@/components/admin/StandaloneInvoicePDF'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const invoice = await getStandaloneInvoiceById(id)
  const settings = await getSiteSettings()

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  const buffer = await renderToBuffer(
    <StandaloneInvoicePDF
      invoice={invoice}
      storeName={settings?.storeName ?? 'Merchant of Beauty'}
    />
  )

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${invoice.id}.pdf"`,
    },
  })
}
