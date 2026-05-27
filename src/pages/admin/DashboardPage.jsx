import { ShoppingBag, TrendingUp, Clock, Users } from 'lucide-react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';
import { useDashboard } from '../../hooks/useAdmin';
import { formatPrice } from '../../utils/formatPrice';
import { useAuthStore } from '../../store/authStore';

// Simple sparkline bar chart
function BarChart({ data, color = '#800020' }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t transition-all"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: color, opacity: 0.7 + (i / data.length) * 0.3 }}
        />
      ))}
    </div>
  );
}

// Simple donut / legend
function StatusDonut({ pending, confirmed, delivered }) {
  const total = pending + confirmed + delivered || 1;
  const data = [
    { label: 'Pending', count: pending, color: '#EAB308' },
    { label: 'Confirmed', count: confirmed, color: '#3B82F6' },
    { label: 'Delivered', count: delivered, color: '#4A7C59' },
  ];

  // Build conic-gradient
  let prev = 0;
  const stops = data.map(({ count, color }) => {
    const pct = (count / total) * 100;
    const stop = `${color} ${prev}% ${prev + pct}%`;
    prev += pct;
    return stop;
  });
  const gradient = `conic-gradient(${stops.join(', ')})`;

  return (
    <div className="flex items-center gap-8">
      <div
        className="w-24 h-24 rounded-full shrink-0"
        style={{ background: gradient }}
      />
      <div className="space-y-2">
        {data.map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="text-warm-gray">{label}</span>
            <span className="font-semibold text-charcoal ml-auto pl-4">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const THIS_WEEK  = [12, 19, 8, 24, 17, 30, 22];
const LAST_WEEK  = [8, 14, 11, 18, 13, 25, 19];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboard();
  const admin = useAuthStore((s) => s.admin);

  const cards = [
    { label: 'Total Orders',   value: stats?.totalOrders ?? 0,                Icon: ShoppingBag, color: 'bg-burgundy' },
    { label: 'Total Revenue',  value: formatPrice(stats?.totalRevenue ?? 0),  Icon: TrendingUp,  color: 'bg-gold' },
    { label: 'Pending Orders', value: stats?.pendingOrders ?? 0,              Icon: Clock,       color: 'bg-yellow-500' },
    { label: 'Total Customers',value: '—',                                    Icon: Users,       color: 'bg-blue-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-charcoal">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center text-xs font-semibold">
              A
            </div>
            <span className="text-sm text-charcoal font-medium">Admin</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Stat cards */}
          {isLoading ? (
            <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {cards.map(({ label, value, Icon, color }) => (
                <div key={label} className="bg-white rounded-xl border border-border p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs text-success font-medium">↑ 12%</span>
                  </div>
                  <p className="text-2xl font-semibold text-charcoal">{value}</p>
                  <p className="text-xs text-warm-gray mt-1">{label}</p>
                  <p className="text-[10px] text-warm-gray/60 mt-0.5">vs yesterday</p>
                </div>
              ))}
            </div>
          )}

          {/* Charts row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue Overview */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-charcoal text-sm">Revenue Overview</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-burgundy inline-block" />This Week</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-border inline-block" />Last Week</span>
                </div>
              </div>
              <div className="flex gap-0.5 items-end h-28">
                {THIS_WEEK.map((v, i) => {
                  const maxV = Math.max(...THIS_WEEK, ...LAST_WEEK, 1);
                  return (
                    <div key={i} className="flex-1 flex gap-0.5 items-end">
                      <div className="flex-1 rounded-t bg-burgundy/20" style={{ height: `${(LAST_WEEK[i] / maxV) * 100}%` }} />
                      <div className="flex-1 rounded-t bg-burgundy" style={{ height: `${(v / maxV) * 100}%` }} />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2">
                {DAYS.map((d) => <span key={d} className="flex-1 text-center text-[10px] text-warm-gray">{d}</span>)}
              </div>
            </div>

            {/* Orders by Status */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-semibold text-charcoal text-sm mb-6">Orders by Status</h3>
              <StatusDonut
                pending={stats?.pendingOrders ?? 24}
                confirmed={stats?.confirmedOrders ?? 76}
                delivered={stats?.deliveredOrders ?? 28}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
