import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { parseSpreadsheet, downloadExcelTemplate } from '../utils/excelHelper';
import { sampleImportBatches } from '../data/sampleLeads';

export default function ImportModal({ isOpen, onClose, onImportLeads }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [previewLeads, setPreviewLeads] = useState([]);

  if (!isOpen) return null;

  const handleFileDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');

    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (!files || !files.length) return;

    const file = files[0];
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      setError('Please upload an Excel spreadsheet (.xlsx, .xls) or CSV file.');
      return;
    }

    setIsProcessing(true);
    try {
      const parsed = await parseSpreadsheet(file);
      if (!parsed.length) {
        setError('No rows found in spreadsheet. Check that the first row contains headers.');
      } else {
        setPreviewLeads(parsed);
      }
    } catch (err) {
      setError('Failed to parse spreadsheet: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = () => {
    if (previewLeads.length) {
      onImportLeads(previewLeads);
      onClose();
    }
  };

  const handleLoadSampleBatch = (batch) => {
    const mapped = batch.leads.map(l => ({
      id: 'lead_' + Math.random().toString(36).substring(2, 9),
      name: l.name,
      company: l.company,
      website: l.website,
      email: l.email,
      industry: l.industry,
      phone: '+1 (555) 019-2831',
      notes: 'Imported via sample batch',
      leadValue: '$25,000',
      stage: 'Imported',
      confidenceScore: 88,
      dossier: null,
      draftedEmail: null,
      importedAt: new Date().toISOString()
    }));
    onImportLeads(mapped);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden space-y-4 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Import Client Spreadsheet</h3>
              <p className="text-xs text-slate-400">Ingest client details from Excel (.xlsx, .xls) or CSV sheets.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drag and Drop Zone */}
        {previewLeads.length === 0 ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
              isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
            }`}
            onClick={() => document.getElementById('excel-file-input').click()}
          >
            <input 
              id="excel-file-input"
              type="file" 
              accept=".xlsx,.xls,.csv" 
              onChange={handleFileDrop}
              className="hidden" 
            />

            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Drop your Excel or CSV file here, or <span className="text-blue-400 underline">browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports .xlsx, .xls, and .csv with automatic column header detection
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadExcelTemplate();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Sample Excel Template</span>
              </button>
            </div>
          </div>
        ) : (
          /* Preview of Parsed Rows */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully parsed {previewLeads.length} leads</span>
              </span>
              <button 
                onClick={() => setPreviewLeads([])} 
                className="text-slate-400 hover:text-white"
              >
                Reset & Upload Different File
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/80">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-[11px]">
                    <th className="p-2.5">Company</th>
                    <th className="p-2.5">Contact</th>
                    <th className="p-2.5">Website</th>
                    <th className="p-2.5">Email</th>
                    <th className="p-2.5">Industry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {previewLeads.slice(0, 10).map((l, i) => (
                    <tr key={i} className="text-slate-300">
                      <td className="p-2.5 font-medium text-white">{l.company}</td>
                      <td className="p-2.5">{l.name}</td>
                      <td className="p-2.5 text-blue-400 font-mono text-[11px]">{l.website}</td>
                      <td className="p-2.5 text-slate-400 font-mono text-[11px]">{l.email || '—'}</td>
                      <td className="p-2.5 text-slate-400">{l.industry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleConfirmImport}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition"
            >
              Add {previewLeads.length} Leads to CRM Pipeline
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Instant 1-Click Sample Batches */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Or Test-Drive with Pre-built Datasets (1-Click)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleImportBatches.map(batch => (
              <button
                key={batch.id}
                onClick={() => handleLoadSampleBatch(batch)}
                className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 hover:border-blue-500/30 text-left transition text-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-200">{batch.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Instant test batch ready for scraper swarm</div>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
