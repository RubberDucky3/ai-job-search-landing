import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-18",
})

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    stripeProductId: process.env.STRIPE_FREE_PRODUCT_ID || "",
    stripePriceId: process.env.STRIPE_FREE_PRICE_ID || "",
    features: [
      "3 AI applications per month",
      "Basic fit evaluation",
      "Tailored CV + cover letter",
      "PDF compilation & verification",
      "ATS keyword check",
    ],
    limit: 3,
  },
  pro: {
    name: "Pro",
    price: 900, // $9.00 in cents
    stripeProductId: process.env.STRIPE_PRO_PRODUCT_ID || "",
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
    features: [
      "20 AI applications per month",
      "Multi-portal job scraping (50+ boards)",
      "Interviewer prep packs",
      "Salary benchmarking",
      "Priority support",
      "Application tracker dashboard",
    ],
    limit: 20,
  },
  team: {
    name: "Team",
    price: 4900, // $49.00 in cents
    stripeProductId: process.env.STRIPE_TEAM_PRODUCT_ID || "",
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID || "price_team_monthly",
    features: [
      "100 AI applications per month",
      "White-label CV templates",
      "Custom job portal integrations",
      "Team collaboration workspace",
      "API access",
      "Dedicated account manager",
    ],
    limit: 100,
  },
} as const

export type PlanKey = keyof typeof PLANS
