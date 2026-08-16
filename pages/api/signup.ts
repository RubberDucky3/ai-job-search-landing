import type { NextApiRequest, NextApiResponse } from "next"

// Simple in-memory store for development. In production, use Supabase.
// This file gets replaced when Supabase env vars are configured.
const IS_PRODUCTION = process.env.NODE_ENV === "production"

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

  // In development, simulate signup and set a cookie
  // In production, this would use Supabase Auth + Stripe checkout for paid plans

  const user = {
    id: "user_" + Math.random().toString(36).substring(7),
    name,
    email,
    plan: plan || "free",
    applications_used: 0,
    created_at: new Date().toISOString(),
    stripe_customer_id: null,
  }

  // Set cookie for authentication
  res.setHeader(
    "Set-Cookie",
    `aijs_user=${encodeURIComponent(JSON.stringify({ id: user.id, name, email, plan }))}; Path=/; HttpOnly; Max-Age=31536000; SameSite=Lax`
  )

  return res.status(200).json({
    success: true,
    user,
    redirectUrl: plan && plan !== "free" ? "" : null,
    message: plan === "free" ? "Account created! Redirecting to dashboard..." : "Account created! Now complete your Stripe checkout.",
  })
}
