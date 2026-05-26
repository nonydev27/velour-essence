# Velour Essence — Setup & Running Guide

This guide walks you through everything from zero to a running system.
You'll have two things running at the same time: the **frontend** (what users see)
and the **backend** (the server that handles data, payments, and SMS).

---

## Before Anything — Install These

You need these on your machine before touching any code.

### 1. Node.js
Node is what runs JavaScript outside the browser — your backend lives on it.

- Go to https://nodejs.org and download the **LTS version** (the one that says "Recommended for most users")
- Install it, then open your terminal and confirm it worked:
  ```
  node -v
  npm -v
  ```
  Both should print version numbers. If they do, you're good.

### 2. Git
You likely already have this since the project is a git repo. Confirm:
```
git -v
```

### 3. A code editor
Use **VS Code** if you don't have one already — https://code.visualstudio.com

### 4. A terminal
- On Mac: Terminal or iTerm2
- On Windows: Use **Git Bash** or the built-in Windows Terminal
- On Linux: Any terminal works

---

## Understanding the Two Sides

```
velour-essence/
├── src/          ← Frontend (React). This is what runs in the browser.
├── server/       ← Backend (Node/Express). This runs on a server, not in the browser.
```

Think of it like a restaurant:
- The **frontend** is the dining area — menus, tables, what customers interact with
- The **backend** is the kitchen — processes orders, talks to the database, handles payments

They talk to each other through HTTP requests (like a waiter passing orders between the dining area and kitchen).

---

## Part 1 — Setting Up the Backend

### Step 1 — Create the server's package.json

The `server/` folder is its own Node project. It needs its own `package.json` (a list of what it needs to run).

Open your terminal, navigate into the server folder, and initialize it:

```bash
cd server
npm init -y
```

This creates a `package.json` file inside `server/`. The `-y` just skips the questions and uses defaults.

---

### Step 2 — Install Backend Dependencies

Still inside the `server/` folder, install everything the backend needs:

```bash
npm install express prisma @prisma/client dotenv cors multer cloudinary \
  jsonwebtoken bcrypt paystack-api axios
```

Then install development-only tools (things you only need while building, not in production):

```bash
npm install -D nodemon
```

**What each one does:**

| Package | What it does |
|---------|-------------|
| `express` | The web framework — handles incoming requests and sends responses |
| `prisma` | ORM — lets you talk to your database using JavaScript instead of raw SQL |
| `@prisma/client` | The auto-generated database client Prisma creates for you |
| `dotenv` | Loads your secret keys from the `.env` file into your code |
| `cors` | Allows your frontend (on a different port) to talk to your backend |
| `multer` | Handles file uploads before sending images to Cloudinary |
| `cloudinary` | SDK to upload and manage images on Cloudinary's servers |
| `jsonwebtoken` | Creates and verifies JWT tokens for admin login |
| `bcrypt` | Hashes passwords so you never store them in plain text |
| `axios` | Makes HTTP requests to external APIs (Paystack, Termii) |
| `nodemon` | Auto-restarts the server when you save a file (dev only) |

---

### Step 3 — Add Start Scripts to server/package.json

Open `server/package.json`. Find the `"scripts"` section and update it to look like this:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

- `npm run dev` → starts the server and auto-restarts on file changes (use this while building)
- `npm start` → starts the server without auto-restart (use this in production)

---

### Step 4 — Set Up Your Database (Supabase)

Your backend needs a database to store products, orders, and admin accounts.
You'll use **Supabase** — it gives you a free hosted PostgreSQL database.

**Create a Supabase project:**
1. Go to https://supabase.com and sign up (free)
2. Click **New Project**
3. Give it a name (e.g. `velour-essence`), set a strong database password, choose a region close to you
4. Wait for it to finish setting up (~1 minute)

**Get your database connection string:**
1. In your Supabase project, go to **Project Settings** (gear icon, bottom left)
2. Click **Database** in the sidebar
3. Scroll down to **Connection string**
4. Select the **URI** tab
5. Copy the string — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the password you set when creating the project

You'll paste this into your `.env` file in the next step.

---

### Step 5 — Fill in the .env File

The `.env` file holds all your secret keys. **Never commit this file to git** — it's already in `.gitignore`.

Open `server/.env.example`, then create a new file `server/.env` (copy the example and fill it in):

```
DATABASE_URL=postgresql://postgres:yourpassword@db.xxxx.supabase.co:5432/postgres
PORT=5000
JWT_SECRET=make_up_any_long_random_string_here_like_this_xK9mP2nQ8vR

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

TERMII_API_KEY=
TERMII_SENDER_ID=VelourEss

CLIENT_URL=http://localhost:5173
```

You'll fill in the Cloudinary, Paystack, and Termii keys as you set up those accounts.
For now, just the `DATABASE_URL`, `PORT`, and `JWT_SECRET` are enough to get started.

> **JWT_SECRET**: This can be literally anything — just make it long and random.
> e.g. `velour_essence_super_secret_jwt_2026_xK9mP2nQvR`

---

### Step 6 — Set Up Prisma (Database ORM)

