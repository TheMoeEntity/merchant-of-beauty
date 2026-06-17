import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/admin/Sidebar'

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
      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  )
}
