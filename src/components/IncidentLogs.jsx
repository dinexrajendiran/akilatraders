import React, { useState } from 'react';
import { Activity, Download, Filter, ShieldAlert, CheckCircle, AlertTriangle, Search } from 'lucide-react';

export default function IncidentLogs({ logs }) {
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'AUTHORIZED', 'UNMATCHED_ALERT'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterStatus === 'ALL' || log.status === filterStatus;
    const matchesSearch = log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportReport = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `defenderx_threat_report_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="hud-panel p-4 space-y-4">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="font-hud text-base text-cyan-400 font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            INCIDENT DETECTION & HQ ALERT HISTORICAL LOGS
          </h2>
          <p className="text-xs text-slate-400 font-tech">
            Auditable security trail of all target recognition events and emergency dispatches to HQ.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded font-tech text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2 py-1 rounded text-[11px] ${filterStatus === 'ALL' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}
            >
              ALL LOGS
            </button>
            <button
              onClick={() => setFilterStatus('UNMATCHED_ALERT')}
              className={`px-2 py-1 rounded text-[11px] ${filterStatus === 'UNMATCHED_ALERT' ? 'bg-red-500 text-white font-bold' : 'text-slate-400'}`}
            >
              HQ ALERTS
            </button>
            <button
              onClick={() => setFilterStatus('AUTHORIZED')}
              className={`px-2 py-1 rounded text-[11px] ${filterStatus === 'AUTHORIZED' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'}`}
            >
              AUTHORIZED
            </button>
          </div>

          <button onClick={exportReport} className="btn-hud">
            <Download className="w-4 h-4" />
            <span>EXPORT PROJECT REPORT</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-tech text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-hud text-[11px] uppercase border-b border-slate-800">
            <tr>
              <th className="p-3">Log ID</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Target Identified</th>
              <th className="p-3">Face Match Status</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Location Coordinates</th>
              <th className="p-3">HQ Dispatch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-3 font-mono text-cyan-400 font-bold">{log.id}</td>
                <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                <td className="p-3 font-bold text-slate-200">{log.targetName}</td>
                <td className="p-3">
                  {log.status === 'AUTHORIZED' ? (
                    <span className="badge-status badge-green">
                      <CheckCircle className="w-3.5 h-3.5" /> AUTHORIZED
                    </span>
                  ) : (
                    <span className="badge-status badge-red">
                      <AlertTriangle className="w-3.5 h-3.5" /> UNMATCHED (INTRUDER)
                    </span>
                  )}
                </td>
                <td className="p-3 font-mono font-bold">{log.confidence}</td>
                <td className="p-3 font-mono text-slate-400">{log.location}</td>
                <td className="p-3">
                  {log.hqNotified ? (
                    <span className="text-red-400 font-hud font-bold text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-500/40">
                      ALERT DISPATCHED TO HQ
                    </span>
                  ) : (
                    <span className="text-slate-500 font-hud text-[10px]">STANDBY</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
