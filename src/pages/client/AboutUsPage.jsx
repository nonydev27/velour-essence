import { motion } from 'framer-motion';
import { Phone, Mail, GraduationCap, Award, Heart } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const team = [
  {
    name: 'Sally Prempeh',
    role: 'Chief Executive Officer',
    image: '/sally.jpeg',
    phone: '+233 55 964 6969',
    email: 'delademprempeh5@gmail.com',
    bio: 'Sally founded Velour Essence with a vision to bring world-class luxury fragrances to every corner of Ghana and beyond. With over a decade of experience in the beauty and fragrance industry, she leads the brand with elegance, passion, and purpose.',
    school: 'University of Professional Studies, Accra',
    degree: 'B.Sc. LLB',
    achievement: 'Forbes Africa 30 Under 30 – 2022',
    tag: 'CEO & Founder',
  },
  {
    name: 'Karl Djansi',
    role: 'Software Engineer & Operations Lead',
    image: '/kdjansi.jpg',
    phone: '+233 20 738 4908',
    email: 'karl@velouressence.com',
    bio: 'Karl is the technical mastermind behind our seamless online experience. With a background in computer science and a passion for innovation, he ensures that our website is not only beautiful but also fast, secure, and user-friendly.',
    school: 'Kwame Nkrumah University of Science and Technology',
    degree: 'B.Sc. Computer Science',
    achievement: 'Young Entrepreneur of the Year – Ghana Business Awards 2023',
    tag: 'Co-Founder',
  },
];

const values = [
  {
    title: 'Authenticity',
    body: 'Every bottle we sell is 100% genuine. No duplicates, no compromises, just pure, verified luxury.',
  },
  {
    title: 'Accessibility',
    body: 'We believe great fragrance should not be a privilege. We deliver across Ghana at fair, honest prices.',
  },
  {
    title: 'Excellence',
    body: 'From sourcing to packaging, every detail is curated to deliver an experience worthy of your expectations.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55 } }),
};

export default function AboutUsPage() {
  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=80)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight"
          >
            Crafted With Passion,<br />Worn With Pride
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto"
          >
            Velour Essence was born from a simple belief that every person deserves a scent
            that tells their story. We are a proudly Ghanaian luxury fragrance brand dedicated
            to bringing the finest perfumes directly to you.
          </motion.p>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map(({ title, body }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 border border-border"
            >
              <Heart size={20} className="text-burgundy mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-lg text-charcoal mb-2">{title}</h3>
              <p className="text-sm text-warm-gray leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.25em] uppercase text-warm-gray mb-2">The People Behind the Scent</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Meet Our Team</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {team.map(({ name, role, image, phone, email, bio, school, degree, achievement, tag }, i) => (
              <motion.div
                key={name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                {/* Photo */}
                <div className="relative h-72 bg-cream overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute top-4 left-4 bg-charcoal/80 text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {tag}
                  </span>
                </div>

                {/* Info */}
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-charcoal mb-0.5">{name}</h3>
                  <p className="text-xs font-medium text-burgundy tracking-widest uppercase mb-4">{role}</p>

                  <p className="text-sm text-warm-gray leading-relaxed mb-6">{bio}</p>

                  {/* Education */}
                  <div className="flex items-start gap-3 bg-cream rounded-xl p-4 mb-4">
                    <GraduationCap size={18} className="text-charcoal shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">{school}</p>
                      <p className="text-xs text-warm-gray">{degree}</p>
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="flex items-start gap-3 bg-cream rounded-xl p-4 mb-6">
                    <Award size={18} className="text-burgundy shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-xs text-warm-gray">{achievement}</p>
                  </div>

                  {/* Contact */}
                  <div className="border-t border-border pt-5 space-y-3">
                    <p className="text-[10px] font-semibold text-charcoal uppercase tracking-widest mb-3">
                      Reach Out
                    </p>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-sm text-warm-gray hover:text-charcoal transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-full bg-cream flex items-center justify-center group-hover:bg-charcoal transition-colors">
                        <Phone size={14} className="text-charcoal group-hover:text-white transition-colors" strokeWidth={1.5} />
                      </span>
                      {phone}
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-sm text-warm-gray hover:text-charcoal transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-full bg-cream flex items-center justify-center group-hover:bg-charcoal transition-colors">
                        <Mail size={14} className="text-charcoal group-hover:text-white transition-colors" strokeWidth={1.5} />
                      </span>
                      {email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-warm-gray mb-3">Have a question?</p>
          <h2 className="font-serif text-3xl text-charcoal mb-4">We Would Love to Hear From You</h2>
          <p className="text-warm-gray text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Whether you need help choosing a scent, have a question about an order, or just want to say hello, our team is always happy to connect.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-white text-sm font-medium px-8 py-3 rounded-lg hover:bg-charcoal/85 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
