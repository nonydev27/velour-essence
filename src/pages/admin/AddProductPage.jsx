import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useCreateProduct } from '../../hooks/useProducts';
import { useToast } from '../../components/ui/Toast';
import { PRODUCT_CATEGORIES } from '../../constants/statusEnums';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category required'),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
  discount: z.coerce.number().int().min(0).max(100),
  isFeatured: z.boolean().optional(),
  isVisible: z.boolean().optional(),
});

export default function AddProductPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { stock: 0, discount: 0, isFeatured: false, isVisible: true },
  });
  const isVisible = watch('isVisible');

  function onSubmit(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));

    const files = document.getElementById('images-input').files;
    for (const f of files) formData.append('images', f);

    createProduct(formData, {
      onSuccess: () => {
        toast('Product created!', 'success');
        navigate('/admin/products');
      },
      onError: (err) => toast(err.response?.data?.message || 'Failed to create product', 'error'),
    });
  }

  return (
    <div className="flex min-h-screen bg-\[#f4f5f7\]">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <Link to="/admin/products" className="flex items-center gap-1 text-sm text-warm-gray hover:text-charcoal mb-4">
            <ChevronLeft size={16} /> Products
          </Link>
          <h1 className="text-3xl font-serif text-charcoal">Add Product</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-white rounded-2xl border border-border p-8 space-y-5">
          <Input label="Product Name" placeholder="e.g. Oud Elixir" error={errors.name?.message} {...register('name')} />
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy resize-none"
              placeholder="Describe the scent, notes, longevity..."
              {...register('description')}
            />
            {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (₵)" type="number" step="0.01" error={errors.price?.message} {...register('price')} />
            <Input label="Stock" type="number" error={errors.stock?.message} {...register('stock')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Category</label>
              <select className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy ${errors.category ? 'border-error' : 'border-border'}`} {...register('category')}>
                <option value="">Select category</option>
                {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-error">{errors.category.message}</p>}
            </div>
            <Input label="Discount (%)" type="number" min="0" max="100" error={errors.discount?.message} {...register('discount')} />
          </div>

          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" className="rounded border-border" {...register('isFeatured')} />
            Featured product (shows on homepage)
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
            <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Product Images</label>
            <input id="images-input" type="file" multiple accept="image/*" className="text-sm text-warm-gray file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-\[#f4f5f7\] file:text-charcoal file:text-xs file:font-medium hover:file:bg-border" />
            <p className="text-xs text-warm-gray">Up to 6 images, max 5MB each</p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={isPending}>Create Product</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/products')}>Cancel</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
