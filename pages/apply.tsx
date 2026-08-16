import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { FileText, Wand2, Download, CheckCircle, ExternalLink, Star } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: "free" | "pro" | "team"
  applications_used: number
}

const MOCK_CV = `JEROME FRANCIS
AI/ML Engineer | Full-Stack AI | CS @ UT Dallas

CONTACT
• Dallas, TX (Remote-friendly)
• jerome.francis@email.com
• github.com/rubberducky3

EXPERIENCE

AI Engineering Fellow · Wize Academy · Sep 2025 – Nov 2025
• Taught Lego Robotics and Python programming to 50+ middle school students
• Developed 20+ hands-on lessons introducing programming concepts and computational thinking
• Fostered problem-solving skills in young learners through project-based curriculum

Tutor · Gideon Tutoring · Jul 2025 – Aug 2025
• Group tutoring in Math and Reading for 15+ elementary students
• Helped students build confidence and improve academic performance by 2+ grade levels

RESEARCH ASSISTANT · UT Dallas · Jan 2024 – May 2024
• Built ML pipelines for customer churn prediction using scikit-learn
• Deployed LLM-based Q&A system with RAG architecture (LlamaIndex + ChromaDB)
• Implemented semantic data modeling for ontology-aware AI systems

EDUCATION
BSc Computer Science · University of Texas at Dallas · 2022–2026
• Computing Scholars Honor Program · Academic Excellence Scholarship
• Relevant coursework: AI/ML, Software Engineering, Data Structures, Algorithms

TECHNICAL SKILLS
• Primary: Python, FastAPI, LlamaIndex, RAG systems, LLMs, ChromaDB, HuggingFace
• Secondary: TypeScript, React, Next.js, C++, SQL, PyTorch, FAISS
• Tools: Docker, Git, PostgreSQL, MongoDB, Vercel`

const MOCK_COVER_LETTER = `Dear Hiring Manager,

I'm writing to express my interest in the AI Engineer position at your company. As a CS student at UT Dallas with hands-on experience building LLM-powered applications, I'm excited about the opportunity to contribute to your team.

During my independent study, I built a RAG pipeline using LlamaIndex and ChromaDB that reduced query response times by 40% compared to traditional approaches. I also deployed a full-stack AI application that integrated with HuggingFace Transformers, showcasing my ability to work with modern AI infrastructure.

What draws me to [Company Name] is your commitment to building reliable, production-ready AI systems. In my recent project, I implemented guardrails for LLM outputs using prompt engineering techniques, achieving a 95% accuracy rate in filtering inappropriate responses. This aligns with your focus on AI safety and reliability.

I bring a unique combination of technical depth in AI/ML and full-stack development experience. At Wize Academy, I taught Python programming to middle school students, honing my ability to explain complex concepts clearly — a skill I find essential for collaboration in any engineering team.

I'm particularly excited about your work in [specific area relevant to the company]. I would welcome the opportunity to discuss how my experience with RAG systems, LLM deployment, and full-stack AI development can contribute to your projects.

Thank you for your consideration. I look forward to hearing from you.

Best regards,
Jerome Francis`

export default function Apply() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [jobUrl, setJobUrl] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<any>(null)

  const loadingSteps = [
    "Analyzing job description...",
    "Evaluating fit against your profile...",
    "Drafting tailored CV...",
    "Drafting cover letter...",
    "Reviewing with second AI agent...",
    "Compiling PDFs...",
    "Verifying ATS compatibility...",
  ]

  useEffect(() => {
    const stored = localStorage.getItem("aijs_user")
    if (!stored) {
      router.push("/login")
      return
    }
    const parsed = JSON.parse(stored)
    setUser(parsed)

    // Check for URL param from /scrape
    const urlJob = router.query.url as string
    if (urlJob) {
      setJobUrl(urlJob)
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobUrl.trim() && !jobDesc.trim()) {
      return
    }
    if (!user) return

    const limit = user.plan === "free" ? 3 : user.plan === "pro" ? 20 : 100
    if (user.applications_used >= limit) {
      alert("You've reached your monthly limit. Please upgrade.")
      router.push("/pricing")
      return
    }

    setLoading(true)
    setResult(null)

    // Simulate the multi-step AI workflow
    let step = 0
    const interval = setInterval(() => {
      setLoadingStep(step)
      step++
      if (step >= loadingSteps.length) {
        clearInterval(interval)
        setLoading(false)

        // Show results
        setResult({
          cv: MOCK_CV,
          coverLetter: MOCK_COVER_LETTER,
          fitScore: 82,
          dealBreakers: [],
          keywords: ["LLM", "RAG", "Python", "Cloud", "Docker"],
          company: jobUrl ? new URL(jobUrl).hostname.replace("www.", "") : "Target Company",
          role: jobDesc ? jobDesc.split("\n")[0] || "AI Engineer" : "AI Engineer",
        })

        // Update user's application count
        const updatedUser = { ...user, applications_used: user.applications_used + 1 }
        localStorage.setItem("aijs_user", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }
    }, 800)
  }

  const downloadAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply with AI</h1>
        <p className="text-gray-600 mb-4">
          {remaining} of {limit} applications remaining this month
        </p>

        {/* Input form */}
        {!result && !loading && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Posting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., https://company.com/careers/job/123"
                />
                <p className="text-xs text-gray-500 mt-1">Paste a job posting URL (or use description below)</p>
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
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!jobUrl.trim() && !jobDesc.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium flex items-center justify-center disabled:opacity-50"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate CV & Cover Letter
              </button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generating Application</h2>
            <div className="space-y-3">
              {loadingSteps.map((step, i) => (
                <div key={step} className="flex items-center space-x-3">
                  {i < loadingStep ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : i === loadingStep ? (
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  )}
                  <span className={i === loadingStep ? "text-primary-600 font-medium" : "text-gray-600"}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">This typically takes 30-60 seconds...</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            {/* Fit Score */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Fit Score</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{result.fitScore}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Keywords matched</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {result.keywords.map((kw: string) => (
                      <span key={kw} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {result.dealBreakers.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm text-red-600">⚠️ Dealbreakers: {result.dealBreakers.join(", ")}</span>
                </div>
              )}
            </div>

            {/* CV */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 text-primary-600 mr-2" />
                  Generated CV
                </h2>
                <button
                  onClick={() => downloadAsText(result.cv, "cv.txt")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {result.cv}
              </pre>
            </div>

            {/* Cover Letter */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 text-primary-600 mr-2" />
                  Generated Cover Letter
                </h2>
                <button
                  onClick={() => downloadAsText(result.coverLetter, "cover-letter.txt")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {result.coverLetter}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                href="/scrape"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md text-center font-medium"
              >
                Find Another Job
              </Link>
              <button
                onClick={() => setResult(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md text-center font-medium"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Limit warning */}
        {remaining <= 0 && !loading && !result && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg text-center">
            <p className="text-primary-800 font-medium">You've used all your applications this month.</p>
            <Link href="/pricing" className="text-primary-600 font-medium hover:underline">
              Upgrade to continue →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
