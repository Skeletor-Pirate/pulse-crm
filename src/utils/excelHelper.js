import * as XLSX from 'xlsx';

// Fuzzy header matcher to automatically map arbitrary user columns
export function mapExcelRow(row) {
  const keys = Object.keys(row);
  const getVal = (patterns) => {
    for (const key of keys) {
      const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      for (const p of patterns) {
        if (cleanKey.includes(p)) return String(row[key] || '').trim();
      }
    }
    return '';
  };

  const name = getVal(['name', 'contact', 'founder', 'ceo', 'person', 'leadname', 'prospect']) || 'Prospect';
  const company = getVal(['company', 'organization', 'business', 'corp', 'firm', 'client', 'brand']) || 'Target Company';
  const website = getVal(['website', 'url', 'domain', 'web', 'site', 'link']) || '';
  const email = getVal(['email', 'mail', 'contactemail']) || '';
  const phone = getVal(['phone', 'tel', 'mobile', 'call', 'number']) || '';
  const industry = getVal(['industry', 'sector', 'category', 'vertical', 'niche']) || 'Technology & Business';
  const notes = getVal(['notes', 'interest', 'comments', 'details', 'description']) || '';
  const leadValue = getVal(['value', 'deal', 'budget', 'revenue', 'worth']) || '$15,000';

  return {
    id: 'lead_' + Math.random().toString(36).substring(2, 9),
    name,
    company,
    website,
    email,
    phone,
    industry,
    notes,
    leadValue,
    stage: 'Imported',
    confidenceScore: 85 + Math.floor(Math.random() * 12),
    dossier: null,
    draftedEmail: null,
    importedAt: new Date().toISOString()
  };
}

// Parse file (Buffer / ArrayBuffer) into Leads array
export async function parseSpreadsheet(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        if (!json || !json.length) {
          return resolve([]);
        }

        const mappedLeads = json.map(mapExcelRow);
        resolve(mappedLeads);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

// Export CRM Leads to Excel workbook (.xlsx)
export function exportLeadsToExcel(leads, filename = 'PulseCRM_Enriched_Leads.xlsx') {
  const mainData = leads.map((l, idx) => ({
    'ID': l.id,
    'Lead Name': l.name,
    'Company': l.company,
    'Website': l.website,
    'Email': l.email,
    'Phone': l.phone,
    'Industry': l.industry,
    'Pipeline Stage': l.stage,
    'Confidence Score': `${l.confidenceScore}%`,
    'Lead Value': l.leadValue,
    'Target Value Proposition': l.dossier?.valueProp || 'Pending Recon',
    'Identified Pain Points': (l.dossier?.painPoints || []).join('; ') || 'Pending Recon',
    'Tech Stack': (l.dossier?.techStack || []).join(', ') || 'N/A',
    'Subject Line': l.draftedEmail?.subject || '',
    'Outreach Email Copy': l.draftedEmail?.body || ''
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(mainData);

  // Set column widths
  ws['!cols'] = [
    { wch: 12 }, // ID
    { wch: 18 }, // Name
    { wch: 18 }, // Company
    { wch: 22 }, // Website
    { wch: 24 }, // Email
    { wch: 16 }, // Phone
    { wch: 24 }, // Industry
    { wch: 18 }, // Stage
    { wch: 14 }, // Score
    { wch: 14 }, // Value
    { wch: 35 }, // Value Prop
    { wch: 45 }, // Pain Points
    { wch: 25 }, // Tech Stack
    { wch: 30 }, // Subject
    { wch: 60 }  // Email Copy
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'CRM Pipeline & Intel');
  XLSX.writeFile(wb, filename);
}

// Download ready-to-use Excel sample template
export function downloadExcelTemplate() {
  const sampleRows = [
    {
      'Company Name': 'Stripe',
      'Website': 'stripe.com',
      'Contact Person': 'Patrick Collison',
      'Email': 'p@stripe.com',
      'Phone': '+1 (888) 926-2289',
      'Industry': 'Fintech & Payments',
      'Interests & Notes': 'Scaling unified merchant acquiring and AI fraud prevention'
    },
    {
      'Company Name': 'Vercel',
      'Website': 'vercel.com',
      'Contact Person': 'Guillermo Rauch',
      'Email': 'rauchg@vercel.com',
      'Phone': '+1 (415) 890-4421',
      'Industry': 'Cloud & Developer Tools',
      'Interests & Notes': 'Serverless AI edge infrastructure and Next.js frontend cloud'
    },
    {
      'Company Name': 'Linear',
      'Website': 'linear.app',
      'Contact Person': 'Karri Saarinen',
      'Email': 'karri@linear.app',
      'Phone': '+1 (415) 322-1082',
      'Industry': 'Productivity',
      'Interests & Notes': 'Zero-latency issue tracking, high-craft developer tools'
    },
    {
      'Company Name': 'Gymshark',
      'Website': 'gymshark.com',
      'Contact Person': 'Ben Francis',
      'Email': 'ben@gymshark.com',
      'Phone': '+44 121 555 0192',
      'Industry': 'Athletic Apparel & DTC',
      'Interests & Notes': 'Global community commerce, fitness athlete ambassador network'
    }
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(sampleRows);
  ws['!cols'] = [
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 24 },
    { wch: 18 },
    { wch: 24 },
    { wch: 45 }
  ];
  XLSX.utils.book_append_sheet(wb, ws, 'Leads Template');
  XLSX.writeFile(wb, 'PulseCRM_Leads_Upload_Template.xlsx');
}
