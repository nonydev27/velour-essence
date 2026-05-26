# Velour Essence — Build Plan

---

## Overview

A perfume e-commerce platform with two sides:
- **Client** — browse, select, and purchase perfumes
- **Admin** — manage products, orders, sales, and customers

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| **React (Vite)** | Already set up — use this |
| **Tailwind CSS** | Already configured — use this for styling |
| **React Router v6** | Client-side routing (client + admin pages) |
| **Zustand** | Lightweight global state (cart, auth state) |
| **React Query (TanStack Query)** | Server state, data fetching, caching |
| **React Hook Form** | Form handling (checkout, admin product upload) |
| **Zod** | Schema validation for forms |
| **Axios** | HTTP requests to your backend |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Icons |

### Backend
| Tool | Purpose |
|------|---------|
| **Node.js + Express** | REST API server |
| **Prisma** | ORM — type-safe database access |
| **PostgreSQL** | Primary database (use [Supabase](https://supabase.com) for free hosted Postgres) |
| **Cloudinary** | Image upload and hosting for perfume photos |
| **Paystack** | Payment processing |
| **Termii** or **Africa's Talking** | SMS notifications to customers |
| **JWT** | Admin authentication |
| **bcrypt** | Password hashing |
| **Multer** | File upload middleware (before sending to Cloudinary) |
| **Nodemailer** (optional) | Email receipts as backup to SMS |

---

## Folder Structure

```
velour-essence/
├── client/                         # React frontend (your current Vite project)
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images, logos, icons
│   │   ├── components/
│   │   │   ├── ui/                 # Reusable UI: Button, Input, Modal, Badge, etc.
│   │   │   ├── layout/             # Navbar, Footer, AdminSidebar, PageWrapper
│   │   │   ├── shop/               # ProductCard, ProductGrid, ProductModal
│   │   │   ├── cart/               # CartDrawer, CartItem, CartSummary
│   │   │   └── checkout/           # CheckoutForm, OrderSummary, PaymentButton
│   │   ├── pages/
│   │   │   ├── client/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── ShopPage.jsx
│   │   │   │   ├── ProductPage.jsx
│   │   │   │   ├── CartPage.jsx
│   │   │   │   └── CheckoutPage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLoginPage.jsx
│   │   │       ├── DashboardPage.jsx
│   │   │       ├── ProductsPage.jsx
│   │   │       ├── AddProductPage.jsx
│   │   │       ├── EditProductPage.jsx
│   │   │       ├── OrdersPage.jsx
│   │   │       └── SalesPage.jsx
│   │   ├── store/                  # Zustand stores
│   │   │   ├── cartStore.js
│   │   │   └── authStore.js
│   │   ├── hooks/                  # Custom hooks (useProducts, useCart, useAdmin)
│   │   ├── services/               # Axios API call functions
│   │   │   ├── api.js              # Axios instance with base URL + auth header
│   │   │   ├── productService.js
│   │   │   ├── orderService.js
│   │   │   └── adminService.js
│   │   ├── utils/                  # Formatters, helpers (formatPrice, formatDate)
│   │   ├── constants/              # School list, status enums, color tokens
│   │   ├── routes/
│   │   │   ├── AppRouter.jsx       # All routes defined here
│   │   │   └── ProtectedRoute.jsx  # Guard for admin routes
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                         # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js   # JWT verification for admin routes
│   │   │   ├── uploadMiddleware.js # Multer config
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   ├── paystackService.js  # Initialize + verify transactions
│   │   │   ├── smsService.js       # Send SMS via Termii/Africa's Talking
│   │   │   └── cloudinaryService.js
│   │   ├── utils/
│   │   │   └── generateOrderId.js  # e.g. VE-20260526-XXXX
│   │   └── app.js                  # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma           # Database models
│   │   └── migrations/
│   ├── .env
│   └── index.js                    # Server entry point
│
└── PLAN.md                         # This file
```

---

## Database Models (Prisma Schema)

### Tables to create:

**Product**
- id, name, description, price, images (array of URLs), category, stock, isFeatured, discount (%), createdAt, updatedAt

**Order**
- id, orderId (your custom VE-XXXX id), customerName, phone, school, hostel/address, items (JSON — product id, name, qty, price), totalAmount, status (PENDING / CONFIRMED / DELIVERED), paystackRef, createdAt

**Admin**
- id, email, passwordHash, createdAt

**Sale** (for promotional pricing)
- id, productId, discountPercent, startDate, endDate, isActive

---

## Pages Breakdown

### Client Side

| Page | What it does |
|------|-------------|
| **Home** | Hero section, featured products, promo banner |
| **Shop** | All products grid, filter by category, search |
| **Product** | Single product — images, description, add to cart |
| **Cart** | Review items, update quantity, proceed to checkout |
| **Checkout** | Name, phone number, school selection (dropdown), hostel/location, order summary, pay with Paystack |

### Admin Side

| Page | What it does |
|------|-------------|
| **Login** | Admin-only email + password auth |
| **Dashboard** | Stats — total orders, revenue, pending orders |
| **Products** | List all products, delete, mark out of stock |
| **Add / Edit Product** | Upload images to Cloudinary, set name, price, stock, discount |
| **Orders** | View all orders, update status (Pending → Confirmed → Delivered) |
| **Sales** | Set a discount % on a product for a date range |

---

## Payment Flow (Paystack)

1. Customer fills checkout form and clicks **Pay**
2. Frontend calls your backend `/api/payment/initialize` with amount + email (use phone as pseudo-email if no email: `{phone}@velour.com`)
3. Backend calls Paystack's Initialize Transaction API → gets back an `authorization_url`
4. Redirect customer to that URL (Paystack handles card entry)
5. After payment, Paystack redirects back to your site with a `reference` query param
6. Frontend calls your backend `/api/payment/verify?reference=xxx`
7. Backend verifies with Paystack → if successful, creates the Order in DB and triggers SMS
8. Customer sees order confirmation page with their Order ID

> Use Paystack's **webhook** as a backup — Paystack will POST to your server when payment is confirmed, so even if the redirect fails, the order still gets created.

---

## SMS Notification (Termii)

When an order is confirmed, send an SMS like:

```
Hi [Name], your Velour Essence order has been placed!
Order ID: VE-20260526-8821
Items: Oud Elixir x1, Rose Mist x2
Total: ₦15,500
We'll deliver to [School/Hostel].
Questions? Reply to this message.
```

**Termii setup:**
- Sign up at termii.com
- Get API key from dashboard
- Use their Send Message API (REST, very simple)
- Store API key in your `.env` file

---

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Burgundy | `#800020` |
| Primary Dark | Deep Burgundy | `#5C0016` |
| Primary Light | Soft Rose | `#A3274A` |
| Background | Off White / Cream | `#FAF7F4` |
| Surface | Warm White | `#FFFFFF` |
| Text Primary | Charcoal | `#1A1A1A` |
| Text Secondary | Warm Gray | `#6B6B6B` |
| Accent / Gold | Champagne Gold | `#C9A96E` |
| Border | Light Gray | `#E8E0D8` |
| Success | Muted Green | `#4A7C59` |
| Error | Deep Red | `#B91C1C` |

Add these to your `tailwind.config.js` under `theme.extend.colors`:

```js
colors: {
  burgundy: {
    DEFAULT: '#800020',
    dark: '#5C0016',
    light: '#A3274A',
  },
  cream: '#FAF7F4',
  gold: '#C9A96E',
}
```

---

## Environment Variables

### Server `.env`
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

### Client `.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=
```

---

## Build Order (Recommended)

Build in this order to avoid blocking yourself:

1. **Set up the server** — Express, Prisma schema, DB connection (Supabase Postgres)
2. **Admin auth** — login endpoint, JWT middleware, protected routes
3. **Product CRUD** — upload images, store in DB, public GET endpoints
4. **Client shop pages** — Home, Shop, Product page (read-only first)
5. **Cart logic** — Zustand store, CartDrawer, quantity controls
6. **Checkout form** — school dropdown, name, phone, location inputs
7. **Paystack integration** — initialize → redirect → verify → create order
8. **SMS on order confirm** — trigger after successful payment verify
9. **Admin orders page** — view + update order status
10. **Sales/Discount feature** — set % off on products with date range
11. **Polish** — loading states, empty states, error handling, mobile responsiveness

---

## Deployment

| Service | What for |
|---------|---------|
| **Vercel** | Host the React frontend |
| **Railway** or **Render** | Host the Express backend |
| **Supabase** | Postgres database (free tier is generous) |
| **Cloudinary** | Image storage (free tier: 25GB) |

Make sure to set all environment variables in your hosting dashboard before deploying.

---

## Nice-to-Haves (After MVP)

- Order tracking page where customers enter their Order ID to check status
- WhatsApp notification via WhatsApp Business API (instead of or alongside SMS)
- Low stock alerts for admin
- Sales analytics chart on admin dashboard (Recharts)
- Product reviews / ratings
- Search with filters (price range, category, scent family)
