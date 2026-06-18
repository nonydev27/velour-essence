import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WA_NUMBER = '233559646969';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const quickReplies = [
  { label: 'How do I place an order?', msg: 'Hi! I\'d like to know how to place an order on Velour Essence.' },
  { label: 'Is my perfume authentic?', msg: 'Hi! I want to confirm the authenticity of your perfumes.' },
  { label: 'How long does delivery take?', msg: 'Hi! How long does delivery take after I place my order?' },
  { label: 'Can I return a product?', msg: 'Hi! What is your return policy for perfumes?' },
];

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);

  const openWhatsApp = (msg) => {
    window.open(`${WA_BASE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-72 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.845L.057 23.857a.5.5 0 00.609.61l6.102-1.595A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.007-1.373l-.36-.213-3.724.974.993-3.63-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Velour Essence</p>
                <p className="text-white/80 text-xs">Typically replies within an hour</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#f0f0f0]">
            {/* Bot bubble */}
            <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-sm mb-4 max-w-[90%]">
              <p className="text-sm text-charcoal leading-snug">
                Hi there! 👋 Welcome to <span className="font-semibold">Velour Essence</span>. How can we help you today?
              </p>
              <p className="text-[10px] text-warm-gray mt-1.5">Velour Essence Support</p>
            </div>

            {/* Quick replies */}
            <div className="space-y-2">
              {quickReplies.map(({ label, msg }) => (
                <button
                  key={label}
                  onClick={() => openWhatsApp(msg)}
                  className="w-full text-left text-sm bg-white rounded-xl px-3.5 py-2.5 shadow-sm border border-border hover:border-[#25D366] hover:bg-[#f0fff4] transition-colors text-charcoal"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-4 py-3 bg-white border-t border-border">
            <button
              onClick={() => openWhatsApp('Hi! I have an enquiry about Velour Essence.')}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.845L.057 23.857a.5.5 0 00.609.61l6.102-1.595A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.007-1.373l-.36-.213-3.724.974.993-3.63-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Chat on WhatsApp
            </button>
            <p className="text-center text-[10px] text-warm-gray mt-2">
              For more enquiries, message us directly on WhatsApp
            </p>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        {open ? (
          <X size={22} />
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.845L.057 23.857a.5.5 0 00.609.61l6.102-1.595A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.007-1.373l-.36-.213-3.724.974.993-3.63-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
        )}
      </button>
    </div>
  );
}
