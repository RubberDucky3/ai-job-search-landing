import type { NextApiRequest, NextApiResponse } from "next"
import crypto from "crypto"

// In-memory user store (shared with signup.ts)
// In production, replace with Supabase
const users: Record<string, {
  id: string
  email: string
  name: string
  passwordHash: string
  plan: string
  applications_used: number
}> = (global as any).__jobsearch_users || ((global as any).__jobsearch_users = {})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  // Find user by email
  const user = Object.values(users).find(u => u.email === email)

  if (!user) {
    return res.status(401).json({ error: "No account found with this email" })
  }

  // Verify password
  const passwordHash = crypto.createHash("sha256").update(password).digest("hex")
  if (user.passwordHash !== passwordHash) {
    return res.status(401).json({ error: "Incorrect password" })
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    applications_used: user.applications_used,
  }

  // Set cookie (not HttpOnly so client can read it)
  res.setHeader(
    "Set-Cookie",
    `aijs_user=${encodeURIComponent(JSON.stringify(safeUser))}; Path=/; Max-Age=31536000; SameSite=Lax`
  )

  return res.status(200).json({ success: true, user: safeUser })
}
