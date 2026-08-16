import type { NextApiRequest, NextApiResponse } from "next"

// Simple in-memory store for development (replace with Supabase in production)
let waitlistStore: Array<{ email: string; source?: string; timestamp: string }> = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, source } = req.body

  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }

  waitlistStore.push({ email, source, timestamp: new Date().toISOString() })

  // Subscribe to Buttondown (if API key is configured)
  if (process.env.BUTTONDOWN_API_KEY) {
    try {
      await fetch("https://buttondown.email/api/emails", {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "list",
          tags: source ? [source] : [],
        }),
      })
    } catch (e) {
      console.error("Buttondown sync failed:", e)
    }
  }

  return res.status(200).json({
    success: true,
    message: "Added to waitlist",
    count: waitlistStore.length,
  })
}
