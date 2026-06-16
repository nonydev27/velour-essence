import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

/* ── Social / Channel data ──────────────────────────────────────────── */
const channels = [
  {
    label: 'WhatsApp',
    handle: '+233 55 964 6969',
    href: 'https://wa.me/233559646969',
    description: 'Chat with us directly for order support, enquiries, or styling advice.',
    color: 'bg-[#25D366]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
    handle: '+233 55 964 6969',
    href: 'tel:+233559646969',
    description: 'Speak directly with our support team. Available Mon–Sat, 9am–6pm.',
    color: 'bg-charcoal',
    icon: <Phone className="w-5 h-5" />,
  },
];

const info = [
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Accra, Ghana\n(Campus delivery nationwide)',
  },
  {
    Icon: Clock,
    label: 'Business Hours',
    value: 'Monday – Saturday\n9:00 AM – 6:00 PM GMT',
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
              href="https://wa.me/233559646969"
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
