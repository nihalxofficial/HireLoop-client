<div align="center">

# HireLoop — Client

**A modern job platform connecting top talent with world-class companies.**

Browse thousands of curated opportunities, manage applications, and accelerate your career — all in one place.

| | |
|---|---|
| 🌐 **Live App** | [hireloop-client-theta.vercel.app](https://hireloop-client-theta.vercel.app) |
| 📦 **Client Repo** | [github.com/nihalxofficial/HireLoop-client](https://github.com/nihalxofficial/HireLoop-client) |
| 🔧 **Server Repo** | [github.com/nihalxofficial/HireLoop-server](https://github.com/nihalxofficial/HireLoop-server) |

</div>

---

## Features

### 👤 For Job Seekers
| Feature | Description |
|---|---|
| Smart Job Search | Advanced filters by role, location, salary, and more |
| One-Click Apply | Streamlined application flow |
| Saved Jobs | Bookmark and manage favorite listings from your dashboard |
| Application History | Track every application status in one place |
| Interview Calendar | Manage upcoming interviews and schedules |
| Notifications | Real-time alerts for new matches and application updates |
| Salary Insights | Real salary data to negotiate confidently |
| Resume Builder | Create professional resumes with modern templates |
| Skill-Based Matching | Discover jobs that fit your experience |

### 🏢 For Recruiters
| Feature | Description |
|---|---|
| Job Posting | Create and manage job listings with ease |
| Company Profiles | Showcase your brand to attract top candidates |
| Candidate Management | Review and track applicants |
| Subscription Plans | Tiered pricing (Starter / Growth / Premium) with Stripe |

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

| Requirement | Version |
|---|---|
| Node.js | 18+ |
| MongoDB Atlas | Account required |
| Stripe | Account required |
| Better Auth | Configured instance |

### Installation

```bash
git clone https://github.com/nihalxofficial/HireLoop-client.git
cd HireLoop-client
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

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

Deployed on **Vercel**. Add all environment variables under **Project → Settings → Environment Variables** before deploying.

```bash
vercel --prod
```