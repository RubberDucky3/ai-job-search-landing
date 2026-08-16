import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const dashboardSteps = [
  { step: 1, name: "Set up your profile", complete: true },
  { step: 2, name: "Search job postings", complete: false },
  { step: 3, name: "Apply with AI", complete: false },
]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showPricing, setShowPricing] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(storedUser))
  }, [router])

  if (!user) return null

  const applicationsLeft = user.plan === "free" ? Math.max(0, 3 - user.applications_used) :
                           user.plan === "pro" ? Math.max(0, 20 - user.applications_used) :
                           Math.max(0, 100 - user.applications_used)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-primary-700">AIJobSearch.ai</Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <Link href="/settings" className="text-sm text-gray-600 hover:text-gray-900">Settings</Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user")
                  router.push("/")
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome + usage */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0] || "there"}</h1>
          <p className="text-gray-600 mt-2">
            You're on the <strong className="capitalize">{user.plan}</strong> plan.
            {user.plan === "free" && ` Upgrade for more applications. `}
            {user.plan !== "free" && ` ${applicationsLeft} applications remaining this month. `}
          </p>

          {user.plan === "free" && (
            <button
              onClick={() => setShowPricing(true)}
              className="mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Upgrade to Pro — $9/month
            </button>
          )}
        </div>

        {/* Usage bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Monthly Usage</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-primary-600 h-3 rounded-full"
              style={{ width: `${(user.applications_used / (user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100)) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {user.applications_used} / {user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100} applications used
          </p>
        </div>

        {/* Workflow steps */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Job Search Workflow</h2>
          <div className="space-y-4">
            {dashboardSteps.map((step) => (
              <div key={step.step} className="flex items-center p-4 border rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.complete ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                }`}>
                  {step.step}
                </div>
                <span className="flex-1">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/scrape"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 Search Jobs</h3>
            <p className="text-gray-600 text-sm">Find job postings across 50+ boards, filtered by your fit score.</p>
          </Link>
          <Link
            href="/apply"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">✉️ Apply Now</h3>
            <p className="text-gray-600 text-sm">Generate tailored CV & cover letter for a specific job posting.</p>
          </Link>
        </div>
      </main>

      {/* Pricing modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade to Pro</h3>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>• 20 AI applications/month (vs 3 free)</li>
              <li>• Multi-portal job scraping</li>
              <li>• Interviewer prep packs</li>
              <li>• Salary benchmarking</li>
              <li>• Priority support</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPricing(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md"
              >
                Cancel
              </button>
              <a
                href="https://buy.stripe.com/test_pro_upgrade"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md text-center"
              >
                Upgrade — $9/mo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
