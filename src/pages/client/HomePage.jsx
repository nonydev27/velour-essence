import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard, Truck } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import ProductCard from '../../components/shop/ProductCard';
import Spinner from '../../components/ui/Spinner';
import { useProducts } from '../../hooks/useProducts';
// Rich perfume hero from Unsplash
const heroImg = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=85';

const features = [
  { Icon: ShieldCheck, label: 'Premium Quality', sub: 'Finest ingredients' },
  { Icon: Clock,       label: 'Long Lasting',    sub: 'Scents that stay' },
  { Icon: CreditCard,  label: 'Secure Payments', sub: 'Pay with confidence' },
  { Icon: Truck,       label: 'Fast Delivery',   sub: 'Right to your door' },
];

export default function HomePage() {
  const { data: featured, isLoading } = useProducts({ featured: 'true' });

  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-charcoal/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <p className="text-white/70 text-sm mb-3 tracking-wide">
              Exquisite Scents, Unforgettable You.
            </p>
            <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-5">
              Discover Your<br />Signature Scent
            </h1>
            <p className="text-white/65 text-base leading-relaxed mb-8">
              Premium perfumes crafted with passion<br />for every moment that matters.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-charcoal font-medium px-7 py-3 rounded-lg hover:bg-cream transition-colors text-sm"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Feature badges ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {features.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 px-4 first:pl-0 last:pr-0">
              <Icon size={24} className="text-charcoal shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-semibold text-charcoal">{label}</p>
                <p className="text-xs text-warm-gray">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Perfumes ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-serif text-charcoal">Featured Perfumes</h2>
          <Link to="/shop" className="text-sm text-charcoal hover:underline font-medium">
            View all
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : featured?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p className="text-warm-gray text-center py-16">No featured products yet.</p>
        )}
      </section>
    </PageWrapper>
  );
}
