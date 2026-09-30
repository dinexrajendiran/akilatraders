import React, { useState } from 'react';
import { AlertTriangle, Radio, MapPin, ShieldAlert, CheckCircle2, Send, VolumeX, Navigation } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function HQAlertModal({ alertData, onClose }) {
  const [dispatchStatus, setDispatchStatus] = useState(null); // 'qrt', 'drone', 'acknowledged'

  if (!alertData) return null;

  const handleSilenceAlarm = () => {
    soundFx.stopHQAlarm();
    onClose();
  };

  const handleDispatchQRT = () => {
    soundFx.playDispatchRadio();
    setDispatchStatus('qrt');
    setTimeout(() => {
      soundFx.stopHQAlarm();
      onClose();
    }, 2000);
  };

  const handleDispatchDrone = () => {
    soundFx.playDispatchRadio();
    setDispatchStatus('drone');
    setTimeout(() => {
      soundFx.stopHQAlarm();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4">
      <div className="hud-panel hud-panel-alert max-w-2xl w-full p-6 space-y-6 relative overflow-hidden animate-pulse-red">
        
        {/* Flashing Top Banner */}
        <div className="bg-red-950/90 border border-red-500/80 p-3 rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-500 animate-bounce" />
            <div>
              <h2 className="font-hud text-base font-black text-red-400 tracking-wider">
                CRITICAL EMERGENCY: UNMATCHED SUBJECT IN JUNGLE DRESS
              </h2>
              <p className="text-xs text-red-300 font-tech">
                ALERT TRANSMITTED TO HEAD QUARTERS (HQ COMMAND CENTER)
              </p>
            </div>
          </div>
          <span className="font-hud text-xs bg-red-600 text-white px-2.5 py-1 rounded font-bold tracking-widest animate-pulse">
            HIGH THREAT
          </span>
        </div>

        {/* HQ Connection Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-tech text-xs bg-slate-950 p-4 rounded border border-red-900/50">
          
          {/* Target Snapshot & Biometrics */}
          <div className="flex gap-3">
            <img
              src={alertData.snapshot}
              alt="Intruder Snapshot"
              className="w-24 h-24 rounded object-cover border-2 border-red-500 shadow-[0_0_15px_rgba(255,42,95,0.5)]"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-hud bg-red-950 text-red-400 border border-red-600 px-1.5 py-0.5 rounded">
                DATASET MATCH FAILED
              </span>
              <p className="text-slate-200 font-bold text-sm mt-1">UNIDENTIFIED INTRUDER</p>
              <p className="text-slate-400 text-xs">Attire: <span className="text-yellow-400">{alertData.clothing}</span></p>
              <p className="text-slate-400 text-xs">Match Score: <span className="text-red-400 font-mono font-bold">{alertData.matchConfidence}%</span></p>
            </div>
          </div>

          {/* Location & GPS Info */}
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
            <div className="flex items-center gap-2 text-cyan-400 font-hud text-xs font-bold">
              <MapPin className="w-4 h-4 text-red-400 animate-pulse" />
              TARGET GPS COORDINATES
            </div>

            <div className="bg-slate-900/90 p-2 rounded border border-cyan-900 font-mono text-[11px] text-cyan-300 space-y-1">
              <div className="flex justify-between">
                <span>LAT / LONG:</span>
                <span className="font-bold text-white">{alertData.latitude}° N, {alertData.longitude}° E</span>
              </div>
              <div className="flex justify-between">
                <span>SECTOR:</span>
                <span className="text-yellow-400">{alertData.locationName}</span>
              </div>
              <div className="flex justify-between">
                <span>GRID REF:</span>
                <span className="text-slate-300">{alertData.gridReference}</span>
              </div>
            </div>
          </div>

        </div>

        {/* HQ Alert Dispatch Status */}
        <div className="bg-slate-950/80 p-3 rounded border border-slate-800 flex items-center justify-between text-xs font-tech">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">HQ TRANSMISSION STATUS:</span>
            <span className="text-emerald-400 font-bold font-mono">DISPATCHED TO HQ GENERAL COMMAND</span>
          </div>

          {dispatchStatus && (
            <div className="text-cyan-400 font-hud font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              {dispatchStatus === 'qrt' ? 'QRT TASK FORCE DISPATCHED!' : 'TACTICAL DRONE DEPLOYED!'}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleSilenceAlarm}
            className="btn-hud bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
          >
            <VolumeX className="w-4 h-4" />
            <span>ACKNOWLEDGE & SILENCE ALARM</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDispatchDrone}
              className="btn-hud text-cyan-400 border-cyan-500/60 hover:bg-cyan-500 hover:text-black font-bold"
            >
              <Navigation className="w-4 h-4" />
              <span>DEPLOY INTERCEPTOR DRONE</span>
            </button>

            <button
              onClick={handleDispatchQRT}
              className="btn-hud btn-hud-danger font-bold text-white tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>DISPATCH QUICK REACTION TEAM (QRT)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
