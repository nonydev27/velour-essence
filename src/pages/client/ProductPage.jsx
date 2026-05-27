import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Package, Minus, Plus, Star } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { useProduct } from '../../hooks/useProducts';
import { useCart, toCartItem } from '../../hooks/useCart';
import { useToast } from '../../components/ui/Toast';
import { formatPrice, discountedPrice } from '../../utils/formatPrice';

const SIZES = ['50ml', '100ml'];
const BADGES = [
  { Icon: Clock,      label: 'Long Lasting' },
  { Icon: ShieldCheck, label: 'Premium Quality' },
  { Icon: Package,    label: 'Secure Packaging' },
];

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const toast = useToast();

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState('50ml');
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return <PageWrapper><div className="flex justify-center py-24"><Spinner size="lg" /></div></PageWrapper>;
  }
  if (!product) {
    return (
      <PageWrapper>
        <div className="text-center py-24">
          <p className="text-warm-gray">Product not found.</p>
          <Link to="/shop" className="text-burgundy underline mt-2 block">Back to shop</Link>
        </div>
      </PageWrapper>
    );
  }

  const effectivePrice = discountedPrice(product.price, product.discount);
  const outOfStock = product.stock === 0;

  function handleAdd() {
    if (outOfStock) return;
    for (let i = 0; i < qty; i++) addItem(toCartItem(product));
    toast(`${product.name} added to cart`, 'success');
  }

  function handleBuyNow() {
    handleAdd();
  }

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-warm-gray">
          Home <span className="mx-1">/</span> Shop <span className="mx-1">/</span>
          <span className="text-charcoal font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-12">

          {/* ── Images ─────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-xl overflow-hidden bg-cream mb-3">
              {product.images?.[imgIdx] ? (
                <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <img
                  src={`https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex gap-2">
              {(product.images?.length > 0 ? product.images : [null, null, null]).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-charcoal' : 'border-border'}`}
                >
                  <img
                    src={img || `https://images.unsplash.com/photo-1541643600914-78b084683702?w=120&q=70`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Details ────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={14} className="fill-gold text-gold" />
              ))}
              <span className="text-xs text-warm-gray ml-1">(24 reviews)</span>
            </div>

            <h1 className="text-3xl font-serif text-charcoal leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-charcoal">
                {formatPrice(effectivePrice)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-base text-warm-gray line-through">{formatPrice(product.price)}</span>
                  <Badge className="bg-error text-white text-xs px-2 py-0.5">{product.discount}% OFF</Badge>
                </>
              )}
            </div>

            <p className="text-warm-gray text-sm leading-relaxed">{product.description}</p>

            {/* Size */}
            <div>
              <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      size === s
                        ? 'border-charcoal bg-charcoal text-white'
                        : 'border-border text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-cream text-charcoal"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-cream text-charcoal"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {outOfStock && <p className="text-error text-sm font-medium">Out of stock</p>}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={outOfStock}
                className="flex-1 py-3 rounded-lg border border-charcoal text-charcoal font-medium text-sm hover:bg-cream transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={outOfStock}
                className="flex-1 py-3 rounded-lg bg-charcoal text-white font-medium text-sm hover:bg-burgundy transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Feature badges */}
            <div className="flex items-center gap-6 pt-2 border-t border-border">
              {BADGES.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-warm-gray">
                  <Icon size={14} strokeWidth={1.5} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
