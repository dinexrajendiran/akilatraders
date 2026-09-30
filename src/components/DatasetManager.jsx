import React, { useState } from 'react';
import { Database, UserPlus, CheckCircle, Search, ShieldCheck, Upload, Trash2, Key, Sparkles } from 'lucide-react';

export default function DatasetManager({ dataset, setDataset }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    rank: 'Captain',
    unit: 'Special Forces Unit',
    clearance: 'LEVEL 4 - RESTRICTED',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80'
  });

  const [testImage, setTestImage] = useState(null);
  const [testResult, setTestResult] = useState(null);

  // Filter dataset by search
  const filteredDataset = dataset.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.rank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new profile
  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfile.name) return;

    const created = {
      id: `DFX-${Math.floor(100 + Math.random() * 900)}`,
      name: newProfile.name,
      rank: newProfile.rank,
      unit: newProfile.unit,
      clearance: newProfile.clearance,
      image: newProfile.image,
      facialHash: `0x${Math.random().toString(16).substr(2, 10).toUpperCase()}`,
      status: "ACTIVE_DUTY",
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setDataset([created, ...dataset]);
    setShowAddModal(false);
    setNewProfile({
      name: '',
      rank: 'Captain',
      unit: 'Special Forces Unit',
      clearance: 'LEVEL 4 - RESTRICTED',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80'
    });
  };

  // Delete profile
  const handleDeleteProfile = (id) => {
    if (confirm("Are you sure you want to remove this profile from the authorized facial recognition dataset?")) {
      setDataset(dataset.filter(item => item.id !== id));
    }
  };

  // Handle dataset image test
  const handleTestImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTestImage(url);
      
      // Simulate dataset comparison
      setTimeout(() => {
        // 50% chance match vs unmatched test
        const matched = dataset[0]; // Capt Rajesh Kumar
        setTestResult({
          matched: true,
          profile: matched,
          confidence: 96.4
        });
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="hud-panel p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-hud text-lg text-cyan-400 font-bold flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            AUTHORIZED PERSONNEL FACIAL RECOGNITION DATASET
          </h2>
          <p className="text-xs text-slate-400 font-tech mt-0.5">
            Registered biometric profiles used by DefenderX AI model to match faces in jungle camouflage dress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ID, Name, Rank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 pl-9 pr-4 py-2 rounded focus:outline-none focus:border-cyan-400 w-64"
            />
          </div>

          <button onClick={() => setShowAddModal(true)} className="btn-hud">
            <UserPlus className="w-4 h-4" />
            <span>ADD NEW AUTHORIZED PROFILE</span>
          </button>
        </div>
      </div>

      {/* Dataset Grid Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDataset.map((profile) => (
          <div key={profile.id} className="hud-panel p-4 relative group hover:border-cyan-400/80 transition-all">
            
            {/* Delete Icon */}
            <button
              onClick={() => handleDeleteProfile(profile.id)}
              className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80"
              title="Remove from dataset"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Profile Avatar & Badge */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-black" />
                </span>
              </div>

              <h3 className="font-hud text-sm font-bold text-slate-100">{profile.name}</h3>
              <p className="text-xs text-cyan-400 font-tech font-semibold mt-0.5">{profile.rank}</p>

              <div className="w-full border-t border-slate-800 my-3"></div>

              {/* Attributes */}
              <div className="w-full text-[11px] font-mono text-slate-400 space-y-1 text-left">
                <div className="flex justify-between">
                  <span>MILITARY ID:</span>
                  <span className="text-slate-200 font-bold">{profile.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>UNIT:</span>
                  <span className="text-slate-300 truncate max-w-[130px]">{profile.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>CLEARANCE:</span>
                  <span className="text-yellow-400">{profile.clearance}</span>
                </div>
                <div className="flex justify-between">
                  <span>HASH:</span>
                  <span className="text-cyan-400 text-[10px]">{profile.facialHash}</span>
                </div>
              </div>

              <div className="w-full mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1 text-[10px] text-emerald-400 font-hud">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DATASET ENROLLED</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
          <div className="hud-panel max-w-md w-full p-6 space-y-4">
            <h3 className="font-hud text-base text-cyan-400 font-bold border-b border-slate-800 pb-2">
              ENROLL NEW AUTHORIZED PERSONNEL TO DATASET
            </h3>

            <form onSubmit={handleAddProfile} className="space-y-3 font-tech text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Major Vikram Rathore"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Rank / Designation:</label>
                <input
                  type="text"
                  required
                  value={newProfile.rank}
                  onChange={(e) => setNewProfile({ ...newProfile, rank: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Regiment / Unit:</label>
                <input
                  type="text"
                  required
                  value={newProfile.unit}
                  onChange={(e) => setNewProfile({ ...newProfile, unit: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Photo Image URL:</label>
                <input
                  type="text"
                  required
                  value={newProfile.image}
                  onChange={(e) => setNewProfile({ ...newProfile, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-hud text-xs"
                >
                  CANCEL
                </button>

                <button type="submit" className="btn-hud">
                  ENROLL TO DATASET
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
