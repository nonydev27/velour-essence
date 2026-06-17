# Velour Essence

A luxury perfume e-commerce platform built for Ghanaian university students. Customers browse and purchase fragrances with Paystack (GHS) payment processing and SMS order confirmation via Termii.

## Tech Stack

**Frontend** — React 19, Vite, Tailwind CSS v4, React Router v7, Zustand, TanStack Query, React Hook Form, Zod, Framer Motion, Lucide

**Backend** — Node.js, Express 5, Prisma v7, PostgreSQL (Supabase), Cloudinary (images), Paystack (payments), Termii (SMS), JWT auth

## Running the project

```bash
# Terminal 1 — backend
cd server
npm install
npm run dev        # runs on http://localhost:5000

# Terminal 2 — frontend
npm install
npm run dev        # runs on http://localhost:5173
```

## Environment variables

**`server/.env`**
```
DATABASE_URL=
PORT=5000
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
TERMII_API_KEY=
TERMII_SENDER_ID=VelourEss
CLIENT_URL=http://localhost:5173
```

**`.env`** (root)
```
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=
```

## Database migration

After any schema change:
```bash
cd server
npx prisma migrate dev --name <change-description>
```

See `TODO.md` for pending migrations that need to be run.

## Admin setup (first time)

```bash
curl -X POST http://localhost:5000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@velour.com","password":"yourpassword"}'
```

Then log in at `/admin/login`.

## Admin features

- Product management with Cloudinary image upload
- Per-product visibility toggle (show/hide from customer shop)
- Order management with status progression (Pending → Confirmed → Delivered)
- Payments dashboard — real-time view of all payment attempts (auto-refreshes every 10s)
- Sales & promotional discounts

## Payment flow

1. Customer fills checkout form (name, Ghanaian phone, school, hostel)
2. Backend initializes Paystack transaction in GHS, records as PENDING
3. Customer pays on Paystack-hosted page
4. Paystack redirects back to `/order-confirmation?reference=xxx`
5. Backend verifies, creates order, updates payment to SUCCESS, decrements stock, sends SMS

See `SETUP.md` for full setup instructions and `TODO.md` for the Paystack live go-live checklist.
