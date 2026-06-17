'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

export function RefreshButton() {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  function handleRefresh() {
    setRefreshing(true)
    router.refresh()
    // router.refresh() doesn't return a promise we can await for
    // "done" — it re-runs the server request in the background.
    // A short timeout gives the spinner enough time to feel
    // intentional rather than flickering for 50ms.
    setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={refreshing}
      className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-gold-dark)] transition-colors disabled:opacity-50"
    >
      <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
      {refreshing ? 'Refreshing...' : 'Refresh Status'}
    </button>
  )
}
