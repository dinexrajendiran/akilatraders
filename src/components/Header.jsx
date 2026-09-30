import React from 'react';
import { STORE_INFO, CATEGORIES } from '../data/products';
import { Search, Phone, MapPin, Sparkles, ShoppingBag, Lock, ShieldCheck, LogOut, Plus } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  totalItemsCount,
  totalCartPrice,
  onOpenCart,
  isAdmin,
  onOpenAdminLogin,
  onAdminLogout,
  onAddNewProduct
}) {
  return (
    <header className="bg-gradient-to-b from-red-950 via-amber-950 to-slate-950 border-b border-amber-500/30 sticky top-0 z-40 shadow-2xl backdrop-blur-md">
      {/* Top Blessing Bar & Admin Status */}
      <div className="bg-red-900/90 text-amber-200 py-1.5 px-4 text-xs font-semibold tracking-wider flex items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{STORE_INFO.tamilHeader}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        </div>

        {/* Admin Login / Logout status */}
        <div className="hidden sm:flex items-center gap-2">
          {isAdmin ? (
            <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin: Arun Madhan</span>
              <button 
                onClick={onAdminLogout}
                className="text-red-400 hover:text-red-300 ml-1 underline flex items-center gap-1 font-bold"
                title="Logout Admin"
              >
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="text-amber-300/80 hover:text-amber-200 flex items-center gap-1 text-[11px] bg-slate-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full transition"
            >
              <Lock className="w-3 h-3 text-amber-400" /> Admin Login
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        {/* Main Branding Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          {/* Logo & Store Name */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Winged Pegasus Logo Image */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img 
                src={STORE_INFO.logo} 
                alt="Akila Traders Logo" 
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-400 shadow-xl"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 tracking-tight drop-shadow-md">
                {STORE_INFO.name}
              </h1>
              <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl font-medium">
                {STORE_INFO.tagline}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-amber-300/80 pt-0.5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" /> {STORE_INFO.address}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Numbers & 80% Offer Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* 80% OFF Flash Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-red-600 p-0.5 rounded-2xl shadow-lg shadow-red-950/50">
              <div className="bg-slate-950 px-3 py-1.5 rounded-[14px] text-center border border-amber-400/30 flex items-center gap-2">
                <div className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded-lg shadow animate-pulse">
                  80% OFF
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">Diwali 2026</div>
                  <div className="text-[11px] text-white font-semibold">Factory Direct Rates</div>
                </div>
              </div>
            </div>

            {/* Phone Numbers & Cart Button */}
            <div className="flex flex-col items-center sm:items-end gap-1.5">
              
              {/* Phone Pills Grid */}
              <div className="flex flex-wrap items-center justify-center gap-1">
                {STORE_INFO.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              {/* View Cart & Admin Add Product Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                {isAdmin && (
                  <button
                    onClick={onAddNewProduct}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center gap-1 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                )}

                <button
                  onClick={onOpenCart}
                  className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-950/50 transition flex items-center gap-2 border border-emerald-400/30 flex-1 sm:flex-none justify-center"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="text-xs sm:text-sm">Cart</span>
                  {totalItemsCount > 0 && (
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full shadow">
                      {totalItemsCount}
                    </span>
                  )}
                  {totalCartPrice > 0 && (
                    <span className="text-amber-200 text-xs font-bold border-l border-emerald-400/40 pl-2">
                      ₹{totalCartPrice.toFixed(0)}
                    </span>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Controls Bar: Search & Category Filter */}
        <div className="mt-4 space-y-3">
          
          {/* Search Box & Mobile Admin Button */}
          <div className="relative max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-amber-400/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crackers (e.g. Lakshmi, Flower Pot, Sparkler, Bijili, Cake)..."
                className="w-full pl-10 pr-16 py-2 bg-slate-900/90 border border-amber-500/30 rounded-xl text-amber-100 placeholder-amber-200/40 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1.5 text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30 hover:bg-amber-900"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="sm:hidden">
              {isAdmin ? (
                <button 
                  onClick={onAdminLogout}
                  className="bg-red-500/20 text-red-300 border border-red-500/40 p-2 rounded-xl text-xs font-bold"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={onOpenAdminLogin}
                  className="bg-slate-900 text-amber-300 border border-amber-500/40 p-2 rounded-xl text-xs"
                  title="Admin Login"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Pills Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/20 pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-md font-bold'
                    : 'bg-slate-900/80 text-amber-200/80 hover:text-amber-100 hover:bg-slate-800 border-amber-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

      </div>
    </header>
  );
}
