import type { NextApiRequest, NextApiResponse } from "next"
import crypto from "crypto"

// Simple in-memory user store for development
// In production, replace with Supabase
const users: Record<string, {
  id: string
  email: string
  name: string
  passwordHash: string
  plan: string
  applications_used: number
}> = {}

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

  // Check if user already exists
  const existingUser = Object.values(users).find(u => u.email === email)
  if (existingUser) {
    return res.status(409).json({ error: "User already exists with this email" })
  }

  // Hash password (in production, use bcrypt/argon2)
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex")

  const userId = "user_" + crypto.randomBytes(8).toString("hex")

  const user = {
    id: userId,
    email,
    name,
    passwordHash,
    plan: plan || "free",
    applications_used: 0,
    created_at: new Date().toISOString(),
  }

  // Store user
  users[userId] = user

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    applications_used: user.applications_used,
  }

  // Set cookie (not HttpOnly so client can also read via localStorage)
  res.setHeader(
    "Set-Cookie",
    `aijs_user=${encodeURIComponent(JSON.stringify(safeUser))}; Path=/; Max-Age=31536000; SameSite=Lax`
  )

  return res.status(200).json({
    success: true,
    user: safeUser,
    requiresPayment: plan && plan !== "free",
    message: plan === "free"
      ? "Account created!"
      : "Account created! Please complete payment for Pro.",
  })
}
