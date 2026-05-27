export function formatPrice(amount) {
  return `₦${Number(amount).toLocaleString('en-NG')}`;
}

export function discountedPrice(price, discountPercent) {
  if (!discountPercent) return price;
  return price - (price * discountPercent) / 100;
}
