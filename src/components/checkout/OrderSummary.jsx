import { formatPrice } from '../../utils/formatPrice';

export default function OrderSummary({ items, totalPrice }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Order Summary</h3>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream shrink-0">
              {item.images?.[0] ? (
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-border" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal line-clamp-1">{item.name}</p>
              <p className="text-xs text-warm-gray">x{item.qty}</p>
            </div>
            <p className="text-sm font-semibold text-charcoal">
              {formatPrice((item.effectivePrice ?? item.price) * item.qty)}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 flex justify-between font-semibold text-charcoal">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
