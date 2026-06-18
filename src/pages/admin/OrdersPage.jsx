import { useState } from 'react';
import { Eye, X, Phone, MapPin, School, Package } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { useOrders, useUpdateOrderStatus } from '../../hooks/useOrders';
import { useToast } from '../../components/ui/Toast';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import { STATUS_COLORS, STATUS_LABELS, ORDER_STATUS } from '../../constants/statusEnums';

const nextStatus = { PENDING: 'CONFIRMED', CONFIRMED: 'DELIVERED', DELIVERED: null };

function OrderModal({ order, onClose, onStatusChange }) {
  const items = Array.isArray(order.items) ? order.items : [];
  const next = nextStatus[order.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <p className="text-xs text-warm-gray">Order</p>
            <p className="font-semibold text-burgundy text-sm">{order.orderId}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cream text-warm-gray hover:text-charcoal transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Customer info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-3">Customer</p>
            <div className="bg-cream/50 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {order.customerName[0].toUpperCase()}
                </div>
                <p className="font-semibold text-charcoal">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <Phone size={13} />
                <span>{order.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <School size={13} />
                <span>{order.school}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <MapPin size={13} />
                <span>{order.hostel}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-3">
              Items Ordered ({items.length})
            </p>
            <div className="space-y-2">
              {items.length === 0 ? (
                <p className="text-sm text-warm-gray italic">No item details available.</p>
              ) : items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
                      <Package size={14} className="text-warm-gray" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{item.name}</p>
                      <p className="text-xs text-warm-gray">Qty: {item.qty} × {formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-charcoal shrink-0">
                    {formatPrice(item.qty * item.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total + meta */}
          <div className="bg-charcoal text-white rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Total Paid</p>
              <p className="text-xl font-semibold">{formatPrice(order.totalAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">Date</p>
              <p className="text-sm">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Paystack ref */}
          <div className="text-xs text-warm-gray">
            <span className="font-medium">Paystack Ref:</span>{' '}
            <span className="font-mono">{order.paystackRef}</span>
          </div>

          {/* Action */}
          {next && (
            <button
              onClick={() => onStatusChange(order.id, next)}
              className="w-full py-3 rounded-xl bg-burgundy text-white font-medium text-sm hover:bg-burgundy/90 transition-colors"
            >
              Mark as {STATUS_LABELS[next]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading } = useOrders(
    statusFilter ? { status: statusFilter } : {},
    { refetchInterval: 15000 }
  );
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const toast = useToast();

  const orders = data?.data ?? [];

  function handleStatus(id, status) {
    updateStatus({ id, status }, {
      onSuccess: () => {
        toast(`Order marked as ${STATUS_LABELS[status]}`, 'success');
        setSelectedOrder((prev) => prev?.id === id ? { ...prev, status } : prev);
      },
      onError: () => toast('Update failed', 'error'),
    });
  }

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-charcoal">Orders</h1>
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
        </div>

        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f4f5f7] border-b border-border">
                    {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', ''].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-warm-gray">No orders found.</td>
                    </tr>
                  ) : orders.map((order) => {
                    const items = Array.isArray(order.items) ? order.items : [];
                    const next = nextStatus[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-cream/30 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-burgundy">{order.orderId}</td>
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-charcoal">{order.customerName}</p>
                          <p className="text-xs text-warm-gray">{order.phone}</p>
                        </td>
                        <td className="px-5 py-3.5 text-warm-gray text-xs">
                          {items.length} item{items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-charcoal">{formatPrice(order.totalAmount)}</td>
                        <td className="px-5 py-3.5">
                          <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                        </td>
                        <td className="px-5 py-3.5 text-warm-gray text-xs">{formatDate(order.createdAt)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 rounded hover:bg-cream text-warm-gray hover:text-charcoal transition-colors"
                              title="View details"
                            >
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

              {orders.length > 0 && (
                <div className="px-5 py-3 border-t border-border">
                  <p className="text-xs text-warm-gray">{orders.length} orders</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatus}
        />
      )}
    </div>
  );
}
