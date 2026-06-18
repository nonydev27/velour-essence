import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Tag, CreditCard,
  BarChart2, Settings, LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import VelourLogo from '../ui/VelourLogo';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', Icon: Package },
  { to: '/admin/orders', label: 'Orders', Icon: ShoppingBag },
  { to: '/admin/payments', label: 'Payments', Icon: CreditCard },
  { to: '/admin/sales', label: 'Sales', Icon: Tag },
];

export default function AdminSidebar() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <aside className="w-56 min-h-screen bg-[#1a1a2e] text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/10">
        <VelourLogo className="h-8 w-auto brightness-0 invert opacity-90" />
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
        {links.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-burgundy text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
