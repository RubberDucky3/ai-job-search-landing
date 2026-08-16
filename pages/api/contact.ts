import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { name, email, message, company } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  // In production: send email via SendGrid/Resend
  console.log("Contact form submission:", { name, email, message, company })

  // Simulate success
  return res.status(200).json({
    success: true,
    message: "Message sent! We'll get back to you within 24 hours.",
  })
}
