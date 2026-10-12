import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Terminal, 
  Flame, 
  Pause, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Globe, 
  Building2, 
  Target, 
  Mail, 
  Radio, 
  Zap, 
  Sparkles,
  ExternalLink,
  Layers,
  Activity
} from 'lucide-react';

export default function ScraperSwarmConsole({
  leads,
  isSwarmActive,
  onStartSwarm,
  onStopSwarm,
  terminalLogs = [],
  activeLeadId,
  onSelectLeadForStudio
}) {
  const terminalEndRef = useRef(null);
  const [concurrency, setConcurrency] = useState(4);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll terminal
  useEffect(() => {
    if (autoScroll && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, autoScroll]);

  // Telemetry counts
  const pendingLeads = leads.filter(l => !l.dossier);
  const enrichedLeads = leads.filter(l => l.dossier);
  const progressPercent = leads.length ? Math.round((enrichedLeads.length / leads.length) * 100) : 0;

  // Active lead being scraped
  const currentLead = leads.find(l => l.id === activeLeadId);

  const swarmBots = [
    {
      id: 'bot_dom',
      name: 'DOM & Meta Crawler',
      code: 'BOT-01',
      icon: Globe,
      color: 'from-blue-600 to-cyan-500',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      desc: 'High-speed HTTP fetcher extracting title, meta descriptions, open graph tags and header structure.'
    },
    {
      id: 'bot_corp',
      name: 'Company Synthesizer',
      code: 'BOT-02',
      icon: Building2,
      color: 'from-emerald-600 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      desc: 'Derives core industry vertical, Clearbit branding, Google favicons, and company identity profile.'
    },
    {
      id: 'bot_pain',
      name: 'Pain Point & Value Matcher',
      code: 'BOT-03',
      icon: Target,
      color: 'from-purple-600 to-indigo-500',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      desc: 'Parses value proposition, target customer audience, and corporate operational friction points.'
    },
    {
      id: 'bot_contact',
      name: 'Contact & Social Detective',
      code: 'BOT-04',
      icon: Mail,
      color: 'from-amber-600 to-rose-500',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      desc: 'Extracts mailto links, regex-verified domain emails, LinkedIn handles, and corporate social footprints.'
    }
  ];

  return (
    <div className="space-y-6">

      {/* Hero Control Console */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 border ${
                isSwarmActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isSwarmActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                <span>{isSwarmActive ? 'SWARM DEPLOYED & RECON ACTIVE' : 'SWARM STANDBY (READY TO LAUNCH)'}</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">v2.5 Autonomous Architecture</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Autonomous Lead Scraper Swarm</span>
              <Bot className="w-6 h-6 text-blue-400" />
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Deploys 4 parallel micro-agents to crawl client websites, scrape corporate metadata, identify business bottlenecks, and compile hyper-targeted intelligence dossiers.
            </p>
          </div>

          {/* Action Button & Slider */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800 text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Bots:</span>
              <span className="text-white font-mono font-bold">{concurrency}</span>
              <input
                type="range"
                min="1"
                max="8"
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                className="w-20 accent-blue-500 cursor-pointer"
              />
            </div>

            {isSwarmActive ? (
              <button
                onClick={onStopSwarm}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition shadow-lg shadow-amber-600/20"
              >
                <Pause className="w-4 h-4" />
                <span>Pause Swarm</span>
              </button>
            ) : (
              <button
                onClick={onStartSwarm}
                disabled={pendingLeads.length === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition shadow-lg ${
                  pendingLeads.length === 0
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-500/25 active:scale-95'
                }`}
              >
                <Flame className="w-4 h-4 text-emerald-200 animate-pulse" />
                <span>Launch Swarm ({pendingLeads.length} Pending)</span>
              </button>
            )}
          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Pipeline Intelligence Progress</span>
            </span>
            <span className="text-slate-200 font-mono font-semibold">
              {enrichedLeads.length} / {leads.length} Enriched ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* The 4 Autonomous Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {swarmBots.map((bot) => {
          const Icon = bot.icon;
          const isActive = isSwarmActive;

          return (
            <div 
              key={bot.id} 
              className={`glass-panel p-4 rounded-xl border transition-all duration-200 ${
                isActive ? 'border-blue-500/40 shadow-lg shadow-blue-500/5' : 'border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bot.color} p-[1px] shadow-sm`}>
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <Icon className={`w-4 h-4 text-white ${isActive ? 'animate-pulse' : ''}`} />
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${bot.badgeColor}`}>
                  {bot.code}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                <span>{bot.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {bot.desc}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Status:</span>
                <span className={isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                  {isActive ? 'Scanning Active' : 'Idle'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Split view: Live Matrix Terminal & Current Target Recon Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Terminal Window (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Recon Telemetry Feed</span>
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              <label className="flex items-center gap-1 text-slate-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={autoScroll} 
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 text-xs" 
                />
                <span>Auto-scroll</span>
              </label>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-500">{terminalLogs.length} events</span>
            </div>
          </div>

          <div className="terminal-window rounded-xl p-4 h-[380px] overflow-y-auto scanlines text-[11px] font-mono text-slate-300 space-y-1.5 select-text">
            {terminalLogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Terminal className="w-8 h-8 text-slate-700 mb-2" />
                <p>Telemetry stream standing by.</p>
                <p className="text-[10px] text-slate-600 mt-1">Click "Launch Swarm" to initialize reconnaissance bots.</p>
              </div>
            ) : (
              terminalLogs.map((log, idx) => {
                const isError = log.includes('Warning') || log.includes('error');
                const isSuccess = log.includes('complete') || log.includes('200 OK');
                const isBot = log.includes('Bot-');

                return (
                  <div 
                    key={idx} 
                    className={`leading-relaxed transition-opacity ${
                      isError ? 'text-amber-400' :
                      isSuccess ? 'text-emerald-400 font-semibold' :
                      isBot ? 'text-blue-300' : 'text-slate-400'
                    }`}
                  >
                    <span className="text-slate-600 select-none mr-2">&gt;</span>
                    <span>{log}</span>
                  </div>
                );
              })
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Current Recon Feed & Target Intel (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Recon Dossier Preview</span>
            </span>
            {currentLead && (
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Active: {currentLead.company}
              </span>
            )}
          </div>

          <div className="glass-panel rounded-xl p-4 h-[380px] overflow-y-auto border border-slate-800">
            {currentLead && currentLead.dossier ? (
              <div className="space-y-4 animate-fade-in text-xs">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                      {currentLead.dossier.favicon || currentLead.dossier.logo ? (
                        <img 
                          src={currentLead.dossier.favicon || currentLead.dossier.logo} 
                          alt={currentLead.company}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <Building2 className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{currentLead.company}</h4>
                      <p className="text-[11px] text-slate-400">{currentLead.dossier.domain}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/20">
                    {currentLead.confidenceScore}% Telemetry
                  </span>
                </div>

                {/* Target Value Proposition */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Extracted Value Proposition
                  </label>
                  <p className="text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    {currentLead.dossier.valueProp}
                  </p>
                </div>

                {/* Identified Bottlenecks / Pain Points */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Identified Operational Friction Points
                  </label>
                  <ul className="mt-1 space-y-1">
                    {(currentLead.dossier.painPoints || []).map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Detected Tech Fingerprints
                  </label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(currentLead.dossier.techStack || []).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onSelectLeadForStudio(currentLead)}
                  className="w-full mt-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Draft Hyper-Targeted Cold Outreach</span>
                </button>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-4">
                <Radio className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                <p className="text-xs text-slate-400 font-medium">Reconnaissance In Progress</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  When a target is selected or scraped, its verified intelligence dossier will render here in real time.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
