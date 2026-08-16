#!/usr/bin/env node
/**
 * Auto-generates outreach email templates for different audiences.
 * Run: node scripts/outreach-template.js
 */

const fs = require("fs")
const path = require("path")

const outreachDir = path.join(__dirname, "..", "content", "outreach")

const templates = {
  "job-seekers": {
    subject: "Tired of writing cover letters all weekend? AI can help.",
    body: `Hi {name},

I saw you're job searching — same situation I was in a few months ago. Instead of spending Sunday nights on cover letters, I built an AI assistant that:

• Scrapes 50+ job boards and ranks them by fit score
• Writes tailored CV + cover letters in LaTeX (then verifies the PDFs)
• Prepares interview talking points

I used it to get 20 interviews and 1 offer in 2 months.

If you're interested, I'm offering 7 days free on the Pro plan ($9/mo, normally):
https://ai-job-search-saas.vercel.app/signup?plan=pro

Would love your feedback if you try it,
Jerome
`,
  },

  "cs-students": {
    subject: `{name} — automate your job search with AI (built by a fellow CS student)`,
    body: `Hi {name},

I'm Jerome, a CS student at UT Dallas. When I needed to find a job, I built an AI framework that automated the entire process — from finding postings to writing cover letters to interview prep.

It landed me 20 interviews and an AI engineering role at a startup.

The tool is open source:
https://github.com/RubberDucky3/ai-job-search

And there's a hosted version too:
https://ai-job-search-saas.vercel.app

I'm looking for early beta testers — would you be interested in 7 days free on Pro?

Jerome
`,
  },

  "career-coaches": {
    subject: "New tool for career coaches: AI job application automation",
    body: `Hi {name},

I'm reaching out because you're a career coach — and I built something that might save you hours of manual work.

I'm Jerome, a CS student who built an AI job search framework. It's now available as a hosted service (AIJobSearch.ai) that:

• Automatically tailors CVs and cover letters for each job posting
• Compiles and verifies PDFs for ATS compliance
• Generates interview prep packs

The Team plan ($49/mo) lets your clients use it under your supervision, with your white-label templates.

I'd love a 10-minute call to show you how it works. Are you free any time this week?

Jerome
`,
  },

  "reddit-post": {
    title: "Show HN: AI job search tool that got me 20 interviews and a job offer",
    body: `**Background:**
I was laid off from my geophysicist role in late 2025. With 60 days to find something new, I built an AI framework (on Claude Code) to automate my entire job search.

**Results:**
• 69 AI-generated, tailored applications
• 20 first-round interviews (33% response rate vs ~5% industry average)  
• 1 signed offer as an AI engineer
• 2 months from start to first day

**What it does:**
1. Scrapes 50+ job boards, deduplicates, and ranks by fit score
2. Drafts tailored CV + cover letter using LaTeX
3. Spawns a second AI agent to review and critique the drafts
4. Compiles PDFs and visually verifies formatting
5. Runs ATS text-layer verification
6. Generates interview prep packs with STAR examples

**Tech stack:** Claude Code, TypeScript, Python, LaTeX, Docker

**Links:**
• OSS repo (MIT): https://github.com/RubberDucky3/ai-job-search
• Hosted version: https://ai-job-search-saas.vercel.app (Free: 3 apps/mo, Pro: $9/mo for 20)
• Blog post: https://ai-job-search-saas.vercel.app/blog/how-i-used-ai-to-land-my-job
`,
  },
}

function generateAll() {
  fs.mkdirSync(outreachDir, { recursive: true })

  Object.entries(templates).forEach(([key, tmpl]) => {
    const filePath = path.join(outreachDir, `${key}.txt`)
    const content = key === "reddit-post"
      ? `TITLE: ${tmpl.title}\n\n${tmpl.body}`
      : `SUBJECT: ${tmpl.subject}\n\n${tmpl.body}`
    fs.writeFileSync(filePath, content)
    console.log(`✅ Template: ${filePath}`)
  })
}

generateAll()
