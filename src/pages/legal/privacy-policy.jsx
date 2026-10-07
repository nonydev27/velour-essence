import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const sections = [
  {
    number: '1',
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Information You Provide',
        text: 'When you place an order, we collect your name, phone number, school, hostel/delivery address, and payment information. We may also collect information you provide when contacting us via email or WhatsApp.',
      },
      {
        subtitle: 'Information Collected Automatically',
        text: 'When you visit our Site, we may automatically collect certain information about your device, including your browser type, IP address, pages viewed, and the date and time of your visit. This information helps us improve your experience.',
      },
    ],
  },
  {
    number: '2',
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: null,
        text: null,
        bullets: [
          'To process and fulfil your orders, including sending SMS order confirmations.',
          'To communicate with you about your order status, delivery, and any issues.',
          'To improve our website, products, and customer service.',
          'To send promotional updates (only if you have opted in).',
          'To comply with applicable laws and prevent fraudulent transactions.',
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Sharing Your Information',
    content: [
      {
        subtitle: null,
        text: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business (such as payment processors like Paystack and SMS services like Termii), provided they agree to keep your information confidential.',
      },
    ],
  },
  {
    number: '4',
    title: 'Payment Security',
    content: [
      {
        subtitle: null,
        text: 'All payments are processed securely through Paystack, a PCI-DSS compliant payment gateway. We do not store your card details or Mobile Money PIN on our servers. Your financial information is handled entirely by Paystack.',
      },
    ],
  },
  {
    number: '5',
    title: 'Cookies',
    content: [
      {
        subtitle: 'First-Party Cookies',
        text: 'Our website may use cookies to enhance your browsing experience. Cookies are small files placed on your device that help us remember your preferences and understand how you use our Site. You can choose to disable cookies in your browser settings, though this may affect some functionality.',
      },
      {
        subtitle: 'Third-Party Cookies',
        text: 'We use third-party advertising services, including Google AdSense, to display advertisements on our Site. These third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website and other websites on the internet. Google\'s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our Site and/or other sites on the internet.',
      },
      {
        subtitle: 'Opting Out of Personalised Ads',
        text: 'You may opt out of personalised advertising by visiting Google\'s Ads Settings at https://adssettings.google.com. Alternatively, you can opt out of a third-party vendor\'s use of cookies for personalised advertising by visiting www.aboutads.info. Disabling personalised ads does not remove ads from the Site — you will still see ads, but they will not be tailored to your interests.',
      },
    ],
  },
  {
    number: '6',
    title: 'Third-Party Advertising',
    content: [
      {
        subtitle: 'Google AdSense',
        text: 'We use Google AdSense to serve advertisements on this Site. Google AdSense uses the DoubleClick cookie to serve ads based on your visit to our Site and other sites on the internet. You can opt out of the use of the DoubleClick cookie for interest-based advertising by visiting the Google Ads Settings page.',
      },
      {
        subtitle: 'How Google Uses Your Data',
        text: 'Google, as a third-party vendor, uses cookies to serve ads on our Site. Google\'s use of these cookies is governed by the Google Privacy Policy, which can be reviewed at https://policies.google.com/privacy. By using our website, you consent to the use of such cookies for advertising purposes.',
      },
      {
        subtitle: 'No Sale of Personal Data',
        text: 'We do not sell your personal information to Google or any other third-party advertiser. Data used for ad personalisation is handled entirely by Google\'s own systems under their privacy policy.',
      },
    ],
  },
  {
    number: '7',
    title: 'Your Rights',
    content: [
      {
        subtitle: null,
        text: null,
        bullets: [
          'You have the right to request access to the personal information we hold about you.',
          'You may request that we correct inaccurate or incomplete information.',
          'You may request that we delete your personal information, subject to legal obligations.',
          'You may opt out of marketing communications at any time by contacting us.',
        ],
      },
    ],
  },
  {
    number: '8',
    title: 'Data Retention',
    content: [
      {
        subtitle: null,
        text: 'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, including for legal, accounting, or reporting requirements.',
      },
    ],
  },
  {
    number: '9',
    title: 'Changes to This Policy',
    content: [
      {
        subtitle: null,
        text: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Your continued use of the Site after changes are posted constitutes your acceptance of the revised policy.',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590736969596-24a66a6a5e6e?w=1600&q=80)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
            <ShieldCheck size={22} className="text-white/80" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Privacy Policy
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
            At <span className="text-charcoal font-medium">Velour Essence</span>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
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
          <h2 className="font-serif text-2xl text-white mb-2">Questions About Your Privacy?</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">Contact us and we'll be happy to address any privacy concerns.</p>
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
