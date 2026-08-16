import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Search, Filter, MapPin, Briefcase, Star } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: "free" | "pro" | "team"
  applications_used: number
}

export default function Scrape() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("aijs_user")
    if (!stored) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(stored))
  }, [router])

  const handleSearch = () => {
    if (!query) return
    setLoading(true)
    // In production, this would call the job scraping API
    setTimeout(() => {
      setLoading(false)
      alert("Demo: In production this would scrape 50+ job boards and show results here.")
    }, 1500)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const limit = user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100
  const used = user.applications_used || 0
  const remaining = Math.max(0, limit - used)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="text-xl font-bold text-primary-700">AIJobSearch.ai</Link>
            <span className="text-sm text-gray-600">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Job Postings</h1>
        <p className="text-gray-600 mb-4">
          {remaining} of {limit} applications remaining this month
        </p>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title / Keywords</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., AI Engineer, Software Engineer, Data Scientist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Remote, Dallas TX, New York"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !query || remaining <= 0}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium disabled:opacity-50"
            >
              {loading ? "Searching..." : remaining <= 0 ? "No applications left" : "Search Jobs"}
            </button>
          </div>

          {remaining <= 0 && user.plan !== "team" && (
            <div className="mt-6 p-4 bg-primary-50 rounded-lg text-center">
              <p className="text-primary-800 font-medium">You've used all your applications this month.</p>
              <Link
                href="/pricing"
                className="text-primary-600 font-medium hover:underline"
              >
                Upgrade to continue searching →
              </Link>
            </div>
          )}
        </div>

        {/* Demo results placeholder */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Matches</h2>
            <button className="text-sm text-gray-600 hover:text-gray-900">Clear Filters</button>
          </div>
          <div className="text-center py-12 text-gray-500">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>Run a search to see job matches here</p>
            <p className="text-sm">Your results will be ranked by fit score</p>
          </div>
        </div>
      </main>
    </div>
  )
}
