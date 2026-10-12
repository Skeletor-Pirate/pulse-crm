import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Sparkles, 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  Building2, 
  Cpu, 
  Layers, 
  Flame, 
  ArrowRight,
  Sliders,
  ChevronDown,
  Globe,
  Radio,
  CheckCircle2,
  Inbox
} from 'lucide-react';
import { playTick, playPop, playChime } from '../utils/soundHelper';

export default function OutreachStudio({
  leads,
  activeLeadId,
  onSelectLead,
  senderProfile,
  onUpdateSenderProfile,
  onGenerateDraft,
  onSendOutbound,
  onTriggerN8n,
  isDrafting,
  systemStatus
}) {
  const activeLead = leads.find(l => l.id === activeLeadId) || leads[0] || null;

  const [tone, setTone] = useState('Consultative & Magnetic');
  const [emailStage, setEmailStage] = useState('Initial Cold Email');
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' | 'mobile' | 'raw'
  const [copied, setCopied] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Editable draft fields
  const [subject, setSubject] = useState('');
  const [subjectAlt, setSubjectAlt] = useState('');
  const [body, setBody] = useState('');

  // Sync draft from active lead when changed
  useEffect(() => {
    if (activeLead && activeLead.draftedEmail) {
      setSubject(activeLead.draftedEmail.subject || '');
      setSubjectAlt(activeLead.draftedEmail.subjectAlt || '');
      setBody(activeLead.draftedEmail.body || '');
    } else if (activeLead) {
      setSubject('');
      setSubjectAlt('');
      setBody('');
    }
  }, [activeLeadId, activeLead?.draftedEmail]);

  // Copy handler
  const handleCopy = () => {
    const fullText = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Draft Action
  const handleTriggerGenerate = () => {
    if (!activeLead) return;
    onGenerateDraft(activeLead, { tone, emailStage });
  };

  // Swap subject with alternate
  const handleSwapSubject = () => {
    if (!subjectAlt) return;
    const current = subject;
    setSubject(subjectAlt);
    setSubjectAlt(current);
  };

  // Insert variable into body
  const handleInsertVariable = (variable) => {
    setBody(prev => prev + ` {{${variable}}}`);
  };

  // Send via Resend
  const handleSendViaResend = async () => {
    if (!activeLead || !activeLead.email) {
      alert('Recipient email address missing. Please add an email address to this lead first.');
      return;
    }
    setIsSending(true);
    setSendSuccessMessage('');

    try {
      const res = await onSendOutbound({
        to: activeLead.email,
        subject: subject,
        text: body,
        from: `${senderProfile.name} <outreach@pulseflow.dev>`
      });

      playChime();
      setSendSuccessMessage(`Dispatched successfully! Tracking ID: ${res.id || 'resend_sandbox'}`);
      setTimeout(() => setSendSuccessMessage(''), 5000);
    } catch (err) {
      alert('Send failed: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  // Quick Send to Custom Address (e.g. User testing delivery)
  const handleQuickSendCustom = async () => {
    const customEmail = prompt("Enter an email address to test deliver this cold pitch:", activeLead?.email || "");
    if (!customEmail || !customEmail.includes('@')) return;

    setIsSending(true);
    setSendSuccessMessage('');
    playTick();

    try {
      const res = await onSendOutbound({
        to: customEmail,
        subject: subject,
        text: body,
        from: `${senderProfile.name} <onboarding@resend.dev>`
      });

      playChime();
      setSendSuccessMessage(`Test email sent to ${customEmail}! ID: ${res.id}`);
      setTimeout(() => setSendSuccessMessage(''), 5000);
    } catch (err) {
      alert('Send failed: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  // Open in Mail Client
  const handleOpenMailto = () => {
    if (!activeLead) return;
    playTick();
    const emailTo = activeLead.email || '';
    const mailtoUrl = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  // Send to n8n webhook
  const handleSendToN8n = () => {
    if (!activeLead) return;
    playPop();
    onTriggerN8n(activeLead, { subject, body });
  };

  return (
    <div className="space-y-6">

      {/* Top Target Lead Selector */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Cold Outreach Studio</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                PAS & AIDA Frameworks
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Hyper-targeted B2B email synthesis connecting our solution with their verified pain points.
            </p>
          </div>
        </div>

        {/* Lead Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Target Lead:</span>
          <select
            value={activeLeadId || ''}
            onChange={(e) => onSelectLead(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 min-w-[200px]"
          >
            {leads.map(l => (
              <option key={l.id} value={l.id}>
                {l.company} — {l.name} {l.draftedEmail ? '✓' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Two Column Layout: Prospect Intel & Our Pitch vs Cold Email Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column (5 Cols): Target Prospect Intel & Our Pitch Config */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Target Prospect Card */}
          {activeLead && (
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                    {activeLead.dossier?.favicon || activeLead.dossier?.logo ? (
                      <img 
                        src={activeLead.dossier.favicon || activeLead.dossier.logo} 
                        alt={activeLead.company} 
                        className="w-5 h-5 object-contain"
                      />
                    ) : (
                      <Building2 className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{activeLead.company}</h3>
                    <p className="text-[11px] text-slate-400">{activeLead.name} • {activeLead.title || 'Decision Maker'}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {activeLead.email || 'Email Pending'}
                </span>
              </div>

              {/* Verified Swarm Intel */}
              {activeLead.dossier ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Their Value Proposition
                    </span>
                    <p className="text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800 mt-0.5 text-[11px]">
                      {activeLead.dossier.valueProp}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Target Bottlenecks (Pain Points)
                    </span>
                    <ul className="mt-0.5 space-y-1">
                      {(activeLead.dossier.painPoints || []).slice(0, 2).map((pt, i) => (
                        <li key={i} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                          <span className="text-rose-400">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Detected Tech Signals
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(activeLead.dossier.techStack || []).slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  Target not yet scraped. The AI will utilize baseline heuristics or you can run Swarm recon first.
                </div>
              )}
            </div>
          )}

          {/* Sender Value Proposition Config ("Our Interests & Offering") */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Our Pitch & Value Config</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="text-[11px] text-slate-400">Our Company & Sender Name</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={senderProfile.name}
                    onChange={(e) => onUpdateSenderProfile({ ...senderProfile, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={senderProfile.company}
                    onChange={(e) => onUpdateSenderProfile({ ...senderProfile, company: e.target.value })}
                    placeholder="PulseFlow AI"
                    className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Our Solution / Value Proposition</label>
                <input
                  type="text"
                  value={senderProfile.valueProp}
                  onChange={(e) => onUpdateSenderProfile({ ...senderProfile, valueProp: e.target.value })}
                  placeholder="autonomous CRM lead scraping and hyper-targeted outreach"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400">Desired Call to Action (CTA)</label>
                <input
                  type="text"
                  value={senderProfile.cta}
                  onChange={(e) => onUpdateSenderProfile({ ...senderProfile, cta: e.target.value })}
                  placeholder="Would you be open to a 10-minute coffee chat this Thursday?"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs mt-1"
                />
              </div>

              {/* Tone & Sequence Selector */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[11px] text-slate-400">Outreach Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1.5 text-slate-200 text-xs mt-1"
                  >
                    <option value="Consultative & Magnetic">Consultative & Magnetic</option>
                    <option value="Casual & Friendly">Casual & Founder-to-Founder</option>
                    <option value="Direct & Punchy">Direct & Punchy</option>
                    <option value="The Challenger">The Challenger (Insight-Led)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400">Sequence Stage</label>
                  <select
                    value={emailStage}
                    onChange={(e) => setEmailStage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1.5 text-slate-200 text-xs mt-1"
                  >
                    <option value="Initial Cold Email">Day 1: Cold Email</option>
                    <option value="Value-Add Follow-up">Day 3: Value Follow-up</option>
                    <option value="Quick Bump">Day 7: Quick Bump</option>
                    <option value="Breakup Email">Day 12: Breakup</option>
                  </select>
                </div>
              </div>

              {/* Trigger Generation Button */}
              <button
                onClick={handleTriggerGenerate}
                disabled={isDrafting || !activeLead}
                className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isDrafting ? 'animate-spin' : ''}`} />
                <span>{isDrafting ? 'Synthesizing Cold Outreach...' : 'Draft Hyper-Targeted Email'}</span>
              </button>

            </div>
          </div>

        </div>

        {/* Right Column (7 Cols): The Cold Email Composer & Interactive Device Preview */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            
            {/* Header: Device Switcher & Quick Actions */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                    previewMode === 'desktop' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop Mail</span>
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                    previewMode === 'mobile' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>iPhone Outlook</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
                  title="Copy subject and body to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleTriggerGenerate}
                  disabled={isDrafting}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-purple-400 border border-slate-700 transition"
                  title="Regenerate draft with current settings"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isDrafting ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Success alert */}
            {sendSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{sendSuccessMessage}</span>
              </div>
            )}

            {/* Subject Line Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-400 font-medium">Subject Line:</label>
                {subjectAlt && (
                  <button
                    onClick={handleSwapSubject}
                    className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    title="Click to swap with A/B alternative"
                  >
                    <span>A/B Alternative:</span>
                    <span className="font-mono underline truncate max-w-[200px]">{subjectAlt}</span>
                  </button>
                )}
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="scaling your team's outbound pipeline..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* Email Body Composer */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-400 font-medium">Email Copy (Markdown / Text):</label>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <span>Variables:</span>
                  <button onClick={() => handleInsertVariable('company')} className="hover:text-blue-400 font-mono">
                    &#123;&#123;company&#125;&#125;
                  </button>
                  <span>•</span>
                  <button onClick={() => handleInsertVariable('name')} className="hover:text-blue-400 font-mono">
                    &#123;&#123;name&#125;&#125;
                  </button>
                  <span>•</span>
                  <button onClick={() => handleInsertVariable('pain_point')} className="hover:text-blue-400 font-mono">
                    &#123;&#123;pain&#125;&#125;
                  </button>
                </div>
              </div>

              {previewMode === 'mobile' ? (
                /* Mobile Mockup View */
                <div className="max-w-sm mx-auto bg-slate-900 rounded-3xl p-4 border-2 border-slate-700 shadow-2xl">
                  <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto mb-3" />
                  <div className="text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                    <p className="font-semibold text-white">To: {activeLead?.email || 'prospect@company.com'}</p>
                    <p className="truncate text-slate-300">Sub: {subject || 'No subject'}</p>
                  </div>
                  <div className="mt-3 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed min-h-[220px]">
                    {body || 'Click "Draft Hyper-Targeted Email" to generate cold outreach.'}
                  </div>
                </div>
              ) : (
                /* Desktop Composer View */
                <textarea
                  rows={10}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Click 'Draft Hyper-Targeted Email' on the left to synthesize personalized copy using the client's scraped intelligence..."
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono leading-relaxed resize-y min-h-[220px]"
                />
              )}
            </div>

            {/* Sequence Stage Tabs if Available */}
            {activeLead?.draftedEmail?.sequence && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Full 4-Step Sequence Cadence
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {activeLead.draftedEmail.sequence.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSubject(step.subject);
                        setBody(step.body);
                      }}
                      className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-left transition"
                    >
                      <div className="text-[10px] font-mono text-purple-400 font-bold">{step.day}</div>
                      <div className="text-[11px] font-semibold text-slate-300 truncate">{step.stage}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-Channel Sending Toolbar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendViaResend}
                  disabled={isSending || !body}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-bounce' : ''}`} />
                  <span>{isSending ? 'Sending...' : 'Send via Resend API'}</span>
                </button>

                <button
                  onClick={handleQuickSendCustom}
                  disabled={isSending || !body}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition active:scale-95"
                  title="Deliver a test send of this pitch to any email (e.g. your personal email)"
                >
                  <Inbox className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test Send to Any Email</span>
                </button>

                <button
                  onClick={handleOpenMailto}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition active:scale-95"
                  title="Open in your default email app with pre-filled subject and body"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open in Mail App</span>
                </button>
              </div>

              <button
                onClick={handleSendToN8n}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/20 transition active:scale-95"
                title="Send lead & draft to n8n webhook workflow"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Relay to n8n Webhook</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
