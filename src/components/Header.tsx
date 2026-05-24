import React from 'react';
import { Phone, ShoppingCart, Languages, Clock, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface HeaderProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  cartCount: number;
  cartTotal: number;
  toggleCart: () => void;
}

export default function Header({ lang, setLang, cartCount, cartTotal, toggleCart }: HeaderProps) {
  const isEn = lang === 'en';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-950/10 bg-stone-900/90 text-stone-100 backdrop-blur-md transition-all duration-300">
      {/* Top Banner with contact info */}
      <div className="hidden bg-amber-500 py-1.5 text-xs font-medium text-stone-950 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-1.5 hover:underline" id="top-phone">
              <Phone className="h-3.5 w-3.5" />
              <span>{RESTAURANT_INFO.formattedPhone}</span>
            </a>
            <span className="text-stone-950/30">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{isEn ? RESTAURANT_INFO.hours : RESTAURANT_INFO.arabicHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[400px]">
              {isEn ? RESTAURANT_INFO.address : RESTAURANT_INFO.arabicAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-2" id="nav-logo">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 shadow-md shadow-brand/10">
              <Sparkles className="h-6 w-6 text-stone-950 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold tracking-tight text-amber-400 sm:text-xl">
                AL AQSA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400">
                {isEn ? 'Restaurant & Cafeteria' : 'مطعم ومقهى'}
              </span>
            </div>
          </a>

          {/* Navigation Links (Scroll targets) */}
          <nav className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium tracking-wide">
            <a href="#hero" className="text-stone-300 hover:text-amber-400 hover:scale-105 transition" id="nav-home">
              {isEn ? 'Home' : 'الرئيسية'}
            </a>
            <a href="#menu" className="text-stone-300 hover:text-amber-400 hover:scale-105 transition" id="nav-menu">
              {isEn ? 'Our Menu' : 'قائمة الطعام'}
            </a>
            <a href="#location" className="text-stone-300 hover:text-amber-400 hover:scale-105 transition" id="nav-find-us">
              {isEn ? 'Find Us' : 'موقعنا'}
            </a>
            <a href="#reviews" className="text-stone-300 hover:text-amber-400 hover:scale-105 transition" id="nav-reviews">
              {isEn ? 'Reviews' : 'تقييمات'}
            </a>
          </nav>

          {/* Utilities (Controls) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Direct Call Button (Mobile) */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center p-2 text-stone-300 hover:text-amber-400 sm:hidden"
              id="mobile-phone-call"
              title="Call Us"
            >
              <Phone className="h-5 w-5" />
            </a>

            {/* Language Selector Toggle */}
            <button
              onClick={() => setLang(isEn ? 'ar' : 'en')}
              className="group flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:border-amber-400/50 hover:bg-stone-700/50 hover:scale-105 transition active:scale-95 cursor-pointer"
              id="lang-toggle"
              aria-label="Toggle Language"
            >
              <Languages className="h-3.5 w-3.5 group-hover:rotate-12 transition-all" />
              <span>{isEn ? 'العربية' : 'English'}</span>
            </button>

            {/* Shopping Basket Trigger */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all text-stone-950 px-3.5 py-2.5 font-bold cursor-pointer shadow-md shadow-amber-500/20"
              id="nav-cart-trigger"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-sans uppercase tracking-wider">
                {isEn ? 'Basket' : 'السلة'}
              </span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-950 text-[10px] font-extrabold text-amber-400 animate-bounce">
                  {cartCount}
                </span>
              )}
              {cartCount > 0 && (
                <span className="hidden md:inline text-xs border-l border-stone-950/20 pl-2">
                  AED {cartTotal}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
