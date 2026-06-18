import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useActiveSales } from '../../hooks/useAdmin';

const DISMISS_KEY = 've_flash_dismissed';

function useCountdown(endDate) {
  const getRemaining = useCallback(() => {
    const diff = new Date(endDate) - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    return { h, m, s };
  }, [endDate]);

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1_000);
    return () => clearInterval(id);
  }, [getRemaining]);

  return remaining;
}

function Segment({ value, label }) {
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className="font-mono font-bold text-sm tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[8px] uppercase tracking-wide opacity-70">{label}</span>
    </span>
  );
}

function CountdownPill({ endDate }) {
  const t = useCountdown(endDate);
  if (!t) return <span className="text-xs opacity-70">Ending soon</span>;
  return (
    <span className="inline-flex items-center gap-1 bg-white/15 rounded-lg px-2 py-1">
      <Segment value={t.h} label="hr" />
      <span className="opacity-50 text-xs mb-0.5">:</span>
      <Segment value={t.m} label="min" />
      <span className="opacity-50 text-xs mb-0.5">:</span>
      <Segment value={t.s} label="sec" />
    </span>
  );
}

function SaleSlide({ sale }) {
  const salePrice = sale.product?.price
    ? (sale.product.price * (1 - sale.discountPercent / 100)).toFixed(2)
    : null;

  return (
    <div className="flex items-center gap-3 min-w-0">
      {/* Discount badge */}
      <span className="shrink-0 bg-white text-burgundy font-bold text-xs px-2 py-0.5 rounded-full">
        {sale.discountPercent}% OFF
      </span>

      {/* Product name */}
      <span className="font-medium text-sm truncate max-w-[160px] sm:max-w-none">
        {sale.product?.name ?? 'Select product'}
      </span>

      {/* Divider */}
      <span className="opacity-30 hidden sm:inline">·</span>

      {/* Countdown */}
      <span className="hidden sm:flex items-center gap-1.5 text-xs opacity-90 shrink-0">
        <span className="opacity-70">Ends in</span>
        <CountdownPill endDate={sale.endDate} />
      </span>
    </div>
  );
}

export default function FlashSaleBanner() {
  const { data: sales = [] } = useActiveSales();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) === '1'
  );
  const [idx, setIdx] = useState(0);

  // Auto-cycle through multiple sales
  useEffect(() => {
    if (sales.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % sales.length), 4_000);
    return () => clearInterval(id);
  }, [sales.length]);

  if (!sales.length || dismissed) return null;

  const sale = sales[idx];

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  }

  return (
    <div className="bg-burgundy text-white px-4 py-2.5 flex items-center justify-between gap-3 relative overflow-hidden">
      {/* Subtle shimmer strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Left: icon + sale info */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <Zap size={15} className="shrink-0 fill-white text-white" />
        <span className="text-xs font-bold uppercase tracking-widest shrink-0 opacity-80">
          Flash Sale
        </span>
        <span className="opacity-30 text-sm">|</span>
        <SaleSlide sale={sale} />
      </div>

      {/* Middle: shop CTA */}
      <Link
        to="/shop"
        className="shrink-0 bg-white text-burgundy text-xs font-semibold px-3 py-1 rounded-full hover:bg-cream transition-colors"
      >
        Shop Now
      </Link>

      {/* Right: multi-sale nav + dismiss */}
      <div className="flex items-center gap-1 shrink-0">
        {sales.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + sales.length) % sales.length)}
              className="p-1 rounded hover:bg-white/15 transition-colors"
              aria-label="Previous sale"
            >
              <ChevronLeft size={13} />
            </button>
            <span className="text-[10px] opacity-60 tabular-nums w-6 text-center">
              {idx + 1}/{sales.length}
            </span>
            <button
              onClick={() => setIdx((i) => (i + 1) % sales.length)}
              className="p-1 rounded hover:bg-white/15 transition-colors"
              aria-label="Next sale"
            >
              <ChevronRight size={13} />
            </button>
          </>
        )}
        <button
          onClick={dismiss}
          className="p-1 rounded hover:bg-white/15 transition-colors ml-1"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
