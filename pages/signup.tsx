import { useState } from "react"
import { useRouter } from "next/router"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "For trying it out",
    features: [
      "3 AI applications per month",
      "Basic fit evaluation",
      "Tailored CV + cover letter",
      "PDF compilation & verification",
      "ATS keyword check",
    ],
    cta: "Get Started",
    value: "free",
  },
  {
    name: "Pro",
    price: "$9/mo",
    desc: "For serious job seekers",
    features: [
      "20 AI applications per month",
      "Multi-portal job scraping (50+ boards)",
      "Interviewer prep packs",
      "Salary benchmarking",
      "Priority support",
      "Application tracker dashboard",
    ],
    cta: "Start 7-day Free Trial",
    value: "pro",
  },
  {
    name: "Team",
    price: "$49/mo",
    desc: "For agencies & career coaches",
    features: [
      "100 AI applications per month",
      "White-label CV templates",
      "Custom job portal integrations",
      "Team collaboration workspace",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    value: "team",
  },
]

export default function Signup() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handlePlanSelect = (planValue: string) => {
    if (planValue === "team") {
      window.location.href = "/contact"
      return
    }
    setSelectedPlan(planValue)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          plan: selectedPlan,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        // Persist user to localStorage
        localStorage.setItem("aijs_user", JSON.stringify(data.user))

        if (data.requiresPayment) {
          // Redirect to Stripe checkout for paid plans
          // In dev, just go to dashboard
          alert("Pro plan selected! In production this would redirect to Stripe.")
          router.push("/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        alert(data.error || "Signup failed")
      }
    } catch (err) {
      alert("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showForm ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
              <p className="text-gray-600">Start with 7-day free trial on paid plans. No credit card needed for Free.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.value}
                  className={`border-2 rounded-lg p-6 flex flex-col cursor-pointer transition-all ${
                    selectedPlan === plan.value
                      ? "border-primary-600 bg-primary-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePlanSelect(plan.value)}
                >
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{plan.price}</p>
                  <p className="text-gray-600 text-sm mt-1">{plan.desc}</p>
                  <ul className={`mt-4 space-y-2 flex-1 ${plan.value === "team" ? "mb-4" : "mb-6"}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-auto py-2 text-center rounded-md font-medium ${
                    selectedPlan === plan.value
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {plan.cta}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Create your account — {plans.find((p) => p.value === selectedPlan)?.name} plan
              </h2>
              <p className="text-gray-600 mt-1">
                {selectedPlan === "free"
                  ? "No credit card required."
                  : "7-day free trial, then $9/month. Cancel anytime."}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium disabled:opacity-50"
              >
                {loading ? "Creating..." : selectedPlan === "free" ? "Get Started" : "Start Free Trial"}
              </button>
            </form>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-600 hover:text-gray-900 mt-4"
            >
              ← Back to plans
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
