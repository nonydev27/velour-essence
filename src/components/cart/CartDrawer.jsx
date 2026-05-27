import { X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import { formatPrice } from '../../utils/formatPrice';

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-serif text-lg text-charcoal">
                Your Cart ({totalItems})
              </h2>
              <button onClick={closeCart} className="p-1.5 rounded-lg hover:bg-cream transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-warm-gray">
                  <ShoppingBag size={44} strokeWidth={1} />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-border">
                <div className="flex justify-between text-sm text-warm-gray mb-1">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-warm-gray mb-4">Shipping &amp; taxes calculated at checkout</p>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="w-full py-2.5 rounded-lg border border-charcoal text-charcoal text-sm font-medium text-center hover:bg-cream transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="w-full py-2.5 rounded-lg bg-charcoal text-white text-sm font-medium text-center hover:bg-burgundy transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
