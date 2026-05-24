import React from 'react';
import { MapPin, Navigation, Phone, Mail, Star, ExternalLink, CalendarDays } from 'lucide-react';
import { RESTAURANT_INFO, GOOGLE_REVIEWS } from '../data';

interface LocationSectionProps {
  lang: 'en' | 'ar';
}

export default function LocationSection({ lang }: LocationSectionProps) {
  const isEn = lang === 'en';

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}`;

  return (
    <section id="location" className="bg-stone-900 py-16 sm:py-24 text-stone-100 font-sans border-b border-amber-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            {isEn ? 'Visit Al Aqsa' : 'تفضل بزيارتنا'}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
            {isEn ? 'Our Dubai Branch & Location' : 'موقع فرعنا في دبي'}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto my-4 rounded-full" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {isEn 
              ? 'Find us in Warsan Fourth, Dubai. Click below to fetch real-time navigation routes or share coordinates with others.'
              : 'يسعدنا استقبالكم في فرعنا بالورسان الرابعة، المدينة العالمية المرحلة الثانية، دبي. تتوفر مواقف سيارات مريحة.'}
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Interactive embedded maps iframe */}
          <div className="lg:col-span-7 bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-xl min-h-[350px] relative">
            <iframe
              src={`https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al Aqsa Restaurant & Cafeteria Interactive Map"
              className="absolute inset-0 h-full w-full grayscale opacity-85 hover:grayscale-0 transition duration-500"
            />
          </div>

          {/* Location logistics info card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl relative overflow-hidden">
            {/* Ambient gold glow decoration */}
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />

            <div>
              <div className={`flex gap-3 items-start ${!isEn && 'flex-row-reverse text-right'}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-sans text-amber-400">
                    {isEn ? 'Street Address' : 'العنوان التفصيلي'}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-mono">
                    {RESTAURANT_INFO.coordinates.lat}, {RESTAURANT_INFO.coordinates.lng}
                  </p>
                  <p className="text-sm text-stone-200 font-sans font-medium leading-relaxed">
                    {isEn ? RESTAURANT_INFO.address : RESTAURANT_INFO.arabicAddress}
                  </p>
                </div>
              </div>

              <div className={`flex gap-3 items-start mt-8 ${!isEn && 'flex-row-reverse text-right'}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-sans text-amber-400">
                    {isEn ? 'Timings & Hours' : 'ساعات العمل'}
                  </h3>
                  <p className="text-sm text-stone-200 font-sans font-medium leading-relaxed">
                    {isEn ? RESTAURANT_INFO.hours : RESTAURANT_INFO.arabicHours}
                  </p>
                  <p className="text-xs text-stone-400">
                    {isEn ? 'Open 7 days a week, including UAE public holidays.' : 'نخدمكم طوال أيام الأسبوع بلا استثناء.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Maps Redirection buttons */}
            <div className="mt-8 pt-6 border-t border-stone-900 space-y-3">
              <span className="text-2xs font-bold uppercase tracking-widest text-stone-500 block">
                {isEn ? 'Get GPS Directions' : 'ملاحة وتوجيه GPS'}
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400/40 text-stone-200 px-4 py-3 font-semibold text-xs transition hover:scale-102 active:scale-95 cursor-pointer"
                  id="direct-google-maps"
                >
                  <Navigation className="h-4 w-4 text-amber-400" />
                  <span>{isEn ? 'Google Maps' : 'خرائط جوجل'}</span>
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400/40 text-stone-200 px-4 py-3 font-semibold text-xs transition hover:scale-102 active:scale-95 cursor-pointer"
                  id="direct-apple-maps"
                >
                  <ExternalLink className="h-4 w-4 text-amber-400" />
                  <span>{isEn ? 'Apple Maps' : 'خرائط آبل'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials & Reviews Board to add social proof */}
        <div id="reviews" className="border-t border-stone-800 pt-16 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold font-sans text-white">
              {isEn ? 'Loved By Our Guests' : 'آراء زبائننا الكرام'}
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              {isEn ? 'Real ratings from local foodies and visitors.' : 'تقييمات واقعية لرواد المطعم المحليين والزوار.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="bg-stone-950 p-6 rounded-2xl border border-stone-800/80 hover:border-amber-500/10 shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Stars indicators */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className={`h-4.5 w-4.5 ${
                          sIdx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-stone-300 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-900 flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-100">{review.name}</span>
                  <span className="text-3xs text-stone-500 font-mono">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
