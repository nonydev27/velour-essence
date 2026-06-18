# Velour Essence — Deployment Guide

---

## Repo Structure: Keep It as One Repo

Your project is a **monorepo** — the frontend lives at the root and the backend lives in `server/`. Do not split them into two separate repos. Both Railway and Vercel can deploy from a subdirectory of a single repo, so there's no benefit to separating them, and it's much easier to manage one repo.

```
velour-essence/          ← push this whole thing to GitHub
├── src/                 ← React frontend (deployed to Vercel)
├── public/
├── index.html
├── vite.config.js
├── package.json
└── server/              ← Express backend (deployed to Render)
    ├── index.js
    ├── prisma/
    ├── src/
    └── package.json
```

---

## Services You'll Use

| What | Service | Free tier |
|---|---|---|
| Frontend hosting | Vercel | Yes, generous |
| Backend hosting | Render | Yes — free tier, spins down after 15 min inactivity |
| Database | Supabase | Yes — 500MB, 2 projects |
| Image uploads | Cloudinary | Yes — 25GB storage |
| Payments | Paystack | Free, takes % per transaction |
| SMS | Termii | Pay-as-you-go credits |

> **Render's free tier** spins down after 15 minutes of inactivity — the first request after idle takes ~30 seconds to wake up. This is fine for a store that gets regular traffic. Upgrade to the $7/month Starter plan to keep it always-on.

---

## Part 1 — GitHub

Everything starts here. Both Vercel and Render pull your code from GitHub.

1. Create a repo at **github.com/new** — name it `velour-essence`, set it to **Private**
2. In your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/velour-essence.git
git add .gitignore server/.env.example .env.example server/prisma.config.ts server/src/app.js TODO.md DEPLOYMENT.md
git commit -m "prepare for deployment"
git push -u origin main
```

> Make sure `.env` and `server/.env` are NOT in the commit — they should show as deleted (`D`) in `git status`. The `.env.example` files are safe to commit.

---

## Part 2 — Supabase (Database)

Your PostgreSQL database lives here.

### 2.1 Create a project
1. Go to **supabase.com** → sign up/log in → **New Project**
2. Choose **Organisation** → enter project name: `velour-essence`
3. Set a strong **Database Password** — save it somewhere safe, you'll need it
4. **Region**: choose `West EU (Ireland)` — closest to West Africa
5. Click **Create new project** and wait ~2 minutes

### 2.2 Get your connection strings
1. In your project → **Settings** (left sidebar) → **Database**
2. Scroll to **Connection string**
3. You need **two** URLs:

**Transaction Pooler** (for your running app):
- Select the **Transaction** tab
- Copy the URL — looks like:
  `postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres`
- Replace `[YOUR-PASSWORD]` with your actual password
- This goes in `DATABASE_URL`

**Direct Connection** (for running migrations):
- Select the **Direct connection** tab  
- Copy the URL — looks like:
  `postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres`
- Replace `[YOUR-PASSWORD]` with your actual password
- This goes in `DIRECT_URL`

### 2.3 Push your schema to the database
With both URLs saved in `server/.env`, run:
```bash
cd server
npx prisma db push
```
This creates all your tables. You should see `✓ Your database is now in sync with your Prisma schema.`

### 2.4 Fix the `isVisible` column
If you get an error about `isVisible` not existing, run this in **Supabase → SQL Editor**:
```sql
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "isVisible" BOOLEAN NOT NULL DEFAULT true;
```

---

## Part 3 — Render (Backend / Express API)

### 3.1 Create an account
Go to **render.com** → sign up with GitHub

### 3.2 Create a new Web Service
1. **New** → **Web Service**
2. Connect your GitHub account if prompted → select your `velour-essence` repo
3. Configure the service:

| Setting | Value |
|---|---|
| **Name** | `velour-essence-api` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npx prisma migrate deploy && npm start` |
| **Instance Type** | `Free` |

> `prisma migrate deploy` runs pending migrations before the server starts. It's a no-op if nothing has changed.

### 3.3 Add environment variables
Scroll down to **Environment Variables** → add each one:

```
DATABASE_URL=postgresql://postgres.xxxx:[password]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres
PORT=5000
JWT_SECRET=pick-a-long-random-string-at-least-32-characters
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
TERMII_API_KEY=your-termii-key
TERMII_SENDER_ID=VelourEss
CLIENT_URL=https://your-vercel-url.vercel.app
```

