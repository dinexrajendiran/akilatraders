import React from 'react';
import { STORE_INFO, CATEGORIES } from '../data/products';
import {
  Search,
  Phone,
  MapPin,
  Sparkles,
  ShoppingBag,
  Lock,
  ShieldCheck,
  LogOut,
  Plus
} from 'lucide-react';

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
    <header
      className="
        bg-gradient-to-b from-red-950 via-amber-950 to-slate-950
        border-b border-amber-500/30
        relative md:sticky md:top-0
        z-40
        shadow-2xl
        backdrop-blur-md
      "
    >

      {/* =====================================================
          TOP BLESSING BAR
      ====================================================== */}
      <div
        className="
          bg-red-900/90
          text-amber-200
          py-1
          px-2 sm:px-3
          text-[10px] sm:text-xs
          font-semibold
          tracking-wide
          flex items-center justify-between
          border-b border-amber-500/20
          min-h-[28px]
        "
      >
        <div className="flex items-center gap-1 mx-auto sm:mx-0 text-center">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />

          <span className="truncate">
            {STORE_INFO.tamilHeader}
          </span>

          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
        </div>

        {/* ADMIN STATUS - DESKTOP */}
        <div className="hidden sm:flex items-center gap-2">

          {isAdmin ? (
            <div
              className="
                flex items-center gap-1.5
                bg-amber-500/20
                text-amber-300
                border border-amber-500/40
                px-2 py-0.5
                rounded-full
                text-[10px]
              "
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />

              <span>Admin: Arun Madhan</span>

              <button
                onClick={onAdminLogout}
                className="
                  text-red-400
                  hover:text-red-300
                  ml-1
                  underline
                  flex items-center gap-1
                  font-bold
                "
                title="Logout Admin"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="
                text-amber-300/80
                hover:text-amber-200
                flex items-center gap-1
                text-[10px]
                bg-slate-950/60
                border border-amber-500/30
                px-2 py-0.5
                rounded-full
                transition
              "
            >
              <Lock className="w-3 h-3 text-amber-400" />
              Admin Login
            </button>
          )}

        </div>
      </div>


      {/* =====================================================
          MAIN HEADER
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">

        {/* ===================================================
            BRANDING + OFFER + CONTACT
        ==================================================== */}
        <div
          className="
            flex flex-col
            md:flex-row
            items-center
            justify-between
            gap-1.5 md:gap-2
            text-center md:text-left
          "
        >

          {/* =================================================
              LOGO + STORE INFORMATION
          ================================================== */}
          <div
            className="
              flex
              flex-col sm:flex-row
              items-center
              gap-1 sm:gap-2
              min-w-0
            "
          >

            {/* LOGO */}
            <div className="relative group shrink-0">

              <div
                className="
                  absolute
                  -inset-0.5
                  sm:-inset-1
                  bg-gradient-to-r
                  from-amber-400
                  to-yellow-600
                  rounded-full
                  blur
                  opacity-60
                  group-hover:opacity-100
                  transition
                  duration-300
                "
              />

              <img
                src={STORE_INFO.logo}
                alt="Akila Traders Logo"
                className="
                  relative
                  w-10 h-10
                  sm:w-14 sm:h-14
                  md:w-16 md:h-16
                  rounded-full
                  object-cover
                  border-2
                  border-amber-400
                  shadow-xl
                "
              />

            </div>


            {/* STORE INFORMATION */}
            <div className="space-y-0 min-w-0">

              <h1
                className="
                  text-lg
                  sm:text-2xl
                  md:text-3xl
                  font-black
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-amber-300
                  via-yellow-200
                  to-amber-400
                  tracking-tight
                  drop-shadow-md
                  leading-none
                "
              >
                {STORE_INFO.name}
              </h1>

              <p
                className="
                  text-amber-100/90
                  text-[9px]
                  sm:text-[11px]
                  md:text-xs
                  max-w-xl
                  font-medium
                  leading-tight
                  mt-0.5
                "
              >
                {STORE_INFO.tagline}
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  md:justify-start
                  gap-1
                  text-[8px]
                  sm:text-[10px]
                  text-amber-300/80
                  pt-0
                "
              >
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 shrink-0" />

                  <span className="truncate">
                    {STORE_INFO.address}
                  </span>
                </span>
              </div>

            </div>

          </div>


          {/* =================================================
              OFFER + CONTACT + CART
          ================================================== */}
          <div
            className="
              flex
              flex-col sm:flex-row
              items-center
              gap-1.5
              w-full md:w-auto
            "
          >

            {/* =================================================
                80% OFFER
            ================================================== */}
            <div
              className="
                bg-gradient-to-r
                from-amber-500
                to-red-600
                p-0.5
                rounded-lg
                shadow-lg
                shadow-red-950/50
              "
            >
              <div
                className="
                  bg-slate-950
                  px-2
                  py-1
                  rounded-[8px]
                  text-center
                  border border-amber-400/30
                  flex items-center
                  gap-1.5
                "
              >

                <div
                  className="
                    bg-red-600
                    text-white
                    font-black
                    text-xs sm:text-sm
                    px-1.5
                    py-0.5
                    rounded-md
                    shadow
                    whitespace-nowrap
                  "
                >
                  80% OFF
                </div>

                <div className="text-left">

                  <div
                    className="
                      text-[7px]
                      sm:text-[8px]
                      text-amber-300
                      uppercase
                      tracking-widest
                      font-bold
                    "
                  >
                    Diwali 2026
                  </div>

                  <div
                    className="
                      text-[8px]
                      sm:text-[9px]
                      text-white
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    Factory Direct Rates
                  </div>

                </div>

              </div>
            </div>


            {/* =================================================
                CONTACT + CART
            ================================================== */}
            <div
              className="
                flex
                flex-col
                items-center sm:items-end
                gap-1
                w-full sm:w-auto
              "
            >

              {/* PHONE NUMBERS */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-1
                  max-w-full
                "
              >
                {STORE_INFO.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="
                      bg-amber-500/15
                      hover:bg-amber-500/30
                      text-amber-300
                      border border-amber-500/40
                      px-1.5
                      py-0.5
                      rounded-md
                      text-[8px]
                      sm:text-[9px]
                      font-bold
                      transition
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <Phone className="w-2.5 h-2.5 text-amber-400" />

                    <span>{phone}</span>
                  </a>
                ))}
              </div>


              {/* =================================================
                  BUTTONS
              ================================================== */}
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  w-full sm:w-auto
                  justify-center
                "
              >

                {/* ADD ITEM */}
                {isAdmin && (
                  <button
                    onClick={onAddNewProduct}
                    className="
                      bg-amber-500
                      hover:bg-amber-400
                      text-slate-950
                      font-bold
                      px-2
                      py-1
                      rounded-lg
                      text-[9px]
                      transition
                      flex
                      items-center
                      gap-1
                      shadow
                    "
                  >
                    <Plus className="w-3 h-3" />
                    Add Item
                  </button>
                )}


                {/* CART */}
                <button
                  onClick={onOpenCart}
                  className="
                    relative
                    bg-gradient-to-r
                    from-emerald-600
                    to-teal-600
                    hover:from-emerald-500
                    hover:to-teal-500
                    text-white
                    font-bold
                    px-3
                    py-1.5
                    rounded-lg
                    shadow-lg
                    shadow-emerald-950/50
                    transition
                    flex
                    items-center
                    gap-1.5
                    border border-emerald-400/30
                    w-full sm:w-auto
                    justify-center
                  "
                >

                  <ShoppingBag className="w-3.5 h-3.5 text-white" />

                  <span className="text-[11px] sm:text-xs">
                    Cart
                  </span>

                  {totalItemsCount > 0 && (
                    <span
                      className="
                        bg-amber-400
                        text-slate-950
                        text-[9px]
                        font-black
                        px-1.5
                        py-0.5
                        rounded-full
                        shadow
                      "
                    >
                      {totalItemsCount}
                    </span>
                  )}

                  {totalCartPrice > 0 && (
                    <span
                      className="
                        text-amber-200
                        text-[9px]
                        sm:text-[10px]
                        font-bold
                        border-l
                        border-emerald-400/40
                        pl-1.5
                      "
                    >
                      ₹{totalCartPrice.toFixed(0)}
                    </span>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            SEARCH + CATEGORIES
        ====================================================== */}
        <div className="mt-1.5 sm:mt-2 space-y-1.5">


          {/* =================================================
              SEARCH
          ================================================== */}
          <div
            className="
              relative
              max-w-xl
              mx-auto
              flex
              items-center
              gap-1.5
            "
          >

            <div className="relative flex-1">

              <Search
                className="
                  absolute
                  left-2.5
                  top-1.5
                  w-4
                  h-4
                  text-amber-400/60
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crackers..."
                className="
                  w-full
                  pl-8
                  pr-14
                  py-1.5
                  bg-slate-900/90
                  border border-amber-500/30
                  rounded-lg
                  text-amber-100
                  placeholder-amber-200/40
                  text-xs
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-400/50
                  focus:border-amber-400
                  transition
                  shadow-inner
                "
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="
                    absolute
                    right-1.5
                    top-1
                    text-[9px]
                    bg-amber-950
                    text-amber-300
                    px-1.5
                    py-0.5
                    rounded-md
                    border border-amber-500/30
                    hover:bg-amber-900
                  "
                >
                  Clear
                </button>
              )}

            </div>


            {/* =================================================
                MOBILE ADMIN
            ================================================== */}
            <div className="sm:hidden shrink-0">

              {isAdmin ? (
                <button
                  onClick={onAdminLogout}
                  className="
                    bg-red-500/20
                    text-red-300
                    border border-red-500/40
                    px-2
                    py-1.5
                    rounded-lg
                    text-[9px]
                    font-bold
                  "
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={onOpenAdminLogin}
                  className="
                    bg-slate-900
                    text-amber-300
                    border border-amber-500/40
                    p-1.5
                    rounded-lg
                    text-xs
                  "
                  title="Admin Login"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

            </div>

          </div>


          {/* =================================================
              CATEGORY PILLS
          ================================================== */}
          <div
            className="
              flex
              items-center
              gap-1
              overflow-x-auto
              pb-0.5
              scrollbar-thin
              scrollbar-thumb-amber-500/20
            "
          >

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  whitespace-nowrap
                  px-2
                  py-0.5
                  rounded-md
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                  transition
                  border
                  ${
                    selectedCategory === cat
                      ? `
                        bg-gradient-to-r
                        from-amber-500
                        to-amber-600
                        text-slate-950
                        border-amber-300
                        shadow-md
                        font-bold
                      `
                      : `
                        bg-slate-900/80
                        text-amber-200/80
                        hover:text-amber-100
                        hover:bg-slate-800
                        border-amber-500/20
                      `
                  }
                `}
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
