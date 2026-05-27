import { formatPrice } from '../../utils/formatPrice';

export default function CartSummary({ totalPrice, totalItems }) {
  return (
    <div className="bg-cream rounded-xl p-4 space-y-2">
      <div className="flex justify-between text-sm text-warm-gray">
        <span>Items ({totalItems})</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <div className="flex justify-between text-sm text-warm-gray">
        <span>Delivery</span>
        <span className="text-success">Free</span>
      </div>
      <div className="border-t border-border pt-2 flex justify-between font-semibold text-charcoal">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
