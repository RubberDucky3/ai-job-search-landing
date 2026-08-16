# AIJobSearch.ai — Manual Todos (Human Required)

## 🔧 Stripe Setup (REQUIRED for payments)
- [ ] Create Stripe account at https://dashboard.stripe.com/register
- [ ] Create **Pro** product:
  - Name: "AIJobSearch.ai Pro"
  - Price: $9/month (recurring subscription)
  - Currency: USD
  - Copy the Price ID (starts with `price_...`)
- [ ] Create **Team** product:
  - Name: "AIJobSearch.ai Team"
  - Price: $49/month (recurring subscription)
  - Currency: USD
  - Copy the Price ID (starts with `price_...`)
- [ ] Go to Developers → Webhooks → Add endpoint
  - Endpoint URL: `https://ai-job-search-saas.vercel.app/api/webhook`
  - Select events: `checkout.session.completed`, `customer.subscription.deleted`
  - Copy the webhook signing secret

## 🔐 Environment Variables (Add to Vercel)
After Stripe setup, go to https://vercel.com/ → Project → Settings → Environment Variables and add:
- `STRIPE_SECRET_KEY` = Your Stripe secret key (starts with `sk_live_` or `sk_test_`)
- `STRIPE_WEBHOOK_SECRET` = Your webhook signing secret
- `STRIPE_PRO_PRICE_ID` = The Pro plan Price ID from above
- `STRIPE_TEAM_PRICE_ID` = The Team plan Price ID from above
- `NEXT_PUBLIC_APP_URL` = `https://ai-job-search-saas.vercel.app`

## 📱 Domain Name (Optional)
- [ ] Purchase domain (e.g., ai-job-search.ai, jobmagic.ai, claudehire.com — check availability)
- [ ] Add custom domain in Vercel (Project → Settings → Domains)

## 📧 Email Service (Optional for production)
- [ ] Sign up for Buttondown.email (free plan) or ConvertKit
- [ ] Get API key and add to Vercel env: `BUTTONDOWN_API_KEY`

## 🗄️ Supabase (Optional for production auth)
- [ ] Create Supabase project at https://supabase.com
- [ ] Run the schema from `lib/supabase-schema.sql`
- [ ] Add to Vercel env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Replace `/lib/auth.ts` with real Supabase auth calls

## 🚀 Marketing Launch (Week 2)
- [ ] Post the blog story on:
  - [Indie Hackers](https://indiehackers.com/) — "Show HN: AI That Got Me Hired"
  - [r/jobsearch](https://reddit.com/r/jobsearch)
  - [r/cscareerquestions](https://reddit.com/r/cscareerquestions)
  - [Hacker News](https://news.ycombinator.com/show) — "Show HN"
  - [DEV.to](https://dev.to/) — republish blog post
  - LinkedIn (personal post + share)
- [ ] Create 1-minute Loom video demo
- [ ] Share Loom video on Twitter/LinkedIn with the landing page link

## 👥 Personal Network Outreach (Week 2)
- [ ] Email 10 people in your network: "I'm taking beta testers for an AI job search tool"
- [ ] Offer 2 weeks free Pro in exchange for feedback
- [ ] Ask 3 for testimonials/case studies

## ⚙️ Supabase Schema (for production)
```sql
-- Run this in Supabase SQL editor
create table users (
  id uuid references auth.users on delete cascade,
  email text unique not null,
  name text,
  plan text default 'free',
  applications_used integer default 0,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp default timezone('utc'::text, now())
);

create table waitlist (
  id bigint generated always as identity primary key,
  email text unique not null,
  source text,
  created_at timestamp default timezone('utc'::text, now())
);
```
