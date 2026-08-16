import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  // In development, simulate login
  // In production, this would verify against Supabase Auth

  const user = {
    id: "user_demo_" + Math.random().toString(36).substring(7),
    name: email.split("@")[0],
    email,
    plan: "free" as const,
    applications_used: 0,
    created_at: new Date().toISOString(),
  }

  res.setHeader(
    "Set-Cookie",
    `aijs_user=${encodeURIComponent(JSON.stringify(user))}; Path=/; HttpOnly; Max-Age=31536000; SameSite=Lax`
  )

  return res.status(200).json({ success: true, user })
}
