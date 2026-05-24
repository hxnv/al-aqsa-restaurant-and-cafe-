import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Phone, User, MessageSquare, ClipboardCheck, Store } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data';

interface OrderBasketProps {
  lang: 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateCartQty: (index: number, qtyChange: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

export default function OrderBasket({
  lang,
  isOpen,
  onClose,
  cart,
  updateCartQty,
  removeFromCart,
  clearCart,
}: OrderBasketProps) {
  const isEn = lang === 'en';
  
  // Form states
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    customerPhone: '',
    orderType: 'pickup',
    notes: '',
  });

  const [copied, setCopied] = useState(false);

  const cartTotal = cart.reduce((total, item) => {
    const price = item.menuItem.secondaryPrice 
      ? item.menuItem.secondaryPrice[item.selectedPriceIndex || 0].price 
      : item.menuItem.price;
    return total + price * item.quantity;
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Format the text message for WhatsApp
  const formattedWhatsAppText = () => {
    let orderList = '';
    cart.forEach((item, index) => {
      const optionLabel = item.menuItem.secondaryPrice 
        ? ` (${item.menuItem.secondaryPrice[item.selectedPriceIndex || 0].label})` 
        : '';
      const price = item.menuItem.secondaryPrice 
        ? item.menuItem.secondaryPrice[item.selectedPriceIndex || 0].price 
        : item.menuItem.price;
      
      orderList += `${index + 1}. *${item.menuItem.name}*${optionLabel}  
   _Qty:_ ${item.quantity}x @ AED ${price} total = *AED ${price * item.quantity}*\n`;
    });

    const isDelivery = orderDetails.orderType === 'delivery';
    const typeLabel = isEn 
      ? orderDetails.orderType.toUpperCase() 
      : orderDetails.orderType === 'delivery' ? 'توصيل' : orderDetails.orderType === 'pickup' ? 'استلام من المطعم' : 'سفري/محلي';

    return `*Al Aqsa Restaurant Order Submission* 🍽️
-----------------------------------------
👤 *Name:* ${orderDetails.customerName || 'Guest'}
📞 *Phone:* ${orderDetails.customerPhone || 'Not Specified'}
📍 *Type:* ${typeLabel}
📝 *Special Notes:* ${orderDetails.notes || 'None'}

🛒 *Items Ordered:*
-----------------------------------------
${orderList}
-----------------------------------------
🧮 *Total Amount:* *AED ${cartTotal}*
⏱️ _Created on Al Aqsa Interactive Web App_ 
📱 _Please confirm preparation time._`;
  };

  const getWhatsAppLink = () => {
    const textencoded = encodeURIComponent(formattedWhatsAppText());
    // Direct WhatsApp send to restaurant number 0551162600 in UAE formats to +971551162600
    return `https://wa.me/971551162600?text=${textencoded}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedWhatsAppText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 overflow-hidden" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-950 text-stone-100 border-l border-stone-800 shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="px-5 py-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold font-sans text-amber-400">
                {isEn ? 'Your Basket Summary' : 'ملخص سلة مشترياتك'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-stone-100 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="h-16 w-16 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-500">
                  <Store className="h-8 w-8 text-amber-500/60" />
                </div>
                <h3 className="text-base font-bold text-stone-300">
                  {isEn ? 'Your basket is empty' : 'السلة فارغة حالياً'}
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  {isEn 
                    ? 'Explore our premium grills, salads, shawarma and add items to begin ordering!'
                    : 'ابدأ بتصفح القائمة المتنوعة وتفضيل الأكلات لطلبها مباشرة عبر الواتساب.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 text-stone-950 font-bold px-4 py-2.5 text-xs hover:bg-amber-400 transition cursor-pointer"
                >
                  {isEn ? 'Back to Menu' : 'الرجوع للقائمة'}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-900 pb-2">
                  <span>{cart.length} {isEn ? 'dishes added' : 'مأكولات تمت إضافتها'}</span>
                  <button
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>{isEn ? 'Clear Basket' : 'تفريغ السلة'}</span>
                  </button>
                </div>

                <div className="space-y-3.5 divide-y divide-stone-900">
                  {cart.map((item, idx) => {
                    const price = item.menuItem.secondaryPrice 
                      ? item.menuItem.secondaryPrice[item.selectedPriceIndex || 0].price 
                      : item.menuItem.price;
                    const optionLabel = item.menuItem.secondaryPrice 
                      ? item.menuItem.secondaryPrice[item.selectedPriceIndex || 0].label 
                      : null;

                    return (
                      <div key={idx} className="pt-3.5 first:pt-0 flex justify-between items-start gap-3">
                        <div className="flex-1 space-y-0.5">
                          <div className="flex justify-between font-sans text-sm font-bold text-stone-100">
                            <span className="truncate max-w-[180px]">{item.menuItem.name}</span>
                            <span className="text-right text-stone-300">{item.menuItem.arabicName}</span>
                          </div>
                          
                          {optionLabel && (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-stone-900 text-2xs text-amber-400 font-semibold border border-stone-800">
                              {optionLabel}
                            </span>
                          )}

                          <div className="flex items-center gap-2 pt-1.5">
                            {/* Decrease Button */}
                            <button
                              onClick={() => updateCartQty(idx, -1)}
                              className="h-6 w-6 rounded-md bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:bg-stone-800 hover:text-stone-100 cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold text-amber-400 px-1">{item.quantity}</span>
                            
                            {/* Increase Button */}
                            <button
                              onClick={() => updateCartQty(idx, 1)}
                              className="h-6 w-6 rounded-md bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:bg-stone-800 hover:text-stone-100 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>

                            <button
                              onClick={() => removeFromCart(idx)}
                              className="text-red-400/70 hover:text-red-400 pl-4 text-2xs uppercase tracking-wide cursor-pointer"
                            >
                              {isEn ? 'Remove' : 'حذف'}
                            </button>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end">
                          <span className="text-sm font-black text-amber-400">
                            AED {price * item.quantity}
                          </span>
                          <span className="text-3xs text-stone-500 font-mono">
                            {item.quantity}x @ AED {price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Logistics Checkout Form */}
                <div className="border-t border-stone-800 pt-5 mt-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-amber-500" />
                    <span>{isEn ? 'Order Credentials' : 'بيانات طلب التوصيل'}</span>
                  </h4>

                  {/* Customer Name */}
                  <div className="space-y-1">
                    <label className="text-2xs font-bold text-stone-400 block">
                      {isEn ? 'Full Name' : 'اسم المشتري'} <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={orderDetails.customerName}
                      onChange={handleInputChange}
                      placeholder={isEn ? 'Your Name' : 'اسمك الكريم'}
                      className="w-full text-xs bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div className="space-y-1">
                    <label className="text-2xs font-bold text-stone-400 block">
                      {isEn ? 'Contact Mobile' : 'رقم جوال للتواصل'}
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={orderDetails.customerPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 055XXXXXXX"
                      className="w-full text-xs bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Service Type */}
                  <div className="space-y-1">
                    <label className="text-2xs font-bold text-stone-400 block">
                      {isEn ? 'Dining/Collection Method' : 'طريقة الاستلام'}
                    </label>
                    <select
                      name="orderType"
                      value={orderDetails.orderType}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="pickup">{isEn ? 'Pickup from Warsan Restaurant' : 'استلام من المطعم (الورسان)'}</option>
                      <option value="delivery">{isEn ? 'Delivery to My Location' : 'توصيل للموقع'}</option>
                      <option value="dinein">{isEn ? 'Dine-In' : 'محلي / سفري'}</option>
                    </select>
                  </div>

                  {/* Special Notes */}
                  <div className="space-y-1">
                    <label className="text-2xs font-bold text-stone-400 block flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {isEn ? 'Special Instructions / Notes' : 'ملاحظات خاصة (مثلاً: حار زيادة)'}
                    </label>
                    <textarea
                      name="notes"
                      value={orderDetails.notes}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder={isEn ? 'No onions, extra spicy sauce...' : 'بدون بصل، زيادة ثومية...'}
                      className="w-full text-xs bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer controls & Costing bar */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950/9 w-full space-y-4">
              {/* Cost break lines */}
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>{isEn ? 'Subtotal' : 'المجموع الفرعي'}</span>
                  <span>AED {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isEn ? 'Delivery Charge' : 'رسوم التوصيل'}</span>
                  <span className="text-emerald-400">{isEn ? 'Free (Warsan)' : 'مجاني (الورسان)'}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-50 border-t border-stone-900 pt-2 selection:bg-amber-500">
                  <span className="text-stone-300">{isEn ? 'Grand Total' : 'الإجمالي الكلي'}</span>
                  <span className="text-amber-400">AED {cartTotal}</span>
                </div>
              </div>

              {/* Placing order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 border border-stone-700 hover:border-amber-400/40 bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold rounded-xl text-xs cursor-pointer transition active:scale-95"
                  title="Copy formatted text to send in SMS or copy"
                >
                  <ClipboardCheck className={`h-4 w-4 ${copied ? 'text-emerald-400' : 'text-stone-400'}`} />
                  <span>{copied ? (isEn ? 'Copied Details!' : 'تم نسخ الطلب!') : (isEn ? 'Copy Text Order' : 'نسخ نص الطلب')}</span>
                </button>

                {/* WhatsApp Trigger with secure target blank link */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-tr from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-stone-950 font-black rounded-xl text-xs hover:scale-102 transition active:scale-95 cursor-pointer shadow-md shadow-brand/10 select-none text-center"
                  id="checkout-whatsapp-btn"
                >
                  <Send className="h-4 w-4" />
                  <span>{isEn ? 'Send on WhatsApp' : 'إرسال عبر الواتساب'}</span>
                </a>
              </div>

              <div className="text-center text-[10px] text-stone-500">
                {isEn 
                  ? '⚠️ WhatsApp links redirect safely. Ensure you click "Send" inside Google/WhatsApp portal.'
                  : '⚠️ روابط الواتساب تفتح بأمان. تأكد من إتمام الطلب في شاشة المحادثة بضغط زر الإرسال.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
