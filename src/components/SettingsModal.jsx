import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Cpu, 
  Mail, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  ExternalLink,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  systemStatus,
  settings,
  onSaveSettings,
  onResetSampleData
}) {
  if (!isOpen) return null;

  const [resendApiKey, setResendApiKey] = useState(settings.resendApiKey || '');
  const [selectedOllamaModel, setSelectedOllamaModel] = useState(settings.ollamaModel || 'llama3.2:latest');
  const [aiProvider, setAiProvider] = useState(settings.aiProvider || 'auto');
  const [senderName, setSenderName] = useState(settings.senderName || 'Alex Morgan');
  const [senderCompany, setSenderCompany] = useState(settings.senderCompany || 'PulseFlow AI');
  const [savedNotice, setSavedNotice] = useState(false);

  const ollamaModels = systemStatus?.aiProviders?.ollama?.models || ['llama3.2:latest', 'qwen2.5-coder:7b', 'llama3.1:8b'];
  const isOllamaOnline = !!systemStatus?.aiProviders?.ollama?.available;

  const handleSave = () => {
    onSaveSettings({
      resendApiKey,
      ollamaModel: selectedOllamaModel,
      aiProvider,
      senderName,
      senderCompany
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden space-y-4 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">System Settings & Free API Keys</h3>
              <p className="text-xs text-slate-400">Configure free AI providers, Resend email keys, and sender defaults.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          
          {/* AI Provider Config */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>AI Cold Email Generation Engine</span>
              </h4>
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                isOllamaOnline ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {isOllamaOnline ? 'Ollama: Online (11434)' : 'Built-in Zero-Key Active'}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400">Preferred AI Provider Mode:</label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 text-xs"
              >
                <option value="auto">Auto-Detect (Ollama if local, else Calibrated Zero-Key Engine)</option>
                <option value="ollama">Local Offline Ollama (100% Free & Private)</option>
                <option value="heuristic">Calibrated High-Fidelity Heuristic Model (Zero-Key)</option>
              </select>
            </div>

            {aiProvider !== 'heuristic' && (
              <div className="space-y-1">
                <label className="text-slate-400">Local Ollama Model:</label>
                <select
                  value={selectedOllamaModel}
                  onChange={(e) => setSelectedOllamaModel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 text-xs"
                >
                  {ollamaModels.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Resend API Key Config */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Resend Email Outbound Key</span>
              </h4>
              <a 
                href="https://resend.com/api-keys" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Get Free Key (100 emails/day)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Resend API Key (re_...):</label>
              <input
                type="password"
                value={resendApiKey}
                onChange={(e) => setResendApiKey(e.target.value)}
                placeholder="re_xxxxxxxxxxxxxxxxxxxx (Optional - leave blank for Sandbox Simulation)"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-slate-200 text-xs font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Leave empty to use the zero-key simulation sandbox. In sandbox mode, emails are tracked in your outbound queue without sending real emails.
              </p>
            </div>
          </div>

          {/* Default Sender Profile */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Default Sender Identity</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400">Your Full Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 text-xs mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400">Your Company</label>
                <input
                  type="text"
                  value={senderCompany}
                  onChange={(e) => setSenderCompany(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 text-xs mt-1"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onResetSampleData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Pipeline</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
