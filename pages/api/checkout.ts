import type { NextApiRequest, NextApiResponse } from "next"
import { stripe, PLANS } from "@/lib/stripe"
import { getCurrentUser } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { plan } = req.body

  if (!plan || !(plan in PLANS)) {
    return res.status(400).json({ error: "Invalid plan" })
  }

  const planData = PLANS[plan as keyof typeof PLANS]

  if (planData.price === 0) {
    return res.status(200).json({ message: "Free plan, no checkout needed" })
  }

  try {
    const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: planData.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      plan,
    },
  })

  return res.status(200).json({ url: session.url })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
