import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';

export function useOrders(params) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderService.getAll(params),
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => orderService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
}
