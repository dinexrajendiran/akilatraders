import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Radio, Shield, Compass, Target } from 'lucide-react';

export default function TacticalMap({ target }) {
  const canvasRef = useRef(null);

  // HQ Base Station Location (Fixed Command HQ)
  const hqLocation = {
    name: "DEFENDER-X CENTRAL HQ COMMAND BASE",
    latitude: 11.6200,
    longitude: 76.8500,
    grid: "43Q UV 8200 8500"
  };

  const targetLat = target?.latitude || 11.5824;
  const targetLng = target?.longitude || 76.9211;

  // Calculate approximate distance between HQ and Target (Haversine formula)
  const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const distanceKm = calculateDistanceKm(hqLocation.latitude, hqLocation.longitude, targetLat, targetLng);

  // Draw Tactical Vector GIS Radar Map on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const renderMap = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Dark Tactical Background Grid
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Concentric sector radar rings
      [80, 160, 240, 320].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
        ctx.stroke();
      });

      // HQ Marker (Blue Pin)
      const hqX = centerX - 120;
      const hqY = centerY - 50;

      ctx.fillStyle = '#00f3ff';
      ctx.beginPath();
      ctx.arc(hqX, hqY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 15;

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Orbitron';
      ctx.fillText('HQ BASE COMMAND', hqX - 45, hqY - 14);

      // Target Marker (Red Pin for Intruder, Green for Authorized)
      const targetX = centerX + 100;
      const targetY = centerY + 60;
      const isUnmatched = target?.isMatched === false;

      ctx.fillStyle = isUnmatched ? '#ff2a5f' : '#00ff9d';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = isUnmatched ? '#ff2a5f' : '#00ff9d';
      ctx.shadowBlur = 20;

      // Pulsing Ring around Target
      ctx.beginPath();
      ctx.arc(targetX, targetY, 18 + Math.sin(angle * 5) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = isUnmatched ? '#ff2a5f' : '#00ff9d';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = isUnmatched ? '#ff2a5f' : '#00ff9d';
      ctx.font = 'bold 11px Orbitron';
      ctx.fillText(isUnmatched ? 'INTRUDER SPOT (HQ ALERT)' : 'AUTHORIZED UNIT', targetX - 50, targetY + 28);

      // Connection Line HQ to Target
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.moveTo(hqX, hqY);
      ctx.lineTo(targetX, targetY);
      ctx.strokeStyle = isUnmatched ? 'rgba(255, 42, 95, 0.6)' : 'rgba(0, 255, 157, 0.6)';
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Distance tag midway
      const midX = (hqX + targetX) / 2;
      const midY = (hqY + targetY) / 2;
      ctx.fillStyle = '#0a101d';
      ctx.fillRect(midX - 30, midY - 10, 60, 20);
      ctx.strokeStyle = '#00f3ff';
      ctx.strokeRect(midX - 30, midY - 10, 60, 20);
      ctx.fillStyle = '#00f3ff';
      ctx.font = '10px Rajdhani';
      ctx.fillText(`${distanceKm} km`, midX - 18, midY + 4);

      // Radar Rotating Sweep Beam
      angle += 0.015;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      
      const grad = ctx.createConicGradient(0, 0, 0);
      grad.addColorStop(0, 'rgba(0, 243, 255, 0.25)');
      grad.addColorStop(0.15, 'rgba(0, 243, 255, 0.05)');
      grad.addColorStop(0.3, 'transparent');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(renderMap);
    };

    renderMap();

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, distanceKm]);

  return (
    <div className="hud-panel p-4 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-cyan-400" />
          <h2 className="font-hud text-sm text-cyan-400 font-bold">
            TACTICAL GIS RADAR & LOCATION SPOTTING MAP
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          GRID SECTOR ALPHA-4
        </span>
      </div>

      {/* Vector Radar Canvas */}
      <div className="relative w-full aspect-[16/9] rounded overflow-hidden border border-cyan-900">
        <canvas ref={canvasRef} width={700} height={390} className="w-full h-full object-cover" />
      </div>

      {/* Location Telemetry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-tech">
        
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400 block text-[11px]">HQ BASE LOCATION:</span>
          <span className="text-cyan-300 font-mono font-bold">{hqLocation.latitude}° N, {hqLocation.longitude}° E</span>
        </div>

        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400 block text-[11px]">TARGET DETECTED SPOTTED AT:</span>
          <span className={`font-mono font-bold ${target?.isMatched === false ? 'text-red-400' : 'text-emerald-400'}`}>
            {targetLat}° N, {targetLng}° E
          </span>
        </div>

        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400 block text-[11px]">DISTANCE TO HQ COMMAND:</span>
          <span className="text-yellow-400 font-mono font-bold">{distanceKm} KM (RANGE: SECTOR 4)</span>
        </div>

      </div>

    </div>
  );
}
