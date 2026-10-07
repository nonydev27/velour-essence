import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Info, Mail, Phone } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const sections = [
  {
    number: '1',
    title: 'About Fragrance Compatibility',
    content: [
      {
        subtitle: null,
        text: 'Fragrance is a deeply personal and subjective experience. The same perfume oil can smell noticeably different from person to person due to differences in skin chemistry, pH levels, body temperature, diet, medications, and individual biology.',
      },
    ],
  },
  {
    number: '2',
    title: 'Scent Variation on Different Skin Types',
    content: [
      {
        subtitle: null,
        text: 'The way a fragrance develops and projects on your skin may differ significantly from how it smells in the bottle or on another person. Factors that influence scent compatibility include:',
        bullets: [
          'Skin pH and natural oils — drier skin may not hold a fragrance as long as oilier skin.',
          'Body heat — higher body temperature can amplify certain notes.',
          'Skincare products — moisturisers, soaps, and lotions can interact with fragrance ingredients.',
          'Hormonal changes — can affect how a scent develops throughout the day.',
          'Diet and hydration — can subtly influence your natural scent profile.',
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Scent Descriptions Are Guidance Only',
    content: [
      {
        subtitle: null,
        text: 'All fragrance notes, scent descriptions, and comparisons provided on our website are subjective interpretations intended for general guidance. They are not guarantees of how a fragrance will smell on you specifically. Personal scent perception is highly individual.',
      },
    ],
  },
  {
    number: '4',
    title: 'Compatibility With Other Products',
    content: [
      {
        subtitle: null,
        text: 'Our fragrance oils are formulated for direct skin application. We do not guarantee compatibility with all fabric types, materials, or surfaces. Avoid applying directly to delicate fabrics, leather, or polished surfaces, as oils may leave residue or stains.',
      },
    ],
  },
  {
    number: '5',
    title: 'No Returns Based on Scent Preference',
    content: [
      {
        subtitle: null,
        text: 'Because fragrance compatibility is personal and subjective, we cannot accept returns or issue refunds on the basis that a scent smells different on your skin than expected, or that you simply do not like the fragrance after opening it. We encourage you to read descriptions carefully, consult our FAQ, or contact us for recommendations before purchasing.',
      },
    ],
  },
  {
    number: '6',
    title: 'Our Recommendation',
    content: [
      {
        subtitle: null,
        text: 'If you are unsure about a fragrance, reach out to our team. We are happy to describe scents in more detail, suggest alternatives based on your preferences, or help you find a fragrance that is a great match for your chemistry and lifestyle.',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export default function CompatibilityDisclaimerPage() {
  return (
    <PageWrapper>
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590736969596-24a66a6a5e6e?w=1600&q=80)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
            <Info size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Compatibility Disclaimer
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
            At <span className="text-charcoal font-medium">Velour Essence</span>, we believe in full transparency. This disclaimer explains why the same fragrance may smell different depending on the person wearing it.
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
          <h2 className="font-serif text-2xl text-white mb-2">Need a Recommendation?</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">We'll help you find the perfect scent for your skin and style.</p>
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
          <Link to="/legal/health-and-safety" className="hover:text-charcoal transition-colors">Health & Safety</Link>
          <span className="text-border">|</span>
          <Link to="/faq" className="hover:text-charcoal transition-colors">FAQ</Link>
        </div>
      </section>
    </PageWrapper>
  );
}
