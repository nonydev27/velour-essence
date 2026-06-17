import { useState } from 'react';
import { RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { usePayments } from '../../hooks/useAdmin';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

const STATUS_STYLES = {
  SUCCESS: { cls: 'bg-green-100 text-green-700', label: 'Paid' },
  PENDING: { cls: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
};

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading, isFetching, refetch } = usePayments(statusFilter ? { status: statusFilter } : undefined);

  const payments = data?.data || [];
  const stats = data?.stats || {};

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-serif text-charcoal">Payments</h1>
            {isFetching && <RefreshCw size={14} className="animate-spin text-warm-gray" />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-warm-gray">Auto-refreshes every 10s</span>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-cream transition-colors text-charcoal"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-border p-5">
              <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-2xl font-serif font-semibold text-charcoal">
                {formatPrice(stats.totalRevenue || 0)}
              </p>
              <p className="text-xs text-warm-gray mt-1">from successful payments</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={14} className="text-green-600" />
                <p className="text-xs text-warm-gray uppercase tracking-wider">Paid</p>
              </div>
              <p className="text-2xl font-serif font-semibold text-charcoal">{stats.totalSuccess ?? '—'}</p>
              <p className="text-xs text-warm-gray mt-1">completed transactions</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-yellow-500" />
                <p className="text-xs text-warm-gray uppercase tracking-wider">Pending</p>
              </div>
              <p className="text-2xl font-serif font-semibold text-charcoal">{stats.totalPending ?? '—'}</p>
              <p className="text-xs text-warm-gray mt-1">abandoned or in-progress</p>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none text-charcoal"
            >
              <option value="">All Payments</option>
              <option value="SUCCESS">Paid only</option>
              <option value="PENDING">Pending only</option>
            </select>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f4f5f7] border-b border-border">
                    {['Reference', 'Customer', 'Phone', 'Amount', 'Status', 'Order ID', 'Date'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-warm-gray">No payment records yet.</td>
                    </tr>
                  ) : payments.map((p) => {
                    const { cls, label } = STATUS_STYLES[p.status] || { cls: 'bg-gray-100 text-gray-600', label: p.status };
                    return (
                      <tr key={p.id} className="hover:bg-cream/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs text-charcoal">{p.reference}</span>
                        </td>
                        <td className="px-5 py-3.5 font-medium text-charcoal">{p.customerName}</td>
                        <td className="px-5 py-3.5 text-warm-gray">{p.phone}</td>
                        <td className="px-5 py-3.5 font-semibold text-charcoal">{formatPrice(p.amount)}</td>
                        <td className="px-5 py-3.5">
                          <Badge className={cls}>{label}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          {p.orderId ? (
                            <span className="text-xs font-medium text-burgundy">{p.orderId}</span>
                          ) : (
                            <span className="text-xs text-warm-gray">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-warm-gray text-xs">{formatDate(p.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
