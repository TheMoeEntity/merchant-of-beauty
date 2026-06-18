import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/admin/Sidebar'
import { Toaster } from 'sonner'
import { SessionUser } from '@/types/auth.types'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const user: SessionUser = {
    id: session.user.id as string,
    name: session.user.name as string,
    email: session.user.email as string,
    role: session.user.role as SessionUser['role'],
  }

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar user={user} />
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
