import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Megaphone, Mail, Phone } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const sections = [
  {
    number: '1',
    title: 'About Our Fragrance Comparisons',
    content: [
      {
        subtitle: null,
        text: 'Velour Essence may, from time to time, describe certain fragrances using references to well-known designer or luxury perfumes. These references are made solely to help customers identify the scent profile or character of a fragrance — for example, describing a scent as having "notes similar to" or "inspired by" a widely recognised fragrance.',
      },
    ],
  },
  {
    number: '2',
    title: 'No Affiliation With Designer Brands',
    content: [
      {
        subtitle: null,
        text: 'Velour Essence is an independent fragrance brand. We have no affiliation, partnership, sponsorship, endorsement, or association with any designer house, luxury brand, or fragrance manufacturer whose names may be referenced on our Site for descriptive purposes.',
      },
      {
        subtitle: null,
        text: 'All brand names, trademarks, and product names belonging to third parties remain the exclusive intellectual property of their respective owners. Their use on our Site is purely for comparative or descriptive reference and does not imply any form of authorisation or approval.',
      },
    ],
  },
  {
    number: '3',
    title: 'Our Products Are Original',
    content: [
      {
        subtitle: null,
        text: 'Our fragrance oils are original compositions created and formulated independently. They are not counterfeit, imitation, or replica products. Any scent similarities to other fragrances are incidental to the use of common aromatic compounds available to all perfumers.',
      },
    ],
  },
  {
    number: '4',
    title: 'Accuracy of Comparisons',
    content: [
      {
        subtitle: null,
        text: 'While we make every effort to describe our fragrances accurately and helpfully, scent comparisons are inherently subjective. Individual perception of fragrance varies, and we cannot guarantee that a customer will experience the same similarity we describe. Scent comparisons are provided as a guide only.',
      },
    ],
  },
  {
    number: '5',
    title: 'No Misleading Intent',
    content: [
      {
        subtitle: null,
        text: 'It is not our intention to mislead, confuse, or deceive customers about the origin, source, or manufacturer of any product. All products sold on this Site are clearly identified as Velour Essence products. We are committed to honest, transparent marketing in accordance with applicable consumer protection laws in Ghana.',
      },
    ],
  },
  {
    number: '6',
    title: 'Website Availability',
    content: [
      {
        subtitle: null,
        text: 'Every effort is made to keep our website running smoothly. However, Velour Essence takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our reasonable control.',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export default function ComparativeAdvertisingDisclaimer() {
  return (
    <PageWrapper>
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590736969596-24a66a6a5e6e?w=1600&q=80)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
            <Megaphone size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Comparative Advertising Disclaimer
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
            Last Updated: 21st September 2026
          </motion.p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="bg-white rounded-2xl border border-border p-8">
          <p className="text-sm text-warm-gray leading-relaxed">
            This disclaimer explains how <span className="text-charcoal font-medium">Velour Essence</span> uses fragrance comparisons and references to other brands on our website, and clarifies our relationship with those brands.
          </p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {sections.map((sec, i) => (
          <motion.div key={sec.number} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
            className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-4 px-8 pt-7 pb-5 border-b border-border">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-charcoal text-white text-xs font-semibold shrink-0">{sec.number}</span>
              <h2 className="font-serif text-xl text-charcoal">{sec.title}</h2>
            </div>
            <div className="px-8 py-6 space-y-5">
              {sec.content.map((item, j) => (
                <div key={j}>
                  {item.subtitle && <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{item.subtitle}</h3>}
                  {item.text && <p className="text-sm text-warm-gray leading-relaxed">{item.text}</p>}
                  {item.bullets && (
                    <ul className="space-y-3 mt-1">
                      {item.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-burgundy shrink-0" />
                          <p className="text-sm text-warm-gray leading-relaxed">{b}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="bg-charcoal rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-2">Have a Question?</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">Reach out if you have any questions about our products or how we describe them.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+233559646969" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-5 py-3 text-sm text-white">
              <Phone size={16} strokeWidth={1.5} />0559 646 969
            </a>
            <a href="mailto:delademprempeh5@gmail.com" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-5 py-3 text-sm text-white">
              <Mail size={16} strokeWidth={1.5} />delademprempeh5@gmail.com
            </a>
          </div>
        </motion.div>
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-warm-gray">
          <Link to="/shop" className="hover:text-charcoal transition-colors">← Back to Shop</Link>
          <span className="text-border">|</span>
          <Link to="/legal/terms-of-service" className="hover:text-charcoal transition-colors">Terms & Conditions</Link>
          <span className="text-border">|</span>
          <Link to="/faq" className="hover:text-charcoal transition-colors">FAQ</Link>
        </div>
      </section>
    </PageWrapper>
  );
}