> Leave `CLIENT_URL` as a placeholder for now — fill it in after Part 4.

### 3.4 Deploy
Click **Create Web Service** → Render builds and deploys. Watch the logs in the **Logs** tab. A successful deploy ends with:
```
Server running on port 5000
```

### 3.5 Get your backend URL
Render gives you a URL at the top of the service page:  
`https://velour-essence-api.onrender.com`  
**Save this URL.**

### 3.6 Test it
Open in browser: `https://velour-essence-api.onrender.com/health`  
Should return: `{"status":"ok"}`  

> If it takes ~30 seconds to respond, the service woke up from idle — that's normal on the free tier.

---

## Part 4 — Vercel (Frontend)

### 4.1 Create an account
Go to **vercel.com** → sign up with GitHub

### 4.2 Import your project
1. **Add New → Project** → select `velour-essence` repo
2. Vercel auto-detects Vite. Confirm these settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (leave as default — your frontend is at the repo root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4.3 Add environment variables
Before clicking Deploy, add these under **Environment Variables**:

| Name | Value |
|---|---|
| `VITE_API_URL` | `https://velour-essence-api.onrender.com` |
| `VITE_PAYSTACK_PUBLIC_KEY` | `pk_live_...` |

### 4.4 Deploy
Click **Deploy**. Vercel builds your React app and gives you a URL like:  
`https://velour-essence.vercel.app`  
**Save this URL.**

### 4.5 Test it
Open the URL — your shop should load. Products won't show yet (no data in the DB), but the page should render without errors.

---

## Part 5 — Wire Everything Together

### 5.1 Update Render with your Vercel URL
1. Go to Render → your service → **Environment**
2. Update `CLIENT_URL` to your actual Vercel URL:
   ```
   CLIENT_URL=https://velour-essence.vercel.app
   ```
3. Click **Save Changes** — Render redeploys automatically

### 5.2 Set Paystack Webhook URL
1. Go to **dashboard.paystack.com** → Settings → API Keys & Webhooks
2. Set Webhook URL to:
   ```
   https://velour-essence-api.onrender.com/api/payment/webhook
   ```

### 5.3 Seed your admin account
Run this once to create your admin login:
```bash
curl -X POST https://velour-essence-api.onrender.com/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"your-admin-password"}'
```

### 5.4 End-to-end test
1. Go to your Vercel URL → **Admin** → log in
2. Upload a product — this tests Cloudinary
3. Go to the shop → add to cart → checkout
4. Pay with a real card — this tests Paystack + webhook + Termii SMS

---

## Part 6 — Custom Domain (Optional)

If you have a domain like `velouressence.com`:

**Frontend (Vercel):**
1. Vercel → your project → **Settings → Domains**
2. Add `velouressence.com` and `www.velouressence.com`
3. Point your domain's DNS to Vercel as instructed

**Backend (Render):**
1. Render → your service → **Settings → Custom Domains**
2. Add `api.velouressence.com`
3. Add a CNAME record in your DNS pointing to Render's provided target

**After adding custom domains:**
- Update `VITE_API_URL` in Vercel to `https://api.velouressence.com`
- Update `CLIENT_URL` in Render to `https://velouressence.com`
- Redeploy both

---

## How to Redeploy After Code Changes

Both services redeploy automatically when you push to GitHub:

```bash
git add .
git commit -m "your change"
git push
```

- Vercel rebuilds the frontend automatically
- Railway rebuilds the backend automatically

---

## Troubleshooting

**Frontend loads but products don't show**
→ Check `VITE_API_URL` in Vercel is pointing to your Render URL (not localhost)
→ Open browser devtools → Network tab → look for failed API requests

**Render deploy fails with Prisma error**
→ Check the Render deploy logs for the exact error
→ If it's a connection error, verify `DATABASE_URL` is correct in Render environment variables

**First request after idle is very slow**
→ Normal on Render's free tier — the service sleeps after 15 min of inactivity and takes ~30s to wake
→ Upgrade to Render's $7/month Starter plan to disable sleep

**CORS errors in browser console**
→ Make sure `CLIENT_URL` in Render exactly matches your Vercel URL (including `https://`, no trailing slash)

**Paystack webhook not creating orders**
→ Confirm the webhook URL in Paystack dashboard points to Render (not localhost)
→ Check Render logs under the **Logs** tab for incoming webhook requests

**Images not uploading**
→ Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in Render are correct
→ Log in to cloudinary.com and check the credentials under **Settings → Access Keys**





