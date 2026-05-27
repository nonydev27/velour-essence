import { useState } from 'react';
import { Eye } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useOrders, useUpdateOrderStatus } from '../../hooks/useOrders';
import { useToast } from '../../components/ui/Toast';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import { STATUS_COLORS, STATUS_LABELS, ORDER_STATUS } from '../../constants/statusEnums';

const nextStatus = { PENDING: 'CONFIRMED', CONFIRMED: 'DELIVERED', DELIVERED: null };

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const { data, isLoading } = useOrders(statusFilter ? { status: statusFilter } : {});
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const toast = useToast();

  const orders = data?.data ?? [];

  function handleStatus(id, status) {
    updateStatus({ id, status }, {
      onSuccess: () => toast(`Order marked as ${STATUS_LABELS[status]}`, 'success'),
      onError: () => toast('Update failed', 'error'),
    });
  }

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-charcoal">Orders</h1>
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-lg text-sm bg-white focus:outline-none text-charcoal"
            >
              <option value="">All Status</option>
              {Object.values(ORDER_STATUS).map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-1.5 text-sm text-warm-gray">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="focus:outline-none text-xs bg-transparent"
              />
              <span className="mx-1">–</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="focus:outline-none text-xs bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f4f5f7] border-b border-border">
                    {['Order ID', 'Customer', 'Total', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-warm-gray">No orders found.</td>
                    </tr>
                  ) : orders.map((order) => {
                    const next = nextStatus[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-cream/30 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-burgundy">{order.orderId}</td>
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-charcoal">{order.customerName}</p>
                          <p className="text-xs text-warm-gray">{order.phone}</p>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-charcoal">{formatPrice(order.totalAmount)}</td>
                        <td className="px-5 py-3.5">
                          <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                        </td>
                        <td className="px-5 py-3.5 text-warm-gray text-xs">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded hover:bg-cream text-warm-gray hover:text-charcoal transition-colors">
                              <Eye size={15} />
                            </button>
                            {next && (
                              <button
                                onClick={() => handleStatus(order.id, next)}
                                className="text-xs px-2.5 py-1 rounded-lg bg-charcoal text-white hover:bg-burgundy transition-colors"
                              >
                                {STATUS_LABELS[next]}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {orders.length > 0 && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                  <p className="text-xs text-warm-gray">{orders.length} records</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, '...', 15].map((p, i) => (
                      <button
                        key={i}
                        className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                          p === 1 ? 'bg-charcoal text-white' : 'text-warm-gray hover:bg-cream'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
