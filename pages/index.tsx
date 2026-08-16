import Link from "next/link"
import { useState } from "react"
import { Check, Sparkles, FileText, Target, Briefcase, Zap, Users, Mail } from "lucide-react"

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-primary-600" />,
    title: "AI-Powered Fit Evaluation",
    desc: "Our agents score each job posting against your exact profile — skills, experience, behavioral traits — before you even read it.",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary-600" />,
    title: "Tailored CV & Cover Letter",
    desc: "Automatically generates LaTeX documents tailored to each role, then compiles and visually verifies every PDF for perfect formatting.",
  },
  {
    icon: <Target className="h-6 w-6 text-primary-600" />,
    title: "ATS Verification",
    desc: "Extracts the PDF text layer to verify contact details, keyword coverage, and reading order — so your application survives every ATS.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary-600" />,
    title: "Interviewer Prep",
    desc: "Generates stage-specific interview packs with STAR examples, company research, and mock interview questions based on your application.",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-primary-600" />,
    title: "Multi-Portal Scraping",
    desc: "Searches 50+ job boards simultaneously, deduplicates results, and ranks them by fit score — all without you lifting a finger.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary-600" />,
    title: "Application Tracker",
    desc: "Tracks every application from submission to outcome, archives all materials, and generates analytics dashboards.",
  },
]

const pricing = [
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
    href: "/signup?plan=free",
    mostPopular: false,
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
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    mostPopular: true,
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
    href: "/contact",
    mostPopular: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-700">AIJobSearch</span>
              <span className="text-sm text-gray-500">.ai</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            </nav>
            <Link
              href="/signup?plan=free"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              The AI Agent That <span className="text-primary-600">Gets You Interviews</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Built by a former job seeker who used it to land their AI engineering role.
              Our Claude Code-powered agents evaluate fit, tailor your CV/cover letter,
              verify PDFs for ATS compliance, and prep you for interviews — automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup?plan=free"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md text-lg font-medium"
              >
                Start Free — No Credit Card
              </Link>
              <Link
                href="#demo"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-md text-lg font-medium"
              >
                Watch Demo
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Featured on Trendshift • Used by 300+ job seekers • Built with Claude Code
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to land interviews</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The same AI workflow that got its creator hired — now available as a hosted service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {f.icon}
                <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Built from personal pain</h2>
          </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              I'm Jerome, a CS student at UT Dallas. When my position was cut in late 2025,
              I built this AI framework to run my own job search — the same{" "}
              <code>/scrape</code>, <code>/apply</code>, and <code>/interview</code>{" "}
              workflow used weekly on my own career.
            </p>
            <p>
              Sixty-nine tailored applications, twenty first interviews, and one signed
              contract later, I started as an AI engineer in June 2026. People kept asking
              whether this actually works. It got me hired. Now it's yours.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="text-gray-600 mt-4">Start free. Upgrade when you're ready to scale.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`border-2 rounded-lg p-8 flex flex-col ${
                  plan.mostPopular
                    ? "border-primary-600 bg-primary-50"
                    : "border-gray-200"
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-4">{plan.price}</p>
                <p className="text-gray-600 text-sm mt-1">{plan.desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-6 py-2 px-4 rounded-md text-center font-medium ${
                    plan.mostPopular
                      ? "bg-primary-600 hover:bg-primary-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Annual billing available • 7-day free trial on paid plans
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop rewriting cover letters. Start getting interviews.
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join 300+ job seekers who automated their search with AI.
          </p>
          <Link
            href="/signup?plan=free"
            className="bg-white hover:bg-gray-100 text-primary-700 px-8 py-3 rounded-md text-lg font-medium"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Mail className="h-8 w-8 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get job search tips from the trenches</h2>
          <p className="text-gray-600 mb-6">
            Insider tactics from building a system that landed 20 interviews. No fluff, unsubscribe anytime.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const email = (e.target.elements as any).email.value
              if (!email) return
              const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "landing" }),
              })
              const data = await res.json()
              if (data.success) {
                alert("Added to waitlist! Check your email.")
                ;(e.target as HTMLFormElement).reset()
              }
            }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Join
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; 2026 AIJobSearch.ai. Built with Claude Code.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
