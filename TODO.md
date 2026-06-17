# Velour Essence — TODO & Live Checklist

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
- Update `server/.env`:
  ```
  PAYSTACK_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXX
  PAYSTACK_PUBLIC_KEY=pk_live_XXXXXXXXXXXXXXXXXXXX
  ```
- Update root `.env`:
  ```
  VITE_PAYSTACK_PUBLIC_KEY=pk_live_XXXXXXXXXXXXXXXXXXXX
  ```

#### 2. Enable GHS currency on your account
- **Settings → Preferences → Accepted Currencies → enable Ghana Cedi (GHS)**
- If you registered with a Nigerian account and can't see GHS, contact Paystack support to add it, or register a Ghanaian merchant account at paystack.com/gh

#### 3. Set the Webhook URL
- **Settings → API Keys & Webhooks → Webhook URL**
- Enter your deployed server URL: `https://your-server-domain.com/api/payment/webhook`
- This is the backup that creates orders if a user closes the tab before the confirmation page loads
- Paystack will send a `charge.success` event here after every successful payment

#### 4. Set the Callback URL (optional — already set in code)
- The code already passes `callback_url` programmatically per transaction
- You can also set a global fallback in **Settings → Preferences → Callback URL**
- Value: `https://your-frontend-domain.com/order-confirmation`

#### 5. Complete KYC verification
- **Settings → Business Settings → Business Information**
- Required before Paystack releases any live funds
- For Ghana: Ghana Card or Passport, business registration (if applicable)

#### 6. Update CLIENT_URL in server/.env
```
CLIENT_URL=https://your-deployed-frontend-domain.com
```
This is used to build the `callback_url` sent to Paystack on every transaction.

---

## Database Migration (run after each schema change)

After pulling this repo or after any schema update, run:

```bash
cd server
npx prisma migrate dev --name <describe-the-change>
```

### Pending migrations
- [ ] `add_product_visibility_and_payments`
  - Adds `isVisible Boolean @default(true)` to `Product`
  - Adds new `Payment` model for tracking all payment attempts
  - Run: `npx prisma migrate dev --name add_product_visibility_and_payments`
  - Then restart the server: `npm run dev`

---

## SMS (Termii)

- [x] `smsService.js` built and integrated — fires after every confirmed payment
- [x] Phone normalization updated to Ghana (+233)
- [ ] Verify Termii API key is active — sign in at termii.com and confirm balance/credits
- [ ] Custom Sender ID (`VelourEss`) requires Termii approval — submit request in Termii dashboard
- [ ] For free tier: use the default generic sender ID while awaiting approval

---

## Deployment

- [ ] Deploy backend to Railway or Render
  - Set all env vars from `server/.env` in the platform dashboard
  - Run `npx prisma migrate deploy` (not `dev`) in production
- [ ] Deploy frontend to Vercel
  - Set `VITE_API_URL` and `VITE_PAYSTACK_PUBLIC_KEY` in Vercel env vars
- [ ] Point a custom domain if you have one
- [ ] Test end-to-end with a real GHS card after going live

---

## Nice-to-Have (future)

- [ ] Email receipts (in addition to SMS)
- [ ] Order tracking page for customers using their phone number
- [ ] Admin notification when a new order comes in (browser push or SMS to admin)
- [ ] Product image deletion — currently old images stay on Cloudinary when replaced
- [ ] Pagination on the admin products page
- [ ] Export orders to CSV
