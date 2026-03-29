# Temmy Gabriel — Portfolio Website

A production-ready portfolio for a financial data analyst. Built with Next.js 14, Tailwind CSS, and a GitHub-based CMS — zero database, zero hosting cost, deploys to Vercel in under 60 seconds.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Admin Panel:** Password-protected `/admin` route
- **CMS:** `data/projects.json` — edited via admin panel, committed to GitHub automatically
- **Auth:** Iron Session + bcryptjs (no third-party auth service)
- **Deployment:** Vercel — auto-redeploys on every GitHub commit

---

## Quick Start (Local)

### 1. Clone the repo
```bash
git clone https://github.com/Temmygabriel/temmy-gabriel-portfolio.git
cd temmy-gabriel-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Copy the example file:
```bash
cp .env.example .env.local
```

Then fill in each value in `.env.local` — see instructions below.

### 4. Generate your admin password hash

Pick a strong password (write it down somewhere safe). Then run:
```bash
node -e "const b=require('bcryptjs'); b.hash('YOUR_PASSWORD_HERE', 10).then(console.log)"
```

Copy the long hash it outputs and paste it as `ADMIN_PASSWORD_HASH` in `.env.local`.

### 5. Generate a session secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output as `SESSION_SECRET` in `.env.local`.

### 6. Generate a GitHub Personal Access Token

1. Go to **github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Give it a name like `portfolio-admin`
4. Set expiration to **No expiration** (or 1 year)
5. Under **Scopes**, check **`repo`** (full control of private repositories)
6. Click **Generate token** — copy it immediately (you won't see it again)
7. Paste it as `GITHUB_TOKEN` in `.env.local`

Also set:
```
GITHUB_OWNER=Temmygabriel         # your GitHub username
GITHUB_REPO=temmy-gabriel-portfolio  # your repo name
```

### 7. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Deploy to Vercel

### First deploy

1. Push this repo to GitHub (make sure `.env.local` is in `.gitignore` — it is by default)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → select your repo
4. Under **"Environment Variables"**, add all four values from your `.env.local`:
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
5. Click **Deploy**

That's it. Your portfolio is live.

### How the CMS works

When you save a project in the admin panel:
1. The Next.js API writes the updated `projects.json` to disk
2. It immediately commits the new file to your GitHub repo via the GitHub API
3. Vercel detects the new commit and triggers a redeploy
4. **Your site reflects the change in under 60 seconds — no terminal needed**

---

## Project Structure

```
temmy-gabriel-portfolio/
├── data/
│   └── projects.json          # All projects — edit via admin panel
├── public/
│   └── images/
│       └── temmy.png          # Your headshot
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── admin/
│   │   │   ├── page.tsx       # Login page (/admin)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx   # Admin dashboard (/admin/dashboard)
│   │   │   └── layout.tsx
│   │   └── api/
│   │       ├── projects/
│   │       │   └── route.ts   # Public: GET all projects
│   │       └── admin/
│   │           ├── login/
│   │           │   └── route.ts
│   │           ├── projects/
│   │           │   └── route.ts  # CRUD: GET, POST, PUT, DELETE
│   │           └── projects-reorder/
│   │               └── route.ts
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── CursorGlow.tsx
│   ├── lib/
│   │   ├── projects.ts        # Data access layer
│   │   ├── session.ts         # Auth session config
│   │   └── github.ts          # GitHub API integration
│   └── styles/
│       └── globals.css
├── .env.example               # Copy to .env.local and fill in
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Updating Your Email

Open `src/components/sections/Contact.tsx` and change the `EMAIL` constant at the top of the file to your real email address.

---

## Customising Projects

Projects live in `data/projects.json`. You can edit this file directly on GitHub, or use the admin panel at `/admin`.

Each project has these fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique slug (e.g. `nexora-fy2024`) |
| `title` | string | Project title |
| `description` | string | 1-2 sentence summary |
| `tools` | string[] | Array of tools used |
| `outcome` | string | Business outcome / impact |
| `link` | string | GitHub or live URL (optional) |
| `featured` | boolean | Show in the featured row |
| `order` | number | Display order (1 = first) |
| `category` | string | e.g. "Financial Analysis" |
| `metric` | string | The key number/metric badge |
| `highlight` | string | One clever insight line |

---

## License

This portfolio is for personal use by Temmy Gabriel.
