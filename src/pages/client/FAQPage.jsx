import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ShoppingBag, Truck, RotateCcw, CreditCard, Droplets, MessageCircle } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const categories = [
  {
    id: 'ordering',
    label: 'Ordering',
    icon: ShoppingBag,
    faqs: [
      {
        q: 'How do I place an order?',
        a: 'Browse our collection at /shop, add items to your cart, and proceed to checkout. Fill in your delivery details and complete payment securely via Paystack. You\'ll receive an SMS confirmation once your order is placed.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'We begin processing orders quickly to ensure fast delivery. If you need to make a change, contact us immediately on 0559 646 969 or via WhatsApp. We\'ll do our best to accommodate you, but we cannot guarantee changes once an order is confirmed.',
      },
      {
        q: 'Do I need an account to order?',
        a: 'No account is required. You can complete a purchase as a guest. Just fill in your name, phone number, school, and hostel at checkout.',
      },
      {
        q: 'Can I order more than one item at a time?',
        a: 'Absolutely. You can add multiple products to your cart and check out in a single order. Shipping fees are calculated based on your delivery location.',
      },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: Droplets,
    faqs: [
      {
        q: 'Are your perfumes authentic?',
        a: 'Yes. Every fragrance we sell is 100% genuine. We source directly from verified suppliers and do not carry duplicates, imitations, or counterfeit products — ever.',
      },
      {
        q: 'How long do the scents last?',
        a: 'Longevity depends on the fragrance concentration, your skin type, and application method. Our perfume oils are typically long-lasting. We recommend applying to pulse points (wrists, neck, inner elbows) on moisturised skin for the best results.',
      },
      {
        q: 'Are the product images accurate?',
        a: 'We make every effort to display product images as accurately as possible. However, slight color or packaging variations may occur due to screen settings or natural batch differences.',
      },
      {
        q: 'What does the patch test recommendation mean?',
        a: 'Because fragrance oils contain natural and synthetic aromatic compounds, some individuals may experience skin sensitivity. We recommend applying a small amount to your inner wrist and waiting 24–48 hours before full use. Discontinue immediately if any irritation occurs.',
      },
      {
        q: 'Are your products safe for all skin types?',
        a: 'Our products are formulated for external cosmetic use. If you have known fragrance allergies or very sensitive skin, we recommend a patch test first. Consult a dermatologist if you have any concerns. Our products are not intended to diagnose or treat any skin condition.',
      },
    ],
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: CreditCard,
    faqs: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major payment options available through Paystack, including Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money) and card payments. All transactions are processed in GHS.',
      },
      {
        q: 'Is it safe to pay on your website?',
        a: 'Yes. All payments are handled by Paystack, a PCI-DSS compliant payment processor. We never store your card or MoMo details on our servers.',
      },
      {
        q: 'I was charged but didn\'t receive a confirmation. What should I do?',
        a: 'Don\'t worry. Contact us immediately on 0559 646 969 or via email at delademprempeh5@gmail.com with your reference number. We\'ll verify the transaction and resolve it promptly.',
      },
      {
        q: 'Are prices inclusive of taxes?',
        a: 'All prices are listed in GHS. Applicable taxes and shipping fees are calculated at checkout before you confirm your order.',
      },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    icon: Truck,
    faqs: [
      {
        q: 'Which areas do you deliver to?',
        a: 'We primarily deliver to university campuses across Ghana. Enter your school and hostel at checkout and we\'ll confirm delivery availability. For off-campus deliveries, contact us directly.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Estimated delivery times are shown at checkout and depend on your location. Campus deliveries are typically faster. Please note these are estimates, not guaranteed dates.',
      },
      {
        q: 'How will I know when my order is on its way?',
        a: 'You\'ll receive an SMS confirmation when your order is placed, and we\'ll reach out via the phone number provided when your order is ready for delivery.',
      },
      {
        q: 'What if I provided a wrong address?',
        a: 'Customers are responsible for providing accurate delivery information. If you realise you\'ve made an error, contact us immediately. We are not liable for orders delivered to incorrect addresses due to customer error.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    icon: RotateCcw,
    faqs: [
      {
        q: 'Can I return a product I don\'t like?',
        a: 'Due to the hygienic nature of fragrance products, we cannot accept returns on opened or used items. We encourage you to check product descriptions and notes carefully before purchasing, or contact us for a recommendation.',
      },
      {
        q: 'My order arrived damaged. What do I do?',
        a: 'We\'re sorry to hear that! Please contact us within 24 hours of delivery at delademprempeh5@gmail.com or 0559 646 969 with clear photos or videos of the damaged item and its original packaging. We\'ll arrange a replacement or refund promptly.',
      },
      {
        q: 'I received the wrong item. What happens next?',
        a: 'Contact us immediately with your order details and a photo of what you received. Wrong items are fully our responsibility and we\'ll resolve it at no cost to you.',
      },
      {
        q: 'How long does a refund take to process?',
        a: 'Once a return or refund is approved, processing typically takes 3–7 business days depending on your payment method. We\'ll keep you updated throughout.',
      },
    ],
  },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-charcoal group-hover:text-burgundy transition-colors leading-relaxed pr-2">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center transition-all duration-300 mt-0.5 ${
            isOpen ? 'bg-charcoal border-charcoal rotate-180' : 'bg-white group-hover:border-charcoal'
          }`}
        >
          <ChevronDown
            size={14}
            className={isOpen ? 'text-white' : 'text-warm-gray'}
            strokeWidth={2}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-warm-gray leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('ordering');
  const [openIndex, setOpenIndex] = useState(null);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  const handleToggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  // Reset open item when switching category
  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600&q=80)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6"
          >
            <HelpCircle size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-sm leading-relaxed max-w-xl mx-auto"
          >
            Everything you need to know about our fragrances, ordering, delivery, and more.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ Body ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleCategoryChange(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === id
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'bg-white border border-border text-warm-gray hover:border-charcoal hover:text-charcoal'
              }`}
            >
              <Icon size={13} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </div>

        {/* Q&A list */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-border px-8"
        >
          {/* Category heading */}
          <div className="flex items-center gap-3 py-6 border-b border-border">
            {(() => {
              const Icon = currentCategory.icon;
              return (
                <span className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
                  <Icon size={15} className="text-charcoal" strokeWidth={1.5} />
                </span>
              );
            })()}
            <h2 className="font-serif text-xl text-charcoal">{currentCategory.label}</h2>
            <span className="ml-auto text-xs text-warm-gray">
              {currentCategory.faqs.length} questions
            </span>
          </div>

          {/* Questions */}
          {currentCategory.faqs.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </motion.div>
      </section>

      {/* ── Still need help? ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-charcoal rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <MessageCircle size={18} className="text-white/60" strokeWidth={1.5} />
              <p className="text-white/60 text-xs tracking-wide">Still have questions?</p>
            </div>
            <h2 className="font-serif text-2xl text-white mb-1">We're here to help</h2>
            <p className="text-white/50 text-sm">
              Reach us via WhatsApp, phone, or email — we typically respond within a few hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/233559646969"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-charcoal text-sm font-medium px-6 py-3 rounded-xl hover:bg-cream transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              Contact Page
            </Link>
          </div>
        </motion.div>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-warm-gray">
          <Link to="/shop" className="hover:text-charcoal transition-colors">← Back to Shop</Link>
          <span className="text-border">|</span>
          <Link to="/legal/terms-of-service" className="hover:text-charcoal transition-colors">Terms & Conditions</Link>
          <span className="text-border">|</span>
          <Link to="/contact" className="hover:text-charcoal transition-colors">Contact Us</Link>
        </div>
      </section>
    </PageWrapper>
  );
}
