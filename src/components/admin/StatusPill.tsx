import { OrderStatus } from '@/types/order.types'
import { ORDER_STATUS_MAP } from '@/lib/utils'

export function StatusPill({ status }: { status: OrderStatus }) {
  const { label, color } = ORDER_STATUS_MAP[status]

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  )
}
