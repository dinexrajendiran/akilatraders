import React, { useState, useMemo, useEffect } from 'react';
import { getInitialProducts, DEFAULT_PRODUCTS } from './data/products';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import WhatsAppFloat from './components/WhatsAppFloat';
import TermsFooter from './components/TermsFooter';
import AdminLoginModal from './components/AdminLoginModal';
import EditProductModal from './components/EditProductModal';
import { ShoppingBag, Sparkles, Send, Trash2, ShieldCheck, Plus, RotateCcw } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState(getInitialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [cart, setCart] = useState({}); // { [productId]: quantity }
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // product object or null
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    try {
      localStorage.setItem('akila_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }, [products]);

  // Update quantity handler
  const handleUpdateQuantity = (productId, newQty) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQty;
      }
      return updated;
    });
  };

  // Clear cart
  const handleClearCart = () => {
    setCart({});
  };

  // Admin Handlers
  const handleSaveProduct = (productToSave) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === productToSave.id);
      if (exists) {
        return prev.map((p) => (p.id === productToSave.id ? productToSave : p));
      } else {
        return [productToSave, ...prev];
      }
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    // also remove from cart if present
    handleUpdateQuantity(productId, 0);
  };

  const handleResetToDefaultProducts = () => {
    if (confirm("Reset all products and prices to original 2026 Price List default values?")) {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.removeItem('akila_products_v2');
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      // Search query filter (matches English name, Tamil name, or Category)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.tamilName && item.tamilName.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        String(item.id) === q;

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Compute cart items array & totals
  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([idStr, qty]) => {
        const product = products.find((p) => p.id === Number(idStr));
        if (!product) return null;
        return { ...product, qty };
      })
      .filter(Boolean);
  }, [cart, products]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.qty, 0);
  }, [cartItems]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cartItems]);

  const totalOriginalRate = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.rate || item.price * 5) * item.qty, 0);
  }, [cartItems]);

  const totalSavings = totalOriginalRate - totalCartPrice;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalItemsCount={totalItemsCount}
        totalCartPrice={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onAdminLogout={() => setIsAdmin(false)}
        onAddNewProduct={() => {
          setEditingProduct(null);
          setIsEditModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pb-24">
        
        {/* Admin Bar Status Notification (if Admin logged in) */}
        {isAdmin && (
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 my-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-amber-300">Admin Mode Active (Arun Madhan): </span>
                <span className="text-amber-100/80">Click the pencil icon next to any product to edit prices or names.</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsEditModalOpen(true);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow transition"
              >
                <Plus className="w-4 h-4" /> Add Cracker
              </button>

              <button
                onClick={handleResetToDefaultProducts}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition"
                title="Reset to 2026 Price List Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset List
              </button>
            </div>
          </div>
        )}

        {/* Banner Alert Callout */}
        <div className="bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 my-6 text-center shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/40 shrink-0">
              <Sparkles className="w-6 h-6 text-amber-400 animate-spin-slow" />
            </div>
            <div className="text-left">
              <h3 className="font-extrabold text-amber-300 text-sm sm:text-base">
                Welcome to Akila Traders Online Wholesale Crackers Store!
              </h3>
              <p className="text-xs text-amber-100/80">
                Select your required quantities below & click Order via WhatsApp for instant bill & fast despatch.
              </p>
            </div>
          </div>
          
          <div className="shrink-0 bg-red-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl border border-amber-300/40 shadow">
            Direct Sivakasi Factory Rate
          </div>
        </div>

        {/* Product Listing */}
        <ProductList
          products={filteredProducts}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          isAdmin={isAdmin}
          onEditProduct={(product) => {
            setEditingProduct(product);
            setIsEditModalOpen(true);
          }}
        />

      </main>

      {/* Persistent Bottom Cart Bar (when cart has items) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t-2 border-amber-400 p-3 sm:p-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 text-slate-950 font-black px-3 py-1.5 rounded-xl text-sm hidden sm:flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>{totalItemsCount} Items</span>
              </div>
              
              <div>
                <div className="text-xs text-slate-400">Total Payable Amount:</div>
                <div className="text-lg sm:text-xl font-black text-amber-400">
                  ₹{totalCartPrice.toFixed(2)}
                  <span className="text-xs font-semibold text-emerald-400 ml-2">
                    (Saved ₹{totalSavings.toFixed(0)})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearCart}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 p-2.5 rounded-xl transition"
                title="Clear Cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-950/60 transition flex items-center gap-2 border border-emerald-300/40"
              >
                <Send className="w-4 h-4" />
                <span>CHECKOUT & ORDER ON WHATSAPP</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Cart Modal / Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => setIsAdmin(true)}
      />

      {/* Admin Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        productToEdit={editingProduct}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Floating Side WhatsApp Icon */}
      <WhatsAppFloat />

      {/* Footer */}
      <TermsFooter />

    </div>
  );
}
