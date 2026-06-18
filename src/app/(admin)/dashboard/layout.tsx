import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/admin/Sidebar'
import { Toaster } from 'sonner'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) redirect('/login')

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <Sidebar user={session?.user} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-sans)',
            borderRadius: '0px',
            border: '1px solid #0A0A0A',
            background: '#FFFFFF',
            color: '#0A0A0A',
          },
        }}
      />
      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  )
}
