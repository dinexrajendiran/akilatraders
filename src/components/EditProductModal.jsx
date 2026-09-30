import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/products';
import { X, Save, Trash2, Image, Sparkles } from 'lucide-react';

export default function EditProductModal({
  isOpen,
  onClose,
  productToEdit,
  onSaveProduct,
  onDeleteProduct
}) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    tamilName: '',
    category: 'CRACKERS',
    rate: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        id: productToEdit.id,
        name: productToEdit.name || '',
        tamilName: productToEdit.tamilName || '',
        category: productToEdit.category || 'CRACKERS',
        rate: productToEdit.rate || 0,
        price: productToEdit.price || 0,
        image: productToEdit.image || ''
      });
    } else {
      setFormData({
        id: Date.now(),
        name: '',
        tamilName: '',
        category: 'CRACKERS',
        rate: 100,
        price: 20,
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80'
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const isNewItem = !productToEdit;

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto compute 80% discount price if rate changes
      if (field === 'rate' && !isNaN(Number(value))) {
        updated.price = Math.round(Number(value) * 0.2);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProduct({
      ...formData,
      id: Number(formData.id),
      rate: Number(formData.rate),
      price: Number(formData.price)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-amber-950 to-slate-900 p-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-200">
              {isNewItem ? 'Add New Cracker Item' : `Edit Item #${formData.id}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-thin">
          
          {/* English Name */}
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              English Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. 4&quot; Gold Lakshmi"
              className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Tamil Name */}
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              Tamil Product Name (தமிழ் பெயர்)
            </label>
            <input
              type="text"
              value={formData.tamilName}
              onChange={(e) => handleChange('tamilName', e.target.value)}
              placeholder="e.g. 4&quot; கோல்டு லட்சுமி"
              className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400 font-serif"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
            >
              {CATEGORIES.filter(c => c !== 'ALL').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Pricing: Rate vs 80% Discount Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-amber-200 mb-1">
                Original Rate (MRP ₹)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                required
                value={formData.rate}
                onChange={(e) => handleChange('rate', e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-200 mb-1">
                Discount Price (80% Off ₹)
              </label>
              <input
                type="number"
                step="1"
                min="0"
                required
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              Image URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400 text-ellipsis overflow-hidden"
              />
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-8 h-8 rounded-lg object-cover border border-amber-500/40 shrink-0" 
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-500/20">
            {!isNewItem && onDeleteProduct && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${formData.name}"?`)) {
                    onDeleteProduct(formData.id);
                    onClose();
                  }
                }}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl text-xs transition"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
