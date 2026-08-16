import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { name, email, password, plan } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields: name, email, password" })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" })
  }

  // For demo/beta: don't store server-side, just return user
  // In production, use Supabase Auth + database storage
  const user = {
    id: "user_" + Math.random().toString(36).substring(7),
    name,
    email,
    plan: (plan || "free") as "free" | "pro" | "team",
    applications_used: 0,
    created_at: new Date().toISOString(),
  }

  return res.status(200).json({
    success: true,
    user,
    requiresPayment: plan && plan !== "free",
    message: plan === "free"
      ? "Account created!"
      : "Account created! In production this would redirect to Stripe.",
  })
}
