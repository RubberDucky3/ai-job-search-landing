import { Check } from "lucide-react"
import Link from "next/link"

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

export default function Pricing() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600">Start free. Upgrade when you're ready to scale.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
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
    </div>
  )
}
