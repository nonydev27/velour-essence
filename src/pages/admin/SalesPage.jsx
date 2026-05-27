import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { useSales, useCreateSale, useToggleSale, useDeleteSale } from '../../hooks/useAdmin';
import { useProducts } from '../../hooks/useProducts';
import { useToast } from '../../components/ui/Toast';
import { formatDate } from '../../utils/formatDate';

const schema = z.object({
  productId: z.string().min(1, 'Select a product'),
  discountPercent: z.coerce.number().int().min(1).max(100),
  startDate: z.string().min(1, 'Start date required'),
  endDate: z.string().min(1, 'End date required'),
});

export default function SalesPage() {
  const toast = useToast();
  const { data: sales, isLoading } = useSales();
  const { data: products } = useProducts();
  const { mutate: createSale, isPending } = useCreateSale();
  const { mutate: toggleSale } = useToggleSale();
  const { mutate: deleteSale } = useDeleteSale();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  function onSubmit(data) {
    createSale(data, {
      onSuccess: () => { toast('Sale created!', 'success'); reset(); },
      onError: () => toast('Failed to create sale', 'error'),
    });
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-charcoal">Sales & Discounts</h1>
          <p className="text-warm-gray text-sm mt-1">Set promotional pricing on products</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create sale form */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-semibold text-charcoal mb-4">Create New Sale</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Product</label>
                <select
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy ${errors.productId ? 'border-error' : 'border-border'}`}
                  {...register('productId')}
                >
                  <option value="">Select product</option>
                  {products?.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {errors.productId && <p className="text-xs text-error">{errors.productId.message}</p>}
              </div>
              <Input label="Discount (%)" type="number" min="1" max="100" error={errors.discountPercent?.message} {...register('discountPercent')} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Start Date" type="date" error={errors.startDate?.message} {...register('startDate')} />
                <Input label="End Date" type="date" error={errors.endDate?.message} {...register('endDate')} />
              </div>
              <Button type="submit" loading={isPending} className="w-full">Create Sale</Button>
            </form>
          </div>

          {/* Sales list */}
          <div>
            <h2 className="font-semibold text-charcoal mb-4">Active Sales</h2>
            {isLoading ? (
              <div className="flex justify-center py-10"><Spinner /></div>
            ) : sales?.length === 0 ? (
              <p className="text-warm-gray text-sm">No sales yet.</p>
            ) : (
              <div className="space-y-3">
                {sales?.map((sale) => (
                  <div key={sale.id} className="bg-white rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-charcoal text-sm">{sale.product?.name ?? 'Unknown product'}</p>
                        <p className="text-xs text-warm-gray">
                          {sale.discountPercent}% off · {formatDate(sale.startDate)} → {formatDate(sale.endDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={sale.isActive ? 'bg-success/10 text-success' : 'bg-warm-gray/10 text-warm-gray'}>
                          {sale.isActive ? 'Active' : 'Paused'}
                        </Badge>
                        <button onClick={() => toggleSale(sale.id)} className="text-warm-gray hover:text-charcoal transition-colors">
                          {sale.isActive ? <ToggleRight size={20} className="text-success" /> : <ToggleLeft size={20} />}
                        </button>
                        <button onClick={() => deleteSale(sale.id)} className="text-warm-gray hover:text-error transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
