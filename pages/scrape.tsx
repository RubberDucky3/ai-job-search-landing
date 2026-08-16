import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Search, MapPin, Star, ExternalLink } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: "free" | "pro" | "team"
  applications_used: number
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  fitScore: number
  salary: string
  posted: string
  url: string
  stack: string[]
  dealBreakers: string[]
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "AI/ML Engineer",
    company: "TechFlow AI",
    location: "Remote",
    fitScore: 87,
    salary: "$120k - $150k",
    posted: "2 hours ago",
    url: "https://example.com/job/1",
    stack: ["Python", "PyTorch", "Docker", "AWS"],
    dealBreakers: [],
  },
  {
    id: "2",
    title: "Software Engineer, AI Infrastructure",
    company: "CloudCore Systems",
    location: "Dallas, TX",
    fitScore: 76,
    salary: "$110k - $140k",
    posted: "1 day ago",
    url: "https://example.com/job/2",
    stack: ["Go", "Kubernetes", "Python", "GCP"],
    dealBreakers: ["On-site required"],
  },
  {
    id: "3",
    title: "Junior Machine Learning Engineer",
    company: "DataMind",
    location: "Austin, TX",
    fitScore: 65,
    salary: "$90k - $110k",
    posted: "3 days ago",
    url: "https://example.com/job/3",
    stack: ["Python", "scikit-learn", "AWS"],
    dealBreakers: [],
  },
  {
    id: "4",
    title: "Full Stack Engineer",
    company: "StartupLab",
    location: "Remote",
    fitScore: 58,
    salary: "$100k - $130k",
    posted: "5 days ago",
    url: "https://example.com/job/4",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    dealBreakers: ["Startup equity only"],
  },
  {
    id: "5",
    title: "AI Research Engineer",
    company: "DeepVector",
    location: "Remote",
    fitScore: 82,
    salary: "$130k - $160k",
    posted: "4 hours ago",
    url: "https://example.com/job/5",
    stack: ["Python", "TensorFlow", "CUDA", "Docker"],
    dealBreakers: [],
  },
  {
    id: "6",
    title: "Backend Engineer (Python)",
    company: "ScaleUp",
    location: "Dallas, TX",
    fitScore: 71,
    salary: "$100k - $125k",
    posted: "2 days ago",
    url: "https://example.com/job/6",
    stack: ["Python", "FastAPI", "PostgreSQL", "AWS"],
    dealBreakers: [],
  },
]

export default function Scrape() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [query, setQuery] = useState("AI")
  const [location, setLocation] = useState("Remote")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Job[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("aijs_user")
    if (!stored) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(stored))
  }, [router])

  const handleSearch = () => {
    if (!query || !user) return

    const limit = user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100
    const used = user.applications_used || 0
    if (used >= limit) {
      alert("You've reached your monthly limit. Please upgrade.")
      return
    }

    setLoading(true)
    setResults([])
    setTimeout(() => {
      // Simulate API call - in production this calls the real scraping service
      const queryTerms = query.toLowerCase().split(/\s+/)
      const filtered = MOCK_JOBS.filter(job =>
        queryTerms.some(term =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term)
        )
      )
      setResults(filtered)
      setLoading(false)
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

        {/* Search form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
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
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query || remaining <= 0}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Search className="animate-spin h-4 w-4 mr-2" />
                Searching 50+ job boards...
              </>
            ) : remaining <= 0 ? (
              "No applications left"
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{job.fitScore}% fit</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {job.stack.map((tech) => (
                    <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>{job.salary}</span>
                  <span>Posted {job.posted}</span>
                </div>

                {job.dealBreakers.length > 0 && (
                  <div className="mb-3">
                    {job.dealBreakers.map((db, i) => (
                      <span key={i} className="inline-block text-xs bg-red-50 text-red-600 px-2 py-1 rounded mr-2">
                        ⚠️ {db}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md text-center font-medium flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Posting
                  </a>
                  <Link
                    href={`/apply?url=${encodeURIComponent(job.url)}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md text-center font-medium"
                  >
                    Apply with AI
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Scraping job boards and evaluating fit scores...</p>
            <p className="text-sm text-gray-500 mt-2">This usually takes 10-15 seconds</p>
          </div>
        )}

        {results.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>Run a search to see job matches here</p>
            <p className="text-sm">Results will be ranked by fit score</p>
          </div>
        )}

        {remaining <= 0 && user.plan !== "team" && (
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
