# Velour Essence — What Was Built & How It Works
### A Complete Beginner's Guide to Everything in This Project

---

## First, the Big Picture

Imagine you're opening a perfume shop. You need two things:

1. **The actual shop** — the shelves, the counter, the display cases. This is what customers walk into and see. In our project, this is called the **frontend**.

2. **The back office** — the stockroom, the till, the records of every sale. Customers never see this. This is called the **backend**.

In web development, the **frontend** runs in the customer's browser (Chrome, Firefox, etc.), and the **backend** runs on a computer somewhere (a server). They talk to each other by sending messages back and forth over the internet — exactly like a waiter taking your order to the kitchen and bringing food back.

---

## The Two Sides of This Project

```
velour-essence/
│
├── src/          ← FRONTEND — what users see in the browser
│
└── server/       ← BACKEND — the "kitchen" that handles data, payments, SMS
```

---

## Part 1 — The Backend (server/)

The backend is a Node.js + Express server. Think of **Node.js** as the engine that lets JavaScript run on a computer (instead of just in a browser), and **Express** as a set of tools that make it easy to receive and respond to web requests.

### What is a "web request"?

When you open a website, your browser sends a **request** to a server saying "give me the homepage". The server sends back a **response** — the HTML, images, data, etc. Every time the frontend needs data (like a list of products), it sends a request to the backend and waits for a response.

---

### server/index.js — The Starting Point

```
server/index.js
```

This is the very first file that runs when you type `npm run dev` in the server folder. It does one thing: starts the server on **port 5000**.

Think of a **port** like a door on a building. The building is your computer. Port 5000 is the door that backend requests come through. The frontend knocks on that door whenever it needs something.

---

### server/src/app.js — The Reception Desk

```
server/src/app.js
```

This file sets up the Express app — the "reception desk" that receives every incoming request and decides where to send it.

**CORS** is configured here. CORS stands for Cross-Origin Resource Sharing. By default, browsers block the frontend (running on port 5173) from talking to the backend (on port 5000) because they're on different "origins" (different ports = different origins). CORS tells the browser "it's okay, these two are allowed to talk."

---

### server/prisma/schema.prisma — The Database Blueprint

```
server/prisma/schema.prisma
```

A **database** is where all your data lives permanently. Even if the server restarts, the data stays. Think of it like a filing cabinet.

**Prisma** is the tool that talks to the database for you, so you don't have to write raw SQL (the old-school database language). You describe your data in a `schema.prisma` file and Prisma handles the rest.

We defined **5 tables** (called "models" in Prisma):

#### Product table
Stores every perfume in the shop:
- `id` — a unique ID (like a product barcode)
- `name` — "Oud Elixir"
- `description` — the text describing the scent
- `price` — the price in GHS
- `images` — an array of URLs pointing to photos stored on Cloudinary
- `category` — "Oud", "Floral", "Woody", etc.
- `stock` — how many bottles are left
- `isFeatured` — should it show on the homepage?
- `isVisible` — is it currently shown in the shop? (admin can toggle this per-product)
- `discount` — percentage off (0 means no discount)
- `createdAt` / `updatedAt` — timestamps added automatically

#### Order table
Every time a customer pays and their order is confirmed:
- `id` — internal database ID
- `orderId` — the human-readable ID like `VE-20260527-8821`
- `customerName` — "Jane Doe"
- `phone` — "0241234567" (Ghanaian format)
- `school` — "University of Ghana (UG)"
- `hostel` — "Commonwealth Hall, Room 16"
- `items` — a JSON snapshot of what was bought (name, qty, price)
- `totalAmount` — total in GHS
- `status` — PENDING → CONFIRMED → DELIVERED
- `paystackRef` — the unique reference Paystack gives every transaction

