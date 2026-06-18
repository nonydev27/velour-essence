import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import VelourLogo from '../ui/VelourLogo';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop', end: false },
    { to: '/about', label: 'About Us', end: false },
    { to: '/contact', label: 'Contact', end: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0" aria-label="Velour Essence — Home">
          <VelourLogo className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? 'text-charcoal font-medium' : 'text-warm-gray hover:text-charcoal'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1">
         
        
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg hover:bg-cream transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} className="text-charcoal" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-burgundy text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-cream ml-1"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-sm border-b border-border/50 last:border-0 ${
                  isActive ? 'text-charcoal font-medium' : 'text-warm-gray'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
