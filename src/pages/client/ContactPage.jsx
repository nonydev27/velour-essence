import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

/* ── Social / Channel data ──────────────────────────────────────────── */
const channels = [
  {
    label: 'WhatsApp',
    handle: '+234 801 234 5678',
    href: 'https://wa.me/2348012345678',
    description: 'Chat with us directly for order support, enquiries, or styling advice.',
    color: 'bg-[#25D366]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@velouressence',
    href: 'https://instagram.com/velouressence',
    description: 'Follow us for new arrivals, styling tips, and behind-the-scenes moments.',
    color: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    handle: '@VelourEssenceNG',
    href: 'https://twitter.com/VelourEssenceNG',
    description: 'Stay updated with the latest news, promos, and conversations.',
    color: 'bg-black',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    handle: '@velouressence',
    href: 'https://tiktok.com/@velouressence',
    description: 'Watch fragrance reviews, unboxings, and lifestyle content.',
    color: 'bg-black',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'hello@velouressence.com',
    href: 'mailto:hello@velouressence.com',
    description: 'Send us an email and we will respond within 24 business hours.',
    color: 'bg-burgundy',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: 'Phone',
    handle: '+234 801 234 5678',
    href: 'tel:+2348012345678',
    description: 'Speak directly with our support team. Available Mon–Sat, 9am–6pm.',
    color: 'bg-charcoal',
    icon: <Phone className="w-5 h-5" />,
  },
];

const info = [
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Lagos, Nigeria\n(Campus delivery nationwide)',
  },
  {
    Icon: Clock,
    label: 'Business Hours',
    value: 'Monday – Saturday\n9:00 AM – 6:00 PM WAT',
  },
  {
    Icon: MessageCircle,
    label: 'Response Time',
    value: 'WhatsApp: within 1 hour\nEmail: within 24 hours',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function ContactPage() {
  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-5"
          >
            We Are Here For You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-sm leading-relaxed max-w-xl mx-auto"
          >
            Have a question about a product, need help with an order, or just want to connect?
            Reach us through any of the channels below.
          </motion.p>
        </div>
      </section>

      {/* ── Quick info bar ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {info.map(({ Icon, label, value }, i) => (
            <motion.div
              key={label}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-start gap-4"
            >
              <span className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0">
                <Icon size={18} className="text-charcoal" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm text-warm-gray leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Channels grid ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-warm-gray mb-2">Find Us Online</p>
          <h2 className="font-serif text-3xl text-charcoal">Reach Out on Your Favourite Platform</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {channels.map(({ label, handle, href, description, color, icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 ${color}`}>
                  {icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{label}</p>
                  <p className="text-xs text-warm-gray">{handle}</p>
                </div>
              </div>
              <p className="text-xs text-warm-gray leading-relaxed">{description}</p>
              <span className="text-xs font-medium text-charcoal group-hover:underline mt-auto">
                {href.startsWith('mailto') ? 'Send Email →' : href.startsWith('tel') ? 'Call Now →' : `Open ${label} →`}
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── WhatsApp CTA ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center mx-auto mb-6 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-charcoal mb-3">Fastest Reply via WhatsApp</h2>
            <p className="text-warm-gray text-sm leading-relaxed mb-8 max-w-md mx-auto">
              For the quickest response, message us on WhatsApp. We typically reply within the hour during business days.
            </p>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white text-sm font-medium px-8 py-3.5 rounded-xl hover:bg-[#20bb5a] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
