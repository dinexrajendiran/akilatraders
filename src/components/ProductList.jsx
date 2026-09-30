import React from 'react';
import { Plus, Minus, Check, Sparkles, Flame, Edit3, Trash2 } from 'lucide-react';

export default function ProductList({ 
  products, 
  cart, 
  onUpdateQuantity,
  isAdmin,
  onEditProduct
}) {
  if (products.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-12 text-center my-8">
        <Flame className="w-12 h-12 text-amber-500/40 mx-auto mb-3 animate-pulse" />
        <h3 className="text-xl font-bold text-amber-200">No Crackers Found</h3>
        <p className="text-amber-100/60 text-sm mt-1">Try adjusting your search query or selecting another category.</p>
      </div>
    );
  }

  // Group products by category
  const categoriesMap = products.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8 my-6">
      {Object.entries(categoriesMap).map(([categoryName, items]) => (
        <div 
          key={categoryName} 
          className="bg-slate-900/70 border border-amber-500/25 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Category Header */}
          <div className="bg-gradient-to-r from-red-950 via-amber-950 to-slate-900 px-4 md:px-5 py-3 border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm md:text-base font-bold text-amber-300 tracking-wide uppercase">
                {categoryName}
              </h2>
            </div>
            <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              {items.length} Items
            </span>
          </div>

          {/* Items List */}
          <div className="divide-y divide-amber-500/10">
            {items.map((product) => {
              const qty = cart[product.id] || 0;
              const subtotal = qty * product.price;
              const savingsPerUnit = product.rate - product.price;

              return (
                <div 
                  key={product.id}
                  className={`p-3 md:p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    qty > 0 ? 'bg-amber-500/10 border-l-4 border-l-amber-400' : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Left Info: Product Thumbnail, S.No, Names */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    
                    {/* S.No Badge */}
                    <span className="bg-slate-950 border border-amber-500/30 text-amber-400 text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow">
                      {product.id}
                    </span>

                    {/* Product Image Thumbnail */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-amber-500/30 shrink-0 bg-slate-950 shadow">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                    </div>

                    {/* Name & Tamil Name */}
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-amber-100 flex flex-wrap items-center gap-1.5 truncate">
                        <span>{product.name}</span>
                        {qty > 0 && (
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/40 flex items-center gap-1 font-semibold">
                            <Check className="w-3 h-3" /> Added ({qty})
                          </span>
                        )}
                      </h3>
                      {product.tamilName && (
                        <p className="text-[11px] sm:text-xs text-amber-300/80 font-serif truncate">
                          {product.tamilName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Middle & Right Info: Admin Edit + Rate vs 80% Discount Price + Quantity */}
                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    
                    {/* Price Info */}
                    <div className="text-left sm:text-right">
                      <div className="flex items-center gap-2 sm:justify-end">
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.rate.toFixed(2)}
                        </span>
                        <span className="text-base sm:text-lg font-black text-amber-400">
                          ₹{product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold">
                        80% OFF (Save ₹{savingsPerUnit.toFixed(0)})
                      </div>
                    </div>

                    {/* Admin Edit Pencil Button */}
                    {isAdmin && (
                      <button
                        onClick={() => onEditProduct(product)}
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 p-2 rounded-xl transition shrink-0"
                        title="Edit Item (Admin)"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-slate-950 border border-amber-500/30 rounded-xl p-1 shadow-inner shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(product.id, Math.max(0, qty - 1))}
                        disabled={qty === 0}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={qty === 0 ? '' : qty}
                        placeholder="0"
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          onUpdateQuantity(product.id, isNaN(val) ? 0 : Math.max(0, val));
                        }}
                        className="w-10 sm:w-12 text-center bg-transparent text-amber-300 font-extrabold text-xs sm:text-sm focus:outline-none"
                      />

                      <button
                        onClick={() => onUpdateQuantity(product.id, qty + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold flex items-center justify-center transition shadow"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* Row Subtotal if qty > 0 */}
                  {qty > 0 && (
                    <div className="text-right sm:w-24 border-t sm:border-t-0 sm:border-l border-amber-500/20 pt-2 sm:pt-0 sm:pl-3">
                      <div className="text-[10px] text-amber-200/60 uppercase">Subtotal</div>
                      <div className="text-xs sm:text-sm font-black text-amber-300">
                        ₹{subtotal.toFixed(2)}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
}
