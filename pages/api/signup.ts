import type { NextApiRequest, NextApiResponse } from "next"
import { signUp } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password, name, plan } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const result = await signUp(email, password, name, plan || "free")

    // If there's a stripe session, redirect to it
    if (result.stripeSession?.url) {
      return res.status(200).json({
        success: true,
        redirectUrl: result.stripeSession.url,
        message: "Redirecting to payment...",
      })
    }

    return res.status(200).json({ success: true })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}
