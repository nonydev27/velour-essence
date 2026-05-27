import { PRODUCT_CATEGORIES } from '../../constants/statusEnums';
import { Search } from 'lucide-react';

export default function FilterBar({ search, onSearch, category, onCategory }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
        <input
          type="text"
          placeholder="Search perfumes..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy"
        />
      </div>

      {/* Category filter */}
      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy"
      >
        <option value="">All Categories</option>
        {PRODUCT_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
