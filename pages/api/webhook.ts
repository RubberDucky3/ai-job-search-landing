import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed")
  }

  const sig = req.headers["stripe-signature"] as string

  try {
    const event = stripe.webhooks.constructEvent(
      await new Promise<string>((resolve) => {
        let data = ""
        req.on("data", (chunk) => (data += chunk))
        req.on("end", () => resolve(data))
      }),
      sig,
      webhookSecret
    )

    // Handle subscription events
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        const plan = session.metadata?.plan

        // In production: update Supabase user with subscription status
        console.log(`Payment succeeded for user ${userId}, plan: ${plan}`)
        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        console.log(`Subscription canceled for customer ${subscription.customer}`)
        break
      }
    }

    return res.status(200).json({ received: true })
  } catch (err: any) {
    console.error(`Webhook error: ${err.message}`)
    return res.status(400).send(`Webhook error: ${err.message}`)
  }
}