Prisma is the bridge between your JavaScript code and the database.

**Initialize Prisma** (still inside `server/`):

```bash
npx prisma init
```

This creates a `prisma/` folder with a `schema.prisma` file and adds `DATABASE_URL` to your `.env`.
Since you already have both, you can skip this and just work with the existing files.

**Tell Prisma about your database** — open `server/prisma/schema.prisma` and write your models there.
A model is just a description of a database table. For example, a `Product` model tells Prisma
"there should be a products table with these columns."

**Once your schema is written**, run this to create the actual tables in Supabase:

```bash
npx prisma migrate dev --name init
```

This does two things:
1. Creates the tables in your Supabase database
2. Generates the Prisma Client (the JavaScript code you'll use to query the database)

Every time you change your schema, run a new migration:
```bash
npx prisma migrate dev --name describe_what_changed
```

**To view your database visually** (very useful while building):
```bash
npx prisma studio
```
This opens a browser UI at `http://localhost:5555` where you can see and edit your data.

---

### Step 7 — Get Your Third-Party API Keys

#### Cloudinary (image hosting)
1. Sign up at https://cloudinary.com (free tier)
2. After login, your dashboard shows `Cloud Name`, `API Key`, and `API Secret`
3. Copy all three into your `.env`

#### Paystack (payments)
1. Sign up at https://paystack.com (free)
2. In your dashboard, go to **Settings → API Keys & Webhooks**
3. Copy your **Test Secret Key** and **Test Public Key** into `.env`
   - Use **Test keys** while building — no real money moves
   - Switch to **Live keys** when you're ready to go live
4. Set your webhook URL (after you deploy the backend):
   `https://your-backend-url.com/api/payment/webhook`

#### Termii (SMS)
1. Sign up at https://termii.com
2. Go to **API Tokens** in your dashboard
3. Copy your API key into `.env`
4. For `TERMII_SENDER_ID` — this is the name that shows as the sender on SMS.
   You need to register a sender ID on Termii's dashboard first.
   Use `VelourEss` or any name under 11 characters.

---

### Step 8 — Start the Backend Server

From inside the `server/` folder:

```bash
npm run dev
```

You should see something like:
```
[nodemon] starting `node index.js`
Server running on port 5000
Database connected
```

Your backend is now live at `http://localhost:5000`.

To test it's working, open your browser and visit `http://localhost:5000/api/products`.
You should get back a JSON response (even if it's just an empty array `[]`).

---

## Part 2 — Setting Up the Frontend

### Step 1 — Install Frontend Dependencies

Go back to the root of the project (not inside `server/`):

```bash
cd ..
```

Or open a new terminal tab and navigate to `velour-essence/`.

Install the base dependencies already in `package.json`:
```bash
npm install
```

Then install the additional packages you'll need:

```bash
npm install react-router-dom zustand @tanstack/react-query react-hook-form \
  zod @hookform/resolvers axios framer-motion lucide-react
```

**What each one does:**

| Package | What it does |
|---------|-------------|
| `react-router-dom` | Handles page navigation (routes like `/shop`, `/admin/dashboard`) |
| `zustand` | Simple global state management — stores your cart items and auth state |
| `@tanstack/react-query` | Fetches and caches server data (products, orders) |
| `react-hook-form` | Handles form state, validation, and submission |
| `zod` | Defines validation rules (e.g. phone must be 11 digits) |
| `@hookform/resolvers` | Connects Zod schemas to React Hook Form |
| `axios` | Makes HTTP requests to your backend |
| `framer-motion` | Animations (page transitions, drawer slides, etc.) |
| `lucide-react` | Clean icon set — shopping cart, search, menu, etc. |

---

### Step 2 — Create the Frontend .env File

In the root of the project (alongside `index.html`), create a file called `.env`:

```
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxx
```

> In Vite, all environment variables must start with `VITE_` to be accessible in your React code.
> Access them in code like: `import.meta.env.VITE_API_URL`

---

### Step 3 — Start the Frontend

From the project root:

```bash
npm run dev
```

You should see:
```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser. You'll see a blank page for now — that's correct,
since `App.jsx` is empty. You'll fill it in as you build.

---

## Part 3 — Running Both at the Same Time

You need **two terminal windows** open simultaneously — one for the backend, one for the frontend.

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd velour-essence   # (the root)
npm run dev
```

Both run independently. They talk to each other via HTTP:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

When your frontend calls `axios.get('/api/products')`, it hits your backend,
which queries Supabase and sends back JSON.

### Optional — Run Both with One Command

If you want to start both with a single command, install `concurrently` in the root:

```bash
npm install -D concurrently
```

Then add this to the root `package.json` scripts:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix server\" \"vite\""
}
```

Now `npm run dev` from the root starts both at once.

---

## Part 4 — How They Talk to Each Other

This is the most important concept to understand.

### The Flow

```
Browser (React)
    │
    │  axios.get('http://localhost:5000/api/products')
    ▼
Express Server (Node)
    │
    │  prisma.product.findMany()
    ▼
Supabase (PostgreSQL database)
    │
    │  Returns rows
    ▼
Express sends back JSON
    │
    ▼
React receives JSON → updates state → renders UI
```

### CORS — Why You Need It

By default, browsers block requests from one origin (port 5173) to another (port 5000).
CORS (Cross-Origin Resource Sharing) is what tells the browser "this is allowed."

In your `server/src/app.js`, you'll configure it like:
```js
app.use(cors({ origin: process.env.CLIENT_URL }))
```

This is already accounted for in your `.env` with `CLIENT_URL=http://localhost:5173`.

---

## Part 5 — Admin Setup

The admin panel lives at `/admin` on your frontend. It's protected — only someone
with a valid JWT token can access it.

To create the first admin account, you'll write a small one-time script that:
1. Takes an email and password
2. Hashes the password with bcrypt
3. Inserts the admin into the database

You can also do this directly in **Prisma Studio** (`npx prisma studio`) by
manually inserting a row into the Admin table with a bcrypt-hashed password.

You can generate a bcrypt hash at https://bcrypt-generator.com (use 10 rounds).

---

## Part 6 — Common Commands Reference

### Backend (run from `server/`)
| Command | What it does |
|---------|-------------|
| `npm run dev` | Start server with auto-restart |
| `npm start` | Start server without auto-restart |
| `npx prisma studio` | Open visual database browser |
| `npx prisma migrate dev --name <name>` | Apply schema changes to database |
| `npx prisma generate` | Re-generate Prisma Client after schema changes |
| `npx prisma db push` | Push schema to DB without creating a migration file (quick testing) |

### Frontend (run from project root)
| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production (creates `dist/` folder) |
| `npm run preview` | Preview the production build locally |

---

## Part 7 — Testing Payments Without Real Money

Paystack gives you test card numbers that simulate real payments.

Use these on your checkout page while in test mode:

| Card Number | Expiry | CVV | Result |
|-------------|--------|-----|--------|
| `4084 0840 8408 4081` | Any future date | Any 3 digits | Success |
| `4084 0840 8408 4081` | Any future date | Any 3 digits | Success |
| `5060 6666 6666 6666 6666` | Any future date | Any 3 digits | Success |

Your Paystack dashboard (in test mode) will show all test transactions.

---

## Part 8 — File You Touch in Order (Suggested)

When you're ready to write code, tackle files in this order to avoid confusion:

### Backend (server/)
1. `server/prisma/schema.prisma` — define your database tables first
2. `server/index.js` — start the server, connect to DB
3. `server/src/app.js` — set up Express, CORS, routes
4. `server/src/routes/*.js` — define your API endpoints (URLs)
5. `server/src/controllers/*.js` — write the logic for each endpoint
6. `server/src/middleware/*.js` — auth checks, file upload config
7. `server/src/services/*.js` — Paystack, SMS, Cloudinary integrations

### Frontend (src/)
1. `src/routes/AppRouter.jsx` — set up all your page routes
2. `src/services/api.js` — configure Axios with base URL
3. `src/pages/client/HomePage.jsx` — start with the simplest page
4. `src/components/layout/Navbar.jsx` — build navigation
5. `src/store/cartStore.js` — set up Zustand cart store
6. Work outward from there

---

## Part 9 — When Things Go Wrong

### "Cannot connect to database"
- Double-check your `DATABASE_URL` in `server/.env`
- Make sure the password has no special characters that need URL-encoding (@ and # break URLs — replace with `%40` and `%23`)
- Check that your Supabase project is active (free tier pauses after 1 week of inactivity)

### "CORS error" in browser console
- Make sure `CLIENT_URL` in your `.env` matches exactly what's in your browser bar
- Check that `app.use(cors(...))` is at the top of your Express app, before your routes

### "Cannot find module"
- You forgot to `npm install` — run it again in the correct folder
- Make sure you're running backend commands from inside `server/` and frontend commands from the root

### "Port already in use"
- Something else is already on that port
- Kill it: `lsof -ti:5000 | xargs kill` (backend) or `lsof -ti:5173 | xargs kill` (frontend)
- Or just change the port in your `.env`

### Prisma errors after changing schema
- Run `npx prisma migrate dev --name your_change_name` to sync the DB
- Run `npx prisma generate` to regenerate the client

### JWT "invalid signature" or "token expired"
- Make sure `JWT_SECRET` is the same value everywhere
- Tokens expire — generate a fresh one by logging in again

---

## Quick Start Checklist

Use this when you sit down to start a session:

- [ ] Node.js installed (`node -v`)
- [ ] `npm install` run in root (frontend)
- [ ] `npm install` run in `server/` (backend)
- [ ] `server/.env` created and filled with at least `DATABASE_URL`, `PORT`, `JWT_SECRET`
- [ ] Root `.env` created with `VITE_API_URL` and `VITE_PAYSTACK_PUBLIC_KEY`
- [ ] Supabase project created and `DATABASE_URL` copied in
- [ ] `npx prisma migrate dev --name init` run after writing schema
- [ ] Terminal 1: `cd server && npm run dev`
- [ ] Terminal 2: `npm run dev` (from root)
- [ ] Both running — backend at :5000, frontend at :5173
