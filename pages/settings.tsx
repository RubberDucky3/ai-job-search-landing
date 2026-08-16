import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Save, User, Mail, Lock, CreditCard, Trash2 } from "lucide-react"

export default function Settings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("aijs_user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const parsed = JSON.parse(storedUser)
    setUser(parsed)
    setName(parsed.name || "")
  }, [router])

  const handleSaveProfile = () => {
    if (!user) return
    setSaving(true)
    const updatedUser = { ...user, name }
    localStorage.setItem("aijs_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setTimeout(() => setSaving(false), 500)
  }

  const handleLogout = () => {
    localStorage.removeItem("aijs_user")
    document.cookie = "aijs_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT"
    router.push("/")
  }

  if (!user) return null

  const limit = user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100
  const used = user.applications_used || 0
  const remaining = Math.max(0, limit - used)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="text-xl font-bold text-primary-700">AIJobSearch.ai</Link>
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">← Dashboard</Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (read-only)</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving || name === user.name}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>

          {/* Plan & Billing */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Plan & Billing
            </h2>
            <div className={`p-4 rounded-md mb-4 ${
              user.plan === "free" ? "bg-gray-50" : "bg-primary-50"
            }`}>
              <p className="font-medium text-gray-900">
                {user.plan === "free" ? "Free Plan" : user.plan === "pro" ? "Pro Plan" : "Team Plan"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {user.plan === "free"
                  ? `3 applications/month • $${limit} billed monthly • ` :
                  user.plan === "pro"
                    ? "20 applications/month • $9 billed monthly • "
                    : "100 applications/month • $49 billed monthly • "}
                <Link href="/pricing" className="text-primary-600 hover:underline">
                  {user.plan === "free" ? "Upgrade →" : "Manage billing →"}
                </Link>
              </p>
            </div>

            <div className="text-sm text-gray-600">
              <p>{used} / {limit} applications used this month</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (used / limit) * 100)}%` }}
                ></div>
              </div>
              {remaining <= 3 && user.plan !== "team" && (
                <p className="text-primary-600 mt-2 font-medium">
                  Only {remaining} applications left this month.{" "}
                  <Link href="/pricing" className="underline">
                    Consider upgrading
                  </Link>.
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Password
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm">
                Update Password
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow p-6 border border-red-200">
            <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              Danger Zone
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all data. This cannot be undone.
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
