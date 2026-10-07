import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import VelourLogo from '../ui/VelourLogo';

// Inline SVGs for brand icons not available in this version of lucide-react
function InstagramIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const shopLinks = [
  { label: 'All Perfumes', to: '/shop' },
  { label: 'Oud Collection', to: '/shop?category=Oud' },
  { label: 'Floral Collection', to: '/shop?category=Floral' },
  { label: 'Fresh & Citrus', to: '/shop?category=Fresh' },
];

const helpLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'About Us', to: '/about' },
  { label: 'Track My Order', to: '/contact' },
];

const legalLinks = [
  { label: 'Terms & Conditions', to: '/legal/terms-of-service' },
  { label: 'Privacy Policy', to: '/legal/privacy-policy' },
  { label: 'Refund Policy', to: '/legal/refund-policy' },
  { label: 'Shipping Policy', to: '/legal/shipping-policy' },
  { label: 'Health & Safety', to: '/legal/health-and-safety' },
  { label: 'Compatibility Disclaimer', to: '/legal/compatibility-disclaimer' },
  { label: 'Comparative Advertising', to: '/legal/comparative-advertising-disclaimer' },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/velouressence',
    icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/velouressence',
    icon: FacebookIcon,
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/velouressence',
    icon: XIcon,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/233559646969',
    icon: MessageCircle,
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60">
      {/* ── Main grid ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-5">
            <VelourLogo className="h-9 w-auto brightness-0 invert opacity-90" />
          </div>
          <p className="text-sm leading-relaxed text-white/50 max-w-xs mb-6">
            Luxury fragrances crafted with passion, delivered directly to your campus doorstep
            across Ghana.
          </p>

          {/* Social icons */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">
              Follow Us
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon size={14} strokeWidth={1.8} className="text-white/70" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-5">
            Shop
          </h4>
          <ul className="space-y-3">
            {shopLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help links */}
        <div>
          <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-5">
            Help & Info
          </h4>
          <ul className="space-y-3">
            {helpLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-5">
            Contact
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="tel:+233559646969"
                className="flex items-start gap-3 group"
              >
                <span className="mt-0.5 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone size={13} className="text-white/70" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                  <span className="text-sm text-white/55 group-hover:text-white transition-colors">
                    0559 646 969
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                href="mailto:delademprempeh5@gmail.com"
                className="flex items-start gap-3 group"
              >
                <span className="mt-0.5 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail size={13} className="text-white/70" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5">Email</p>
                  <span className="text-sm text-white/55 group-hover:text-white transition-colors break-all">
                    delademprempeh5@gmail.com
                  </span>
                </div>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center shrink-0">
                  <Clock size={13} className="text-white/70" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5">Hours</p>
                  <span className="text-sm text-white/55">Mon – Sat, 9am – 6pm</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Legal links row ───────────────────────────────────────────── */}
      <div className="border-t border-white/8 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {legalLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div className="border-t border-white/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>
            &copy; {new Date().getFullYear()} Velour Essence. All rights reserved.
          </p>
          <p className="text-white/20 text-[11px]">
            Made with care in Ghana 🇬🇭 &nbsp;&middot;&nbsp;{' '}
            <Link to="/admin/login" className="hover:text-white/50 transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
