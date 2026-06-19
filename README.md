<div align="center">

# HireLoop — Client

**A full-featured job hunting portal bridging the gap between job seekers and employers.**

HireLoop streamlines job discovery, application management, and company recruitment — all in one platform. It offers smart job search, company profiles, subscription-based premium features and a complete recruiter toolkit.

| | |
|---|---|
| 🌐 **Live App** | [hireloop-client-theta.vercel.app](https://hireloop-client-theta.vercel.app) |
| 📦 **Client Repo** | [github.com/nihalxofficial/HireLoop-client](https://github.com/nihalxofficial/HireLoop-client) |
| 🔧 **Server Repo** | [github.com/nihalxofficial/HireLoop-server](https://github.com/nihalxofficial/HireLoop-server) |

</div>

---

## User Roles

| Role | Description |
|---|---|
| 👤 **Seeker** | Browse jobs, apply, save listings, track applications, manage subscription |
| 🏢 **Recruiter** | Register company, post jobs, review applicants, manage billing |
| 🛠️ **Admin** | Approve companies, moderate jobs, manage users, view platform analytics |

---

## Public Pages

| Page | Description |
|---|---|
| `/` | Hero section, live stats, featured jobs, platform features, footer |
| `/jobs` | Job search with keyword + filter sidebar (type, location, salary, category) |
| `/jobs/:jobId` | Full job details, company card, apply button, similar jobs |
| `/companies` | All approved companies in card grid, filterable by industry |
| `/pricing` | Seeker & Recruiter plans side-by-side with FAQ accordion |
| `/contact` | Contact form |

---

## Dashboard Features

### 👤 Seeker Dashboard

| Page | Description |
|---|---|
| `/dashboard/seeker` | Stats row, profile card, application status chart (Recharts), recent activity |
| `/dashboard/seeker/jobs` | Full job search + save + apply with modal |
| `/dashboard/seeker/saved` | Bookmarked jobs with remove & apply actions |
| `/dashboard/seeker/applications` | All applications with status tracking (Applied → Offered) |
| `/dashboard/seeker/billing` | Current plan, usage, payment history, Stripe upgrade |
| `/dashboard/seeker/settings` | Update profile, resume upload, skills, bio |

### 🏢 Recruiter Dashboard

| Page | Description |
|---|---|
| `/dashboard/recruiter` | Stats row, company card, applicants bar chart (Recharts), recent applications |
| `/dashboard/recruiter/company` | Register/edit company, status badge (Pending / Approved / Rejected) |
| `/dashboard/recruiter/jobs` | Manage all job posts with plan usage indicator |
| `/dashboard/recruiter/jobs/new` | Post new job (gated by company approval + plan limit) |
| `/dashboard/recruiter/jobs/:jobId/applicants` | Review applicants, update status, trigger email notification |
| `/dashboard/recruiter/billing` | Current plan, active job usage, payment history, Stripe upgrade |
| `/dashboard/recruiter/settings` | Update personal info, link to company page |

### 🛠️ Admin Dashboard

| Page | Description |
|---|---|
| `/dashboard/admin` | Platform stats, job category chart, user growth chart, recent payments |
| `/dashboard/admin/users` | Search, filter by role, change role, suspend/activate accounts |
| `/dashboard/admin/companies` | Approve or reject company registrations |
| `/dashboard/admin/jobs` | Search, filter, view, and remove any job listing |
| `/dashboard/admin/payments` | All subscription payments, revenue summary cards |
| `/dashboard/admin/settings` | Update admin profile |

---

## Subscription Plans

### Seeker Plans

| Plan | Price | Applications | Saved Jobs | Extras |
|---|---|---|---|---|
| Free | $0 | 3 / month | Up to 10 | Basic profile, email alerts |
| Pro | $19/mo | 30 / month | Unlimited | Application tracking, salary insights |
| Premium | $39/mo | Unlimited | Unlimited | Profile boost, early access, priority support |

### Recruiter Plans

| Plan | Price | Active Job Posts | Analytics | Extras |
|---|---|---|---|---|
| Free | $0 | Up to 3 | ✗ | Basic applicant management |
| Growth | $49/mo | Up to 10 | Basic | Applicant tracking, email support |
| Enterprise | $149/mo | Up to 50 | Advanced | Featured listings, team collaboration, custom branding |

---

## Application Status Flow

```
Job Posted → Seeker Applies → Under Review → Shortlisted → Offered / Rejected
```

| Status | Description |
|---|---|
| Applied | Seeker has submitted an application |
| Under Review | Recruiter has started reviewing |
| Shortlisted | Candidate shortlisted for interview |
| Rejected | Application declined |
| Offered | Candidate received a job offer |

---

## Company Status Flow

| Status | Description |
|---|---|
| Pending | Submitted, awaiting admin review |
| Approved | Verified and publicly visible |
| Rejected | Declined by admin |

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

| Requirement | Notes |
|---|---|
| Node.js 18+ | Required |
| MongoDB Atlas | Database |
| Stripe Account | Payment processing |
| Better Auth | Authentication |

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
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
├── (main)/                   # Public pages
│   ├── page.tsx              # Home
│   ├── jobs/                 # Browse jobs + job details
│   ├── companies/            # Company listings
│   ├── pricing/              # Pricing page
│   └── contact/              # Contact page
├── dashboard/
│   ├── seeker/               # Seeker dashboard pages
│   ├── recruiter/            # Recruiter dashboard pages
│   └── admin/                # Admin dashboard pages
├── auth/                     # Login / Register
└── api/                      # API routes (Stripe checkout, webhooks)
```

---

## Deployment

Deployed on **Vercel**. Add all environment variables under **Project → Settings → Environment Variables** before deploying.

```bash
vercel --prod
```