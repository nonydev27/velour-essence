# Velour Essence — TODO & Deployment Checklist

---

## IMMEDIATE: Fix `isVisible` Column in Production DB

The Prisma client was regenerated and knows about `isVisible`, but the actual database table doesn't have the column yet. Fix it by running this SQL directly in Supabase:

1. Go to **supabase.com** → your project → **SQL Editor**
2. Run:
```sql
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "isVisible" BOOLEAN NOT NULL DEFAULT true;
```
That's it. No migration command needed — the column will exist and everything works.

---

## Step 1 — Supabase Setup (Database)

If you haven't created a Supabase project yet:

1. Go to **supabase.com** → **New Project**
   - Choose a region close to your users (e.g. Europe West for Ghana)
   - Set a strong database password and save it

2. Get your **two connection strings** (you need both):
   - Go to **Settings → Database → Connection string**
   - Copy **Transaction pooler** URL (the one with `pooler.supabase.com`) → this is your `DATABASE_URL`
   - Copy **Direct connection** URL (the one with `db.[ref].supabase.co`) → this is your `DIRECT_URL`
   - Replace `[YOUR-PASSWORD]` in both URLs with your actual database password

3. Update `server/.env`:
```
DATABASE_URL="postgresql://postgres.xxxx:[password]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.xxxx.supabase.co:5432/postgres"
```

4. Push the schema to the new database:
```bash
cd server
npx prisma db push
```
   This creates all your tables. Run this once when setting up a fresh database.

> **Why two URLs?** `DATABASE_URL` (pooler) is used by your running app for all queries — it handles many connections efficiently. `DIRECT_URL` is needed by Prisma for schema migrations because the pooler doesn't support advisory locks that migrations require.

---

## Step 2 — Images

### Product images → Cloudinary (already handled)
When you upload products through the admin panel, images go straight to Cloudinary and the URL is stored in the database. Nothing to do here.

### Static/UI images (team photos, logo) → Vercel CDN (automatic)
Images in the `public/` folder (`sally.jpeg`, `kdjansi.jpg`, `logo.png`) are bundled into your Vercel deployment and served from Vercel's global CDN automatically. No Cloudflare, no separate image host needed — Vercel handles it.

### Unused images in `public/` (safe to delete)
These files exist but are not referenced anywhere in the code:
- `public/mockup.jpeg`
- `public/karl.jpeg`
- `public/sgb-1.jpeg`
- `src/assets/hero.png`

You can delete them to keep the repo clean, or leave them — they won't affect anything.

---

## Step 3 — Deploy Backend → Railway

Railway is the easiest free-tier Node.js host. Your Express API goes here.

1. Push your full project to GitHub (make sure `server/` is committed)

2. Go to **railway.app** → **New Project** → **Deploy from GitHub repo** → select your repo

3. In Railway, click the service → **Settings**:
   - **Root Directory**: `server`
   - **Start Command**: `npx prisma migrate deploy && npm start`

4. Go to **Variables** tab and add every key from `server/.env`:
```
DATABASE_URL=...
DIRECT_URL=...
PORT=5000
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
TERMII_API_KEY=...
TERMII_SENDER_ID=...
CLIENT_URL=https://your-vercel-app.vercel.app   ← fill in after Step 4
```

5. Railway will build and deploy. It gives you a public URL like:
   `https://velour-essence-production.up.railway.app`
   → Save this, you'll need it in Step 4.

---

## Step 4 — Deploy Frontend → Vercel

1. Go to **vercel.com** → **New Project** → import your GitHub repo

