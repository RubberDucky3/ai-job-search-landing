export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-lg text-gray-600">
        <p><strong>Last updated:</strong> August 2026</p>
        <h2>Information We Collect</h2>
        <p>We collect only the information you provide during signup: your name, email address, and password (stored securely via Supabase Auth). We also store your job application usage counters and any documents you upload for processing.</p>
        <h2>How We Use Your Information</h2>
        <p>We use your information solely to: provide and maintain our service, process your job applications, and communicate with you about your account. We never sell your data or use it for training AI models.</p>
        <h2>Data Security</h2>
        <p>All data is encrypted in transit (TLS) and at rest. Passwords are hashed via bcrypt. Uploaded documents are stored in secure object storage and deleted after 30 days of account deletion.</p>
        <h2>Contact</h2>
        <p>Questions? Email jeromefrancis.dev@gmail.com</p>
      </div>
    </div>
  )
}
