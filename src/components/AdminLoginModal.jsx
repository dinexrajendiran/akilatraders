import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username.trim() === 'admin' && password === 'arunmadhan') {
      onLoginSuccess();
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Invalid Username or Password! (ID: admin, Pass: arunmadhan)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-amber-950 to-slate-900 p-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-200 uppercase tracking-wider">
              Admin Login (Akila Traders)
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-400">Enter Arun Madhan admin credentials to manage prices & products.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              Admin ID / Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-400 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-400 font-mono"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-amber-300/40 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>LOGIN AS ADMIN</span>
          </button>

        </form>

      </div>
    </div>
  );
}
