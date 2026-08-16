import type { NextApiRequest, NextApiResponse } from "next"
import { signIn } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  try {
    await signIn(email, password)
    return res.status(200).json({ success: true })
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}
