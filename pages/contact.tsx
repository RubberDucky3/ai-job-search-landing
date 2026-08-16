import { useState } from "react"
import Link from "next/link"
import { Send } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "", company: "" })
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Sales</h1>
          <p className="text-gray-600">
            Have questions about the Team plan? Want to discuss custom integrations?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({...form, company: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({...form, message: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {status === "sending" ? (
              <>Sending...</>
            ) : status === "sent" ? (
              <>✓ Sent!</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Or email us directly at{" "}
          <a href="mailto:jeromefrancis.dev@gmail.com" className="text-primary-600">
            jeromefrancis.dev@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
