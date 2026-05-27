import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { useAuthStore } from '../store/authStore';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: adminService.getDashboard,
  });
}

export function useAdminLogin() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: ({ email, password }) => adminService.login(email, password),
    onSuccess: (data) => login(data.token, data.admin),
  });
}

export function useSales() {
  return useQuery({
    queryKey: ['sales'],
    queryFn: adminService.getSales,
  });
}

export function useCreateSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminService.createSale(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales'] }),
  });
}

export function useToggleSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminService.toggleSale(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales'] }),
  });
}

export function useDeleteSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminService.deleteSale(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales'] }),
  });
}
