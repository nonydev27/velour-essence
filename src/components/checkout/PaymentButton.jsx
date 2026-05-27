import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { paymentService } from '../../services/paymentService';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../ui/Toast';
import { useState } from 'react';

export default function PaymentButton({ formData, disabled }) {
  const { items, totalPrice, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const cartItems = items.map((i) => ({
        productId: i.id,
        name: i.name,
        qty: i.qty,
        price: i.effectivePrice ?? i.price,
      }));

      const { authorizationUrl, reference } = await paymentService.initialize({
        ...formData,
        items: cartItems,
        totalAmount: totalPrice,
      });

      // Store reference so verify page can use it
      sessionStorage.setItem('ve_paystack_ref', reference);

      // Redirect to Paystack
      window.location.href = authorizationUrl;
    } catch (err) {
      toast(err.response?.data?.message || 'Payment initialization failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handlePay} loading={loading} disabled={disabled || loading} className="w-full" size="lg">
      Pay Now
    </Button>
  );
}
