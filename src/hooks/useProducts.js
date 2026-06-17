import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

export function useProducts(params) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getAll(params),
  });
}

// Admin version — returns ALL products including hidden ones
export function useProductsAdmin() {
  return useQuery({
    queryKey: ['products', 'admin'],
    queryFn: () => productService.getAllAdmin(),
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData) => productService.create(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => productService.update(id, formData),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['products'] });
      qc.invalidateQueries({ queryKey: ['product', id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => productService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useToggleProductVisibility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => productService.toggleVisibility(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
