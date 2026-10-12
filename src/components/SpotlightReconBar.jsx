import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Bot, 
  Globe, 
  Building2,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { searchAndReconCompany, draftEmail } from '../services/api';
import { playTick, playPop } from '../utils/soundHelper';

export default function SpotlightReconBar({
  onLeadDiscovered,
  onOpenOutreachStudio,
  senderProfile,
  settings,
  addLog
}) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [notice, setNotice] = useState('');

  const quickPicks = ['Postman', 'Ramp', 'Airtable', 'Notion', 'Docker', 'Retool'];

  const handleExecuteRecon = async (companyToSearch) => {
    const target = companyToSearch || query;
    if (!target.trim()) return;

    playTick();
    setIsSearching(true);
    setNotice(`Launching autonomous swarm against "${target}"...`);
    if (addLog) addLog(`[Spotlight-Recon] Deploying web intelligence scraper swarm on "${target}"...`);

    try {
      const res = await searchAndReconCompany(target);
      if (res.status === 'success' && res.lead) {
        if (addLog && res.logs) {
          res.logs.forEach(l => addLog(l));
        }

        // Auto draft cold outreach
        if (addLog) addLog(`[AI-Composer] Synthesizing tailored value bridge for ${res.lead.company}...`);
        const draftRes = await draftEmail(res.lead, senderProfile, {
          provider: settings.aiProvider,
          customModel: settings.ollamaModel
        });

        const finalLead = {
          ...res.lead,
          draftedEmail: draftRes,
          stage: 'Email Drafted'
        };

        playPop();
        onLeadDiscovered(finalLead);
        setNotice(`✓ Reconn Complete for ${finalLead.company}! Added to CRM.`);
        setQuery('');

        setTimeout(() => {
          setNotice('');
          onOpenOutreachStudio(finalLead);
        }, 1200);
      }
    } catch (err) {
      setNotice(`Reconnaissance error: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="glass-panel-elevated p-4 sm:p-5 rounded-2xl relative overflow-hidden shadow-2xl space-y-3.5">
      {/* Ambient background glows */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative z-10">
        
        {/* Spotlight Omnibar Input */}
        <div className="relative flex-1 omnibar-glow rounded-xl">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-950/80 px-2 py-0.5 rounded-md text-blue-300 border border-blue-500/30">
              Omnibar
            </span>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleExecuteRecon();
            }}
            placeholder="Type any target company or website URL (e.g. Postman, Ramp, Airtable, stripe.com) to scrape & pitch..."
            className="w-full bg-slate-950/90 text-sm text-white pl-32 pr-36 py-3 rounded-xl border border-white/[0.1] focus:outline-none focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 font-medium shadow-inner"
          />

          <button
            onClick={() => handleExecuteRecon()}
            disabled={isSearching || !query.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-4 py-2 rounded-lg btn-glow-primary text-xs font-bold transition shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Flame className={`w-3.5 h-3.5 ${isSearching ? 'animate-bounce text-amber-300' : 'text-blue-100'}`} />
            <span>{isSearching ? 'Scraping Swarm...' : 'Recon & Pitch'}</span>
            <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.2 bg-white/20 rounded text-[10px] font-mono">↵</kbd>
          </button>
        </div>

      </div>

      {/* Quick suggestions & status notice */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.06] gap-2 relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium">Quick Recon Targets:</span>
          {quickPicks.map(pick => (
            <button
              key={pick}
              onClick={() => {
                setQuery(pick);
                handleExecuteRecon(pick);
              }}
              disabled={isSearching}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-semibold border border-white/[0.08] hover:border-blue-500/40 transition active:scale-[0.98] shadow-sm"
            >
              <img 
                src={`https://www.google.com/s2/favicons?domain=${pick.toLowerCase()}.com&sz=32`} 
                alt="" 
                className="w-3.5 h-3.5 rounded-sm object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span>+{pick}</span>
            </button>
          ))}
        </div>

        {notice && (
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg animate-fade-in shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{notice}</span>
          </div>
        )}
      </div>

    </div>
  );
}
