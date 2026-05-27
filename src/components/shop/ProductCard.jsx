import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatPrice, discountedPrice } from '../../utils/formatPrice';
import { useCart, toCartItem } from '../../hooks/useCart';
import { useToast } from '../ui/Toast';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80',
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80',
];

let fallbackIdx = 0;
const assignedFallbacks = {};

function getFallback(id) {
  if (!assignedFallbacks[id]) {
    assignedFallbacks[id] = FALLBACK_IMAGES[fallbackIdx % FALLBACK_IMAGES.length];
    fallbackIdx++;
  }
  return assignedFallbacks[id];
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const toast = useToast();

  const effectivePrice = discountedPrice(product.price, product.discount);
  const hasDiscount = product.discount > 0;
  const isOutOfStock = product.stock === 0;
  const imgSrc = product.images?.[0] || getFallback(product.id);

  function handleAdd(e) {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem(toCartItem(product));
    toast(`${product.name} added to cart`, 'success');
  }

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Wishlist button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={13} className="text-warm-gray" />
        </button>
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-error text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            Sale
          </span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-warm-gray">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-serif text-sm font-semibold text-charcoal line-clamp-1 group-hover:text-burgundy transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-charcoal">{formatPrice(effectivePrice)}</span>
          {hasDiscount && (
            <span className="text-xs text-warm-gray line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
