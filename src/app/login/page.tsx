import Navbar from '@/components/shop/Navbar'
import { Footer } from '@/components/shop/Footer'
import LoginForm from '@/components/shop/LoginForm'

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl text-[var(--color-ink)] text-center mb-2">
            Merchant of Beauty
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
