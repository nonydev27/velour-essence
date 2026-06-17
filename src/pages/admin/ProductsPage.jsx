import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { useProductsAdmin, useDeleteProduct, useToggleProductVisibility } from '../../hooks/useProducts';
import { useToast } from '../../components/ui/Toast';
import { formatPrice } from '../../utils/formatPrice';

const FALLBACK = 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=80&q=70';

const stockStatus = (stock) => {
  if (stock === 0) return { label: 'Out of Stock', cls: 'bg-red-100 text-red-700' };
  if (stock <= 10) return { label: 'Low Stock', cls: 'bg-yellow-100 text-yellow-700' };
  return { label: 'In Stock', cls: 'bg-green-100 text-green-700' };
};

export default function ProductsPage() {
  const { data: products, isLoading } = useProductsAdmin();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: toggleVisibility } = useToggleProductVisibility();
  const toast = useToast();

  function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteProduct(id, {
      onSuccess: () => toast(`${name} deleted`, 'success'),
      onError: () => toast('Delete failed', 'error'),
    });
  }

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-charcoal">Products</h1>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-burgundy transition-colors"
          >
            <Plus size={15} /> Add Product
          </Link>
        </div>

        <div className="p-8">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-5">
            <input
              placeholder="Search products..."
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none w-56"
            />
            <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none text-charcoal">
              <option>All Categories</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none text-charcoal">
              <option>All Status</option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f4f5f7] border-b border-border">
                    {['Product', 'Price', 'Status', 'Visibility', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(!products || products.length === 0) ? (
                    <tr><td colSpan={5} className="text-center py-16 text-warm-gray">No products yet.</td></tr>
                  ) : products.map((p) => {
                    const { label, cls } = stockStatus(p.stock);
                    return (
                      <tr key={p.id} className={`hover:bg-cream/20 transition-colors ${!p.isVisible ? 'opacity-60' : ''}`}>
                        <td className="px-5 py-3.5 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream shrink-0">
                            <img src={p.images?.[0] || FALLBACK} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-charcoal">{p.name}</p>
                            <p className="text-xs text-warm-gray">{p.category}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-charcoal">{formatPrice(p.price)}</td>
                        <td className="px-5 py-3.5">
                          <Badge className={cls}>{label}</Badge>
                          {p.isFeatured && <Badge className="ml-1 bg-burgundy/10 text-burgundy">Featured</Badge>}
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => toggleVisibility(p.id, {
                              onError: () => toast('Failed to update visibility', 'error'),
                            })}
                            title={p.isVisible ? 'Visible — click to hide' : 'Hidden — click to show'}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                              p.isVisible
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {p.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                            {p.isVisible ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Link to={`/admin/products/edit/${p.id}`} className="p-1.5 rounded hover:bg-cream text-warm-gray hover:text-charcoal transition-colors">
                              <Pencil size={14} />
                            </Link>
                            <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 rounded hover:bg-red-50 text-warm-gray hover:text-error transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
