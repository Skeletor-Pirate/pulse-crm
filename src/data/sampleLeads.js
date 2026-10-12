export const initialSampleLeads = [
  {
    id: "lead_001",
    name: "Guillermo Rauch",
    email: "rauchg@vercel.com",
    title: "Chief Executive Officer",
    company: "Vercel",
    website: "vercel.com",
    industry: "Cloud & Developer Tools",
    stage: "Enriched by Swarm", // 'Imported', 'Enriched by Swarm', 'Email Drafted', 'Outreach Sent', 'Replied', 'Deal Won'
    confidenceScore: 98,
    leadValue: "$24,000",
    phone: "+1 (415) 890-4421",
    notes: "Focused on frontend cloud DX, Next.js 15, and serverless AI edge caching.",
    dossier: {
      domain: "vercel.com",
      title: "Vercel: Build and deploy the best Web experiences",
      description: "Vercel's Frontend Cloud provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.",
      valueProp: "Enabling teams to deploy web apps globally with instant serverless scale and zero infrastructure overhead.",
      painPoints: [
        "Optimizing cold start times for heavy AI edge functions",
        "Managing enterprise team access control and observability costs",
        "Converting free-tier hobbyists into enterprise contract tiers"
      ],
      targetAudience: "Engineering VPs, Lead Frontend Architects, Fast-moving Startups",
      techStack: ["Next.js", "React", "Tailwind CSS", "Stripe", "Turbopack"],
      detectedEmails: ["press@vercel.com", "sales@vercel.com"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/vercel",
        twitter: "https://twitter.com/vercel",
        github: "https://github.com/vercel"
      },
      favicon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
      logo: "https://logo.clearbit.com/vercel.com"
    },
    draftedEmail: {
      subject: "scaling vercel edge AI observability",
      subjectAlt: "guillermo x pulsecrm - quick note",
      icebreaker: "Noticed Vercel's recent push on serverless v0 templates — the speed of the iteration loop is unreal.",
      body: `Hi Guillermo,\n\nNoticed Vercel's recent push on serverless v0 templates — the speed of the iteration loop is unreal.\n\nSeeing your growth in Cloud & Developer Tools, I imagined your sales engineering team might be running into bottlenecks around optimizing customer acquisition workflows and converting high-usage free users to enterprise contracts.\n\nWe built PulseFlow specifically to solve this through autonomous CRM lead enrichment and hyper-personalized cold outreach pipelines. Teams similar to Vercel have cut manual prospecting cycles by 70% in their first 30 days.\n\nWould you be open to a 10-minute coffee chat this Thursday?\n\nWarm regards,\nAlex Morgan\nPulseFlow AI`,
      sequence: [
        {
          stage: "Initial Cold Email",
          day: "Day 1",
          subject: "scaling vercel edge AI observability",
          body: `Hi Guillermo,\n\nNoticed Vercel's recent push on serverless v0 templates — the speed of the iteration loop is unreal.\n\nSeeing your growth in Cloud & Developer Tools, I imagined your team might be running into bottlenecks around manual lead enrichment taking up hours of reps' daily focus.\n\nWe built PulseFlow specifically to solve this through autonomous CRM scraping. Would you be open to a 10-minute coffee chat this Thursday?\n\nBest,\nAlex Morgan`
        },
        {
          stage: "Value-Add Follow-up",
          day: "Day 3",
          subject: "re: scaling vercel edge AI observability",
          body: `Hi Guillermo,\n\nQuick follow-up on my note below. I put together a 2-page benchmark on how another developer platform drove 3.4x more enterprise inbound through automated prospect reconnaissance.\n\nHappy to send it over if you'd like a quick glance.\n\nBest,\nAlex`
        }
      ]
    }
  },
  {
    id: "lead_002",
    name: "Patrick Collison",
    email: "p@stripe.com",
    title: "Chief Executive Officer",
    company: "Stripe",
    website: "stripe.com",
    industry: "Fintech & Payments",
    stage: "Email Drafted",
    confidenceScore: 96,
    leadValue: "$75,000",
    phone: "+1 (888) 926-2289",
    notes: "Global economic infrastructure, enterprise billing automation, unified commerce.",
    dossier: {
      domain: "stripe.com",
      title: "Stripe | Financial Infrastructure for the Internet",
      description: "Millions of companies of all sizes use Stripe online and in person to accept payments, send payouts, and manage their businesses.",
      valueProp: "Powering the internet GDP by providing programmable APIs for payments, payouts, and billing.",
      painPoints: [
        "Expanding revenue recognition automation across multi-currency jurisdictions",
        "Preventing enterprise merchant churn during complex ERP integrations",
        "Personalizing outbound messaging to mid-market CFOs"
      ],
      targetAudience: "Global CFOs, E-commerce Tech Leads, Global SaaS Founders",
      techStack: ["Ruby", "React", "GraphQL", "Custom Microservices"],
      detectedEmails: ["support@stripe.com", "sales@stripe.com"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/stripe",
        twitter: "https://twitter.com/stripe"
      },
      favicon: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128",
      logo: "https://logo.clearbit.com/stripe.com"
    },
    draftedEmail: {
      subject: "streamlining stripe's enterprise merchant outreach",
      subjectAlt: "patrick <> pulsecrm - financial pipelines",
      icebreaker: "Always admired how Stripe turned tedious payment rails into an elegant, developer-first art form.",
      body: `Hi Patrick,\n\nAlways admired how Stripe turned tedious payment rails into an elegant, developer-first art form.\n\nMost leaders in Fintech & Payments we speak with struggle with scaling outbound pipeline without ballooning sales headcount.\n\nAt PulseFlow, our platform delivers autonomous scraper swarms and context-aware cold outreach, directly eliminating prospecting friction.\n\nWould you be open to a brief 10-minute touchpoint sometime this week?\n\nBest regards,\nAlex Morgan\nPulseFlow AI`
    }
  },
  {
    id: "lead_003",
    name: "Karri Saarinen",
    email: "karri@linear.app",
    title: "Co-Founder & CEO",
    company: "Linear",
    website: "linear.app",
    industry: "Productivity & Issue Tracking",
    stage: "Outreach Sent",
    confidenceScore: 94,
    leadValue: "$18,000",
    phone: "+1 (415) 322-1082",
    notes: "Obsessed with speed, keyboard shortcuts, craft, and fluid engineering workflows.",
    dossier: {
      domain: "linear.app",
      title: "Linear: A better way to build products",
      description: "Linear is a purpose-built tool for planning and building products. Streamline issues, projects, and product roadmaps.",
      valueProp: "Unprecedented speed, craft, and clarity for modern product teams.",
      painPoints: [
        "Educating non-technical project managers accustomed to legacy Jira",
        "Accelerating enterprise customer discovery loops",
        "Connecting CRM pipelines seamlessly with product feedback cycles"
      ],
      targetAudience: "Product Managers, Software Engineers, Design Leads",
      techStack: ["React", "TypeScript", "Tailwind CSS", "WebSockets"],
      detectedEmails: ["hello@linear.app"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/linear-app",
        twitter: "https://twitter.com/linear"
      },
      favicon: "https://www.google.com/s2/favicons?domain=linear.app&sz=128",
      logo: "https://logo.clearbit.com/linear.app"
    },
    draftedEmail: {
      subject: "speed & precision for linear's outbound motion",
      body: `Hi Karri,\n\nYour dedication to keyboard-first latency and product craft has completely redefined B2B software aesthetics.\n\nCurious how your growth team is currently handling high-velocity prospect enrichment for high-growth tech accounts?\n\nPulseFlow brings the same zero-lag philosophy to outbound sales through autonomous agent swarms.\n\nWould you be open to a 5-minute video exchange?\n\nBest,\nAlex Morgan`
    }
  },
  {
    id: "lead_004",
    name: "Paul Copplestone",
    email: "paul@supabase.com",
    title: "CEO & Co-Founder",
    company: "Supabase",
    website: "supabase.com",
    industry: "Database & Backend Infrastructure",
    stage: "Replied",
    confidenceScore: 97,
    leadValue: "$32,000",
    phone: "+1 (650) 412-8991",
    notes: "Open source Firebase alternative, Postgres, vector search, edge auth.",
    dossier: {
      domain: "supabase.com",
      title: "Supabase | The Open Source Firebase Alternative",
      description: "Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.",
      valueProp: "Providing every developer with enterprise-grade Postgres superpowers in under 2 minutes.",
      painPoints: [
        "Attracting enterprise teams running legacy Oracle/RDS workloads",
        "Managing multi-region database replication overhead",
        "Engaging AI builders seeking vector database integrations"
      ],
      targetAudience: "Full-Stack Developers, Cloud Architects, AI Engineers",
      techStack: ["PostgreSQL", "Go", "Next.js", "Docker", "Stripe"],
      detectedEmails: ["beta@supabase.com", "careers@supabase.com"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/supabase",
        twitter: "https://twitter.com/supabase",
        github: "https://github.com/supabase"
      },
      favicon: "https://www.google.com/s2/favicons?domain=supabase.com&sz=128",
      logo: "https://logo.clearbit.com/supabase.com"
    },
    draftedEmail: {
      subject: "scaling enterprise postgres outbound",
      body: `Hi Paul,\n\nHuge fan of Supabase's open-source launch weeks and Postgres-first philosophy.\n\nWe noticed enterprise leads frequently ask about vector databases and auth migration from Firebase.\n\nOur CRM engine synthesizes target dev-stack signals automatically so your team can reach architects at the exact moment they need migration assistance.\n\nLet's chat if you have 10 mins this week!\n\nWarmly,\nAlex Morgan`
    }
  },
  {
    id: "lead_005",
    name: "Zeno Rocha",
    email: "zeno@resend.com",
    title: "Founder & CEO",
    company: "Resend",
    website: "resend.com",
    industry: "Developer Tools & Email API",
    stage: "Deal Won",
    confidenceScore: 99,
    leadValue: "$48,000",
    phone: "+1 (310) 902-8812",
    notes: "Email for developers, React Email, high deliverability, exceptional DX.",
    dossier: {
      domain: "resend.com",
      title: "Resend - Email for developers",
      description: "The best API to reach humans instead of spam folders. Build, test, and deliver transactional and marketing emails with React.",
      valueProp: "Modernizing email delivery with modern React components and first-class API developer ergonomics.",
      painPoints: [
        "Educating teams on IP warmup and DKIM/DMARC deliverability protocols",
        "Overcoming legacy SendGrid and Mailgun account lock-in",
        "Automating custom outreach to high-volume SaaS founders"
      ],
      targetAudience: "Founders, CTOs, Senior Software Engineers",
      techStack: ["React Email", "Next.js", "TypeScript", "Tailwind CSS"],
      detectedEmails: ["help@resend.com"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/resend",
        twitter: "https://twitter.com/resend"
      },
      favicon: "https://www.google.com/s2/favicons?domain=resend.com&sz=128",
      logo: "https://logo.clearbit.com/resend.com"
    },
    draftedEmail: {
      subject: "react email + autonomous scraper pipelines",
      body: `Hi Zeno,\n\nResend and React Email have set a totally new benchmark for what modern email developer experience should feel like.\n\nWe integrate Resend natively in PulseFlow to dispatch AI-curated outreach with zero bounce rates.\n\nWould love to show you how our mutual customers are leveraging the pipeline!\n\nCheers,\nAlex Morgan`
    }
  },
  {
    id: "lead_006",
    name: "David Cramer",
    email: "cramer@sentry.io",
    title: "Founder & Advisor",
    company: "Sentry",
    website: "sentry.io",
    industry: "Application Performance & Error Monitoring",
    stage: "Imported",
    confidenceScore: 88,
    leadValue: "$36,000",
    phone: "+1 (415) 555-0199",
    notes: "Full-stack code observability, crash reporting, session replay.",
    dossier: null,
    draftedEmail: null
  },
  {
    id: "lead_007",
    name: "Dylan Field",
    email: "dylan@figma.com",
    title: "Chief Executive Officer",
    company: "Figma",
    website: "figma.com",
    industry: "Collaborative Design Software",
    stage: "Imported",
    confidenceScore: 91,
    leadValue: "$85,000",
    phone: "+1 (415) 555-0244",
    notes: "Design systems, Figma AI, FigJam, browser-first canvas collaboration.",
    dossier: null,
    draftedEmail: null
  }
];

