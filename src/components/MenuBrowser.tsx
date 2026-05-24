import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Leaf, Plus, Percent, CheckCircle, ChevronDown } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { CATEGORIES, MENU_ITEMS } from '../data';
import * as LucideIcons from 'lucide-react';

interface MenuBrowserProps {
  lang: 'en' | 'ar';
  addToCart: (item: MenuItem, selectedPriceIndex?: number) => void;
}

export default function MenuBrowser({ lang, addToCart }: MenuBrowserProps) {
  const isEn = lang === 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  
  // Quick filters
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterPopular, setFilterPopular] = useState(false);

  // Secondary price selector states for items that have multiple sizes/options
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});

  const handleSizeChange = (itemId: string, index: number) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: index }));
  };

  // Dynamically render category icons using Lucide
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Coffee': return <LucideIcons.Coffee className={className} />;
      case 'Sparkles': return <LucideIcons.Sparkles className={className} />;
      case 'Flame': return <LucideIcons.Flame className={className} />;
      case 'ChefHat': return <LucideIcons.ChefHat className={className} />;
      case 'FolderHeart': return <LucideIcons.Heart className={className} />;
      case 'Cookie': return <LucideIcons.Cookie className={className} />;
      case 'Utensils': return <LucideIcons.Utensils className={className} />;
      case 'Leaf': return <LucideIcons.Leaf className={className} />;
      case 'Soup': return <LucideIcons.Soup className={className} />;
      case 'GlassWater': return <LucideIcons.GlassWater className={className} />;
      default: return <LucideIcons.Layers className={className} />;
    }
  };

  // Filtered menu logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query match (English name, Arabic name, description)
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const nameMatches = item.name.toLowerCase().includes(query);
        const arabicMatches = item.arabicName.includes(query);
        const descMatches = item.description.toLowerCase().includes(query);
        const arabicDescMatches = item.arabicDescription?.includes(query) || false;
        if (!nameMatches && !arabicMatches && !descMatches && !arabicDescMatches) {
          return false;
        }
      }

      // Quick tags filters
      if (filterSpicy && !item.isSpicy) return false;
      if (filterVeg && !item.isVegetarian) return false;
      if (filterPopular && !item.isPopular) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, filterSpicy, filterVeg, filterPopular]);

  return (
    <section id="menu" className="bg-stone-50 py-16 sm:py-24 font-sans text-stone-900 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {isEn ? 'Savor the Flavor' : 'نكهات أصيلة لا مثيل لها'}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-950 sm:text-4xl mt-2 font-sans">
            {isEn ? 'Our Signature Menu' : 'قائمة المأكولات والمشروبات'}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto my-4 rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base">
            {isEn 
              ? 'Browse our extensive culinary collections. Everything from authentic woodfired pastries to live charcoal grills.'
              : 'تصفح تشكيلتنا الفاخرة من مشاوي الصاج والفرن الحجري والوجبات اليومية الطازجة والمشروبات الباردة والساخنة.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sm:p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-stone-400 pointer-events-none">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? 'Search kebab, falafel, shawarma, manakeesh...' : 'ابحث عن كباب، شاورما، فلافل، منقوشة...'}
                className="w-full text-sm rounded-xl pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white transition"
              />
            </div>

            {/* Quick Badges Filter Grid */}
            <div className={`flex flex-wrap gap-2 items-center justify-start ${!isEn && 'flex-row-reverse'}`}>
              <button
                onClick={() => setFilterPopular((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition select-none ${
                  filterPopular 
                    ? 'bg-amber-100 text-amber-800 border-amber-300' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>{isEn ? 'Popular Stars' : 'الأكثر طلباً'}</span>
              </button>

              <button
                onClick={() => setFilterSpicy((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition select-none ${
                  filterSpicy 
                    ? 'bg-red-50 text-red-800 border-red-200' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Flame className="h-3.5 w-3.5 text-red-600" />
                <span>{isEn ? 'Spicy Hot' : 'حار سبايسي'}</span>
              </button>

              <button
                onClick={() => setFilterVeg((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition select-none ${
                  filterVeg 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Leaf className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isEn ? 'Vegetarian' : 'نباتي هيلثي'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex overflow-x-auto py-2 px-1 gap-2.5 scrollbar-hide select-none" style={{ scrollbarWidth: 'none' }}>
            {/* Category: All */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-none flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold border transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 border-stone-900 text-amber-400 font-extrabold shadow-md'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
              }`}
            >
              <LucideIcons.MenuSquare className="h-4.5 w-4.5" />
              <span>{isEn ? 'Full Menu' : 'الكل'}</span>
            </button>

            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-none flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold border transition cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-stone-900 border-stone-900 text-amber-400 font-extrabold shadow-md'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                {renderIcon(category.icon, 'h-4.5 w-4.5')}
                <span>{isEn ? category.name : category.arabicName}</span>
              </button>
            ))}
          </div>
          {/* Active Category Description banner */}
          {selectedCategory !== 'all' && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 max-w-4xl mx-auto text-stone-700 text-xs sm:text-sm text-center">
              {isEn ? (
                <>
                  💡 <b className="text-amber-900">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}:
                  </b> {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                </>
              ) : (
                <>
                  💡 <b className="text-amber-900">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.arabicName}:
                  </b> {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                </>
              )}
            </div>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 max-w-lg mx-auto p-8">
            <LucideIcons.SearchX className="h-12 w-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-700 font-bold text-lg">{isEn ? 'No items found' : 'لم يتم العثور على طعام'}</p>
            <p className="text-stone-500 text-sm mt-1">
              {isEn 
                ? 'Try adjusting your search query or turning off some filters.' 
                : 'حاول تغيير شروط البحث أو إيقاف تشغيل فلاتر المواد الغذائية.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterPopular(false);
                setFilterSpicy(false);
                setFilterVeg(false);
              }}
              className="mt-4 text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
            >
              {isEn ? 'Reset All Filters' : 'إعادة ضبط الفلاتر'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const hasSizes = !!item.secondaryPrice;
              const selectedSizeIndex = selectedSizes[item.id] !== undefined ? selectedSizes[item.id] : 0;
              const currentPrice = hasSizes 
                ? item.secondaryPrice![selectedSizeIndex].price 
                : item.price;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Header line labels (Spicy, Popular, Vegetarian Icons) */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1">
                        {item.isPopular && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-extrabold text-amber-800 border border-amber-200">
                            <LucideIcons.Sparkles className="h-2.5 w-2.5 fill-current" />
                            <span>{isEn ? 'BESTSELLER' : 'محبوب الطعام'}</span>
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-extrabold text-red-800 border border-red-200 animate-pulse">
                            <LucideIcons.Flame className="h-2.5 w-2.5 fill-current" />
                            <span>{isEn ? 'SPICY' : 'حار'}</span>
                          </span>
                        )}
                        {item.isVegetarian && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800 border border-emerald-200">
                            <LucideIcons.Leaf className="h-2.5 w-2.5 fill-current" />
                            <span>{isEn ? 'VEGGIE' : 'نباتي'}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase font-mono text-stone-400 tracking-wider">
                        #{item.id}
                      </span>
                    </div>

                    {/* Titles (Dual Language) */}
                    <div className="flex justify-between items-start gap-2 pt-1">
                      <h3 className="font-sans text-base font-bold text-stone-950 group-hover:text-amber-600 transition duration-300">
                        {item.name}
                      </h3>
                      <span className="font-sans text-right font-semibold text-stone-800 text-sm whitespace-nowrap">
                        {item.arabicName}
                      </span>
                    </div>

                    {/* Description Text */}
                    <p className="mt-2 text-stone-600 text-xs leading-relaxed line-clamp-2">
                      {isEn ? item.description : item.arabicDescription}
                    </p>
                  </div>

                  {/* Pricing and Action Drawer */}
                  <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-3">
                    
                    {/* Size Selector if secondary prices exist */}
                    {hasSizes && (
                      <div className="flex flex-col gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/60">
                        <span className="text-[10px] uppercase font-bold text-stone-500 tracking-widest flex items-center gap-1">
                          <LucideIcons.Layers className="h-3 w-3" />
                          {isEn ? 'Select Size / Option' : 'اختر الحجم / الخيار'}
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {item.secondaryPrice!.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSizeChange(item.id, idx)}
                              className={`px-2 py-1.5 rounded-lg text-2xs font-bold text-center border transition select-none cursor-pointer ${
                                selectedSizeIndex === idx
                                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                              }`}
                            >
                              <span className="block truncate">{option.label}</span>
                              <span className="block text-[10px] font-extrabold">AED {option.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price & Add to Cart Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col justify-center">
                        <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                          {isEn ? 'Price' : 'السعر'}
                        </span>
                        <span className="text-lg font-black text-stone-950">
                          AED {currentPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(item, hasSizes ? selectedSizeIndex : undefined)}
                        className="flex h-11 items-center justify-center gap-1 px-4 rounded-xl bg-stone-950 text-amber-400 hover:bg-amber-900 group-hover:ring-2 group-hover:ring-amber-400/20 active:scale-95 transition duration-300 font-bold cursor-pointer text-xs"
                        id={`btn-add-${item.id}`}
                      >
                        <Plus className="h-4 w-4" />
                        <span>{isEn ? 'Add' : 'أضف'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
