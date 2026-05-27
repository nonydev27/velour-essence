import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import { paymentService } from '../../services/paymentService';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const ref = searchParams.get('reference') || sessionStorage.getItem('ve_paystack_ref');
    if (!ref) { setError('No payment reference found.'); setLoading(false); return; }

    paymentService.verify(ref)
      .then(({ data }) => { setOrder(data); clearCart(); sessionStorage.removeItem('ve_paystack_ref'); })
      .catch((err) => setError(err.response?.data?.message || 'Could not verify payment.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={36} className="animate-spin text-charcoal" />
        <p className="text-warm-gray text-sm">Verifying your payment…</p>
      </div>
    </PageWrapper>
  );

  if (error) return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <p className="text-error font-medium mb-4">{error}</p>
        <Link to="/shop" className="px-6 py-3 rounded-lg bg-charcoal text-white text-sm font-medium hover:bg-burgundy transition-colors">
          Back to Shop
        </Link>
      </div>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      {/* Hero confirmation banner */}
      <div
        className="relative py-24 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #800020 100%)',
        }}
      >
        {/* Subtle floral overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=1200&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative z-10 flex flex-col items-center gap-5 px-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle size={36} className="text-success" />
          </div>
          <h1 className="text-4xl font-serif text-white">Thank you, {order?.customerName?.split(' ')[0]}!</h1>
          <p className="text-white/70 text-sm max-w-xs">Your order has been placed successfully.</p>

          {/* Order ID badge */}
          <div className="bg-white/10 border border-white/20 rounded-2xl px-10 py-5 mt-2">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Your Order ID</p>
            <p className="text-3xl font-serif font-semibold text-white tracking-wide">{order?.orderId}</p>
          </div>

          <p className="text-white/60 text-xs max-w-xs">
            We&apos;ve sent an SMS to {order?.phone} with your order details.
          </p>

          <div className="flex gap-3 mt-2">
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-lg bg-white text-charcoal text-sm font-medium hover:bg-cream transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-lg border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>

      {/* Order details */}
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="bg-white border border-border rounded-2xl p-6 space-y-3">
          {[
            { label: 'Date', value: formatDate(order?.createdAt) },
            { label: 'Total', value: formatPrice(order?.totalAmount) },
            { label: 'Deliver to', value: `${order?.school} — ${order?.hostel}` },
            { label: 'Status', value: 'Confirmed' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-warm-gray">{label}</span>
              <span className="text-charcoal font-medium text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
