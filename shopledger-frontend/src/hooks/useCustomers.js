import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customersService } from '../services/customers.service';
import toast from 'react-hot-toast';

export function useCustomers(params) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customersService.getAll(params).then((r) => r.data?.data ?? r.data),
  });
}

export function useCustomer(id) {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => customersService.getById(id).then((r) => r.data?.data ?? r.data),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customersService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer added');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || 'Failed to add customer');
    },
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customersService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer deleted');
    },
  });
}

export default useCustomers;
