import { Calendar, User, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-primary-700">AIJobSearch.ai</Link>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Aug 16, 2026</span>
            <span className="flex items-center"><User className="h-4 w-4 mr-1" />Jerome Francis</span>
            <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />8 min read</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How I Used AI to Automate My Entire Job Search (And Got Hired)
          </h1>
          <p className="text-xl text-gray-600">
            The story of building and using an AI-powered job application framework that went from
            69 applications to 20 interviews to a signed offer — and how you can use it too.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            In late 2025, I was laid off from my role as a geophysicist. I had 60 days to find
            something new. My first instinct was to do what every job seeker does: open LinkedIn,
            spend hours reading job postings, and spend entire Sunday nights writing cover letters
            that probably never got read.
          </p>

          <p>
            But I'm a builder. And I had just spent months working with Claude Code. So I asked
            myself: why don't I make Claude do the work for me?
          </p>

          <h2>The System I Built</h2>
          <p>
            I built a framework I call <strong>ai-job-search</strong> — an AI job application
            assistant that lives inside Claude Code. Here's how it works:
          </p>

          <ol>
            <li>
              <strong>Profile setup</strong>: I feed Claude my CV, LinkedIn export, diplomas,
              and past application records. It builds a structured digital twin of my career.
            </li>
            <li>
              <strong>Job scraping</strong>: It searches 50+ job boards simultaneously,
              deduplicates results, and scores each posting against my profile.
            </li>
            <li>
              <strong>Apply workflow</strong>: For each job I select, two AI agents go to work:
              one drafts a tailored CV and cover letter, another reviews and critiques the drafts.
              Then the system compiles the LaTeX PDFs, visually inspects them, and verifies
              ATS compatibility.
            </li>
            <li>
              <strong>Interview prep</strong>: When I land an interview, it generates a prep pack
              with STAR examples, company research, and mock interview questions.
            </li>
          </ol>

          <h2>The Results</h2>
          <p>
            The numbers speak for themselves:
          </p>
          <ul>
            <li><strong>69 applications</strong> (automated, not manual)</li>
            <li><strong>20 first interviews</strong> (33% response rate vs. industry average ~5%)</li>
            <li><strong>1 signed offer</strong> as an AI engineer at a startup</li>
            <li><strong>2 months</strong> from start to first day of work</li>
          </ul>

          <h2>Why This Works When Other Tools Don't</h2>
          <p>
            Most job boards claim to "match you with jobs." But they're just keyword matchers.
            My system does real semantic evaluation — it understands <em>context</em>, not just
            keywords.
          </p>
          <p>
            For example, when applying for an "AI Infrastructure Engineer" role, it recognizes
            that my experience deploying LLM pipelines counts as "infrastructure" even if I
            didn't use that exact job title. It frames my experience in the language of the
            posting without fabricating anything.
          </p>
          <p>
            The key insight: <strong>honesty beats flattery every time</strong>. I told
            every employer I spoke to that my applications were AI-assisted. Instead of
            counting against me, it usually sparked a genuine technical conversation.
          </p>

          <h2>Try It Yourself</h2>
          <p>
            The full framework is open source on GitHub:
          </p>
          <ul>
            <li>
              <strong>Self-host (free)</strong>: Fork the repo, run it locally with Claude Code.
              You own your data and your workflow.
            </li>
            <li>
              <strong>Hosted (paid)</strong>: AIJobSearch.ai runs the same workflow on our
              servers — no installation needed. Free tier includes 3 applications/month,
              Pro is $9/month for 20.
            </li>
          </ul>

          <p>
            If you're job searching right now and reading cover letters on Sunday nights,
            <a href="https://ai-job-search-saas.vercel.app/signup"> this is for you</a>.
          </p>
        </div>
      </article>
    </div>
  )
}
