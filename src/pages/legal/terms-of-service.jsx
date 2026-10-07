import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Mail, Phone } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const sections = [
  {
    number: '1',
    title: 'General Conditions & Eligibility',
    content: [
      {
        subtitle: 'Eligibility',
        text: 'By using this Site, you represent that you are at least the age of majority in your state, province, or country of residence.',
      },
      {
        subtitle: 'Modifications',
        text: 'We reserve the right to update, modify, or replace any part of these Terms at any time by posting updates to our Site. Your continued use of or access to the Site following the posting of changes constitutes acceptance of those changes.',
      },
    ],
  },
  {
    number: '2',
    title: 'Product Information & Disclaimers',
    content: [
      {
        subtitle: 'A. Product Descriptions & Visuals',
        text: 'We make every effort to display the colors, packaging, and descriptions of our perfume oils as accurately as possible. However, actual packaging or oil appearance (such as natural color variations) may vary slightly. Fragrance notes and scent descriptions are subjective interpretations intended for guidance only. Personal scent perception varies from person to person.',
      },
      {
        subtitle: 'B. Cosmetic & Patch Test Disclaimer',
        text: null,
        bullets: [
          'For External Use Only: All perfume oils and fragrance products sold on this Site are strictly for external cosmetic application. Do not ingest, consume, or apply to eyes, mucous membranes, or broken/irritated skin.',
          'Patch Test Recommended: Because fragrance oils contain natural and synthetic aromatic compounds, individual sensitivity or allergic reactions may occur. We strongly recommend conducting a patch test on a small area of skin 24 to 48 hours prior to full use.',
          'Not Medical Advice: Our products are not intended to diagnose, treat, cure, or prevent any medical condition or skin disease. Discontinue use immediately if irritation, rash, or discomfort occurs.',
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Orders, Pricing & Payment',
    content: [
      {
        subtitle: 'Order Acceptance',
        text: 'Placing an order does not guarantee acceptance. We reserve the right to refuse or cancel any order for reasons including, but not limited to, product availability, errors in pricing or product descriptions, or suspected fraudulent activity.',
      },
      {
        subtitle: 'Pricing & Currency',
        text: 'All prices listed on the Site are in GHS and exclude applicable taxes and shipping fees, which are calculated at checkout. Prices are subject to change without notice.',
      },
      {
        subtitle: 'Payment Processing',
        text: 'Payment must be made in full at the time of purchase using our accepted payment methods. Payments are processed securely via third-party processors.',
      },
    ],
  },
  {
    number: '4',
    title: 'Shipping & Delivery',
    content: [
      {
        subtitle: 'Processing & Transit Times',
        text: 'Estimated processing and shipping times are provided at checkout. These are estimates only and are not guaranteed delivery dates.',
      },
      {
        subtitle: 'Address Accuracy & Lost Packages',
        text: 'Customers are responsible for providing accurate shipping addresses. We are not liable for orders shipped or delivered to incorrect addresses provided by the customer, or for delays caused by postal/courier services or customs holds.',
      },
    ],
  },
  {
    number: '5',
    title: 'Returns, Refunds & Cancellations',
    intro:
      'Due to the intimate, hygienic nature of personal cosmetics and fragrance products:',
    content: [
      {
        subtitle: 'Final Sale / Non-Returnable Items',
        text: 'Opened or used perfume oils, sample vials, and custom/personalized blends cannot be returned or exchanged due to health and hygiene regulations.',
      },
      {
        subtitle: 'Damaged or Incorrect Items',
        text: 'If your order arrives damaged, leaking, or incomplete, please contact us within 24 hours of delivery at delademprempeh5@gmail.com or on 0559646969 with clear photos or videos of the damaged item and original packaging.',
      },
      {
        subtitle: 'Approved Returns & Refunds',
        text: 'If a return or store credit is authorized for unopened, unused items in their original packaging, return shipping costs are the responsibility of the customer unless the return is due to an error on our part.',
      },
    ],
  },
  {
    number: '6',
    title: 'Intellectual Property',
    content: [
      {
        subtitle: null,
        text: 'All content on this Site — including text, graphics, logos, and brand assets — is the property of Velour Essence and is protected by copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.',
      },
    ],
  },
  {
    number: '7',
    title: 'Limitation of Liability',
    intro: 'To the fullest extent permitted by applicable law:',
    content: [
      {
        subtitle: null,
        text: 'Velour Essence and its owners, officers, and affiliates shall not be liable for any direct, indirect, incidental, punitive, or consequential damages arising from your use of our products or website.',
      },
      {
        subtitle: null,
        text: 'Our maximum liability for any product purchase shall not exceed the actual purchase price paid by you for the specific item in question.',
      },
    ],
  },
  {
    number: '8',
    title: 'Governing Law & Dispute Resolution',
    content: [
      {
        subtitle: null,
        text: 'These Terms and any separate agreements shall be governed by and construed in accordance with the laws of Ghana, without regard to its conflict of law principles. Any legal disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in Ghana, using the arbitral method of settling disputes.',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

export default function TermsOfServicePage() {
  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1590736969596-24a66a6a5e6e?w=1600&q=80)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6"
          >
            <FileText size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight"
          >
            Terms &amp; Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-sm leading-relaxed max-w-xl mx-auto"
          >
            Last Updated: 21st September 2026
          </motion.p>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-12 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-8"
        >
          <p className="text-sm text-warm-gray leading-relaxed">
            Welcome to <span className="text-charcoal font-medium">Velour Essence</span>. These
            Terms and Conditions govern your access to and use of our website and the purchase of
            any products offered on the Site. By accessing, browsing, or placing an order on our
            Site, you agree to be bound by these Terms. Please read them carefully before
            completing any purchase.
          </p>
        </motion.div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.number}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="bg-white rounded-2xl border border-border overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-4 px-8 pt-7 pb-5 border-b border-border">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-charcoal text-white text-xs font-semibold shrink-0">
                {sec.number}
              </span>
              <h2 className="font-serif text-xl text-charcoal">{sec.title}</h2>
            </div>

            {/* Section body */}
            <div className="px-8 py-6 space-y-5">
              {sec.intro && (
                <p className="text-sm text-warm-gray italic leading-relaxed">{sec.intro}</p>
              )}
              {sec.content.map((item, j) => (
                <div key={j}>
                  {item.subtitle && (
                    <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
                      {item.subtitle}
                    </h3>
                  )}
                  {item.text && (
                    <p className="text-sm text-warm-gray leading-relaxed">{item.text}</p>
                  )}
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

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-charcoal rounded-2xl p-8 text-center"
        >
          <h2 className="font-serif text-2xl text-white mb-2">9. Contact Information</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            If you have any questions or concerns regarding these Terms and Conditions, please
            reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+233559646969"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-5 py-3 text-sm text-white"
            >
              <Phone size={16} strokeWidth={1.5} />
              0559 646 969
            </a>
            <a
              href="mailto:delademprempeh5@gmail.com"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-5 py-3 text-sm text-white"
            >
              <Mail size={16} strokeWidth={1.5} />
              delademprempeh5@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Back links */}
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-warm-gray">
          <Link to="/shop" className="hover:text-charcoal transition-colors">← Back to Shop</Link>
          <span className="text-border">|</span>
          <Link to="/faq" className="hover:text-charcoal transition-colors">View FAQ</Link>
          <span className="text-border">|</span>
          <Link to="/contact" className="hover:text-charcoal transition-colors">Contact Us</Link>
        </div>
      </section>
    </PageWrapper>
  );
}
