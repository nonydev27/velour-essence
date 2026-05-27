import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageWrapper from '../../components/layout/PageWrapper';
import { useCart } from '../../hooks/useCart';
import { paymentService } from '../../services/paymentService';
import { useToast } from '../../components/ui/Toast';
import { formatPrice } from '../../utils/formatPrice';
import { SCHOOLS } from '../../constants/schools';

const DELIVERY_FEE = 1500;

const schema = z.object({
  customerName: z.string().min(2, 'Full name required'),
  phone: z.string().regex(/^0[789][01]\d{8}$/, 'Enter a valid Nigerian number (e.g. 08012345678)'),
  school: z.string().min(1, 'Select your school'),
  hostel: z.string().min(2, 'Enter your hostel / address'),
});

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const grandTotal = totalPrice + DELIVERY_FEE;

  async function onSubmit(data) {
    setLoading(true);
    try {
      const cartItems = items.map((i) => ({
        productId: i.id,
        name: i.name,
        qty: i.qty,
        price: i.effectivePrice ?? i.price,
      }));

      const { authorizationUrl, reference } = await paymentService.initialize({
        ...data,
        items: cartItems,
        totalAmount: grandTotal,
      });

      sessionStorage.setItem('ve_paystack_ref', reference);
      window.location.href = authorizationUrl;
    } catch (err) {
      toast(err.response?.data?.message || 'Payment initialization failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-warm-gray">
          Home <span className="mx-1">/</span>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <span className="mx-1">/</span>
          <span className="text-charcoal font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-[1fr_360px] gap-10">

          {/* ── Left: Customer Info ──────────────────────────────── */}
          <div>
            <h2 className="text-lg font-serif text-charcoal mb-6">Customer Information</h2>
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-charcoal">Full Name</label>
                  <input
                    placeholder="Jane Doe"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-charcoal ${errors.customerName ? 'border-error' : 'border-border'}`}
                    {...register('customerName')}
                  />
                  {errors.customerName && <p className="text-xs text-error">{errors.customerName.message}</p>}
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-charcoal">Phone Number</label>
                  <input
                    placeholder="08123456789"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-charcoal ${errors.phone ? 'border-error' : 'border-border'}`}
                    {...register('phone')}
                  />
                  {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
                </div>
              </div>

              {/* School */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-charcoal">School</label>
                <select
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-charcoal ${errors.school ? 'border-error' : 'border-border'}`}
                  {...register('school')}
                >
                  <option value="">Select school...</option>
                  {SCHOOLS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.school && <p className="text-xs text-error">{errors.school.message}</p>}
              </div>

              {/* Hostel */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-charcoal">Hostel / Address</label>
                <input
                  placeholder="Queen's Hall, Room 16"
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-charcoal ${errors.hostel ? 'border-error' : 'border-border'}`}
                  {...register('hostel')}
                />
                {errors.hostel && <p className="text-xs text-error">{errors.hostel.message}</p>}
              </div>

              {/* Payment method */}
              <div className="mt-2">
                <label className="text-xs font-medium text-charcoal block mb-3">Payment</label>
                <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer bg-cream/40">
                  <input type="radio" checked readOnly className="mt-0.5 accent-charcoal" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Pay with Card (Paystack)</p>
                    <p className="text-xs text-warm-gray mt-0.5">You will be redirected to securely complete payment.</p>
                    <div className="flex items-center gap-2 mt-2">
                      {/* Card logos as text badges */}
                      {['VISA', 'MC', 'DINERS'].map((c) => (
                        <span key={c} className="px-2 py-0.5 border border-border rounded text-[10px] font-semibold text-warm-gray bg-white">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              </div>
            </form>
          </div>

          {/* ── Right: Order Summary ─────────────────────────────── */}
          <div>
            <h2 className="text-lg font-serif text-charcoal mb-6">Order Summary</h2>
            <div className="bg-white border border-border rounded-xl p-5 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream shrink-0">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=80&q=70'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-charcoal line-clamp-1">{item.name}</p>
                    <p className="text-xs text-warm-gray">x{item.qty}</p>
                  </div>
                  <p className="text-xs font-semibold text-charcoal shrink-0">
                    {formatPrice((item.effectivePrice ?? item.price) * item.qty)}
                  </p>
                </div>
              ))}

              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm text-warm-gray">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-warm-gray">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(DELIVERY_FEE)}</span>
                </div>
                <div className="flex justify-between font-semibold text-charcoal text-sm border-t border-border pt-2">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-charcoal text-white font-medium text-sm hover:bg-burgundy transition-colors disabled:opacity-60 mt-2"
              >
                {loading ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
              </button>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
