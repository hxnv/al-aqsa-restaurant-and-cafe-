import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Star, Sparkles, MapPin, ChefHat, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

// Import the real generated images from assets
import heroImg1 from '../assets/images/restaurant_hero_1779640192625.png';
import heroImg2 from '../assets/images/shawarma_platter_1779640209742.png';

interface HeroSectionProps {
  lang: 'en' | 'ar';
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const isEn = lang === 'en';
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: heroImg1,
      tagline: isEn ? 'Authentic Levantine Heritage' : 'تراث المطبخ الشامي العريق',
      title: isEn ? 'Epicurean Arabic Grills & Specialties' : 'فنون المشاوي والوجبات العربية الأصيلة',
      desc: isEn 
        ? 'Relish our slowly charcoal-grilled lamb kababs, tender tikka, crisp stuffed manakeesh, and custom-made fava beans platters made to golden precision.' 
        : 'تناول المشاوي المميزة بالكيلو والصحن، شاورما الصاج المقرمشة، مناقيش الفرن الطازجة، وأطباق الفول والفتة بالسمنة البلدية كما تحبها.',
    },
    {
      image: heroImg2,
      tagline: isEn ? 'Crispy, Savory, and Made Daily' : 'طازج، شهي ومُعد يومياً',
      title: isEn ? 'Dubai’s Finest Rotating Saj Shawarma' : 'أفخم شاورما عربي صاج في دبي',
      desc: isEn 
        ? 'Slices of beautifully seasoned chicken and meat roasted on a slow spit, wrapped to a crisp in saj flatbread with strong garlic toum and fries.' 
        : 'شرائح شاورما غنية متبلة ومحمرة ببطء، ملفوفة بخبز الصاج الساخن مع الثومية الخاصة الأصلية والبطاطا المقرمشة ومقطعة للجمع والمشاركة.',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative text-stone-100 overflow-hidden bg-stone-950 font-sans border-b border-amber-950/20">
      {/* Background Image Container with Crossfade effect */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === activeSlide ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt="Al Aqsa Restaurant Gourmet"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center scale-102 transform duration-1500"
            />
          </div>
        ))}
        {/* Modern dark gradient overlays to ensure stellar typography contrast */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-950 to-transparent" />
        <div className="absolute inset-0 bg-stone-950/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className={`${isEn ? 'text-left' : 'text-right'} max-w-3xl`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400 mb-6 ${!isEn && 'flex-row-reverse'}`}>
            <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{slides[activeSlide].tagline}</span>
          </div>

          {/* Heading */}
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-stone-50 md:text-5xl lg:text-6xl/tight leading-tight">
            {isEn ? (
              <>
                Taste the Tradition of <br />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Al Aqsa Restaurant
                </span>
              </>
            ) : (
              <>
                تذوق روعة ومذاق مطعم <br />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  ومقهى الأقصى الشهير
                </span>
              </>
            )}
          </h1>

          <h2 className="mt-4 text-xl font-medium text-amber-100/90 tracking-wide">
            {slides[activeSlide].title}
          </h2>

          <p className="mt-4 text-base text-stone-300 sm:text-lg max-w-2xl leading-relaxed">
            {slides[activeSlide].desc}
          </p>

          {/* Call to Actions */}
          <div className={`mt-8 flex flex-wrap gap-4 ${!isEn && 'justify-start flex-row-reverse'}`}>
            <a
              href="#menu"
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3.5 font-bold text-stone-950 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              id="hero-view-menu"
            >
              <span>{isEn ? 'Explore Interactive Menu' : 'تصفح قائمة الطعام التفاعلية'}</span>
              <ArrowRight className={`h-4 w-4 ${!isEn && 'rotate-180'}`} />
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400/40 hover:bg-stone-800 px-6 py-3.5 font-bold text-stone-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              id="hero-call-now"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              <span>{isEn ? 'Call 055 116 2600' : 'اتصل الآن 0551162600'}</span>
            </a>
          </div>

          {/* Feature highlights grid */}
          <div className={`mt-12 grid grid-cols-2 gap-4 max-w-lg border-t border-stone-800 pt-8 sm:grid-cols-3 ${!isEn && 'flex-row-reverse'}`}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-stone-400 font-medium">{isEn ? 'Hygiene Standard' : 'معايير النظافة'}</p>
                <p className="text-sm font-semibold text-stone-200">{isEn ? '100% Certified' : 'معتمدة بالكامل'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ChefHat className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-stone-400 font-medium">{isEn ? 'Ingredients' : 'المكونات'}</p>
                <p className="text-sm font-semibold text-stone-200">{isEn ? 'Locally Sourced' : 'طازجة ومحلية'}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Star className="h-4.5 w-4.5 fill-current" />
              </div>
              <div className="text-left">
                <p className="text-xs text-stone-400 font-medium">{isEn ? 'Rating' : 'التقييم'}</p>
                <p className="text-sm font-semibold text-stone-200">{isEn ? '4.8+ Stars' : '4.8+ نجوم'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-15">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === activeSlide ? 'w-8 bg-amber-400' : 'w-2 bg-stone-700 hover:bg-stone-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
