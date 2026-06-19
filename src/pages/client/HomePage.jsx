import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard, Truck } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import ProductCard from '../../components/shop/ProductCard';
import Spinner from '../../components/ui/Spinner';
import { useProducts } from '../../hooks/useProducts';

const slides = [
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=85',
'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1600&q=85',
  'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=1600&q=85',
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Slides — opacity crossfade, GPU-composited, zero layout cost */}
      {slides.map((url, i) => (
        <div
          key={url}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${url})`,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-charcoal/65 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] max-w-7xl mx-auto px-6 py-24 w-full">
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

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[4] flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer(); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

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
      {/* ── Hero Carousel ────────────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── Feature badges ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-9xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {features.map(({ Icon,label, sub }) => (
            <div key={label} className="flex items-center gap-3 px-4  last:pr-0">
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
        <div className="flex items-end justify-between mb-10">
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
