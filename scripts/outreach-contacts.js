#!/usr/bin/env node
/**
 * Generates personalized outreach emails for your personal network.
 * Edit the contacts array with your real contacts, then run this script.
 *
 * Usage: node scripts/outreach-contacts.js
 * Output: ./content/outreach/personal-emails/*.txt
 */

const fs = require("fs")
const path = require("path")

// === YOUR PERSONAL CONTACTS ===
// Edit this list with people you know who might be interested in job search tools
const contacts = [
  // Career coaches / recruiters
  {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    relation: "career coach",
    category: "career-coaches",
    note: "Works with tech professionals transitioning roles",
  },
  // Fellow job seekers
  {
    name: "Alex Rodriguez",
    email: "alex.r@example.com",
    relation: "fellow job seeker",
    category: "job-seekers",
    note: "Recent CS grad, been job searching for 3 months",
  },
  {
    name: "Maya Patel",
    email: "maya.patel@example.com",
    relation: "fellow job seeker",
    category: "job-seekers",
    note: "Switched from finance to tech, struggling with cover letters",
  },
  // CS students / devs
  {
    name: "David Kim",
    email: "david.kim@utd.edu",
    relation: "UTD CS classmate",
    category: "cs-students",
    note: "Senior, hasn't started job search yet",
  },
  {
    name: "Jessica Wang",
    email: "j.wang@icloud.com",
    relation: "coding bootcamp friend",
    category: "cs-students",
    note: "Graduating next month, nervous about job hunt",
  },
  // Industry connections
  {
    name: "Raj Patel",
    email: "raj@startups.com",
    relation: "Startup hiring manager",
    category: "career-coaches",
    note: "Hires devs regularly, might know job seekers to refer",
  },
]

// === EMAIL TEMPLATES ===
const templates = {
  "job-seekers": `
Hi {name},

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

  "cs-students": `
Hi {name},

I'm Jerome, a CS student at UT Dallas. When I needed to find a job, I built an AI framework that automated the entire process — from finding postings to writing cover letters to interview prep.

It landed me 20 interviews and an AI engineering role at a startup.

The tool is open source:
https://github.com/RubberDucky3/ai-job-search

And there's a hosted version too:
https://ai-job-search-saas.vercel.app

I'm looking for early beta testers — would you be interested in 7 days free on Pro?

Jerome
`,

  "career-coaches": `
Hi {name},

I'm reaching out because you work with job seekers — and I built something that might save your clients hours of manual work.

I'm Jerome, a CS student who built an AI job search framework. It's now available as a hosted service (AIJobSearch.ai) that:

• Automatically tailors CVs and cover letters for each job posting
• Compiles and verifies PDFs for ATS compliance
• Generates interview prep packs

{note}

I'd love to show you a quick demo. The Team plan ($49/mo) lets your clients use it under your guidance.

Jerome
`,
}

function generate() {
  const outputDir = path.join(__dirname, "..", "content", "outreach", "personal-emails")
  fs.mkdirSync(outputDir, { recursive: true })

  let allContent = []

  contacts.forEach((c) => {
    const template = templates[c.category] || templates["job-seekers"]
    const email = template
      .replace(/{name}/g, c.name)
      .replace(/{note}/g, c.note || "")

    const filename = `${c.name.toLowerCase().replace(/\s+/g, "-")}-${c.category}.txt`
    const filepath = path.join(outputDir, filename)

    const content = `=== EMAIL TO: ${c.name} <${c.email}> ===
RELATION: ${c.relation}
CATEGORY: ${c.category}
NOTE: ${c.note || "N/A"}

${email.trim()}

---`

    fs.writeFileSync(filepath, content)
    console.log(`✅ ${c.name} (${c.email}) [${c.category}] → ${filepath}`)

    allContent.push({
      name: c.name,
      email: c.email,
      category: c.category,
      filepath,
      subject: c.category === "job-seekers"
        ? "Tired of writing cover letters all weekend? AI can help."
        : c.category === "cs-students"
          ? `${c.name} — automate your job search with AI`
          : "New tool for career coaches: AI job application automation",
      sent: false,
    })
  })

  // Create a CSV tracker
  const csv = "Name,Email,Category,Subject,Filepath,Sent,Notes\n" +
    allContent.map(c => `${c.name},${c.email},${c.category},"${c.subject}",${c.filepath},${c.sent},`).join("\n")

  fs.writeFileSync(path.join(outputDir, "outreach-tracker.csv"), csv)

  console.log(`\n📊 Tracker saved: ${path.join(outputDir, "outreach-tracker.csv")}`)
  console.log(`\n📝 Next steps:`)
  console.log(`  1. Edit contacts in scripts/outreach-contacts.js with real contacts`)
  console.log(`  2. Review generated emails in content/outreach/personal-emails/`)
  console.log(`  3. Send via Gmail/Outlook (or import CSV to Mailchimp/Beehiiv)`)
  console.log(`  4. Update outreach-tracker.csv after sending`)
}

generate()
