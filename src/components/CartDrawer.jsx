import React, { useState } from 'react';
import { STORE_INFO } from '../data/products';
import { X, Trash2, Send, ShoppingCart, User, Phone, MapPin, Building, Truck, AlertCircle, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart
}) {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    transportNotes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isOpen) return null;

  // Calculate totals
  const totalOriginalRate = cartItems.reduce((acc, item) => acc + (item.rate * item.qty), 0);
  const totalPayablePrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalSavings = totalOriginalRate - totalPayablePrice;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleInputChange = (field, value) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!customerDetails.name.trim()) errors.name = "Full Name is required";
    if (!customerDetails.phone.trim() || customerDetails.phone.length < 10) errors.phone = "Valid 10-digit Phone Number is required";
    if (!customerDetails.address.trim()) errors.address = "Delivery Address is required";
    if (!customerDetails.city.trim()) errors.city = "City / District is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrderWhatsApp = () => {
    if (!validateForm()) return;

    // Build formatted message
    let message = `*NEW CRACKERS ORDER - ${STORE_INFO.name}*\n`;
    message += `------------------------------------\n`;
    message += `*CUSTOMER DETAILS:*\n`;
    message += `👤 *Name:* ${customerDetails.name}\n`;
    message += `📞 *Phone:* ${customerDetails.phone}\n`;
    message += `📍 *Address:* ${customerDetails.address}\n`;
    message += `🏙️ *City:* ${customerDetails.city} ${customerDetails.pincode ? `(${customerDetails.pincode})` : ''}\n`;
    if (customerDetails.transportNotes) {
      message += `🚚 *Transport/Notes:* ${customerDetails.transportNotes}\n`;
    }
    message += `------------------------------------\n`;
    message += `*ORDERED CRACKERS LIST:* (${totalItemsCount} items)\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.qty} x ₹${item.price} = ₹${(item.qty * item.price).toFixed(2)}\n`;
    });

    message += `------------------------------------\n`;
    message += `*Original Rate Total:* ₹${totalOriginalRate.toFixed(2)}\n`;
    message += `*80% Discount Savings:* -₹${totalSavings.toFixed(2)}\n`;
    message += `*TOTAL PAYABLE AMOUNT:* *₹${totalPayablePrice.toFixed(2)}*\n`;
    message += `------------------------------------\n`;
    message += `Please confirm my order and send payment & despatch details. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_INFO.primaryWhatsapp}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-slate-900 border-l border-amber-500/30 flex flex-col h-full shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-amber-950 to-slate-900 p-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-amber-200">Your Order Cart</h2>
            <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full">
              {totalItemsCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-amber-500/20">
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Add Crackers Now
              </button>
            </div>
          ) : (
            <>
              {/* Itemized Cart List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Selected Items ({cartItems.length})
                  </h3>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>

                <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl divide-y divide-amber-500/10 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex-1">
                        <div className="font-bold text-amber-100">{item.name}</div>
                        <div className="text-slate-400">
                          ₹{item.price} x {item.qty} = <span className="text-amber-300 font-bold">₹{(item.qty * item.price).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/30 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                          className="w-6 h-6 text-amber-300 hover:bg-amber-950 rounded flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-amber-200">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                          className="w-6 h-6 text-amber-300 hover:bg-amber-950 rounded flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Original Total Rate:</span>
                  <span className="line-through">₹{totalOriginalRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>80% Discount Savings:</span>
                  <span>-₹{totalSavings.toFixed(2)}</span>
                </div>
                <div className="border-t border-amber-500/30 pt-2 flex justify-between items-center text-sm font-black text-amber-300">
                  <span>Total Payable:</span>
                  <span className="text-base text-amber-400">₹{totalPayablePrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-amber-200">Customer Details (for Invoice)</h3>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs text-amber-100/80 font-medium mb-1">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full bg-slate-950 border ${formErrors.name ? 'border-red-500' : 'border-amber-500/30'} rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-amber-100/80 font-medium mb-1">
                    WhatsApp Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-slate-950 border ${formErrors.phone ? 'border-red-500' : 'border-amber-500/30'} rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs text-amber-100/80 font-medium mb-1">
                    Delivery Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows="2"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Door No, Street Name, Area..."
                    className={`w-full bg-slate-950 border ${formErrors.address ? 'border-red-500' : 'border-amber-500/30'} rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400`}
                  />
                  {formErrors.address && (
                    <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.address}
                    </p>
                  )}
                </div>

                {/* City & Pincode */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-amber-100/80 font-medium mb-1">
                      City / District <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g. Madurai"
                      className={`w-full bg-slate-950 border ${formErrors.city ? 'border-red-500' : 'border-amber-500/30'} rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400`}
                    />
                    {formErrors.city && (
                      <p className="text-[10px] text-red-400 mt-0.5">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-amber-100/80 font-medium mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={customerDetails.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="625001"
                      className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Transport Notes */}
                <div>
                  <label className="block text-xs text-amber-100/80 font-medium mb-1">
                    Transport Preference / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerDetails.transportNotes}
                    onChange={(e) => handleInputChange('transportNotes', e.target.value)}
                    placeholder="Preferred lorry transport, landmark..."
                    className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

              </div>
            </>
          )}

        </div>

        {/* Footer Action */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-amber-500/30 space-y-2">
            <button
              onClick={handlePlaceOrderWhatsApp}
              className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-950/60 transition flex items-center justify-center gap-2 border border-emerald-400/40"
            >
              <Send className="w-5 h-5" />
              <span>SEND ORDER VIA WHATSAPP (₹{totalPayablePrice.toFixed(0)})</span>
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Clicking will open WhatsApp with your itemized bill pre-filled!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
