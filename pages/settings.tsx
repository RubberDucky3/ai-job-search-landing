import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Settings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(storedUser))
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="text-xl font-bold text-primary-700">AIJobSearch.ai</Link>
            <span className="text-gray-600">{user.email}</span>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
            <p className="text-sm text-gray-600">Name: {user.name}</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Plan: <span className="capitalize font-medium">{user.plan}</span></p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing</h2>
            {user.plan === "free" ? (
              <p className="text-sm text-gray-600">
                You're on the Free plan.{" "}
                <Link href="/pricing" className="text-primary-600 font-medium">Upgrade to Pro</Link> for $9/month.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Manage your subscription on Stripe.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
