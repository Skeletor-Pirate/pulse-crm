import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Mail, 
  Kanban, 
  Cpu, 
  Settings, 
  Upload, 
  Download, 
  Flame,
  CheckCircle2,
  Layers,
  Send,
  Volume2,
  VolumeX,
  Search
} from 'lucide-react';
import { playTick, isSoundEnabled, setSoundEnabled } from '../utils/soundHelper';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenImport, 
  onExportExcel, 
  onLaunchSwarm,
  onOpenOutbox,
  outboxCount = 0,
  systemStatus,
  leadsCount,
  enrichedCount,
  isSwarmActive
}) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const tabs = [
    { id: 'leads', label: 'Leads & CRM', icon: Layers, badge: leadsCount },
    { id: 'swarm', label: 'Scraper Swarm', icon: Bot, isPulse: isSwarmActive },
    { id: 'outreach', label: 'Outreach Studio', icon: Mail },
    { id: 'kanban', label: 'Pipeline Kanban', icon: Kanban },
    { id: 'n8n', label: 'n8n & Automations', icon: Cpu },
  ];

  const isOllamaOnline = systemStatus?.aiProviders?.ollama?.available;

  const handleTabClick = (tabId) => {
    playTick();
    setActiveTab(tabId);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playTick();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070a12]/85 backdrop-blur-2xl">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand (Apple style minimal mark) */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-[1px] shadow-lg shadow-blue-500/25 active:scale-95 transition-transform">
              <div className="w-full h-full bg-[#070a12] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse-subtle" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                  Pulse<span className="text-blue-500 font-extrabold">CRM</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block tracking-normal font-medium">
                Autonomous Lead Scraper Swarm & Outreach Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Apple Segmented Control) */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/[0.08] shadow-inner">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 relative active:scale-[0.98] ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${tab.isPulse ? 'text-emerald-400 animate-spin-slow' : ''}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                      isActive ? 'bg-blue-800 text-blue-100' : 'bg-white/10 text-zinc-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.isPulse && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            
            {/* System Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] text-[11px] shadow-inner">
              <span className={`w-2 h-2 rounded-full ${isOllamaOnline ? 'bg-emerald-400 badge-glow' : 'bg-blue-400 badge-glow-blue'}`} />
              <span className="text-zinc-200 font-mono text-[11px] font-medium">
                {isOllamaOnline ? 'Ollama AI Online' : 'Zero-Key Engine'}
              </span>
            </div>

            {/* Outbox Drawer Button */}
            <button
              onClick={() => { playTick(); onOpenOutbox(); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/60 hover:bg-slate-800/80 text-zinc-200 border border-white/[0.08] transition shadow-sm active:scale-[0.98]"
              title="View Dispatched Emails & Sent Ledger"
            >
              <Send className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Outbox</span>
              {outboxCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                  {outboxCount}
                </span>
              )}
            </button>

            {/* Import Button */}
            <button
              onClick={() => { playTick(); onOpenImport(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.09] text-zinc-200 border border-white/[0.08] hover:border-white/[0.15] transition shadow-sm active:scale-[0.98]"
              title="Import Excel or CSV sheet"
            >
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Import Excel</span>
            </button>

            {/* Launch Swarm Button */}
            <button
              onClick={() => { playTick(); onLaunchSwarm(); }}
              disabled={isSwarmActive}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition shadow-lg active:scale-[0.98] ${
                isSwarmActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-not-allowed'
                  : 'btn-glow-emerald'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${isSwarmActive ? 'animate-bounce text-amber-300' : 'text-emerald-200'}`} />
              <span>{isSwarmActive ? 'Swarm Running...' : 'Launch Swarm'}</span>
            </button>

            {/* Utility Capsule: Sound, Export, Settings */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/[0.08]">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition active:scale-[0.98]"
                title={soundOn ? 'Sound feedback ON (click to mute)' : 'Sound feedback OFF (click to enable)'}
              >
                {soundOn ? <Volume2 className="w-3.5 h-3.5 text-blue-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-600" />}
              </button>

              {/* Export Button */}
              <button
                onClick={() => { playTick(); onExportExcel(); }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition active:scale-[0.98]"
                title="Export Pipeline to Excel (.xlsx)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              {/* Settings */}
              <button
                onClick={() => { playTick(); setActiveTab('settings'); }}
                className={`p-1.5 rounded-lg transition active:scale-[0.98] ${
                  activeTab === 'settings' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
                }`}
                title="Settings & Integrations"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-white/[0.06] overflow-x-auto gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs whitespace-nowrap active:scale-[0.98] ${
                  isActive ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-400 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
