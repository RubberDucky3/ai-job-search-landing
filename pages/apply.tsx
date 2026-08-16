import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { FileText, Wand2, CheckCircle, Download } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: "free" | "pro" | "team"
  applications_used: number
}

export default function Apply() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [jobUrl, setJobUrl] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("aijs_user")
    if (!stored) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(stored))
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobUrl.trim() && !jobDesc.trim()) {
      alert("Please provide a job URL or description")
      return
    }
    if (!user || user.applications_used >= (user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100)) {
      alert("You've reached your monthly limit. Please upgrade.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setResult({
        cv: "Generated CV content here...",
        coverLetter: "Generated cover letter content here...",
      })
      setLoading(false)
    }, 3000)
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply to a Job</h1>
        <p className="text-gray-600 mb-4">
          {remaining} of {limit} applications remaining this month
        </p>

        {!result ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Posting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://..."
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">Paste a job posting URL (or use the description below)</p>
              </div>
              <div className="text-center text-gray-400 my-4">OR</div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  rows={8}
                  placeholder="Paste the full job description here..."
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || (!jobUrl && !jobDesc)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Wand2 className="animate-spin h-4 w-4 mr-2" />
                    AI is analyzing the job...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate CV & Cover Letter
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 text-primary-600 mr-2" />
                Generated CV
              </h2>
              <pre className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap">
                {result.cv}
              </pre>
              <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download CV (PDF)
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 text-primary-600 mr-2" />
                Generated Cover Letter
              </h2>
              <pre className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap">
                {result.coverLetter}
              </pre>
              <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Cover Letter (PDF)
              </button>
            </div>
          </div>
        )}

        {remaining <= 0 && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg text-center">
            <p className="text-primary-800 font-medium">You've used all your applications this month.</p>
            <Link
              href="/pricing"
              className="text-primary-600 font-medium hover:underline"
            >
              Upgrade to Pro →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
