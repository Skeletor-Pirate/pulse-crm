import React from 'react';
import { 
  X, 
  Building2, 
  Globe, 
  ExternalLink, 
  Flame, 
  Mail, 
  Sparkles, 
  Copy, 
  Check, 
  Phone, 
  Tag, 
  ShieldCheck,
  Send
} from 'lucide-react';

export default function LeadDetailModal({ 
  lead, 
  isOpen, 
  onClose, 
  onScrapeSingle, 
  onSelectLeadForStudio 
}) {
  if (!isOpen || !lead) return null;

  const domain = lead.website ? lead.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] : '';
  const dossier = lead.dossier;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-1.5">
              <img 
                src={dossier?.favicon || dossier?.logo || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`} 
                alt={lead.company}
                className="w-7 h-7 object-contain rounded"
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              <div 
                className="w-full h-full rounded-lg items-center justify-center text-sm font-extrabold text-white uppercase hidden"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                {lead.company ? lead.company.charAt(0) : 'C'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{lead.company}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {lead.stage}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{lead.name} ({lead.title || 'Executive'})</span>
                <span>•</span>
                <span>{lead.industry}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">{lead.leadValue} Pipeline</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Quick Contact & Links Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Website</span>
              <a 
                href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 font-mono flex items-center gap-1 hover:underline mt-0.5 truncate"
              >
                <span>{lead.website || 'N/A'}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Verified Email</span>
              <span className="text-slate-200 font-mono mt-0.5 block truncate">
                {lead.email || dossier?.detectedEmails?.[0] || 'Pending Extraction'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Phone</span>
              <span className="text-slate-200 font-mono mt-0.5 block truncate">
                {lead.phone || '+1 (555) 000-0000'}
              </span>
            </div>
          </div>

          {/* Autonomous Swarm Intelligence Dossier */}
          {dossier ? (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Autonomous Reconnaissance Dossier</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Target Value Proposition
                  </label>
                  <p className="text-slate-200 mt-1 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    {dossier.valueProp || dossier.description}
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Identified Commercial Bottlenecks & Pain Points
                  </label>
                  <ul className="mt-1 space-y-1.5">
                    {(dossier.painPoints || []).map((pt, i) => (
                      <li key={i} className="text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Detected Technology Fingerprints
                  </label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(dossier.techStack || []).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300 border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
              <Flame className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="font-semibold text-slate-300">Reconnaissance Dossier Not Yet Compiled</p>
              <p className="text-slate-500 text-[11px]">Deploy the autonomous scraper swarm on this target to harvest corporate intel.</p>
              <button
                onClick={() => {
                  onScrapeSingle(lead);
                  onClose();
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
              >
                Launch Recon Swarm Now
              </button>
            </div>
          )}

          {/* Drafted Email Preview if available */}
          {lead.draftedEmail && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Active Cold Outreach Draft</span>
              </h3>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-200">
                  <span className="text-slate-500">Subject: </span>
                  <span>{lead.draftedEmail.subject}</span>
                </div>
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                  {lead.draftedEmail.body}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/60">
          <button
            onClick={() => {
              onScrapeSingle(lead);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            <Flame className="w-3.5 h-3.5 text-emerald-400" />
            <span>Re-run Swarm Recon</span>
          </button>

          <button
            onClick={() => {
              onSelectLeadForStudio(lead);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open in Cold Outreach Studio</span>
          </button>
        </div>

      </div>
    </div>
  );
}
