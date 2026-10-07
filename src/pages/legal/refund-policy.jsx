import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RotateCcw, Mail, Phone } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const sections = [
  {
    number: '1',
    title: 'Our General Policy',
    content: [
      {
        subtitle: null,
        text: 'Due to the intimate and hygienic nature of personal fragrance products, all sales are generally final. We encourage customers to read product descriptions, review fragrance notes, and contact us for guidance before purchasing. Once a perfume oil has been opened or used, it cannot be returned or refunded.',
      },
    ],
  },
  {
    number: '2',
    title: 'Non-Returnable Items',
    content: [
      {
        subtitle: null,
        text: 'The following items cannot be returned or exchanged under any circumstance:',
        bullets: [
          'Opened or used perfume oils and fragrance products.',
          'Sample vials or testers that have been opened.',
          'Custom or personalized fragrance blends.',
          'Products purchased during flash sales or at discounted prices, unless received damaged.',
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Damaged or Incorrect Items',
    content: [
      {
        subtitle: 'Reporting a Damaged Item',
        text: 'If your order arrives damaged, leaking, broken, or with a manufacturing defect, please contact us within 24 hours of delivery. We require clear photos or a short video showing the damage along with the original packaging.',
      },
      {
        subtitle: 'Wrong Item Received',
        text: 'If you receive an item different from what you ordered, contact us immediately. We will arrange for the correct item to be sent to you or issue a full refund at no extra cost to you.',
      },
      {
        subtitle: 'How to Report',
        text: null,
        bullets: [
          'Email: delademprempeh5@gmail.com',
          'WhatsApp / Phone: 0559 646 969',
          'Include your order reference, a description of the issue, and photos/video evidence.',
        ],
      },
    ],
  },
  {
    number: '4',
    title: 'Approved Refunds & Store Credit',
    content: [
      {
        subtitle: null,
        text: 'When a return or refund is approved for unopened, unused items in their original packaging:',
        bullets: [
          'Return shipping costs are the responsibility of the customer, unless the return is due to an error on our part.',
          'Refunds will be processed to the original payment method within 3–7 business days of receiving and inspecting the returned item.',
          'We may offer store credit in lieu of a cash refund in certain circumstances.',
        ],
      },
    ],
  },
  {
    number: '5',
    title: 'Order Cancellations',
    content: [
      {
        subtitle: null,
        text: 'If you wish to cancel an order, contact us immediately after placing it. We begin processing orders quickly and cannot guarantee cancellations once fulfilment has started. If your order has already been dispatched, the standard return policy applies.',
      },
    ],
  },
  {
    number: '6',
    title: 'Refund Processing Time',
    content: [
      {
        subtitle: null,
        text: 'Once a refund is approved, it will typically be processed within 3–7 business days. The time it takes to appear in your account depends on your bank or Mobile Money provider. We will notify you once your refund has been initiated.',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export default function RefundPolicyPage() {
  return (
    <PageWrapper>
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590736969596-24a66a6a5e6e?w=1600&q=80)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
            <RotateCcw size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Refund Policy
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
            Your satisfaction matters to us. Please read this policy carefully before making a purchase. If you have any questions, our team is happy to help before you complete your order.
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
          <h2 className="font-serif text-2xl text-white mb-2">Need Help With an Order?</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">Contact us within 24 hours of delivery for damaged or incorrect orders.</p>
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
