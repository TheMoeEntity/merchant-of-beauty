import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ChangePasswordForm } from '@/components/admin/ChangePasswordForm'

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="max-w-md">
      <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
        Account
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        Signed in as {session.user.email}
      </p>

      <div
        className="bg-[var(--color-card)] p-6"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
          Change Password
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  )
}
