# HireLoop — Client

**HireLoop** is a modern job platform that connects top talent with world-class companies. Browse thousands of curated opportunities, manage applications, and accelerate your career — all in one place.

🔗 **Live:** [hireloop-client-theta.vercel.app](https://hireloop-client-theta.vercel.app)

---

## Features

### For Job Seekers
- **Smart Job Search** — Advanced filters by role, location, salary, and more
- **One-Click Apply** — Streamlined application flow
- **Saved Jobs** — Bookmark and manage favorite listings from your dashboard
- **Application History** — Track every application status in one place
- **Interview Calendar** — Manage upcoming interviews and schedules
- **Notifications** — Real-time alerts for new matches and application updates
- **Salary Insights** — Real salary data to negotiate confidently
- **Resume Builder** — Create professional resumes with modern templates
- **Skill-Based Matching** — Discover jobs that fit your experience

### For Recruiters
- **Job Posting** — Create and manage job listings with ease
- **Company Profiles** — Showcase your brand to attract top candidates
- **Candidate Management** — Review and track applicants
- **Subscription Plans** — Tiered pricing (Starter / Growth / Premium) with Stripe integration

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | HeroUI |
| Icons | Gravity Icons, React Icons, Lucide React |
| Auth | Better Auth (JWT) |
| Payments | Stripe (Checkout + Subscriptions) |
| Database | MongoDB Atlas |
| Charts | Recharts |
| Notifications | React Toast |
| Animations | Canvas Confetti |
| Date Utilities | date-fns |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Better Auth setup

### Installation

```bash
git clone https://github.com/nihalxofficial/hireloop-client.git
cd hireloop-client
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://...
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
├── (main)/           # Public pages (home, jobs, companies, pricing)
├── dashboard/
│   ├── seeker/       # Job seeker dashboard (saved, history, calendar, etc.)
│   └── recruiter/    # Recruiter dashboard (postings, applicants, billing)
├── auth/             # Login / Register
└── api/              # API routes (Stripe checkout, etc.)
```

---

## Deployment

Deployed on **Vercel**. All environment variables must be added under **Project → Settings → Environment Variables** in the Vercel dashboard.

```bash
vercel --prod
```