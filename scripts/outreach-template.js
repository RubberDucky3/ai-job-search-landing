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
    subject: "CS student built an AI tool that writes your cover letters for you",
    body: `Hey {name},

I'm a CS student at UT Dallas building tools to make the job search less painful.
I built an AI system that:

• Scrapes 50+ job boards and ranks them by fit score
• Writes tailored CV + cover letters automatically
• Prepares interview talking points

It's open source: https://github.com/RubberDucky3/ai-job-search

And there's a hosted version if you'd rather not set up the tooling:
https://ai-job-search-saas.vercel.app

If you're job searching, I'd love your feedback. It's in free beta right now.

Jerome
`,
  },

  "cs-students": {
    subject: `{name} — I built an AI job search tool, want to try it?`,
    body: `Hey {name},

I'm Jerome, a CS student at UT Dallas. I built an AI framework that automates the job search — from finding postings to writing cover letters to interview prep.

It's open source:
https://github.com/RubberDucky3/ai-job-search

And there's a hosted version too:
https://ai-job-search-saas.vercel.app

I'm looking for fellow students to test it. Would you be interested in trying it out? It's free while in beta.

Jerome
`,
  },

  "career-coaches": {
    subject: "New tool for career coaches: AI job application automation",
    body: `Hi {name},

I'm reaching out because you work with job seekers — and I built something that might save your clients hours of manual work.

I'm Jerome, a CS student at UT Dallas. I built an AI job search framework that:

• Automatically tailors CVs and cover letters for each job posting
• Compiles and verifies PDFs for ATS compliance
• Generates interview prep packs

It's open source on GitHub and also available as a hosted service.

{note}

I'd love to show you a quick demo. The Team plan ($49/mo) lets your clients use it under your guidance.

Jerome
`,
  },

  "reddit-post": {
    title: "Show HN: AI job search tool I built as a CS student (open source)",
    body: `**Background:**
I'm a CS student at UT Dallas building tools to make the job search less painful.
I built an AI framework (on Claude Code) that automates the most tedious parts of job hunting.

**What it does:**
1. Scrapes 50+ job boards simultaneously, deduplicates results, and ranks them by fit score
2. Drafts tailored CV + cover letter using LaTeX
3. Spawns a second AI agent to review and critique the drafts
4. Compiles PDFs and visually verifies formatting
5. Runs ATS text-layer verification
6. Generates interview prep packs with STAR examples

**Open source:** https://github.com/RubberDucky3/ai-job-search

**Hosted version (free beta):** https://ai-job-search-saas.vercel.app

**Blog post:** https://ai-job-search-saas.vercel.app/blog

**Tech stack:** Claude Code, TypeScript, Python, LaTeX, Docker

I'm looking for feedback from fellow students and job seekers. Would love to hear what you think!
`,
  },
}

function generateAll() {
  const outputDir = outreachDir
  fs.mkdirSync(outputDir, { recursive: true })

  Object.entries(templates).forEach(([key, tmpl]) => {
    const filePath = path.join(outputDir, `${key}.txt`)
    const content = key === "reddit-post"
      ? `TITLE: ${tmpl.title}\n\n${tmpl.body}`
      : `SUBJECT: ${tmpl.subject}\n\n${tmpl.body}`
    fs.writeFileSync(filePath, content)
    console.log(`✅ Template: ${filePath}`)
  })
}

generateAll()
