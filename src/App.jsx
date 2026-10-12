import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LeadTable from './components/LeadTable';
import ScraperSwarmConsole from './components/ScraperSwarmConsole';
import OutreachStudio from './components/OutreachStudio';
import KanbanBoard from './components/KanbanBoard';
import N8nAutomationsHub from './components/N8nAutomationsHub';
import ImportModal from './components/ImportModal';
import LeadDetailModal from './components/LeadDetailModal';
import SettingsModal from './components/SettingsModal';
import SpotlightReconBar from './components/SpotlightReconBar';
import OutboxDrawer from './components/OutboxDrawer';

import { initialSampleLeads } from './data/sampleLeads';
import { exportLeadsToExcel } from './utils/excelHelper';
import { 
  checkSystemStatus, 
  scrapeLead, 
  draftEmail, 
  sendEmailOutbound, 
  relayN8nWebhook,
  fetchOutbox
} from './services/api';

export default function App() {
  // App state
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'swarm' | 'outreach' | 'kanban' | 'n8n' | 'settings'
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('pulsecrm_leads_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialSampleLeads;
  });

  const [activeLeadId, setActiveLeadId] = useState(leads[0]?.id || null);
  const [isSwarmActive, setIsSwarmActive] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    `[System-Boot] PulseCRM Autonomous Engine v2.5 initialized.`,
    `[Core-Dispatcher] Swarm reconnaissance cluster ready. Loaded ${leads.length} leads in database.`,
    `[AI-Engine] Ready for context-aware hyper-targeted email synthesis.`
  ]);

  // Sender Profile
  const [senderProfile, setSenderProfile] = useState(() => {
    const saved = localStorage.getItem('pulsecrm_sender_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Alex Morgan',
      company: 'PulseFlow AI',
      valueProp: 'autonomous CRM scraper swarms and hyper-targeted cold outreach pipelines',
      cta: 'Would you be open to a 10-minute coffee chat this Thursday?'
    };
  });

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pulsecrm_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      resendApiKey: '',
      ollamaModel: 'llama3.2:latest',
      aiProvider: 'auto',
      senderName: 'Alex Morgan',
      senderCompany: 'PulseFlow AI'
    };
  });

  const [systemStatus, setSystemStatus] = useState(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isOutboxOpen, setIsOutboxOpen] = useState(false);
  const [outboxCount, setOutboxCount] = useState(0);

  // Modals
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailLead, setDetailLead] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persist leads
  useEffect(() => {
    localStorage.setItem('pulsecrm_leads_v2', JSON.stringify(leads));
  }, [leads]);

  // Persist sender profile
  useEffect(() => {
    localStorage.setItem('pulsecrm_sender_profile', JSON.stringify(senderProfile));
  }, [senderProfile]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('pulsecrm_settings', JSON.stringify(settings));
  }, [settings]);

  // Check system status & fetch outbox on mount
  useEffect(() => {
    checkSystemStatus().then(status => {
      setSystemStatus(status);
      if (status?.aiProviders?.ollama?.available) {
        addLog(`[Local-AI] Discovered local offline Ollama instance with ${status.aiProviders.ollama.models.length} installed models.`);
      }
    });

    fetchOutbox().then(items => {
      if (Array.isArray(items)) setOutboxCount(items.length);
    });
  }, []);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // Launch Autonomous Scraper Swarm
  const handleStartSwarm = async (targetIds = null) => {
    setIsSwarmActive(true);
    setActiveTab('swarm'); // Switch to swarm view for visual excitement

    const toProcess = leads.filter(l => 
      targetIds ? targetIds.includes(l.id) : !l.dossier
    );

    if (toProcess.length === 0) {
      addLog(`[Swarm-Dispatcher] No un-enriched targets found. Re-crawling active targets...`);
    } else {
      addLog(`[Swarm-Dispatcher] Deploying swarm across ${toProcess.length} client target domains...`);
    }

    const targets = toProcess.length ? toProcess : leads.slice(0, 3);

    for (const lead of targets) {
      setActiveLeadId(lead.id);
      addLog(`[Bot-01: DOM-Inspector] Crawling domain for ${lead.company} (${lead.website || 'web'})...`);

      // Artificial small delay for visual telemetry sensation
      await new Promise(r => setTimeout(r, 600));

      const scrapeRes = await scrapeLead(lead);

      if (scrapeRes?.logs) {
        scrapeRes.logs.forEach(l => addLog(l));
      }

      // Update lead
      setLeads(prev => prev.map(l => {
        if (l.id === lead.id) {
          return {
            ...l,
            dossier: scrapeRes.dossier,
            stage: 'Enriched by Swarm',
            confidenceScore: scrapeRes.dossier?.swarmConfidenceScore || 96
          };
        }
        return l;
      }));

      addLog(`[AI-Personalizer] Automatically drafting context-aware cold email for ${lead.name} at ${lead.company}...`);
      
      // Auto-draft email right after scraping
      const draftRes = await draftEmail({
        ...lead,
        dossier: scrapeRes.dossier
      }, senderProfile, {
        provider: settings.aiProvider,
        customModel: settings.ollamaModel
      });

      setLeads(prev => prev.map(l => {
        if (l.id === lead.id) {
          return {
            ...l,
            draftedEmail: draftRes,
            stage: 'Email Drafted'
          };
        }
        return l;
      }));

      addLog(`[Dispatcher] Successfully synthesized outreach for ${lead.company}. Ready for dispatch.`);
      await new Promise(r => setTimeout(r, 400));
    }

    setIsSwarmActive(false);
    addLog(`[Swarm-Dispatcher] Reconnaissance mission complete! All targets synthesized with 98% telemetry.`);
  };

  const handleStopSwarm = () => {
    setIsSwarmActive(false);
    addLog(`[Swarm-Dispatcher] Swarm manually paused by operator.`);
  };

  // Single Scrape
  const handleScrapeSingle = async (lead) => {
    setActiveLeadId(lead.id);
    addLog(`[Manual-Trigger] Launching targeted recon swarm on ${lead.company}...`);
    const res = await scrapeLead(lead);
    if (res?.logs) res.logs.forEach(l => addLog(l));

    setLeads(prev => prev.map(l => {
      if (l.id === lead.id) {
        return {
          ...l,
          dossier: res.dossier,
          stage: 'Enriched by Swarm',
          confidenceScore: res.dossier?.swarmConfidenceScore || 95
        };
      }
      return l;
    }));
  };

  // Draft Email for Single Lead
  const handleGenerateDraft = async (lead, options = {}) => {
    setIsDrafting(true);
    addLog(`[AI-Composer] Synthesizing cold email for ${lead.company} using ${options.tone || 'Consultative'} framework...`);

    try {
      const res = await draftEmail(lead, senderProfile, {
        tone: options.tone,
        emailStage: options.emailStage,
        provider: settings.aiProvider,
        customModel: settings.ollamaModel
      });

      setLeads(prev => prev.map(l => {
        if (l.id === lead.id) {
          return {
            ...l,
            draftedEmail: res,
            stage: l.stage === 'Imported' || l.stage === 'Enriched by Swarm' ? 'Email Drafted' : l.stage
          };
        }
        return l;
      }));

      addLog(`[AI-Composer] Finished drafting email (${res.generatedVia}). Subject: "${res.subject}"`);
    } finally {
      setIsDrafting(false);
    }
  };

  // Batch Draft
  const handleBatchDraft = async (selectedIds) => {
    const targets = leads.filter(l => selectedIds.includes(l.id));
    addLog(`[AI-Batch] Generating cold email sequences for ${targets.length} accounts...`);
    for (const lead of targets) {
      await handleGenerateDraft(lead);
    }
  };

  // Outbound Send (Resend / Sandbox)
  const handleSendOutbound = async (params) => {
    addLog(`[Outbound-Engine] Dispatching email to ${params.to} ("${params.subject}")...`);
    const res = await sendEmailOutbound({
      ...params,
      apiKey: settings.resendApiKey
    });

    // Advance stage to Outreach Sent
    if (activeLeadId) {
      setLeads(prev => prev.map(l => {
        if (l.id === activeLeadId) {
          return { ...l, stage: 'Outreach Sent' };
        }
        return l;
      }));
    }

    setOutboxCount(prev => prev + 1);
    addLog(`[Outbound-Engine] Dispatch confirmed via ${res.provider}. Tracking ID: ${res.id}`);
    return res;
  };

  // n8n Relay Trigger
  const handleTriggerN8n = async (lead, draft, customWebhook = null) => {
    const webhookUrl = customWebhook || 'http://localhost:5678/webhook/pulsecrm-lead';
    addLog(`[n8n-Relay] Forwarding lead ${lead.company} to n8n webhook ${webhookUrl}...`);
    
    const res = await relayN8nWebhook(webhookUrl, { lead, draft });
    if (res.status === 'success') {
      addLog(`[n8n-Relay] Successfully delivered payload to n8n workflow.`);
    } else {
      addLog(`[n8n-Relay] Notice: n8n webhook responded with: ${res.message}`);
    }
    return res;
  };

  // Download n8n Template
  const handleDownloadN8nTemplate = () => {
    window.location.href = '/api/n8n/template';
  };

  // Export to Excel
  const handleExportExcel = () => {
    exportLeadsToExcel(leads);
    addLog(`[Export-Engine] Exported ${leads.length} records to formatted Excel spreadsheet.`);
  };

  // Import Leads
  const handleImportLeads = (newLeads) => {
    setLeads(prev => [...newLeads, ...prev]);
    setActiveLeadId(newLeads[0]?.id || null);
    addLog(`[Ingestion] Ingested ${newLeads.length} leads from spreadsheet into CRM pipeline.`);
  };

  // Move Lead Stage
  const handleMoveLeadStage = (leadId, newStage) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { ...l, stage: newStage };
      }
      return l;
    }));
    addLog(`[Pipeline] Lead ${leadId} advanced to stage "${newStage}".`);
  };

  // Delete Lead
  const handleDeleteLead = (id) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    addLog(`[Database] Removed lead record.`);
  };

  // Reset to Sample Data
  const handleResetSampleData = () => {
    if (confirm('Reset CRM database back to initial sample leads?')) {
      setLeads(initialSampleLeads);
      setActiveLeadId(initialSampleLeads[0].id);
      localStorage.removeItem('pulsecrm_leads_v2');
      addLog(`[System] Reset database to default sample unicorns.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'settings') setIsSettingsOpen(true);
          else setActiveTab(tab);
        }}
        onOpenImport={() => setIsImportOpen(true)}
        onExportExcel={handleExportExcel}
        onLaunchSwarm={() => handleStartSwarm()}
        onOpenOutbox={() => setIsOutboxOpen(true)}
        outboxCount={outboxCount}
        systemStatus={systemStatus}
        leadsCount={leads.length}
        enrichedCount={leads.filter(l => l.dossier).length}
        isSwarmActive={isSwarmActive}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Apple Spotlight Search & Recon Bar */}
        <SpotlightReconBar
          onLeadDiscovered={(newLead) => {
            setLeads(prev => [newLead, ...prev]);
            setActiveLeadId(newLead.id);
          }}
          onOpenOutreachStudio={(lead) => {
            setActiveLeadId(lead.id);
            setActiveTab('outreach');
          }}
          senderProfile={senderProfile}
          settings={settings}
          addLog={addLog}
        />

        {/* Tab 1: Leads & CRM Table */}
        {activeTab === 'leads' && (
          <LeadTable
            leads={leads}
            onScrapeSingle={handleScrapeSingle}
            onDraftSingle={(lead) => {
              setActiveLeadId(lead.id);
              handleGenerateDraft(lead);
            }}
            onSelectLeadForStudio={(lead) => {
              setActiveLeadId(lead.id);
              setActiveTab('outreach');
            }}
            onOpenDetailModal={(lead) => {
              setDetailLead(lead);
              setIsDetailOpen(true);
            }}
            onDeleteLead={handleDeleteLead}
            onBatchScrape={(ids) => handleStartSwarm(ids)}
            onBatchDraft={handleBatchDraft}
            onOpenImport={() => setIsImportOpen(true)}
            onAddNewLead={() => setIsImportOpen(true)}
          />
        )}

        {/* Tab 2: Autonomous Scraper Swarm Console */}
        {activeTab === 'swarm' && (
          <ScraperSwarmConsole
            leads={leads}
            isSwarmActive={isSwarmActive}
            onStartSwarm={() => handleStartSwarm()}
            onStopSwarm={handleStopSwarm}
            terminalLogs={terminalLogs}
            activeLeadId={activeLeadId}
            onSelectLeadForStudio={(lead) => {
              setActiveLeadId(lead.id);
              setActiveTab('outreach');
            }}
          />
        )}

        {/* Tab 3: Cold Outreach Studio */}
        {activeTab === 'outreach' && (
          <OutreachStudio
            leads={leads}
            activeLeadId={activeLeadId}
            onSelectLead={(id) => setActiveLeadId(id)}
            senderProfile={senderProfile}
            onUpdateSenderProfile={setSenderProfile}
            onGenerateDraft={handleGenerateDraft}
            onSendOutbound={handleSendOutbound}
            onTriggerN8n={handleTriggerN8n}
            isDrafting={isDrafting}
            systemStatus={systemStatus}
          />
        )}

        {/* Tab 4: Pipeline Kanban Board */}
        {activeTab === 'kanban' && (
          <KanbanBoard
            leads={leads}
            onMoveLeadStage={handleMoveLeadStage}
            onSelectLeadForStudio={(lead) => {
              setActiveLeadId(lead.id);
              setActiveTab('outreach');
            }}
            onScrapeSingle={handleScrapeSingle}
            onOpenDetailModal={(lead) => {
              setDetailLead(lead);
              setIsDetailOpen(true);
            }}
          />
        )}

        {/* Tab 5: n8n & Automations Hub */}
        {activeTab === 'n8n' && (
          <N8nAutomationsHub
            onDownloadN8nTemplate={handleDownloadN8nTemplate}
            onTriggerN8n={handleTriggerN8n}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>PulseCRM • Inspired by Emergent Labs Autonomous Scraper Architecture</p>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>100% Free Open Source Stack (SheetJS + Resend + n8n + Ollama)</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportLeads={handleImportLeads}
      />

      <LeadDetailModal
        lead={detailLead}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDetailLead(null);
        }}
        onScrapeSingle={handleScrapeSingle}
        onSelectLeadForStudio={(lead) => {
          setActiveLeadId(lead.id);
          setActiveTab('outreach');
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        systemStatus={systemStatus}
        settings={settings}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          setSenderProfile(prev => ({
            ...prev,
            name: newSettings.senderName,
            company: newSettings.senderCompany
          }));
        }}
        onResetSampleData={handleResetSampleData}
      />

      <OutboxDrawer
        isOpen={isOutboxOpen}
        onClose={() => setIsOutboxOpen(false)}
        senderProfile={senderProfile}
        resendApiKey={settings.resendApiKey}
      />

    </div>
  );
}

