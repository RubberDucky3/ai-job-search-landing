import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { FileText, Target, Zap, Briefcase, Search, Calendar, TrendingUp } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: "free" | "pro" | "team"
  applications_used: number
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("aijs_user")
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      router.push("/login")
    }
    setLoading(false)
  }, [router])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const limit = user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100
  const used = user.applications_used || 0
  const remaining = Math.max(0, limit - used)
  const usagePercent = (used / limit) * 100

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
                  localStorage.removeItem("aijs_user")
                  document.cookie = "aijs_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT"
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
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name.split(" ")[0] || "there"}!
          </h1>
          <p className="text-gray-600 mt-2">
            <span className="capitalize font-medium">{user.plan}</span> plan •{" "}
            {remaining} of {limit} applications remaining this month
          </p>
        </div>

        {/* Usage bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Monthly Usage</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(100, usagePercent)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {used} / {limit} applications used
          </p>
          {user.plan === "free" && remaining <= 1 && (
            <Link
              href="/pricing"
              className="text-primary-600 text-sm font-medium mt-2 inline-block"
            >
              Upgrade to Pro for 20 applications/month →
            </Link>
          )}
        </div>

        {/* Workflow steps */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Job Search Workflow</h2>
          <div className="space-y-3">
            <Link href="/scrape" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                <Search className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900">1. Search Job Postings</span>
                <p className="text-sm text-gray-600">Find jobs across 50+ boards, ranked by fit score.</p>
              </div>
            </Link>
            <Link href="/apply" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-4">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900">2. Apply with AI</span>
                <p className="text-sm text-gray-600">Generate tailored CV & cover letter for any job posting.</p>
              </div>
            </Link>
            <div className="flex items-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-4">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900">3. Interview Prep</span>
                <p className="text-sm text-gray-600">Get stage-specific prep packs with STAR examples.</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900">4. Track Results</span>
                <p className="text-sm text-gray-600">Record outcomes and iterate on your strategy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/scrape"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-center"
          >
            <Search className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Search Jobs</h3>
            <p className="text-sm text-gray-600 mt-1">Find postings ranked by fit score</p>
          </Link>
          <Link
            href="/apply"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-center"
          >
            <Zap className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Apply Now</h3>
            <p className="text-sm text-gray-600 mt-1">Generate CV + cover letter</p>
          </Link>
          <Link
            href="/settings"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-center"
          >
            <Target className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Settings</h3>
            <p className="text-sm text-gray-600 mt-1">Profile & billing</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
