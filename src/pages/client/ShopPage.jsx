import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import ProductCard from '../../components/shop/ProductCard';
import Spinner from '../../components/ui/Spinner';
import { useProducts } from '../../hooks/useProducts';

const CATEGORIES = ['All Perfumes', 'Women', 'Men', 'Unisex', 'Best Sellers', 'New Arrivals', 'Oud', 'Floral', 'Woody', 'Fresh', 'Oriental'];
const SORT_OPTIONS = ['Newest First', 'Price: Low to High', 'Price: High to Low', 'Best Selling'];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);
  const [sort, setSort] = useState('Newest First');

  const { data: products, isLoading } = useProducts({
    ...(category && category !== 'All Perfumes' && { category }),
    ...(search && { search }),
  });

  useEffect(() => {
    if (category && category !== 'All Perfumes') setSearchParams({ category });
    else setSearchParams({});
  }, [category]);

  return (
    <PageWrapper>
      {/* Breadcrumb */}
     
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-serif text-charcoal mb-6">Shop</h1>

        <div className="flex gap-8">
          {/* ── Left Sidebar ─────────────────────────────────────────── */}
          <aside className="hidden md:flex flex-col gap-7 w-52 shrink-0">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-burgundy"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === c || (c === 'All Perfumes' && !category)}
                        onChange={() => setCategory(c === 'All Perfumes' ? '' : c)}
                        className="accent-burgundy"
                      />
                      <span className={`transition-colors ${(category === c || (c === 'All Perfumes' && !category)) ? 'text-charcoal font-medium' : 'text-warm-gray group-hover:text-charcoal'}`}>
                        {c}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Price Range</h3>
              <input
                type="range"
                min={0}
                max={100000}
                step={1000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-burgundy"
              />
              <div className="flex justify-between text-xs text-warm-gray mt-1">
                <span>₵0</span>
                <span>₵{priceMax.toLocaleString()}</span>
              </div>
            </div>

            {/* Sort by */}
            <div>
              <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Sort by</h3>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full appearance-none px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy pr-8"
                >
                  {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
              </div>
            </div>
          </aside>

          {/* ── Product Grid ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-warm-gray">
                Showing {products?.length ? `1–${Math.min(12, products.length)} of ${products.length}` : '0'} products
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-warm-gray">Sort by:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-1.5 border border-border rounded-lg text-sm bg-white focus:outline-none text-charcoal"
                  >
                    {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : !products?.length ? (
              <div className="text-center py-20 text-warm-gray">No products found.</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
