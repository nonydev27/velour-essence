import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const sections = [
  {
    number: '1',
    title: 'External Use Only',
    content: [
      {
        subtitle: null,
        text: 'All perfume oils and fragrance products sold by Velour Essence are strictly intended for external cosmetic use on the skin. Under no circumstances should any of our products be ingested, consumed, or applied to the eyes, mucous membranes, or broken, irritated, or inflamed skin.',
      },
    ],
  },
  {
    number: '2',
    title: 'Patch Test Recommendation',
    content: [
      {
        subtitle: null,
        text: 'Because fragrance oils contain a blend of natural and synthetic aromatic compounds, individual sensitivity or allergic reactions may occur — even in people who do not typically have skin sensitivities.',
      },
      {
        subtitle: 'How to Perform a Patch Test',
        text: null,
        bullets: [
          'Apply a small amount of the fragrance oil to the inner wrist or inside of the elbow.',
          'Leave the area uncovered and unwashed for 24–48 hours.',
          'Monitor for any signs of redness, itching, swelling, or irritation.',
          'If no reaction occurs, it is generally safe to proceed with normal use.',
          'If a reaction occurs, discontinue use immediately and consult a healthcare professional.',
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Discontinue Use if Irritation Occurs',
    content: [
      {
        subtitle: null,
        text: 'If at any point during use you experience irritation, rash, redness, swelling, burning, or any other form of discomfort, stop using the product immediately. Rinse the affected area thoroughly with clean water. If symptoms persist or worsen, seek medical attention promptly.',
      },
    ],
  },
  {
    number: '4',
    title: 'Sensitive Skin & Known Allergies',
    content: [
      {
        subtitle: null,
        text: 'If you have a history of skin allergies, eczema, psoriasis, or other skin conditions, we strongly advise consulting a dermatologist before using any new fragrance product. Certain aromatic compounds (such as linalool, limonene, and citronellol) are common allergens found in many fragrances.',
      },
    ],
  },
  {
    number: '5',
    title: 'Keep Out of Reach of Children',
    content: [
      {
        subtitle: null,
        text: 'Our fragrance products should be stored safely out of reach of children and pets. In the event of accidental ingestion, contact a poison control centre or seek emergency medical assistance immediately.',
      },
    ],
  },
  {
    number: '6',
    title: 'Storage Guidelines',
    content: [
      {
        subtitle: null,
        text: null,
        bullets: [
          'Store fragrances in a cool, dry place away from direct sunlight and heat.',
          'Keep bottles tightly sealed when not in use to preserve the scent and prevent spillage.',
          'Avoid storing near open flames or high-temperature environments.',
          'Do not freeze fragrance oils.',
        ],
      },
    ],
  },
  {
    number: '7',
    title: 'Not Medical Advice',
    content: [
      {
        subtitle: null,
        text: 'The information provided on this page and throughout our website is for general guidance only. Our products are cosmetic items and are not intended to diagnose, treat, cure, or prevent any medical condition or skin disease. Nothing on this Site constitutes medical or dermatological advice. Always consult a qualified healthcare professional for medical concerns.',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export default function HealthAndSafetyPage() {
  return (
    <PageWrapper>
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590736969596-24a66a6a5e6e?w=1600&q=80)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
            <HeartPulse size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Health &amp; Safety
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
            Your safety is our priority. Please read the following guidelines carefully before using any <span className="text-charcoal font-medium">Velour Essence</span> product.
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
          <h2 className="font-serif text-2xl text-white mb-2">Health Concerns?</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">If you've had a reaction to one of our products, please reach out to us immediately.</p>
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
