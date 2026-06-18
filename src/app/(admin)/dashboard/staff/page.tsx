import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUsers } from '@/services/user.service'
import { CreateStaffForm } from '@/components/admin/CreateStaffForm'
import { deleteStaffAction } from '@/actions/staff.actions'

export default async function StaffPage() {
  const session = await auth()

  if (session?.user.role !== 'owner') {
    redirect('/dashboard')
  }

  const users = await getUsers()

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
        Staff
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        Manage who has access to your dashboard.
      </p>

      <div
        className="bg-[var(--color-card)] p-6 mb-8"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
          Add Staff Member
        </h2>
        <CreateStaffForm />
      </div>

      <div
        className="bg-[var(--color-card)] p-6"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
          All Accounts
        </h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between py-3 border-b border-[var(--color-ink)]/5 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {user.name}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[var(--color-gold-dark)] capitalize">
                  {user.role}
                </span>
                {user.role !== 'owner' && user.id !== session.user.id && (
                  <form action={deleteStaffAction}>
                    <input type="hidden" name="userId" value={user.id} />
                    <button
                      type="submit"
                      className="text-xs text-[var(--color-status-cancelled)] hover:underline"
                    >
                      Remove
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
