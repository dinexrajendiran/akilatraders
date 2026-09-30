import React, { useState, useEffect, useRef } from 'react';
import { Camera, AlertTriangle, ShieldCheck, RefreshCw, Upload, Crosshair, Flame, Eye, MapPin, Zap } from 'lucide-react';
import { MOCK_SURVEILLANCE_TARGETS } from '../utils/mockData';
import { soundFx } from '../utils/soundEffects';

export default function SurveillanceFeed({ onTriggerHQAlert, dataset, activeTarget, setActiveTarget }) {
  const [visionMode, setVisionMode] = useState('optical'); // 'optical', 'thermal', 'nightvision'
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [useWebcam, setUseWebcam] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle webcam stream start/stop
  useEffect(() => {
    let stream = null;
    if (useWebcam) {
      navigator.mediaDevices?.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Webcam access denied or unavailable", err);
          alert("Webcam permission denied or unavailable. Falling back to drone simulation feeds.");
          setUseWebcam(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useWebcam]);

  // Handle target re-scan simulation
  const handleReScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    soundFx.playScanPing();

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setScanProgress(current);
      if (current % 30 === 0) {
        soundFx.playScanPing();
      }
      if (current >= 100) {
        clearInterval(interval);
        setIsScanning(false);

        // Check target match
        if (activeTarget && !activeTarget.isMatched) {
          soundFx.startHQAlarm();
          onTriggerHQAlert(activeTarget);
        } else if (activeTarget && activeTarget.isMatched) {
          soundFx.playAuthorizedSuccess();
        }
      }
    }, 150);
  };

  // Handle custom target image upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setUseWebcam(false);

      // Create a dynamic target profile for uploaded image
      const uploadedTarget = {
        id: `CUSTOM-UPLOAD-${Date.now()}`,
        title: `Custom Uploaded Target (${file.name})`,
        clothing: "Jungle / Camouflage Dress detected",
        isMatched: false, // Default to unmatched intruder test
        matchedProfile: null,
        matchConfidence: 18.4,
        latitude: 11.5900,
        longitude: 76.9100,
        locationName: "User Test Sector - Camouflage Scouting Zone",
        gridReference: "43Q UV 7900 9100",
        snapshot: url,
        droneName: "TEST-SCANNER-01",
        thermalSignature: "DETECTED",
        notes: "Custom uploaded suspect image analyzed against authorized personnel database."
      };

      setActiveTarget(uploadedTarget);
      handleReScan();
    }
  };

  // Draw face mesh landmarks canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw face grid mesh points
    ctx.strokeStyle = activeTarget?.isMatched ? '#00ff9d' : '#ff2a5f';
    ctx.lineWidth = 1;
    ctx.fillStyle = activeTarget?.isMatched ? '#00ff9d' : '#ff2a5f';

    const centerX = width / 2;
    const centerY = height / 2;

    // Outer reticle circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshair ticks
    ctx.beginPath();
    ctx.moveTo(centerX - 90, centerY); ctx.lineTo(centerX - 70, centerY);
    ctx.moveTo(centerX + 70, centerY); ctx.lineTo(centerX + 90, centerY);
    ctx.moveTo(centerX, centerY - 90); ctx.lineTo(centerX, centerY - 70);
    ctx.moveTo(centerX, centerY + 70); ctx.lineTo(centerX, centerY + 90);
    ctx.stroke();

    // Synthetic facial biometric mesh points
    const points = [
      { x: centerX - 25, y: centerY - 20 }, // Left eye
      { x: centerX + 25, y: centerY - 20 }, // Right eye
      { x: centerX, y: centerY },           // Nose bridge
      { x: centerX - 20, y: centerY + 30 }, // Mouth left
      { x: centerX + 20, y: centerY + 30 }, // Mouth right
      { x: centerX - 45, y: centerY - 40 }, // Forehead left
      { x: centerX + 45, y: centerY - 40 }, // Forehead right
      { x: centerX, y: centerY + 55 }        // Jawline
    ];

    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw mesh connection lines
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y); ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y); ctx.lineTo(points[0].x, points[0].y);
    ctx.moveTo(points[2].x, points[2].y); ctx.lineTo(points[3].x, points[3].y);
    ctx.lineTo(points[4].x, points[4].y); ctx.lineTo(points[2].x, points[2].y);
    ctx.stroke();

  }, [activeTarget, isScanning, visionMode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Primary Video Feed Monitor */}
      <div className="lg:col-span-2 space-y-4">
        
        <div className={`hud-panel relative overflow-hidden rounded-lg bg-black border ${
          activeTarget?.isMatched === false ? 'hud-panel-alert' : 'border-cyan-500/40'
        }`}>
          
          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 p-3 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between font-tech text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-hud text-cyan-400 font-bold tracking-wider">LIVE AI RECON FEED</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                {useWebcam ? 'LOCAL WEBCAM FEED' : activeTarget?.droneName || 'RECON-DRONE'}
              </span>
            </div>

            {/* Vision Mode Selector */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700 p-1 rounded">
              <button
                onClick={() => setVisionMode('optical')}
                className={`px-2 py-1 rounded text-[11px] font-hud flex items-center gap-1 ${
                  visionMode === 'optical' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'
                }`}
              >
                <Eye className="w-3 h-3" /> OPTICAL
              </button>

              <button
                onClick={() => setVisionMode('thermal')}
                className={`px-2 py-1 rounded text-[11px] font-hud flex items-center gap-1 ${
                  visionMode === 'thermal' ? 'bg-red-500 text-white font-bold' : 'text-slate-400'
                }`}
              >
                <Flame className="w-3 h-3" /> THERMAL (IR)
              </button>

              <button
                onClick={() => setVisionMode('nightvision')}
                className={`px-2 py-1 rounded text-[11px] font-hud flex items-center gap-1 ${
                  visionMode === 'nightvision' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'
                }`}
              >
                <Zap className="w-3 h-3" /> NVG GREEN
              </button>
            </div>
          </div>

          {/* Video Container with Filters */}
          <div className={`relative w-full aspect-video flex items-center justify-center overflow-hidden ${
            visionMode === 'thermal' ? 'hue-rotate-180 contrast-200 saturate-200' :
            visionMode === 'nightvision' ? 'sepia-100 hue-rotate-[100deg] contrast-150 brightness-125' : ''
          }`}>
            
            {useWebcam ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <img
                src={activeTarget?.snapshot || MOCK_SURVEILLANCE_TARGETS[0].snapshot}
                alt="Target Feed"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            )}

            {/* Scan Beam Effect */}
            <div className={activeTarget?.isMatched === false ? "scanline-beam-alert" : "scanline-beam"}></div>

            {/* Target Bounding Box & Canvas Landmark Mesh */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <canvas ref={canvasRef} width={360} height={260} className="z-10" />

              {/* HUD Bounding Box */}
              <div className={`target-box w-48 h-48 rounded border-2 z-10 flex flex-col justify-between p-2 ${
                activeTarget?.isMatched === false ? 'target-box-alert animate-pulse-red' : 'border-emerald-400'
              }`}>
                {/* Top Corner Details */}
                <div className="flex justify-between items-start text-[10px] font-hud font-bold">
                  <span className={activeTarget?.isMatched ? 'text-emerald-400' : 'text-red-400'}>
                    CONF: {isScanning ? `${scanProgress}%` : `${activeTarget?.matchConfidence || 14.2}%`}
                  </span>
                  <span className="bg-black/70 text-cyan-300 px-1 rounded">CAMO DETECTED</span>
                </div>

                {/* Bottom Match Status Tag */}
                <div className="text-center bg-black/85 backdrop-blur p-1 rounded border border-slate-700">
                  {isScanning ? (
                    <span className="text-yellow-400 font-hud text-xs font-bold animate-pulse">
                      SCANNING BIOMETRICS...
                    </span>
                  ) : activeTarget?.isMatched ? (
                    <span className="text-emerald-400 font-hud text-xs font-bold flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> AUTHORIZED PERSONNEL
                    </span>
                  ) : (
                    <span className="text-red-400 font-hud text-xs font-bold flex items-center justify-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" /> UNMATCHED INTRUDER
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom HUD Location Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs font-mono text-cyan-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>LOC: {activeTarget?.latitude}, {activeTarget?.longitude}</span>
                <span className="text-slate-400">({activeTarget?.locationName})</span>
              </div>
              <div>GRID: {activeTarget?.gridReference}</div>
            </div>
          </div>

          {/* Controls Bar beneath video */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <button onClick={handleReScan} disabled={isScanning} className="btn-hud">
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'SCANNING...' : 'RE-SCAN FACE'}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-hud text-yellow-400 border-yellow-500/50 hover:bg-yellow-500 hover:text-black"
              >
                <Upload className="w-4 h-4" />
                <span>UPLOAD CUSTOM TARGET IMAGE</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <button
              onClick={() => {
                soundFx.startHQAlarm();
                onTriggerHQAlert(activeTarget || MOCK_SURVEILLANCE_TARGETS[0]);
              }}
              className="btn-hud btn-hud-danger font-bold tracking-wider"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>MANUAL HQ ALERT DISPATCH</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel: Target Selection & Biometric Diagnostics */}
      <div className="space-y-4">
        
        {/* Preset Target Feeds */}
        <div className="hud-panel p-4">
          <h2 className="font-hud text-sm text-cyan-400 mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              SURVEILLANCE SECTOR TARGETS
            </span>
            <span className="text-xs text-slate-500 font-mono">SELECT DEMO</span>
          </h2>

          <div className="space-y-2">
            {MOCK_SURVEILLANCE_TARGETS.map((target) => (
              <div
                key={target.id}
                onClick={() => {
                  setUseWebcam(false);
                  setActiveTarget(target);
                  if (!target.isMatched) {
                    soundFx.startHQAlarm();
                    onTriggerHQAlert(target);
                  } else {
                    soundFx.playAuthorizedSuccess();
                  }
                }}
                className={`p-3 rounded border cursor-pointer transition-all flex items-center gap-3 ${
                  activeTarget?.id === target.id
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <img
                  src={target.snapshot}
                  alt={target.title}
                  className="w-12 h-12 rounded object-cover border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-hud font-bold truncate text-slate-200">{target.title}</h3>
                    <span className={`text-[10px] font-hud px-1.5 py-0.5 rounded ${
                      target.isMatched 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-red-950 text-red-400 border border-red-500/50'
                    }`}>
                      {target.isMatched ? 'OK MATCH' : 'UNMATCHED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-1">{target.clothing}</p>
                </div>
              </div>
            ))}

            {/* Webcam Live Toggle */}
            <div
              onClick={() => {
                setUseWebcam(true);
                handleReScan();
              }}
              className={`p-3 rounded border cursor-pointer transition-all flex items-center gap-3 ${
                useWebcam
                  ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-12 h-12 rounded bg-cyan-950 border border-cyan-500/50 flex items-center justify-center">
                <Camera className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-hud font-bold text-cyan-300">LIVE WEBCAM AI SCAN</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Use laptop camera to test real-time face matching</p>
              </div>
            </div>
          </div>
        </div>

        {/* Biometric Analysis Info Box */}
        <div className="hud-panel p-4 space-y-3 font-tech text-xs">
          <h3 className="font-hud text-xs text-yellow-400 border-b border-slate-800 pb-2">
            BIOMETRIC & CAMOUFLAGE RECOGNITION ANALYSIS
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Target ID:</span>
              <span className="text-cyan-300 font-mono">{activeTarget?.id || 'UNKNOWN'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Jungle Dress / Camouflage:</span>
              <span className="text-yellow-400 font-semibold">{activeTarget?.clothing || 'DETECTED'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Dataset Match Score:</span>
              <span className={`font-mono font-bold ${
                activeTarget?.isMatched ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {activeTarget?.matchConfidence || 14.2}% (Threshold: 75.0%)
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">HQ Alert Protocol Status:</span>
              <span className={`font-mono ${
                activeTarget?.isMatched ? 'text-emerald-400' : 'text-red-400 animate-pulse'
              }`}>
                {activeTarget?.isMatched ? 'STANDBY (NO ALERT NEEDED)' : 'HIGH PRIORITY DISPATCH'}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
