import { useCartStore } from '../store/cartStore';
import { discountedPrice } from '../utils/formatPrice';

// Convenience hook that provides computed values alongside actions
export function useCart() {
  const store = useCartStore();

  const totalItems = store.items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = store.items.reduce((s, i) => s + (i.effectivePrice ?? i.price) * i.qty, 0);

  return { ...store, totalItems, totalPrice };
}

// Build a cart-ready product object from a product returned by the API
export function toCartItem(product) {
  const effectivePrice = discountedPrice(product.price, product.discount);
  return { ...product, effectivePrice };
}
