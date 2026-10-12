import React, { useState } from 'react';
import { 
  Cpu, 
  Download, 
  ExternalLink, 
  Zap, 
  Send, 
  CheckCircle2, 
  Layers, 
  Bot, 
  Mail, 
  Database, 
  FileSpreadsheet,
  Globe,
  Radio,
  ArrowRight
} from 'lucide-react';

export default function N8nAutomationsHub({ onDownloadN8nTemplate, onTriggerN8n }) {
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook/pulsecrm-lead');
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const samplePayload = {
        lead: {
          name: 'Guillermo Rauch',
          company: 'Vercel',
          website: 'vercel.com',
          email: 'rauchg@vercel.com'
        },
        draft: {
          subject: 'scaling vercel edge AI observability',
          body: 'Hi Guillermo, noticed Vercel\'s recent push on serverless v0 templates...'
        }
      };

      const res = await onTriggerN8n(samplePayload.lead, samplePayload.draft, webhookUrl);
      setTestResult(res);
    } catch (e) {
      setTestResult({ status: 'error', message: e.message });
    } finally {
      setIsTesting(false);
    }
  };

  const freeApis = [
    {
      name: 'Ollama Local LLM',
      category: 'AI Inference',
      cost: '100% Free & Offline',
      desc: 'Runs Llama 3.2, Qwen 2.5 Coder, and Gemma locally on your machine with zero API keys or limits.',
      url: 'http://127.0.0.1:11434'
    },
    {
      name: 'Resend API',
      category: 'Transactional & Cold Email',
      cost: 'Free Tier (3,000 emails/mo)',
      desc: 'Modern developer-first email delivery platform with ultra-high deliverability and React Email templates.',
      url: 'https://resend.com'
    },
    {
      name: 'n8n Workflow Automation',
      category: 'Automation & Integration',
      cost: 'Open-Source & Free Self-Host',
      desc: 'Fair-code workflow automation tool with 400+ nodes to automate lead scraping, CRM sync, and outbound pipelines.',
      url: 'https://n8n.io'
    },
    {
      name: 'Clearbit Free Logo API',
      category: 'Company Branding',
      cost: '100% Free (Zero Key)',
      desc: 'Fetches high-resolution company logos instantly via https://logo.clearbit.com/{domain}',
      url: 'https://logo.clearbit.com'
    },
    {
      name: 'Google Favicon API',
      category: 'Domain Favicons',
      cost: '100% Free (Zero Key)',
      desc: 'Fetches crisp website icons up to 128px via https://www.google.com/s2/favicons?domain={domain}',
      url: 'https://google.com'
    },
    {
      name: 'Microlink API',
      category: 'Web Scraping & Screenshots',
      cost: 'Free Tier (10,000 reqs/mo)',
      desc: 'Extracts full open-graph data, meta descriptions, and live website browser screenshots automatically.',
      url: 'https://microlink.io'
    }
  ];

  return (
    <div className="space-y-6">

      {/* Hero Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Free Open-Source Architecture
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>n8n Automations & Free Tools Hub</span>
              <Cpu className="w-6 h-6 text-emerald-400" />
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Connect PulseCRM with open-source workflow automation, free SMTP/Resend delivery, and public APIs without paid recurring subscriptions.
            </p>
          </div>

          <button
            onClick={onDownloadN8nTemplate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download n8n Workflow JSON</span>
          </button>
        </div>
      </div>

      {/* Visual Pipeline Architecture Flowchart */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Autonomous Outreach Pipeline Architecture</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center relative group hover:border-blue-500/40 transition">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">1. Ingestion</h4>
            <p className="text-[11px] text-slate-400">Excel / CSV uploaded into PulseCRM</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center relative group hover:border-emerald-500/40 transition">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mx-auto">
              <Bot className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">2. Scraper Swarm</h4>
            <p className="text-[11px] text-slate-400">4 micro-agents crawl client websites</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center relative group hover:border-purple-500/40 transition">
            <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center mx-auto">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">3. AI Personalizer</h4>
            <p className="text-[11px] text-slate-400">Ollama / Heuristic drafts value bridge</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center relative group hover:border-amber-500/40 transition">
            <div className="w-9 h-9 rounded-xl bg-amber-600/10 text-amber-400 flex items-center justify-center mx-auto">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">4. n8n Automation</h4>
            <p className="text-[11px] text-slate-400">Webhook queues multi-touch sequences</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center relative group hover:border-emerald-400 transition">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-300 flex items-center justify-center mx-auto">
              <Mail className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">5. Resend / SMTP</h4>
            <p className="text-[11px] text-slate-400">Inbox delivery with open/click telemetry</p>
          </div>

        </div>
      </div>

      {/* Webhook Configuration & Test Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Webhook Tester (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>n8n Webhook Relay Tester</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">POST Request</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400">Your n8n Webhook Endpoint URL:</label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="http://localhost:5678/webhook/pulsecrm-lead"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">How to use this in n8n:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open your local n8n instance (<a href="http://localhost:5678" target="_blank" rel="noreferrer" className="text-blue-400 underline">localhost:5678</a>)</li>
              <li>Click <strong>Import from File</strong> and choose the downloaded workflow JSON</li>
              <li>Copy your Webhook node's Production or Test URL into the box above</li>
              <li>Click <strong>Test Fire Webhook</strong> below to verify payload reception</li>
            </ol>
          </div>

          <button
            onClick={handleTestWebhook}
            disabled={isTesting}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isTesting ? 'animate-bounce' : ''}`} />
            <span>{isTesting ? 'Dispatching Payload...' : 'Test Fire Webhook'}</span>
          </button>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs font-mono border ${
              testResult.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <p className="font-bold">{testResult.status === 'success' ? '✓ Webhook Triggered' : '✗ Webhook Failed'}</p>
              <p className="text-[11px] mt-1 text-slate-400">{testResult.message || JSON.stringify(testResult)}</p>
            </div>
          )}
        </div>

        {/* Free Public APIs & Tools Directory (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Curated Zero-Cost Free APIs</span>
            </h3>
            <a
              href="https://github.com/public-apis/public-apis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            >
              <span>public-apis Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {freeApis.map((api, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{api.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {api.cost}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{api.desc}</p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Category: {api.category}</span>
                  <a href={api.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                    Documentation &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
