import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

const FALLBACK = 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=120&q=70';

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();
  const price = item.effectivePrice ?? item.price;

  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream shrink-0">
        <img
          src={item.images?.[0] || FALLBACK}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-charcoal line-clamp-1">{item.name}</h4>
        <p className="text-xs text-warm-gray">50ml</p>
        <p className="text-sm font-semibold text-charcoal mt-1">{formatPrice(price)}</p>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0">
        <button onClick={() => removeItem(item.id)} className="text-warm-gray hover:text-error transition-colors p-0.5">
          <Trash2 size={14} />
        </button>
        <div className="flex items-center gap-1.5 border border-border rounded-lg px-1">
          <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-0.5 hover:text-burgundy">
            <Minus size={11} />
          </button>
          <span className="w-5 text-center text-xs font-medium">{item.qty}</span>
          <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-0.5 hover:text-burgundy">
            <Plus size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
