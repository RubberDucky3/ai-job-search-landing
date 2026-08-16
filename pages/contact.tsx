import { useState } from "react"
import Link from "next/link"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open email client
    const subject = encodeURIComponent(`AIJobSearch.ai - ${form.company ? `Team Plan Inquiry` : form.message.slice(0, 50)}`)
    const body = encodeURIComponent(`${form.name}\n${form.email}\n\n${form.company ? `Company: ${form.company}\n` : ""}${form.message}`)
    window.location.href = `mailto:jeromefrancis.dev@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Sales</h1>
        <p className="text-gray-600 mb-8">
          Have questions about the Team plan? Want to discuss custom integrations? Send us a message.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md font-medium"
          >
            Send Message
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-500">
          Or email us directly at <a href="mailto:jeromefrancis.dev@gmail.com" className="text-primary-600">jeromefrancis.dev@gmail.com</a>
        </p>
      </div>
    </div>
  )
}