2. Vercel should auto-detect it as a Vite project. Confirm these settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `/` (leave blank / default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. Under **Environment Variables**, add:
```
VITE_API_URL=https://velour-essence-production.up.railway.app
VITE_PAYSTACK_PUBLIC_KEY=pk_live_...
```

4. Deploy. Vercel gives you a URL like `https://velour-essence.vercel.app`

5. Go back to Railway → **Variables** → update `CLIENT_URL` to your Vercel URL → redeploy

---

## Step 5 — Wire Everything Together (Post-Deploy)

After both are live, do these:

- [ ] **Test the API is reachable**: visit `https://your-railway-url.up.railway.app/api/products` in browser — should return JSON
- [ ] **Test the frontend connects**: open your Vercel URL, go to the shop page, products should load
- [ ] **Set Paystack Webhook URL**: Paystack Dashboard → Settings → API Keys & Webhooks → Webhook URL:
  ```
  https://your-railway-url.up.railway.app/api/payment/webhook
  ```
- [ ] **Set Paystack Callback URL** (optional fallback): `https://your-vercel-url.vercel.app/order-confirmation`
- [ ] **Seed your first admin account**:
  ```bash
  curl -X POST https://your-railway-url.up.railway.app/api/admin/seed \
    -H "Content-Type: application/json" \
    -d '{"email":"you@example.com","password":"yourpassword"}'
  ```
- [ ] **Upload products** through the admin panel — this also tests Cloudinary is working
- [ ] **Do a test purchase** with a real card to confirm the full payment → webhook → SMS flow

---

## Paystack Live Mode

### ✅ Done in code
- [x] `currency: 'GHS'` added to all transaction initializations
- [x] `callback_url` passed explicitly so Paystack redirects to the right page
- [x] Webhook HMAC signature check uses raw Buffer body (fixed critical bug)
- [x] Phone normalization uses Ghana country code (`233`)
- [x] Phone validation updated to Ghanaian format (`0[2356]XXXXXXXX`)

### ⬜ Still needed (you do these)

#### 1. Get live keys from Paystack dashboard
- Go to **dashboard.paystack.com** → flip toggle from **Test → Live** (top right)
- **Settings → API Keys & Webhooks**
- Copy your **Live Secret Key** (`sk_live_...`) and **Live Public Key** (`pk_live_...`)
- Add to Railway env vars and Vercel env vars (see Steps 3 and 4 above)

#### 2. Enable GHS currency on your account
- **Settings → Preferences → Accepted Currencies → enable Ghana Cedi (GHS)**
- If you registered with a Nigerian account and can't see GHS, contact Paystack support to add it, or register a Ghanaian merchant account at paystack.com/gh

#### 3. Complete KYC verification
- **Settings → Business Settings → Business Information**
- Required before Paystack releases any live funds
- For Ghana: Ghana Card or Passport, business registration (if applicable)

---

## Database — Future Schema Changes

Now that you have `DIRECT_URL` set up in `prisma.config.ts`, future migrations work properly:

```bash
cd server
npx prisma migrate dev --name describe-your-change   # local dev
npx prisma migrate deploy                             # production (Railway runs this on deploy)
```

### Resolved
- [x] `isVisible Boolean @default(true)` added to `Product` model
- [x] `Payment` model added
- [x] Prisma client regenerated — run `npx prisma generate` after any schema change

---

## SMS (Termii)

- [x] `smsService.js` built and integrated — fires after every confirmed payment
- [x] Phone normalization updated to Ghana (+233)
- [ ] Verify Termii API key is active — sign in at termii.com and confirm balance/credits
- [ ] Custom Sender ID (`VelourEss`) requires Termii approval — submit request in Termii dashboard
- [ ] For free tier: use the default generic sender ID while awaiting approval

---

## Custom Domain (Optional)

If you have a domain (e.g. `velouressence.com`):

- **Frontend**: Vercel → your project → **Settings → Domains** → add domain → follow DNS instructions
- **Backend**: Railway → your service → **Settings → Networking → Custom Domain** → add domain (e.g. `api.velouressence.com`)
- Update `VITE_API_URL` in Vercel to the custom API domain
- Update `CLIENT_URL` in Railway to the custom frontend domain

---

## Nice-to-Have (Future)

- [ ] Email receipts (in addition to SMS)
- [ ] Order tracking page for customers using their phone number
- [ ] Admin notification when a new order comes in (browser push or SMS to admin)
- [ ] Product image deletion — currently old images stay on Cloudinary when replaced
- [ ] Pagination on the admin products page
- [ ] Export orders to CSV
