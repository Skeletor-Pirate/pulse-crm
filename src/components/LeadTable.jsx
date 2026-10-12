import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  Bot, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Send, 
  Eye, 
  Trash2, 
  FileSpreadsheet, 
  ChevronRight,
  Plus,
  ArrowUpDown,
  Building2,
  Globe,
  Tag,
  Users,
  DollarSign,
  Copy,
  Check,
  Zap,
  TrendingUp
} from 'lucide-react';
import { playTick, playPop } from '../utils/soundHelper';

export default function LeadTable({
  leads,
  onScrapeSingle,
  onDraftSingle,
  onSelectLeadForStudio,
  onOpenDetailModal,
  onDeleteLead,
  onBatchScrape,
  onBatchDraft,
  onOpenImport,
  onAddNewLead
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState([]);
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Metrics
  const totalLeads = leads.length;
  const enrichedCount = leads.filter(l => l.dossier).length;
  const draftedCount = leads.filter(l => l.draftedEmail).length;
  const sentCount = leads.filter(l => l.stage === 'Outreach Sent' || l.stage === 'Replied' || l.stage === 'Deal Won').length;
  const pipelineValue = leads.reduce((acc, curr) => {
    const val = parseInt((curr.leadValue || '$0').replace(/[^0-9]/g, '')) || 0;
    return acc + val;
  }, 0);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = 
        (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.website || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.industry || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchStage = selectedStage === 'ALL' || lead.stage === selectedStage;
      const matchIndustry = selectedIndustry === 'ALL' || lead.industry === selectedIndustry;

      return matchSearch && matchStage && matchIndustry;
    });
  }, [leads, searchTerm, selectedStage, selectedIndustry]);

  // Unique industries
  const industries = useMemo(() => {
    return ['ALL', ...new Set(leads.map(l => l.industry).filter(Boolean))];
  }, [leads]);

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Copy email helper
  const handleCopyEmail = (email, e) => {
    e.stopPropagation();
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    playTick();
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Stage Badge Styler
  const getStageBadge = (stage) => {
    switch (stage) {
      case 'Enriched by Swarm':
        return {
          pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400 badge-glow'
        };
      case 'Email Drafted':
        return {
          pill: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          dot: 'bg-purple-400 badge-glow-purple'
        };
      case 'Outreach Sent':
        return {
          pill: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          dot: 'bg-blue-400 badge-glow-blue'
        };
      case 'Replied':
        return {
          pill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400'
        };
      case 'Deal Won':
        return {
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 font-bold badge-glow',
          dot: 'bg-emerald-300'
        };
      default:
        return {
          pill: 'bg-slate-800/80 text-slate-400 border-slate-700/60',
          dot: 'bg-slate-500'
        };
    }
  };

  return (
    <div className="space-y-6">

      {/* KPI Metrics Ribbon - Apple/Linear Frosted Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        
        {/* Metric 1 */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Accounts</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{totalLeads}</span>
            <span className="text-xs text-blue-400 font-mono font-medium">100% indexed</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Swarm Enriched</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Bot className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">{enrichedCount}</span>
            <span className="text-xs text-emerald-400/70 font-mono font-medium">
              ({totalLeads ? Math.round((enrichedCount / totalLeads) * 100) : 0}% intel)
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI Pitches Ready</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-purple-400 tracking-tight">{draftedCount}</span>
            <span className="text-xs text-purple-400/70 font-mono font-medium">calibrated</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Outreach Sent</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Send className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-blue-400 tracking-tight">{sentCount}</span>
            <span className="text-xs text-slate-400 font-mono font-medium">via Resend/SMTP</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pipeline Valuation</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-300 tracking-tight">
              ${(pipelineValue).toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400/70 font-mono font-medium">qualified</span>
          </div>
        </div>

      </div>

      {/* Control Bar: Search & Filter Toolbar */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by company name, executive, website, industry..."
            className="w-full bg-slate-950/70 text-sm text-slate-200 pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] focus:outline-none focus:border-blue-500/80 transition-all placeholder:text-slate-500 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Stage Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-2 rounded-xl border border-white/[0.08] text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
            >
              <option value="ALL">All Stages</option>
              <option value="Imported">Imported</option>
              <option value="Enriched by Swarm">Enriched by Swarm</option>
              <option value="Email Drafted">Email Drafted</option>
              <option value="Outreach Sent">Outreach Sent</option>
              <option value="Replied">Replied</option>
              <option value="Deal Won">Deal Won</option>
            </select>
          </div>

          {/* Industry Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-2 rounded-xl border border-white/[0.08] text-xs">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer max-w-[150px] truncate font-medium"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind === 'ALL' ? 'All Industries' : ind}</option>
              ))}
            </select>
          </div>

          {/* Add Lead CTA */}
          <button
            onClick={onAddNewLead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold btn-glow-primary transition active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>

      </div>

      {/* Batch Actions Bar (visible when checkboxes are selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-gradient-to-r from-blue-900/70 via-indigo-900/70 to-slate-900/90 border border-blue-500/40 p-3 sm:p-3.5 rounded-xl flex items-center justify-between text-xs animate-fade-in shadow-xl shadow-blue-950/40">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[11px]">
              {selectedIds.length}
            </span>
            <span className="font-semibold text-slate-100">accounts selected for batch operations</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBatchScrape(selectedIds)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-glow-emerald text-xs font-bold transition"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Launch Swarm ({selectedIds.length})</span>
            </button>

            <button
              onClick={() => onBatchDraft(selectedIds)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synthesize Emails ({selectedIds.length})</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 text-slate-400 hover:text-slate-100 text-xs font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Leads Table Container */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-slate-950/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Company & Target</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Pipeline Stage</th>
                <th className="py-3.5 px-4">Autonomous Swarm Intel</th>
                <th className="py-3.5 px-4">Cold Outreach Pitch</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-xs">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-slate-400">
                    <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-base font-semibold text-slate-200">No leads match your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the filters or import a fresh Excel sheet.</p>
                    <button
                      onClick={onOpenImport}
                      className="mt-4 px-4 py-2 btn-glow-primary text-xs font-bold rounded-xl"
                    >
                      Import Spreadsheet
                    </button>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isChecked = selectedIds.includes(lead.id);
                  const cleanDomain = lead.website 
                    ? lead.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] 
                    : (lead.company ? `${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : '');
                  const hasDossier = !!lead.dossier;
                  const hasDraft = !!lead.draftedEmail;
                  const stageStyle = getStageBadge(lead.stage);

                  // Computed deal value
                  const dealVal = lead.leadValue || '$25,000';

                  return (
                    <tr 
                      key={lead.id}
                      onClick={() => onOpenDetailModal(lead)}
                      className={`hover:bg-slate-900/50 transition cursor-pointer group ${
                        isChecked ? 'bg-blue-950/25' : ''
                      }`}
                    >
                      {/* Select checkbox */}
                      <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(lead.id)}
                          className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Company & Target with Real Favicon / Clearbit */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/[0.08] flex items-center justify-center overflow-hidden shrink-0 shadow-inner p-1 group-hover:border-blue-500/40 transition">
                            <img 
                              src={lead.dossier?.favicon || lead.dossier?.logo || `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=64`} 
                              alt={lead.company}
                              className="w-6 h-6 object-contain rounded"
                              onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextElementSibling) {
                                  e.target.nextElementSibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div 
                              className="w-full h-full rounded-lg items-center justify-center text-xs font-extrabold text-white uppercase hidden"
                              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                            >
                              {lead.company ? lead.company.charAt(0) : 'C'}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 font-semibold text-slate-100 text-[13px]">
                              <span>{lead.company}</span>
                              {lead.website && (
                                <a 
                                  href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-slate-500 hover:text-blue-400 transition"
                                  title={lead.website}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span className="text-slate-300 font-medium">{lead.name}</span>
                              {lead.title && <span className="text-slate-600">•</span>}
                              <span className="text-slate-400">{lead.title || 'Founder'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-slate-200 font-mono text-[11px] truncate max-w-[170px]" title={lead.email}>
                              {lead.email || (lead.dossier?.detectedEmails?.[0] || 'pending extraction')}
                            </p>
                            {lead.email && (
                              <button
                                onClick={(e) => handleCopyEmail(lead.email, e)}
                                className="p-1 rounded text-slate-500 hover:text-blue-400 hover:bg-slate-800 transition"
                                title="Copy email address"
                              >
                                {copiedEmail === lead.email ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="text-slate-300">{lead.industry || 'Tech'}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                              {dealVal}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Pipeline Stage Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${stageStyle.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${stageStyle.dot}`} />
                          <span>{lead.stage}</span>
                        </span>
                      </td>

                      {/* Autonomous Swarm Intel */}
                      <td className="py-3.5 px-4 max-w-xs" onClick={(e) => e.stopPropagation()}>
                        {hasDossier ? (
                          <div className="space-y-1">
                            <p className="text-[11px] text-slate-300 line-clamp-1 font-medium" title={lead.dossier.valueProp}>
                              {lead.dossier.valueProp || lead.dossier.title}
                            </p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {(lead.dossier.techStack || []).slice(0, 3).map((tech, i) => (
                                <span key={i} className="px-1.5 py-0.2 rounded bg-slate-900 border border-white/[0.08] text-[10px] font-mono text-slate-300 font-medium">
                                  {tech}
                                </span>
                              ))}
                              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                                {lead.confidenceScore || 96}% match
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="text-[11px] italic">Not enriched</span>
                            <button
                              onClick={() => { playTick(); onScrapeSingle(lead); }}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 transition font-semibold flex items-center gap-1"
                            >
                              <Flame className="w-3 h-3 text-emerald-400" />
                              <span>Scrape</span>
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Cold Outreach Pitch */}
                      <td className="py-3.5 px-4 max-w-xs" onClick={(e) => e.stopPropagation()}>
                        {hasDraft ? (
                          <div className="space-y-1">
                            <p className="text-[11px] font-medium text-slate-200 truncate" title={lead.draftedEmail.subject}>
                              {lead.draftedEmail.subject}
                            </p>
                            <button
                              onClick={() => { playTick(); onSelectLeadForStudio(lead); }}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-semibold border border-blue-500/25 transition"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Review & Send</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { playTick(); onDraftSingle(lead); }}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] font-semibold border border-purple-500/25 transition"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            <span>Draft Mail</span>
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          
                          {/* Recon Button */}
                          <button
                            onClick={() => { playTick(); onScrapeSingle(lead); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition"
                            title="Launch Recon Swarm on this lead"
                          >
                            <Flame className="w-4 h-4" />
                          </button>

                          {/* Email Studio Button */}
                          <button
                            onClick={() => { playTick(); onSelectLeadForStudio(lead); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition"
                            title="Open in Cold Outreach Studio"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          {/* Full Intel Dossier */}
                          <button
                            onClick={() => { playTick(); onOpenDetailModal(lead); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition"
                            title="Inspect Intelligence Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete Lead */}
                          <button
                            onClick={() => { playTick(); onDeleteLead(lead.id); }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
