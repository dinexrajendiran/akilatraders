import React from 'react';
import { STORE_INFO } from '../data/products';
import { ShieldAlert, Truck, CreditCard, Clock, Phone, MapPin, Sparkles } from 'lucide-react';

export default function TermsFooter() {
  return (
    <footer className="bg-slate-950 border-t border-amber-500/30 text-slate-300 py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Terms and Conditions Banner */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider">
              Terms & Conditions (விதிமுறைகள் மற்றும் நிபந்தனைகள்)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            
            <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-amber-500/10">
              <CreditCard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-200 block mb-0.5">100% Advance Payment</strong>
                <p className="text-slate-400">100% Payment must be made to Company account after placing the order.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-amber-500/10">
              <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-200 block mb-0.5">Lorry Transport Delivery</strong>
                <p className="text-slate-400">Crackers package will be dispatched to lorry service. Customers collect from transport office & pay freight cost at delivery.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-amber-500/10">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-200 block mb-0.5">Tracking & Delivery Time</strong>
                <p className="text-slate-400">Package L.R. Number will be updated by Company. Delivery takes around 3 to 5 working days.</p>
              </div>
            </div>

          </div>

          <div className="text-[11px] text-amber-300/70 pt-1 italic">
            * Note: Company has the right to replace an ordered product with a similar product if the ordered item is out of stock.
          </div>
        </div>

        {/* Footer Contact & Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-900 pt-6 text-center md:text-left text-xs">
          
          <div className="flex items-center gap-3">
            <img 
              src={STORE_INFO.logo} 
              alt="Akila Traders" 
              className="w-12 h-12 rounded-full border border-amber-400/40 object-cover shadow shrink-0"
            />
            <div className="space-y-0.5">
              <div className="font-bold text-amber-300 text-sm flex items-center justify-center md:justify-start gap-1">
                <Sparkles className="w-4 h-4 text-amber-400" /> {STORE_INFO.name}
              </div>
              <p className="text-slate-400">{STORE_INFO.address}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {STORE_INFO.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-lg transition font-semibold"
              >
                📞 {phone}
              </a>
            ))}
          </div>

        </div>

        <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-900">
          தீபாவளி நல்வாழ்த்துக்கள்! நன்றி! மீண்டும் வருக! (Diwali Greetings & Thanks!)
        </div>

      </div>
    </footer>
  );
}
