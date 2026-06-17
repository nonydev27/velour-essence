import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { useProduct, useUpdateProduct } from '../../hooks/useProducts';
import { useToast } from '../../components/ui/Toast';
import { PRODUCT_CATEGORIES } from '../../constants/statusEnums';

const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  category: z.string().min(1),
  stock: z.coerce.number().int().nonnegative(),
  discount: z.coerce.number().int().min(0).max(100),
  isFeatured: z.boolean().optional(),
  isVisible: z.boolean().optional(),
});

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: product, isLoading } = useProduct(id);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const isVisible = watch('isVisible');

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        discount: product.discount,
        isFeatured: product.isFeatured,
        isVisible: product.isVisible ?? true,
      });
    }
  }, [product]);

  function onSubmit(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));

    const files = document.getElementById('images-input').files;
    for (const f of files) formData.append('images', f);

    updateProduct({ id, formData }, {
      onSuccess: () => {
        toast('Product updated!', 'success');
        navigate('/admin/products');
      },
      onError: (err) => toast(err.response?.data?.message || 'Update failed', 'error'),
    });
  }

  if (isLoading) return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 flex items-center justify-center"><Spinner size="lg" /></main>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <Link to="/admin/products" className="flex items-center gap-1 text-sm text-warm-gray hover:text-charcoal mb-4">
            <ChevronLeft size={16} /> Products
          </Link>
          <h1 className="text-3xl font-serif text-charcoal">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-white rounded-2xl border border-border p-8 space-y-5">
          <Input label="Product Name" error={errors.name?.message} {...register('name')} />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Description</label>
            <textarea rows={4} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy resize-none" {...register('description')} />
            {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (₵)" type="number" step="0.01" error={errors.price?.message} {...register('price')} />
            <Input label="Stock" type="number" error={errors.stock?.message} {...register('stock')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Category</label>
              <select className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy" {...register('category')}>
                {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Input label="Discount (%)" type="number" min="0" max="100" error={errors.discount?.message} {...register('discount')} />
          </div>
          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" className="rounded border-border" {...register('isFeatured')} />
            Featured product
          </label>

          {/* Visibility toggle */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="text-sm font-medium text-charcoal">Visible to customers</p>
              <p className="text-xs text-warm-gray mt-0.5">When off, this product is hidden from the shop</p>
            </div>
            <button
              type="button"
              onClick={() => setValue('isVisible', !isVisible)}
              className={`relative w-11 h-6 rounded-full transition-colors ${isVisible ? 'bg-charcoal' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isVisible ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Replace Images (optional)</label>
            <input id="images-input" type="file" multiple accept="image/*" className="text-sm text-warm-gray file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cream file:text-charcoal file:text-xs file:font-medium" />
            {product?.images?.length > 0 && (
              <div className="flex gap-2 mt-2">
                {product.images.map((img, i) => (
                  <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={isPending}>Save Changes</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/products')}>Cancel</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
