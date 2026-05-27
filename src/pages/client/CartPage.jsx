import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';
import { useCart } from '../../hooks/useCart';

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-charcoal mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <ShoppingBag size={56} strokeWidth={1} className="text-warm-gray" />
            <p className="text-warm-gray text-lg">Your cart is empty.</p>
            <Button asChild>
              <Link to="/shop">Browse Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="space-y-4">
              <CartSummary totalPrice={totalPrice} totalItems={totalItems} />
              <Button asChild className="w-full">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
