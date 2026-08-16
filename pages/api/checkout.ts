import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { plan } = req.body

  if (!plan || !["free", "pro", "team"].includes(plan)) {
    return res.status(400).json({ error: "Invalid plan" })
  }

  if (plan === "free") {
    return res.status(200).json({ message: "Free plan, no checkout needed" })
  }

  // In production, use Stripe to create a checkout session
  // For now, redirect to a Stripe checkout URL
  const stripeLinks = {
    pro: "https://buy.stripe.com/test_28o8bP6aV2iE9aE00",
    team: "https://buy.stripe.com/test_5kA1eH9bJ3iF4W00",
  }

  const url = stripeLinks[plan as "pro" | "team"]

  return res.status(200).json({ url })
}
