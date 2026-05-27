import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatPrice, discountedPrice } from '../../utils/formatPrice';
import { useCart, toCartItem } from '../../hooks/useCart';
import { useToast } from '../ui/Toast';
import { useState } from 'react';

export default function ProductModal({ product, isOpen, onClose }) {
  const { addItem } = useCart();
  const toast = useToast();
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) return null;

  const effectivePrice = discountedPrice(product.price, product.discount);

  function handleAdd() {
    addItem(toCartItem(product));
    toast(`${product.name} added to cart`, 'success');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} maxWidth="max-w-2xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-cream mb-2">
            {product.images?.[imgIdx] ? (
              <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-warm-gray">No image</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${i === imgIdx ? 'border-burgundy' : 'border-border'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <p className="text-xs text-warm-gray uppercase tracking-wider">{product.category}</p>
          <p className="text-sm text-warm-gray leading-relaxed">{product.description}</p>
          <div>
            <span className="text-2xl font-semibold text-charcoal">{formatPrice(effectivePrice)}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-warm-gray line-through">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.stock === 0 ? (
            <p className="text-error text-sm font-medium">Out of stock</p>
          ) : (
            <p className="text-success text-sm">{product.stock} in stock</p>
          )}
          <Button onClick={handleAdd} disabled={product.stock === 0} className="w-full mt-auto">
            Add to Cart
          </Button>
        </div>
      </div>
    </Modal>
  );
}
