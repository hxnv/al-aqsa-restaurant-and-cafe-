import React from 'react';
import { Phone, MapPin, Clock, ArrowUp, Star, Sparkles, ChefHat } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface FooterProps {
  lang: 'en' | 'ar';
}

export default function Footer({ lang }: FooterProps) {
  const isEn = lang === 'en';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 font-sans border-t border-amber-950/40">
      {/* Decorative colored grid border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950">
                <ChefHat className="h-5.5 w-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-base font-black tracking-tight text-amber-400">
                  AL AQSA RESTAURANT
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">
                  {isEn ? '& Cafeteria — Dubai' : 'ومقهى الأقصى — دبي'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {isEn 
                ? 'Relishing Dubai with authentic Middle Eastern recipes, live charcoal grilling, and fresh specialty pastries baked to perfection daily. Try our incredible WhatsApp direct delivery ordering.'
                : 'نطهو أشهى المأكولات والمشاوي العربية والسندويشات في المدينة العالمية دبي. لحوم طازجة وخدمة سريعة طوال اليوم.'}
            </p>

            <div className="flex gap-2">
              <span className="inline-flex rounded-md bg-stone-900 border border-stone-800 px-2.5 py-1 text-2xs text-amber-400 font-mono">
                📞 055 116 2600
              </span>
              <span className="inline-flex rounded-md bg-stone-900 border border-stone-800 px-2.5 py-1 text-2xs text-emerald-400 font-mono">
                📍 Warsan Fourth
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              {isEn ? 'Navigate App' : 'تصفح الموقع'}
            </h3>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition">{isEn ? 'Home Header' : 'رأس الصفحة'}</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition">{isEn ? 'Signature Menu' : 'قائمة المأكولات'}</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition">{isEn ? 'Find Branch' : 'تحديد فرع دبي'}</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition">{isEn ? 'Guest Ratings' : 'تقييمات الزبائن'}</a>
              </li>
            </ul>
          </div>

          {/* Branch Logistics Detail */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              {isEn ? 'Dubai Branch' : 'فرع ومقهى دبي'}
            </h3>
            <div className="space-y-2 text-xs text-stone-400 font-sans">
              <div className="flex items-start gap-1.5">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                <span>
                  {isEn ? RESTAURANT_INFO.address : RESTAURANT_INFO.arabicAddress}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                <span>
                  {isEn ? RESTAURANT_INFO.hours : RESTAURANT_INFO.arabicHours}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-400 hover:underline">
                  {RESTAURANT_INFO.formattedPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs font-mono text-stone-500">
            &copy; {new Date().getFullYear()} {RESTAURANT_INFO.name}. {isEn ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 transition text-2xs cursor-pointer font-bold"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>{isEn ? 'Back to Top' : 'الذهاب لأعلى'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
