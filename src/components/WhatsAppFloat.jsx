import React from 'react';
import { STORE_INFO } from '../data/products';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const handleChatClick = () => {
    const defaultText = encodeURIComponent(STORE_INFO.defaultChatMessage);
    const url = `https://wa.me/${STORE_INFO.primaryWhatsapp}?text=${defaultText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
      {/* Tooltip message */}
      <span className="hidden sm:inline-block bg-slate-900 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl transition-all opacity-90 group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>

      {/* Pulsing Green Button */}
      <button
        onClick={handleChatClick}
        aria-label="Contact Akila Traders on WhatsApp"
        className="relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-emerald-200"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-75 animate-ping -z-10" />
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </button>
    </div>
  );
}