export const sampleImportBatches = [
  {
    id: 'batch_saas',
    name: 'Top Tier AI & Cloud Unicorns (8 Leads)',
    leads: [
      { name: 'Guillermo Rauch', company: 'Vercel', website: 'vercel.com', email: 'rauchg@vercel.com', industry: 'Cloud & Developer Tools' },
      { name: 'Patrick Collison', company: 'Stripe', website: 'stripe.com', email: 'p@stripe.com', industry: 'Fintech & Payments' },
      { name: 'Karri Saarinen', company: 'Linear', website: 'linear.app', email: 'karri@linear.app', industry: 'Productivity' },
      { name: 'Paul Copplestone', company: 'Supabase', website: 'supabase.com', email: 'paul@supabase.com', industry: 'Database & Backend' },
      { name: 'Zeno Rocha', company: 'Resend', website: 'resend.com', email: 'zeno@resend.com', industry: 'Email Infrastructure' },
      { name: 'David Cramer', company: 'Sentry', website: 'sentry.io', email: 'cramer@sentry.io', industry: 'Monitoring' },
      { name: 'Dylan Field', company: 'Figma', website: 'figma.com', email: 'dylan@figma.com', industry: 'Design Systems' },
      { name: 'Aravind Srinivas', company: 'Perplexity AI', website: 'perplexity.ai', email: 'aravind@perplexity.ai', industry: 'Artificial Intelligence' }
    ]
  },
  {
    id: 'batch_ecommerce',
    name: 'DTC Brands & High-Growth E-Commerce (5 Leads)',
    leads: [
      { name: 'Ben Francis', company: 'Gymshark', website: 'gymshark.com', email: 'ben@gymshark.com', industry: 'Athletic Apparel' },
      { name: 'Emily Weiss', company: 'Glossier', website: 'glossier.com', email: 'emily@glossier.com', industry: 'Beauty & Skincare' },
      { name: 'Neil Blumenthal', company: 'Warby Parker', website: 'warbyparker.com', email: 'neil@warbyparker.com', industry: 'Eyewear & DTC' },
      { name: 'Joey Zwillinger', company: 'Allbirds', website: 'allbirds.com', email: 'joey@allbirds.com', industry: 'Sustainable Footwear' },
      { name: 'Philip Krim', company: 'Casper', website: 'casper.com', email: 'philip@casper.com', industry: 'Home & Sleep' }
    ]
  }
];
