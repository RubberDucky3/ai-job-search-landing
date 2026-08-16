#!/bin/bash
# Auto-post to multiple platforms
# Usage: ./post-to-platforms.sh
# Requires: curl, jq

set -e

LANDING_URL="https://ai-job-search-saas.vercel.app"
BLOG_URL="https://ai-job-search-saas.vercel.app/blog/how-i-used-ai-to-land-my-job"
REPO_URL="https://github.com/RubberDucky3/ai-job-search"

echo "=== AIJobSearch.ai Auto-Poster ==="
echo "Landing: $LANDING_URL"
echo "Blog: $BLOG_URL"
echo "Repo: $REPO_URL"
echo ""

# 1. Generate fresh blog post from repo
echo "[1/4] Generating blog post..."
node scripts/generate-blog-post.js

# 2. Generate outreach templates
echo "[2/4] Generating outreach templates..."
node scripts/outreach-template.js

# 3. Print ready-to-paste content
echo "[3/4] Ready-to-paste content:"
echo ""
echo "--- Reddit / Hacker News Post ---"
cat content/outreach/reddit-post.txt
echo ""
echo ""
echo "--- Twitter Thread (copy-paste) ---"
cat << 'TWITTER'
Tweet 1:
I was laid off. So I built an AI that automated my entire job search.

69 applications. 20 interviews. 1 job offer. 2 months.

Here's the thread: ⬇️

Tweet 2:
The system runs on Claude Code and does 6 things automatically:

1. Scrapes 50+ job boards, deduplicates, ranks by fit
2. Writes tailored CV + cover letter (LaTeX)
3. Spawns a 2nd AI agent to review & critique
4. Compiles PDFs and visually verifies formatting
5. Verifies ATS text-layer compatibility
6. Generates interview prep packs

Tweet 3:
The key insight: honesty beats flattery every time.

I told every employer my applications were AI-assisted. Instead of counting against me, it sparked technical conversations.

Tweet 4:
It's open source 👇
https://github.com/RubberDucky3/ai-job-search

And there's a hosted version:
https://ai-job-search-saas.vercel.app

Tweet 5:
Free: 3 applications/month
Pro: $9/month (20 applications + scraping + interview prep)
Team: $49/month (agencies + white-label templates)

Try it free:
https://ai-job-search-saas.vercel.app/signup
TWITTER
echo ""

# 4. Summary
echo "[4/4] Next steps:"
echo "  - Post Reddit thread to r/jobsearch, r/cscareerquestions, r/ArtificialIntelligence"
echo "  - Submit to Hacker News: https://news.ycombinator.com/show"
echo "  - Post Twitter thread above"
echo "  - Submit to Indie Hackers: https://indiehackers.com/"
echo "  - Email personal contacts using content/outreach/cs-students.txt"
echo "  - Update LinkedIn with blog post link"
