import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const WA_NUMBER = '233559646969';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="fill-current shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.845L.057 23.857a.5.5 0 00.609.61l6.102-1.595A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.007-1.373l-.36-.213-3.724.974.993-3.63-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const FAQ = [
  {
    question: 'How do I place an order?',
    answer: "It's easy! 🛍️ Browse our shop, add your favourites to cart, then checkout with your delivery details. Payment is secured via Paystack — fast and safe.",
    waMsg: "Hi! I'd like to know more about placing an order on Velour Essence.",
  },
  {
    question: 'Are your perfumes authentic?',
    answer: 'Absolutely! ✨ Every fragrance we carry is 100% genuine, sourced directly from trusted suppliers. Your scent is always the real deal.',
    waMsg: "Hi! I want to confirm the authenticity of your perfumes.",
  },
  {
    question: 'How long does delivery take?',
    answer: 'We typically deliver within 24–48 hours to your hostel after your order is confirmed. 🚚 You\'ll get updates along the way!',
    waMsg: "Hi! How long does delivery take after I place my order?",
  },
  {
    question: 'Can I return a product?',
    answer: "We want you to love every scent! 💜 If there's any issue with your order, reach out to us and we'll make it right — your satisfaction comes first.",
    waMsg: "Hi! What is your return or exchange policy?",
  },
  {
    question: 'What payment methods do you accept?',
    answer: "We accept all major cards and mobile money through Paystack. 💳 Your transaction is encrypted and completely secure.",
    waMsg: "Hi! I'd like to know what payment methods you accept.",
  },
];

function Bubble({ from, text, typing = false }) {
  const isBot = from === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-2`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm text-sm leading-snug ${
          isBot
            ? 'bg-white rounded-tl-sm text-charcoal'
            : 'bg-[#dcf8c6] rounded-tr-sm text-charcoal'
        }`}
      >
        {typing ? (
          <span className="flex items-center gap-1 py-0.5 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
}

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 Welcome to Velour Essence. How can we help you today?' },
  ]);
  const [typing, setTyping] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [activeWaMsg, setActiveWaMsg] = useState('Hi! I have an enquiry about Velour Essence.');
  const bodyRef = useRef(null);

  // auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function handleQuestion({ question, answer, waMsg }) {
    if (answered) return;
    setAnswered(true);
    setActiveWaMsg(waMsg);

    // 1. Add user message
    setMessages((prev) => [...prev, { from: 'user', text: question }]);

    // 2. Show typing indicator after short delay
    setTimeout(() => setTyping(true), 400);

    // 3. Replace typing with bot reply
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: answer }]);
    }, 1800);
  }

  function openWhatsApp() {
    window.open(`${WA_BASE}?text=${encodeURIComponent(activeWaMsg)}`, '_blank', 'noopener,noreferrer');
  }

  function handleReset() {
    setMessages([{ from: 'bot', text: 'Hi there! 👋 Welcome to Velour Essence. How can we help you today?' }]);
    setTyping(false);
    setAnswered(false);
    setActiveWaMsg('Hi! I have an enquiry about Velour Essence.');
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ── */}
      {open && (
        <div className="w-[300px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in flex flex-col" style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                <span className="w-5 h-5">{WA_ICON}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Velour Essence</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <p className="text-white/75 text-[11px]">Online · replies within an hour</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages area */}
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8b8a2' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          >
            {messages.map((m, i) => (
              <Bubble key={i} from={m.from} text={m.text} />
            ))}
            {typing && <Bubble from="bot" typing />}

            {/* Quick replies — shown only before a question is answered */}
            {!answered && !typing && (
              <div className="mt-3 space-y-1.5">
                {FAQ.map((faq) => (
                  <button
                    key={faq.question}
                    onClick={() => handleQuestion(faq)}
                    className="w-full text-left text-[13px] bg-white border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#f0fff4] text-charcoal rounded-xl px-3 py-2 shadow-sm transition-colors"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            {/* After reply: CTA + ask another */}
            {answered && !typing && messages.length >= 3 && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={openWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <span className="w-4 h-4">{WA_ICON}</span>
                  Continue on WhatsApp
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-center text-xs text-warm-gray hover:text-charcoal transition-colors py-1"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-white border-t border-border shrink-0 flex items-center justify-between">
            <p className="text-[10px] text-warm-gray">
              For more enquiries →{' '}
              <button onClick={openWhatsApp} className="text-[#25D366] font-medium hover:underline">
                WhatsApp us
              </button>
            </p>
            <div className="w-4 h-4 text-[#25D366]">{WA_ICON}</div>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with us on WhatsApp'}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        {open ? (
          <X size={22} />
        ) : (
          <span className="w-7 h-7">{WA_ICON}</span>
        )}
      </button>
    </div>
  );
}
