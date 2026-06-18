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

// Public hook — no auth required, used on client-facing pages
export function useActiveSales() {
  return useQuery({
    queryKey: ['sales', 'active'],
    queryFn: adminService.getActiveSales,
    refetchInterval: 60_000,
    staleTime: 30_000,
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

// Polls every 10 seconds so the admin sees new payments as they come in
export function usePayments(params) {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => adminService.getPayments(params),
    refetchInterval: 10_000,
  });
}
