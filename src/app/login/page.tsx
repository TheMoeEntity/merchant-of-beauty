import type { Metadata } from 'next'
import Navbar from '@/components/shop/Navbar'
import { Footer } from '@/components/shop/Footer'
import LoginForm from '@/components/shop/LoginForm'
import { Logo } from '@/components/shop/Logo'

export const metadata: Metadata = {
  title: 'Staff Login',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-6">
        <div className="w-full max-w-sm">
          <h1 className="flex justify-center mb-2">
            <Logo height={96} priority />
          </h1>
          <p className="text-sm text-[var(--color-muted)] text-center mb-8">
            Sign in to manage your store
          </p>

          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  )
}