#### Payment table
Tracks every payment attempt — before and after completion. This powers the admin Payments dashboard:
- `reference` — Paystack transaction reference (unique)
- `customerName`, `phone`, `amount` — captured at checkout
- `status` — `PENDING` (customer started but hasn't paid yet) or `SUCCESS` (paid)
- `orderId` — filled in once payment is confirmed (links to the Order record)
- Created when checkout begins, updated when payment is verified

#### Admin table
Stores admin accounts (just email + hashed password):
- `id`, `email`, `passwordHash`, `createdAt`

#### Sale table
Promotional discounts set by the admin:
- `productId` — which product is on sale
- `discountPercent` — e.g. 20 (means 20% off)
- `startDate` / `endDate` — when the sale runs
- `isActive` — toggle it on/off

---

### server/src/utils/prisma.js — The Database Connection

```
server/src/utils/prisma.js
```

This file creates one shared connection to the database. Think of it like one phone line to the database — you don't want to open a hundred lines, just one that everyone uses.

We're using **Supabase** (a free online PostgreSQL database service). The connection string (the "address" of the database) lives in `server/.env`.

Because we're using **Prisma v7** (the latest version), it requires something called a **driver adapter** — basically a translator between Prisma and the specific database type (PostgreSQL). That's why `@prisma/adapter-pg` and `pg` are installed.

---

### server/src/middleware/ — The Checkpoints

**Middleware** is code that runs between receiving a request and sending a response. Think of it as checkpoints the request must pass through.

#### authMiddleware.js
This is the security guard. When the admin tries to access protected routes (like viewing orders), this middleware checks: "Does this request have a valid JWT token?"

**JWT (JSON Web Token)** is like a stamped wristband at a concert. When admin logs in, the server gives them a token. Every future request from the admin includes that token. The middleware checks the stamp is real before letting the request through.

If there's no token, or it's invalid → **401 Unauthorized** (access denied).

#### uploadMiddleware.js
This handles file uploads (product images). It uses **Multer**, a tool that intercepts file uploads and holds them in memory temporarily before we send them to Cloudinary.

#### errorHandler.js
This is the safety net. If anything crashes anywhere in the server, the request falls through to this handler and it sends back a clean error message instead of crashing the whole server.

---

### server/src/services/ — The Integrations

These files talk to third-party services (external companies' APIs).

#### cloudinaryService.js
**Cloudinary** is a cloud storage service for images. When admin uploads a product photo, we:
1. Receive the file (via Multer)
2. Upload it to Cloudinary
3. Get back a URL like `https://res.cloudinary.com/...`
4. Store that URL in the database

This way, images are stored professionally (fast, reliable, with CDN delivery) and not on our own server.

#### paystackService.js
**Paystack** is a Nigerian payment processor (like Stripe but for Nigeria). There are two key functions:

- **`initializeTransaction`** — Customer is ready to pay. We tell Paystack "this customer wants to pay ₦66,500". Paystack gives us back a URL. We redirect the customer to that URL. Paystack handles the card details (securely — we never touch card numbers).

- **`verifyTransaction`** — After the customer pays, Paystack redirects them back to our site with a `reference` code. We send that code to Paystack asking "did this payment actually succeed?" If yes, we create the order.

#### smsService.js
**Termii** is a Nigerian SMS service. After a successful payment, we call this to send the customer an SMS like:

```
Hi Jane, your Velour Essence order has been placed!
Order ID: VE-20260527-8821
Items: Oud Elixir x1, Rose Mist x2
Total: ₦65,000
We'll deliver to University of Lagos — Queen's Hall.
```

---

### server/src/controllers/ — The Logic Handlers

Controllers contain the actual business logic. When a request arrives and passes all the middleware checkpoints, it lands in a controller function.

#### adminController.js
- **`login`** — Takes email + password. Finds the admin in the database. Uses **bcrypt** to check the password. Bcrypt is a one-way hashing algorithm — passwords are never stored as plain text, only as scrambled hashes. Returns a JWT token if correct.
- **`seedAdmin`** — A one-time helper to create the first admin account.
- **`getDashboardStats`** — Counts total orders, revenue, pending orders, delivered orders.

#### productController.js
- **`getProducts`** — Returns all products (with optional filters for category, featured, search).
- **`getProductById`** — Returns one product by its ID.
- **`createProduct`** — Admin creates a new product. Uploads images to Cloudinary, saves everything to the database.
- **`updateProduct`** — Admin edits an existing product.
- **`deleteProduct`** — Admin deletes a product.

#### orderController.js
- **`getOrders`** — Returns all orders (admin only). Can filter by status (PENDING/CONFIRMED/DELIVERED).
- **`updateOrderStatus`** — Admin changes an order from Pending → Confirmed → Delivered.

#### paymentController.js
- **`initializePayment`** — Customer submits checkout form. We call Paystack. Return the authorization URL.
- **`verifyPayment`** — Called after Paystack redirects the customer back. We verify with Paystack, create the order, send SMS.
- **`handleWebhook`** — Backup safety net. Paystack also sends a silent POST to our server when payment succeeds (in case the customer's browser closed before being redirected). We process the order here too if it wasn't processed already.

#### saleController.js
- Create/toggle/delete promotional sales for products.

---

### server/src/routes/ — The URL Map

Routes define which URL paths lead to which controller functions. Think of it like a phone directory — "when someone calls this number, connect them to this person."

```
GET  /api/products          → productController.getProducts
GET  /api/products/:id      → productController.getProductById
POST /api/products          → productController.createProduct  [admin only]
PUT  /api/products/:id      → productController.updateProduct  [admin only]
DELETE /api/products/:id    → productController.deleteProduct  [admin only]

POST /api/admin/login       → adminController.login
GET  /api/admin/dashboard   → adminController.getDashboardStats [admin only]

GET  /api/orders            → orderController.getOrders        [admin only]
PATCH /api/orders/:id/status → orderController.updateOrderStatus [admin only]

POST /api/payment/initialize → paymentController.initializePayment
GET  /api/payment/verify    → paymentController.verifyPayment
POST /api/payment/webhook   → paymentController.handleWebhook

GET  /api/sales             → saleController.getSales          [admin only]
POST /api/sales             → saleController.createSale        [admin only]
```

---

## Part 2 — The Frontend (src/)

The frontend is a React app. **React** is a JavaScript library for building user interfaces. Instead of writing raw HTML that never changes, React lets you build **components** — reusable pieces of UI that update automatically when data changes.

---

### src/main.jsx — The App's Starting Point

```
src/main.jsx
```

This is the first file the browser loads. It does three things:

1. Wraps the whole app in **QueryClientProvider** — this enables TanStack Query (data fetching) to work everywhere.
2. Wraps in **ToastProvider** — this enables toast notifications (the little pop-up messages) to appear anywhere.
3. Renders `<App />` into the HTML page's `<div id="root">`.

---

### src/App.jsx — The Router Hub

```
src/App.jsx
```

Extremely simple — just renders `<AppRouter />`. The router decides which page to show based on the URL.

---

### src/routes/AppRouter.jsx — The Page Map

```
src/routes/AppRouter.jsx
```

This defines all the URL routes for the frontend:

```
/                    → HomePage
/shop                → ShopPage
/shop/:id            → ProductPage (single product)
/cart                → CartPage
/checkout            → CheckoutPage
/order-confirmation  → OrderConfirmationPage

/admin/login         → AdminLoginPage  (public)
/admin/dashboard     → DashboardPage   (protected — must be logged in)
/admin/products      → ProductsPage    (protected)
/admin/products/add  → AddProductPage  (protected)
/admin/orders        → OrdersPage      (protected)
/admin/payments      → PaymentsPage    (protected)
/admin/sales         → SalesPage       (protected)
```

**React Router** watches the URL bar. When it changes, it swaps out the component on screen — no full page reload. This is what makes it a **Single Page Application (SPA)**.

---

### src/routes/ProtectedRoute.jsx — The Admin Guard

```
src/routes/ProtectedRoute.jsx
```

Wraps all admin pages. Before showing them, it checks the auth store: "is the user logged in?" If yes, show the page. If no, redirect to `/admin/login`. Simple but critical.

---

### src/store/ — Global State (Memory Shared Across the App)

**Zustand** is a state management library. Think of "state" as the app's short-term memory — things it needs to remember while it's running (not saved to database).

#### authStore.js
Remembers whether the admin is logged in and stores their JWT token. The token is also saved to `localStorage` so it survives page refreshes. When the admin logs out, the token is deleted from both places.

#### cartStore.js
The shopping cart. Remembers:
- `items` — array of products in the cart (each with name, price, qty, images)
- `isOpen` — is the cart drawer currently open?
- Actions: `addItem`, `removeItem`, `updateQty`, `clearCart`, `openCart`, `closeCart`

Cart items are saved to `localStorage` too — so if you refresh the page, your cart is still there.

---

### src/services/ — The API Callers

These files are the "messengers" between frontend and backend. They use **Axios** to make HTTP requests.

#### api.js
Creates a single Axios instance with:
- **Base URL** set to `http://localhost:5000/api` (from `.env`)
- An **interceptor** that automatically attaches the JWT token to every request header
- A response interceptor that auto-redirects to login if the token expires (401 error)

#### productService.js, orderService.js, adminService.js, paymentService.js
Each one is a collection of functions that call specific API endpoints. For example:

```js
// productService.js
getAll: () → GET /api/products
getById: (id) → GET /api/products/:id
create: (formData) → POST /api/products
update: (id, formData) → PUT /api/products/:id
delete: (id) → DELETE /api/products/:id
```

---

### src/hooks/ — The Data Fetching Hooks

**TanStack Query (React Query)** manages server data fetching. The problem it solves: fetching data is complicated — you need to track loading states, handle errors, cache results, and refresh when data changes. React Query handles all of this.

These hooks wrap the service functions in React Query:

#### useProducts.js
- `useProducts(params)` — fetches products list. The component that calls this gets `{ data, isLoading, error }` back automatically.
- `useProduct(id)` — fetches a single product.
- `useCreateProduct()` — mutation (write operation) to create a product. Automatically invalidates the products cache after success so the list refreshes.
- `useUpdateProduct()`, `useDeleteProduct()` — same pattern.

#### useOrders.js, useAdmin.js
Same pattern — query hooks for fetching, mutation hooks for writing.

#### useCart.js
Wraps the cart store and adds computed values (`totalItems`, `totalPrice`).

---

### src/utils/ — Helper Functions

#### formatPrice.js
Turns a number like `28000` into `₦28,000`. Also calculates discounted prices.

#### formatDate.js
Turns a raw date like `2026-05-27T14:30:00.000Z` into `27 May 2026`.

---

### src/constants/ — Fixed Data

#### schools.js
The dropdown list of Nigerian universities shown in the checkout form. A static list — doesn't change.

#### statusEnums.js
Defines the order statuses (PENDING, CONFIRMED, DELIVERED) and the Tailwind CSS color classes for each status badge.

---

### src/components/ — Reusable UI Pieces

Components are like LEGO bricks. You build them once and reuse them everywhere.

#### src/components/ui/ — The Basic Bricks

**Button.jsx** — A button with variants (primary burgundy, secondary, ghost, danger) and sizes (sm, md, lg). Also supports `loading` state (shows a spinner when true) and `asChild` (lets you wrap a `<Link>` in button styles).

**Input.jsx** — A text input with a label above and optional error message below.

**Badge.jsx** — A small pill label (like "Sale", "In Stock", "Pending").

**Modal.jsx** — A popup overlay. Locks body scrolling when open, closes when you click outside. Uses Framer Motion for smooth open/close animation.

**Spinner.jsx** — A spinning loading indicator.

**Toast.jsx** — The notification pop-ups (green for success, red for error). Uses React Context so any component anywhere in the app can trigger a toast by calling `useToast()`.

#### src/components/layout/ — Page Structure

**Navbar.jsx** — The top navigation bar. Shows the two-line Velour/ESSENCE logo, nav links (Home, Shop, Collections, About Us, Contact), search icon, account icon, and cart icon with item count badge. On mobile, shows a hamburger menu.

**Footer.jsx** — The bottom of every client page. Logo, links, support info, copyright.

**PageWrapper.jsx** — Wraps every client page. Puts Navbar on top, Footer at bottom, CartDrawer always available. Any page that uses PageWrapper automatically gets the full layout.

**AdminSidebar.jsx** — The dark sidebar on every admin page. Has navigation links (Dashboard, Products, Orders, Sales, Customers, Reports, Settings) and a Logout button. Active link is highlighted in burgundy.

#### src/components/shop/ — Product Display

**ProductCard.jsx** — The card shown in product grids. Shows image (with Unsplash fallback if no image uploaded yet), name, price (and crossed-out original price if discounted), Sale badge, wishlist heart icon, and an "add to cart" button on click.

**ProductGrid.jsx** — A responsive grid that maps over an array of products and renders a ProductCard for each.

**FilterBar.jsx** — The search input and category dropdown on the shop page.

#### src/components/cart/ — Cart UI

**CartDrawer.jsx** — The slide-in panel from the right. Shows cart items, subtotal, "View Cart" and "Checkout" buttons. Animated with Framer Motion (slides in from right, overlay fades in behind it).

**CartItem.jsx** — One row in the cart. Shows product image, name, size, price, quantity stepper (- / +), and a delete button.

**CartSummary.jsx** — The subtotal/delivery/total breakdown shown in the cart and checkout.

#### src/components/checkout/ — Checkout Flow

**CheckoutForm.jsx** — The form with Full Name, Phone Number, School (dropdown), Hostel fields. Uses **React Hook Form** for form state management and **Zod** for validation rules.

**PaymentButton.jsx** — The "Pay Now" button. When clicked, it calls the backend to initialize a Paystack transaction, gets back the payment URL, and redirects the browser there.

**OrderSummary.jsx** — Shows the list of items being ordered with prices and totals.

---

### src/pages/ — The Actual Pages

#### Client Pages (what shoppers see)

**HomePage.jsx**
- Hero banner with a rich perfume background image, headline text, Shop Now button
- Feature badges row: Premium Quality, Long Lasting, Secure Payments, Fast Delivery
- Featured products grid (products marked `isFeatured: true` in database)

**ShopPage.jsx**
- Left sidebar with category radio buttons, price range slider, sort dropdown
- Right area with "Showing X of Y products" and the product grid
- URL syncs with selected category (`/shop?category=Oud`)

**ProductPage.jsx**
- Large product image with thumbnail switcher
- Star rating display
- Price with discount badge
- Size selector (50ml / 100ml buttons)
- Quantity stepper
- "Add to Cart" and "Buy Now" buttons
- Feature badges: Long Lasting, Premium Quality, Secure Packaging

**CartPage.jsx**
- Lists all cart items
- Cart summary on the right
- "Proceed to Checkout" and "Continue Shopping" buttons

**CheckoutPage.jsx**
- Customer info form (Name, Phone, School, Hostel)
- Payment method (Paystack card, with VISA/MC/DINERS logos)
- Order summary panel with delivery fee (₦1,500)
- Pay button that triggers Paystack

**OrderConfirmationPage.jsx**
- Dark gradient hero with a big green checkmark
- "Thank you, [Name]!" heading
- The order ID displayed very large: `VE-20260527-8821`
- SMS confirmation note
- "Continue Shopping" and "Track Your Order" buttons
- Order details card below (date, total, delivery address, status)

---

#### Admin Pages (what the store owner sees)

**AdminLoginPage.jsx**
- Dark floral background
- Two-line logo
- Email + password form with show/hide password toggle
- Remember me checkbox, Forgot password link
- Connected to the `/api/admin/login` endpoint

**DashboardPage.jsx**
- Top bar with title and admin avatar
- 4 stat cards: Total Orders, Total Revenue, Pending Orders, Total Customers
- Revenue Overview bar chart (This Week vs Last Week — 7 bars per week)
- Orders by Status donut chart (Pending / Confirmed / Delivered)
- Charts are built with pure CSS/inline styles — no extra chart library needed

**ProductsPage.jsx**
- Search, category, and status filter dropdowns
- Table with columns: Product (image + name), Price, Status, Visibility, Actions
- Status badges: In Stock (green), Low Stock (yellow), Out of Stock (red)
- Visibility badge: green "Visible" or grey "Hidden" — click it to toggle instantly without opening the edit page
- Hidden products are dimmed in the table
- Edit and Delete action buttons per row

**AddProductPage.jsx**
- Form to create a new product
- Fields: Name, Description, Price, Stock, Category, Discount%, Featured checkbox, Image upload
- Visibility toggle switch — defaults ON (visible); flip OFF to create the product as hidden
- Images uploaded to Cloudinary through the backend

**EditProductPage.jsx**
- Same form pre-filled with existing product data
- Visibility toggle switch — shows the current state, toggle to hide/show the product
- New image upload replaces existing images

**OrdersPage.jsx**
- Filter by status and date range
- Table: Order ID, Customer, Total, Status, Date, Actions
- Action buttons: View (eye icon), and a status-advance button ("Mark as Confirmed" / "Mark as Delivered")
- Pagination at the bottom

**PaymentsPage.jsx**
- Real-time view of every payment attempt — paid AND pending (auto-refreshes every 10 seconds)
- Summary stats at the top: total revenue, total paid transactions, total pending
- Table: Reference, Customer, Phone, Amount, Status (Paid / Pending), Order ID, Date
- Filter by status (All / Paid / Pending)
- Manual refresh button
- Pending = customer opened checkout but never completed payment; Success = paid and order created

**SalesPage.jsx**
- Left panel: form to create a new sale (select product, discount %, start date, end date)
- Right panel: list of existing sales with toggle (pause/resume) and delete buttons

---

## Part 3 — The .env Files (Secret Keys)

A `.env` file holds sensitive information that should never be shared publicly. Think of it like a safe in the back office.

### server/.env
```
DATABASE_URL       ← The address of your Supabase PostgreSQL database
PORT               ← Which door the server listens on (5000)
JWT_SECRET         ← A secret phrase used to sign/verify admin tokens
CLOUDINARY_*       ← Keys to access your Cloudinary image storage account
PAYSTACK_*         ← Keys to access your Paystack payment account
TERMII_*           ← Keys to access your Termii SMS account
CLIENT_URL         ← The frontend's address (so CORS knows who's allowed in)
```

### .env (root — for the frontend)
```
VITE_API_URL              ← The backend's address the frontend talks to
VITE_PAYSTACK_PUBLIC_KEY  ← The Paystack public key (safe to use in browser)
```

The reason the frontend has a separate key (`PUBLIC_KEY`) from the backend (`SECRET_KEY`) is security. The secret key must never reach the browser — it can authorize real transactions. The public key can only *initiate* a payment flow and is safe to expose.

---

## Part 4 — The Payment Flow (Step by Step)

This is the most complex part of the app. Here's exactly what happens when a customer clicks "Pay":

```
1. Customer fills in Name, Phone, School, Hostel and clicks "Pay ₦66,500"

2. Frontend → Backend: POST /api/payment/initialize
   Sends: customer details + cart items + total amount

3. Backend → Paystack: POST https://api.paystack.co/transaction/initialize
   Sends: email (we use phone@velour.com), amount in kobo (₦66,500 × 100 = 6,650,000)
   Gets back: authorization_url + reference code

4. Backend → Frontend: { authorizationUrl, reference }

5. Frontend saves the reference to sessionStorage (browser's short-term memory)
   Then redirects the browser to Paystack's authorization_url

6. Customer is now on Paystack's website, enters card details, pays

7. Paystack redirects customer back to:
   http://localhost:5173/order-confirmation?reference=VE-xxx

8. OrderConfirmationPage loads, reads the reference from URL or sessionStorage

9. Frontend → Backend: GET /api/payment/verify?reference=VE-xxx

10. Backend → Paystack: GET https://api.paystack.co/transaction/verify/VE-xxx
    Checks: did this payment actually succeed?

11. If successful:
    - Backend creates the Order in the database
    - Reduces product stock counts
    - Sends SMS to customer via Termii
    - Returns the order data

12. Frontend shows the confirmation page with the Order ID

BONUS — Webhook (backup):
    At step 6, while the customer is on Paystack, Paystack also silently sends
    a POST to /api/payment/webhook on our server. If the customer's browser
    closes before step 7, the order still gets created from the webhook.
```

---

## Part 5 — The Design System

All colours are defined once in `src/index.css` under the `@theme` block (Tailwind CSS v4's way of adding custom colours):

| Name | Color | Hex | Used for |
|------|-------|-----|---------|
| `burgundy` | Dark red | `#800020` | Primary buttons, active nav links, sale badges |
| `burgundy-dark` | Deeper red | `#5C0016` | Button hover states |
| `cream` | Off white | `#FAF7F4` | Page backgrounds, card hovers |
| `charcoal` | Near black | `#1A1A1A` | Main text, dark buttons |
| `warm-gray` | Medium gray | `#6B6B6B` | Secondary text, labels |
| `border` | Light beige | `#E8E0D8` | Card borders, dividers |
| `gold` | Champagne | `#C9A96E` | Star ratings, accents |
| `success` | Muted green | `#4A7C59` | "In Stock", success toasts |
| `error` | Deep red | `#B91C1C` | Error messages, "Out of Stock" |

**Fonts** are loaded from Google Fonts:
- **Cormorant Garamond** (serif) — used for headings, logo, product names. Gives an elegant, luxury feel.
- **Inter** (sans-serif) — used for all body text, labels, buttons. Clean and readable.

---

## Part 6 — How the Files Connect (The Full Data Journey)

Here's a complete trace of what happens when a user visits the shop and adds a product to their cart:

```
User types: http://localhost:5173/shop

1. Browser loads index.html → loads main.jsx
2. main.jsx renders <App /> inside QueryClientProvider + ToastProvider
3. App.jsx renders <AppRouter />
4. AppRouter sees URL is "/shop" → renders <ShopPage />
5. ShopPage renders <PageWrapper> which adds Navbar + Footer + CartDrawer
6. ShopPage calls useProducts() hook
7. useProducts() calls TanStack Query with queryFn: productService.getAll()
8. productService.getAll() calls Axios: GET http://localhost:5000/api/products
9. Axios request hits the backend
10. Express router matches GET /api/products → productController.getProducts
11. getProducts calls: prisma.product.findMany()
12. Prisma translates to SQL: SELECT * FROM products
13. SQL runs on Supabase (PostgreSQL database in the cloud)
14. Database returns rows of product data
15. Prisma gives JavaScript objects back to getProducts
16. getProducts sends: res.json({ success: true, data: products })
17. Axios receives the JSON response
18. TanStack Query stores it in the cache and gives it to ShopPage
19. ShopPage passes `products` array to <ProductGrid />
20. ProductGrid maps over the array, renders a <ProductCard /> for each
21. User sees the products grid

User clicks "Add to Cart" on a product:

22. ProductCard's handleAdd() function runs
23. Calls addItem(toCartItem(product)) from cartStore (Zustand)
24. cartStore adds the item to the items array
25. Zustand saves the updated cart to localStorage
26. The cart icon in Navbar re-renders with the new item count
27. Toast notification appears: "Oud Elixir added to cart"
```

Everything is connected. The browser, the React components, the Zustand store, the Axios service, the Express backend, the Prisma ORM, and the Supabase database.

---

## Part 7 — Technologies Summarised

| Technology | What it is | What it does here |
|-----------|-----------|------------------|
| **React** | UI library | Builds all the visual components |
| **Vite** | Build tool | Compiles and serves the React app fast |
| **Tailwind CSS v4** | Styling | All the colours, spacing, layout via CSS classes |
| **React Router v7** | Navigation | Handles URL-based page switching |
| **Zustand v5** | State management | Cart and auth state, persisted to localStorage |
| **TanStack Query v5** | Data fetching | Fetches, caches, and syncs server data |
| **React Hook Form** | Forms | Manages form inputs and submission |
| **Zod** | Validation | Validates form data (phone format, required fields etc.) |
| **Axios** | HTTP client | Sends requests from frontend to backend |
| **Framer Motion** | Animations | Cart drawer slide, page fade-ins |
| **Lucide React** | Icons | All the icons (cart, search, trash, etc.) |
| **Node.js** | Runtime | Runs JavaScript on the server |
| **Express v5** | Server framework | Handles HTTP requests on the backend |
| **Prisma v7** | ORM | Talks to the database using JavaScript |
| **PostgreSQL** | Database | Stores all data permanently |
| **Supabase** | Hosted DB | Free cloud-hosted PostgreSQL |
| **Cloudinary** | Image hosting | Stores and serves product images |
| **Paystack** | Payments | Processes card payments (Nigerian focus) |
| **Termii** | SMS | Sends order confirmation SMS messages |
| **JWT** | Authentication | Secure tokens for admin login sessions |
| **bcrypt** | Password security | Hashes passwords so they're never stored as plain text |
| **Multer** | File uploads | Handles image file uploads on the backend |
| **nodemon** | Dev tool | Auto-restarts the server when files change |

---

## Part 8 — How to Run Everything

### Starting the servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# You should see: "Server running on port 5000"
```

**Terminal 2 — Frontend:**
```bash
# From the root velour-essence/ folder
npm run dev
# You should see: "VITE ready at http://localhost:5173"
```

### Creating the first admin account (one-time)
```bash
curl -X POST http://localhost:5000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@velour.com","password":"admin123"}'
```

### URLs
| URL | What you see |
|-----|-------------|
| `http://localhost:5173` | Homepage (customer shop) |
| `http://localhost:5173/shop` | All products |
| `http://localhost:5173/cart` | Shopping cart |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5173/admin/dashboard` | Admin dashboard |
| `http://localhost:5000/health` | Backend health check |
| `http://localhost:5000/api/products` | Raw products JSON |

---

## Part 9 — What Happens in Production (When You Deploy)

Right now the app runs on your local machine. When you deploy it for real customers:

- **Frontend** → deploy to **Vercel** (free). Vercel builds the React app and serves it globally on a CDN.
- **Backend** → deploy to **Railway** or **Render** (free tiers available). They run your Node.js server 24/7.
- **Database** → already live on **Supabase** (the same one we're using in dev).
- **Images** → already on **Cloudinary**.
- **Payments** → switch Paystack keys from Test keys to Live keys in `.env`.

The only thing that changes is the URLs in `.env` — instead of `localhost:5000`, the frontend calls your real backend URL.

---

## Summary

You now have a complete, full-stack e-commerce application. It can:

- ✅ Show a beautiful perfume shop with a hero, featured products, categories
- ✅ Let customers browse, search, and filter products
- ✅ Show individual product pages with images, ratings, size selection
- ✅ Let customers add to cart, view cart, update quantities
- ✅ Process real card payments via Paystack
- ✅ Send SMS order confirmations via Termii
- ✅ Show order confirmation with a unique Order ID
- ✅ Admin login with JWT security
- ✅ Admin dashboard with stats and charts
- ✅ Admin product management (create, edit, delete with image upload)
- ✅ Admin order management (view all orders, update status)
- ✅ Admin sales/promotions management

Every part of this was built using industry-standard tools and patterns. This is not a toy project — with real API keys and a deployment, this is a working business application.
