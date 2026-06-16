import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex flex-col leading-none mb-4">
            <span className="font-serif text-xl font-semibold text-white">Velour</span>
            <span className="text-[9px] font-medium text-white/40 uppercase tracking-[0.25em]">Essence</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Luxury fragrances crafted with passion, delivered directly to your campus doorstep across Ghana.
          </p>
        </div>
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Perfumes</Link></li>
            <li><Link to="/shop?category=Oud" className="hover:text-white transition-colors">Our Collections</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>WhatsApp: +233 55 964 6969'</li>
            <li>delademprempeh5@gmail.com</li>
            <li>Mon–Sat, 9am–6pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between text-xs">
        <p className="text-white/40 ">&copy; {new Date().getFullYear()} Velour Essence. All rights reserved.</p>
        <Link to="/admin/login" className="text-white/30 hover:text-white/60 transition-colors">Admin</Link>
      </div>
    </footer>
  );
}
