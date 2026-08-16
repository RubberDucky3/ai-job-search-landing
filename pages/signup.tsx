import { useState } from "react"
import { useRouter } from "next/router"
import { Check } from "lucide-react"
import Link from "next/link"

export default function Signup() {
  const router = useRouter()
  const { plan } = router.query
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const selectedPlan = plan === "pro" ? "pro" : plan === "team" ? "team" : "free"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, plan: selectedPlan }),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = "/dashboard"
      } else {
        alert(data.error || "Signup failed")
      }
    } catch (err) {
      alert("Network error")
    } finally {
      setLoading(false)
    }
  }

  const features = [
    "No credit card required",
    "Cancel anytime",
    "256-bit SSL encryption",
    "Built with Claude Code",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Signup form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create your account — {selectedPlan === "free" ? "Free" : "$9/month"} plan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium disabled:opacity-50"
              >
                {loading ? "Creating..." : `Start ${selectedPlan === "free" ? "Free" : "$9/mo"} Trial`}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Right: Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s included</h3>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {selectedPlan !== "free" && (
              <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
                <h4 className="font-bold text-primary-800 mb-2">7-day free trial</h4>
                <p className="text-primary-700 text-sm">
                  Try the full Pro plan free for 7 days. No charge until then.
                  Cancel anytime from your account settings.
                </p>
              </div>
            )}

            <p className="text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-600 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
