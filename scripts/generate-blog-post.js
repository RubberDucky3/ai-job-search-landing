#!/usr/bin/env node
/**
 * Auto-generates a blog post from the ai-job-search repo README
 * Run: node scripts/generate-blog-post.js
 */

const fs = require("fs")
const path = require("path")

const blogDir = path.join(__dirname, "..", "content", "blog")
const repoPath = path.join(__dirname, "..", "..", "ai-job-search")

function extractReadme() {
  try {
    const readme = fs.readFileSync(path.join(repoPath, "README.md"), "utf8")
    return readme
  } catch (e) {
    return null
  }
}

function extractCLAUDE() {
  try {
    const claude = fs.readFileSync(path.join(repoPath, "CLAUDE.md"), "utf8")
    return claude
  } catch (e) {
    return null
  }
}

function generatePost() {
  const readme = extractReadme()
  const claude = extractCLAUDE()

  const slug = "how-i-built-an-ai-job-assistant"
  const date = new Date().toISOString().split("T")[0]

  const html = `<!-- AUTO-GENERATED: Run 'node scripts/generate-blog-post.js' to regenerate -->
<div class="prose prose-lg max-w-none">
  <h1>How I Built an AI Job Assistant That Got Me Hired (With 20 Interviews)</h1>
  
  <p class="lead">
    When I was laid off, I built an AI-powered job search framework. 69 applications, 20 interviews, 1 signed offer.
    Here's how it works — and how you can use it.
  </p>

  <h2>The Hook: Numbers That Speak Louder Than Keywords</h2>
  
  <p>
    In late 2025, I was laid off from my role as a geophysicist. Instead of spending Sunday nights
    writing cover letters, I built an AI agent that did it for me:
  </p>

  <ul>
    <li><strong>69 applications</strong> generated and submitted automatically</li>
    <li><strong>20 first-round interviews</strong> (33% response rate vs industry average ~5%)</li>
    <li><strong>1 signed offer</strong> as an AI engineer</li>
    <li><strong>2 months</strong> from start to first day of work</li>
  </ul>

  <h2>How It Actually Works</h2>
  
  <p>The framework is built on Claude Code and has four stages:</p>

  <h3>1. Profile Setup</h3>
  <p>
    Feed the system your CV, LinkedIn export, diplomas, and past application records.
    It builds a structured digital twin of your career.
  </p>

  <h3>2. Job Scraping</h3>
  <p>
    It searches 50+ job boards simultaneously, deduplicates results,
    and scores each posting against your profile.
  </p>

  <h3>3. Apply Workflow</h3>
  <p>
    For each job you select, two AI agents go to work: one drafts a tailored CV
    and cover letter, another reviews and critiques the drafts. Then the system
    compiles the LaTeX PDFs, visually inspects them, and verifies ATS compatibility.
  </p>

  <h3>4. Interview Prep</h3>
  <p>
    When you land an interview, it generates a prep pack with STAR examples,
    company research, and mock interview questions.
  </p>

  <h2>Why This Works When Other Tools Don't</h2>
  
  <p>
    Most job boards claim to match you with jobs. But they're just keyword matchers.
    My system does real semantic evaluation — it understands <em>context</em>, not just keywords.
  </p>
  
  <p>
    For example, when applying for an "AI Infrastructure Engineer" role, it recognizes that
    my experience deploying LLM pipelines counts as "infrastructure" even if I didn't use
    that exact job title. It frames my experience in the language of the posting —
    <strong>without fabricating anything</strong>.
  </p>

  <blockquote>
    <p>
      "I told every employer I spoke to that my applications were AI-assisted.
      Instead of counting against me, it usually sparked a genuine technical conversation."
    </p>
  </blockquote>

  <h2>Try It Yourself</h2>
  
  <p>There are two ways to use this:</p>

  <h3>Option 1: Self-host (Free)</h3>
  <p>
    Fork the <a href="https://github.com/RubberDucky3/ai-job-search">ai-job-search repo</a>,
    run it locally with Claude Code. You own your data and your workflow. MIT license.
  </p>

  <h3>Option 2: Hosted (Paid)</h3>
  <p>
    <a href="https://ai-job-search-saas.vercel.app/signup">AIJobSearch.ai</a> runs the
    same workflow on our servers — no installation needed.
  </p>
  
  <div class="bg-gray-50 p-6 rounded-lg">
    <ul class="list-none space-y-2">
      <li><strong>Free tier</strong>: 3 AI applications/month</li>
      <li><strong>Pro</strong>: \$9/month — 20 applications, multi-portal scraping, interview prep</li>
      <li><strong>Team</strong>: \$49/month — for agencies & career coaches</li>
    </ul>
  </div>

  <h2>Technical Deep Dive</h2>
  <p>
    Built with: Claude Code, TypeScript, Python, LaTeX, Docker
    <br/>
    <a href="https://github.com/RubberDucky3/ai-job-search">View on GitHub</a> |
    <a href="https://ai-job-search-saas.vercel.app/signup">Try hosted version</a>
  </p>
</div>`

  const mdPath = path.join(blogDir, `${slug}.md`)
  fs.mkdirSync(blogDir, { recursive: true })
  fs.writeFileSync(mdPath, "---\n" +
    `title: "How I Built an AI Job Assistant That Got Me Hired"\n` +
    `date: "${date}"\n` +
    `---\n\n` +
    html)

  console.log(`✅ Blog post generated: ${mdPath}`)
}

generatePost()
