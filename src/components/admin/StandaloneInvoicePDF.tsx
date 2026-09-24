import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'
import { getLogoFilePath } from '@/lib/pdf-assets'
import { StandaloneInvoicePDFProps } from '@/types/standalone-invoice.types'
import { formatNaira } from '@/lib/utils'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2pt solid #C9A24B',
  },
  storeName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#0A0A0A',
  },
  invoiceLabel: {
    fontSize: 9,
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  invoiceId: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#C9A24B',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 9,
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  customerName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  customerDetail: {
    fontSize: 10,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #0A0A0A',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottom: '0.5pt solid #E5E5E5',
  },
  colItem: { width: '50%' },
  colQty: { width: '15%', textAlign: 'right' },
  colPrice: { width: '17.5%', textAlign: 'right' },
  colTotal: { width: '17.5%', textAlign: 'right' },
  tableHeaderText: {
    fontSize: 9,
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingTop: 12,
    borderTop: '2pt solid #0A0A0A',
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginRight: 20,
  },
  totalAmount: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#C9A24B',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#6B6B6B',
  },
})

export function StandaloneInvoicePDF({
  invoice,
  storeName,
}: StandaloneInvoicePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image src={getLogoFilePath()} style={{ width: 110, height: 59 }} />
            <Text style={{ fontSize: 9, color: '#6B6B6B', marginTop: 4 }}>
              Professional Spa, Salon & Tattoo Equipment
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.invoiceLabel}>Invoice</Text>
            <Text style={styles.invoiceId}>{invoice.id}</Text>
            <Text style={{ fontSize: 9, color: '#6B6B6B', marginTop: 4 }}>
              {new Date(invoice.issuedAt).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Billed To</Text>
          <Text style={styles.customerName}>{invoice.customerName}</Text>
          {invoice.customerEmail && (
            <Text style={styles.customerDetail}>{invoice.customerEmail}</Text>
          )}
          {invoice.customerPhone && (
            <Text style={styles.customerDetail}>{invoice.customerPhone}</Text>
          )}
          {invoice.customerAddress && (
            <Text style={styles.customerDetail}>{invoice.customerAddress}</Text>
          )}
        </View>

        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colItem]}>Item</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>Price</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
          </View>

          {invoice.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colItem}>{item.productTitle}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatNaira(item.unitPrice)}</Text>
              <Text style={styles.colTotal}>
                {formatNaira(item.unitPrice * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>
            {formatNaira(invoice.totalAmount)}
          </Text>
        </View>

        {invoice.notes && (
          <View style={[styles.section, { marginTop: 24 }]}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text style={styles.customerDetail}>{invoice.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Thank you for choosing {storeName ?? 'Merchant of Beauty'}. For
          questions about this invoice, please contact us.
        </Text>
      </Page>
    </Document>
  )
}
