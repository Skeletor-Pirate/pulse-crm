import React from 'react';
import { 
  Building2, 
  ChevronRight, 
  Flame, 
  Mail, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  DollarSign,
  ArrowRight
} from 'lucide-react';

export default function KanbanBoard({
  leads,
  onMoveLeadStage,
  onSelectLeadForStudio,
  onScrapeSingle,
  onOpenDetailModal
}) {
  const stages = [
    { id: 'Imported', label: '1. Imported', color: 'border-slate-700 bg-slate-900/40 text-slate-400' },
    { id: 'Enriched by Swarm', label: '2. Swarm Enriched', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400' },
    { id: 'Email Drafted', label: '3. Email Drafted', color: 'border-purple-500/30 bg-purple-950/20 text-purple-400' },
    { id: 'Outreach Sent', label: '4. Outreach Sent', color: 'border-blue-500/30 bg-blue-950/20 text-blue-400' },
    { id: 'Replied', label: '5. Replied / Meeting', color: 'border-amber-500/30 bg-amber-950/20 text-amber-400' },
    { id: 'Deal Won', label: '6. Deal Won 🏆', color: 'border-emerald-400/50 bg-emerald-900/30 text-emerald-300 font-bold' }
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Outreach Pipeline Kanban</h2>
          <p className="text-xs text-slate-400">Track client progression from Excel ingestion through autonomous enrichment to closed won.</p>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
        {stages.map((stage) => {
          const columnLeads = leads.filter(l => (l.stage || 'Imported') === stage.id);
          const colValue = columnLeads.reduce((acc, l) => {
            const num = parseInt((l.leadValue || '$0').replace(/[^0-9]/g, '')) || 0;
            return acc + num;
          }, 0);

          return (
            <div 
              key={stage.id}
              className={`rounded-2xl border p-3 min-h-[500px] flex flex-col space-y-3 ${stage.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <span>{stage.label}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold">
                    {columnLeads.length}
                  </span>
                </div>
              </div>

              {/* Column Value pill */}
              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between bg-slate-900/60 px-2 py-1 rounded-lg">
                <span>Value:</span>
                <span className="text-emerald-400 font-bold">${colValue.toLocaleString()}</span>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-2.5 flex-1">
                {columnLeads.length === 0 ? (
                  <div className="h-32 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-600 text-[11px] italic">
                    Empty Stage
                  </div>
                ) : (
                  columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="glass-card p-3 rounded-xl border border-slate-800/90 space-y-2 hover:border-blue-500/40 transition group cursor-pointer"
                      onClick={() => onOpenDetailModal(lead)}
                    >
                      {/* Company & Logo */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/[0.08] flex items-center justify-center overflow-hidden shrink-0 p-0.5">
                            <img 
                              src={lead.dossier?.favicon || lead.dossier?.logo || `https://www.google.com/s2/favicons?domain=${lead.website ? lead.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] : (lead.company ? `${lead.company.toLowerCase()}.com` : '')}&sz=32`} 
                              alt={lead.company}
                              className="w-4 h-4 object-contain rounded"
                              onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextElementSibling) {
                                  e.target.nextElementSibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div 
                              className="w-full h-full rounded items-center justify-center text-[10px] font-extrabold text-white uppercase hidden"
                              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                            >
                              {lead.company ? lead.company.charAt(0) : 'C'}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-white truncate max-w-[120px]">{lead.company}</h4>
                            <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{lead.name}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                          {lead.leadValue}
                        </span>
                      </div>

                      {/* Dossier snippet */}
                      {lead.dossier ? (
                        <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed bg-slate-900/50 p-1.5 rounded">
                          {lead.dossier.valueProp}
                        </p>
                      ) : (
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>Not scraped yet</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onScrapeSingle(lead);
                            }}
                            className="text-emerald-400 hover:underline flex items-center gap-0.5"
                          >
                            <Flame className="w-3 h-3" />
                            <span>Scrape</span>
                          </button>
                        </div>
                      )}

                      {/* Quick stage mover actions */}
                      <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLeadForStudio(lead);
                          }}
                          className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Outreach</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {/* Next stage arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const currentIndex = stages.findIndex(s => s.id === (lead.stage || 'Imported'));
                              if (currentIndex < stages.length - 1) {
                                onMoveLeadStage(lead.id, stages[currentIndex + 1].id);
                              }
                            }}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            title="Advance to next stage"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
