import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  // For demo/beta: accept any valid email+password combo
  // In production, verify against Supabase Auth
  const name = email.split("@")[0]

  // Determine plan from query param or default to free
  const plan = (req.query.plan as string) || "free"

  const user = {
    id: "user_" + Math.random().toString(36).substring(7),
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email,
    plan: plan as "free" | "pro" | "team",
    applications_used: 0,
    created_at: new Date().toISOString(),
  }

  return res.status(200).json({ success: true, user })
}
