#!/usr/bin/env node
/**
 * Auto-generates a blog post from the ai-job-search repo
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

function generatePost() {
  const readme = extractReadme()
  const slug = "i-built-an-ai-job-search-tool-as-a-college-student"
  const date = new Date().toISOString().split("T")[0]

  const html = `<!-- AUTO-GENERATED: Run 'node scripts/generate-blog-post.js' to regenerate -->
<div class="prose prose-lg max-w-none">
  <h1>I Built an AI Job Search Tool as a College Student (And Open-Sourced It)</h1>
  
  <p class="lead">
    I'm a CS student at UT Dallas building tools to help people navigate job searches.
    This AI framework automates the most tedious parts of job hunting.
  </p>

  <h2>The Problem I'm Solving</h2>
  
  <p>
    As a college student, I've watched friends spend <em>hours</em> every week on their job search.
    Hours reading job descriptions, rewriting cover letters, tweaking resumes for every application.
    It's exhausting and it's not why they got into engineering.
  </p>

  <p>
    So I built <a href="https://github.com/RubberDucky3/ai-job-search">ai-job-search</a> — an AI
    framework that automates the job hunt. And I'm also offering it as a hosted service so people
    don't have to set up Claude Code + LaTeX locally.
  </p>

  <h2>What It Does</h2>
  
  <p>The framework is built on Claude Code and has four stages:</p>

  <h3>1. Profile Setup</h3>
  <p>
    Feed the system a CV, LinkedIn export, diplomas, and past application records.
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

  <h2>Why This Works</h2>
  
  <p>
    Most job boards claim to match you with jobs. But they're just keyword matchers.
    My system does real semantic evaluation — it understands <em>context</em>, not just
    keywords.
  </p>
  
  <p>
    For example, when applying for an "AI Infrastructure Engineer" role, it recognizes that
    experience deploying LLM pipelines counts as "infrastructure" even if you didn't use
    that exact job title. It frames your experience in the language of the posting —
    <strong>without fabricating anything</strong>.
  </p>

  <h2>Try It Yourself</h2>
  
  <p>There are two ways to use this:</p>

  <h3>Option 1: Self-host (Free)</h3>
  <p>
    Fork the <a href="https://github.com/RubberDucky3/ai-job-search">ai-job-search repo</a>,
    run it locally with Claude Code. You own your data. MIT license.
  </p>

  <h3>Option 2: Hosted Beta (Free while in beta)</h3>
  <p>
    <a href="https://ai-job-search-saas.vercel.app">AIJobSearch.ai</a> runs the
    same workflow on our servers — no installation needed. Currently in free beta.
  </p>
  
  <div class="bg-gray-50 p-6 rounded-lg">
    <ul class="list-none space-y-2">
      <li><strong>Free tier</strong>: 3 AI applications/month — perfect for trying it out</li>
      <li><strong>Pro</strong>: \$9/month — 20 applications, multi-portal scraping, interview prep</li>
      <li><strong>Team</strong>: \$49/month — for career coaches and agencies</li>
    </ul>
  </div>

  <h2>Built With</h2>
  <p>
    Claude Code, TypeScript, Python, LaTeX, Docker.
    <br/>
    <a href="https://github.com/RubberDucky3/ai-job-search">View on GitHub</a> |
    <a href="https://ai-job-search-saas.vercel.app">Try hosted version</a>
  </p>
</div>`

  const mdPath = path.join(blogDir, `${slug}.md`)
  fs.mkdirSync(blogDir, { recursive: true })
  fs.writeFileSync(mdPath, "---\n" +
    `title: "I Built an AI Job Search Tool as a College Student"\n` +
    `date: "${date}"\n` +
    `---\n\n` +
    html)

  console.log(`✅ Blog post generated: ${mdPath}`)
}

generatePost()
