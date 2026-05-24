import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MenuBrowser from './components/MenuBrowser';
import LocationSection from './components/LocationSection';
import OrderBasket from './components/OrderBasket';
import Footer from './components/Footer';

import { MenuItem, CartItem } from './types';

export default function App() {
  // Localization: 'en' for English, 'ar' for Arabic. Defaults to English.
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  // Interactive Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('al_aqsa_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cached cart', e);
      }
    }
  }, []);

  // Save cart to LocalStorage on change
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('al_aqsa_cart', JSON.stringify(newCart));
  };

  const addToCart = (item: MenuItem, selectedPriceIndex?: number) => {
    const existingIndex = cart.findIndex(
      (cartItem) =>
        cartItem.menuItem.id === item.id &&
        cartItem.selectedPriceIndex === selectedPriceIndex
    );

    if (existingIndex > -1) {
      // Item exists, increment quantity
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      saveCartToStorage(newCart);
    } else {
      // Append new item
      const newCart = [...cart, { menuItem: item, quantity: 1, selectedPriceIndex }];
      saveCartToStorage(newCart);
    }

    // Auto open basket drawer to give immediate feedback
    setIsCartOpen(true);
  };

  const updateCartQty = (index: number, qtyChange: number) => {
    const newCart = [...cart];
    newCart[index].quantity += qtyChange;

    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    saveCartToStorage(newCart);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  // Calculations for headers
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  const cartTotal = cart.reduce((total, item) => {
    const price = item.menuItem.secondaryPrice 
      ? item.menuItem.secondaryPrice[item.selectedPriceIndex || 0].price 
      : item.menuItem.price;
    return total + price * item.quantity;
  }, 0);

  const isEn = lang === 'en';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950 duration-200">
      
      {/* Premium Header */}
      <Header
        lang={lang}
        setLang={setLang}
        cartCount={cartCount}
        cartTotal={cartTotal}
        toggleCart={() => setIsCartOpen((prev) => !prev)}
      />

      <main className="flex-grow">
        {/* Dynamic Image Hero Intro Slider */}
        <HeroSection lang={lang} />

        {/* Categories, Search & Culinary browse grid */}
        <MenuBrowser lang={lang} addToCart={addToCart} />

        {/* Dubai Coordinates Map coordinates locator & ratings testimonials */}
        <LocationSection lang={lang} />
      </main>

      {/* Cart Drawer */}
      <OrderBasket
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateCartQty={updateCartQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {/* Premium Islamic Geometry motif styled footer */}
      <Footer lang={lang} />
    </div>
  );
}
