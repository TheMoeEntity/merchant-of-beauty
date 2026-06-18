import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--color-surface)]">
      <p className="font-display text-7xl text-[var(--color-gold)] mb-4">404</p>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2.5 bg-[var(--color-ink)] text-[var(--color-surface)] text-sm hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="px-6 py-2.5 border border-[var(--color-ink)] text-[var(--color-ink)] text-sm hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}
