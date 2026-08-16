#!/bin/bash
# Full 7-day launch campaign automation
# Run daily or as needed

set -e

echo "🚀 AIJobSearch.ai Launch Campaign"
echo "================================"
echo ""

# Step 1: Regenerate content
echo "[1/6] Regenerating blog post & outreach templates..."
node scripts/generate-blog-post.js
node scripts/outreach-template.js
node scripts/outreach-contacts.js
echo ""

# Step 2: Check waitlist count
echo "[2/6] Checking waitlist..."
WAITLIST_COUNT=$(curl -s -X POST "https://ai-job-search-saas.vercel.app/api/waitlist" \
  -H "Content-Type: application/json" \
  -d '{"email":"campaign-check@ai-job-search.ai","source":"launch-campaign"}' | jq -r '.count' 2>/dev/null || echo "?")
echo "   Waitlist count: $WAITLIST_COUNT"
echo ""

# Step 3: Verify site health
echo "[3/6] Verifying site health..."
for page in "/" "/signup" "/pricing" "/blog/how-i-used-ai-to-land-my-job" "/login"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://ai-job-search-saas.vercel.app${page}")
  if [ "$STATUS" = "200" ]; then
    echo "   ✅ $page"
  else
    echo "   ❌ $page (HTTP $STATUS)"
  fi
done
echo ""

# Step 4: Print Reddit/HN post
echo "[4/6] Reddit / Show HN post (copy below):"
echo "----"
cat content/outreach/reddit-post.txt | head -60
echo "..."
echo "----"
echo "   → Post to: r/jobsearch, r/cscareerquestions, HN/show, Indie Hackers"
echo ""

# Step 5: Print Twitter thread
echo "[5/6] Twitter/X thread (copy below):"
cat content/outreach/reddit-post.txt > /dev/null  # placeholder
echo "----"
echo "Tweet 1: I was laid off. So I built an AI that automated my entire job search."
echo "  69 apps → 20 interviews → 1 offer. Thread:"
echo "Tweet 2: [Key features list]"
echo "Tweet 3: [Honesty insight]"
echo "Tweet 4: GitHub + hosted links"
echo "Tweet 5: Pricing"
echo "----"
echo ""

# Step 6: Print outreach tracker
echo "[6/6] Personal outreach tracker:"
echo "   → See: content/outreach/personal-emails/outreach-tracker.csv"
echo ""

# Step 7: Print social assets checklist
echo "[7/6] Social media assets ready:"
echo "   → Image prompts: assets/social/prompts/"
echo "   → OG template: assets/social/templates/og-image.svg"
echo "   → Dimensions: assets/social/dimensions.md"
echo ""
echo "   Platforms to post to:"
echo "   ✅ Twitter: Use prompts/twitter-thread-images.md"
echo "   ✅ Reddit: Use prompts/reddit-post-image.md"
echo "   ✅ LinkedIn: Use prompts/linkedin-post.md"
echo "   ✅ Instagram: Use prompts/instagram-story.md"
echo "   ✅ HN: Use prompts/hn-post-image.md"
echo ""

echo "✅ Campaign ready. Next actions:"
echo "   1. Generate social images using the prompts in assets/social/prompts/"
echo "   2. Edit scripts/outreach-contacts.js with real contacts"
echo "   3. Run: node scripts/outreach-contacts.js"
echo "   4. Post Reddit thread + image to relevant subreddits"
echo "   5. Submit to Hacker News Show"
echo "   6. Post Twitter thread + images"
echo "   7. Post LinkedIn update + image"
echo "   8. Post Instagram story + image"
echo "   9. Send emails to personal contacts"
