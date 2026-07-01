import { NewsletterData } from "./types";

export const initialNewsletterData: NewsletterData = {
  general: {
    title: "Your Smart Extended Workforce",
    subtitle: "A John Keells Group Company",
    date: "June 2026",
    edition: "Q2 2026 Partner Update",
    primaryColor: "#2596be",
    accentColor: "#f39200",
    pageBgColor: "#ffffff",
    textColor: "#1e293b",
    cardBgColor: "#f8fafc",
    darkPageBgColor: "#020617",
    darkTextColor: "#ffffff",
    logoUrl: "",
    coverImageUrl: "",
    ceoImageUrl: "",
    ceoName: "Jehan Perinpanayagam",
    ceoTitle: "Chief Executive Officer, Infomate (Pvt) Ltd",
    ceoMessage: "As we enter the second half of 2026, Infomate continues to go from strength to strength. Our partnership is founded on trust, transparency, and a relentless pursuit of process excellence. The BPM landscape is in the midst of a profound shift—driven by agentic AI, automation, and a global quest for high-caliber talent. We are not just adapting to these changes; we are leading them. As the first Sri Lankan-origin BPO featured in the Everest Group FAO PEAK Matrix®, and backed by the financial strength of John Keells Holdings PLC, we stand ready to serve as your smart extended workforce. This newsletter highlights the macro environment in Sri Lanka, key insights in the global financial arena, JKH Group performance, and our latest technological investments and social initiatives."
  },
  visiblePages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  stats: [
    {
      id: "sl-gdp",
      label: "GDP Growth Target",
      value: "5.0% - 6.0%",
      subtext: "Strong South Asian economic recovery",
      category: "sri-lanka"
    },
    {
      id: "sl-pmi",
      label: "Services PMI",
      value: "56.9",
      subtext: "Expanding professional services",
      category: "sri-lanka"
    },
    {
      id: "sl-export",
      label: "ICT/BPM Export Growth",
      value: "+60.21%",
      subtext: "Year-on-year surge (January 2026)",
      category: "sri-lanka"
    },
    {
      id: "jkh-ebitda",
      label: "JKH EBITDA Growth",
      value: "+84% YoY",
      subtext: "LKR 55.10 Billion cumulative 9-month",
      category: "jkh"
    },
    {
      id: "jkh-revenue",
      label: "JKH Q1 Revenue",
      value: "LKR 114.15B",
      subtext: "64% YoY top-line expansion",
      category: "jkh"
    },
    {
      id: "jkh-net",
      label: "Quarterly Net Income",
      value: "+128% YoY",
      subtext: "Led by leisure & transportation",
      category: "jkh"
    },
    {
      id: "info-team",
      label: "Active Professionals",
      value: "600+",
      subtext: "Highly trained domain experts",
      category: "infomate"
    },
    {
      id: "info-retention",
      label: "Senior Staff Retention",
      value: "90%",
      subtext: "Ensuring deep process continuity",
      category: "infomate"
    },
    {
      id: "info-gender",
      label: "Gender Diversity (F:M)",
      value: "60 : 40",
      subtext: "Industry-leading inclusive workplace",
      category: "infomate"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      quote: "The team at Infomate is willing to go 'above and beyond' when it comes to ensuring their deliverables are met (and normally exceeded). Infomate always work in a proactive manner to ensure an excellent service.",
      author: "VP Product Management",
      role: "VP Product Management",
      company: "Document Digitization Company",
      location: "Sweden"
    },
    {
      id: "test-2",
      quote: "Congratulations and thanks Infomate team for your relentless commitment to deliver our expectations. This very spirit worked absolutely well - you made the ride smooth for us. Let's take our partnership to its next level of excellence.",
      author: "Chief Financial Officer",
      role: "Chief Financial Officer",
      company: "Global Pharmaceutical Company",
      location: "Sri Lankan Operations"
    },
    {
      id: "test-3",
      quote: "We appreciate the hard work and commitment of the entire Infomate team and its management. We feel that our finance has an extended family at Infomate. Thank you for the excellent professional work you have done and looking forward to building efficacy and solidifying a great business partnership.",
      author: "Financial Controller",
      role: "Financial Controller",
      company: "Multinational FMCG Company",
      location: "Global"
    },
    {
      id: "test-4",
      quote: "We had the privilege of onboarding Infomate to handle our email inquiries for 10 Hotel properties including 3 City hotels and 7 Resort hotels. They handled the tasks seamlessly, meeting all KPIs assigned to them in terms of response rate, lead to conversion ratios etc. Their customer relationship management aspect is also highly commendable as they maintain a consistent dialogue with us and give us timely updates on the progress of their work.",
      author: "Director - Content Strategy",
      role: "Director - Content Strategy",
      company: "Public Relations and Communications Award Winning Hotel Chain",
      location: "Sri Lanka & Maldives"
    }
  ],
  services: [
    {
      id: "p2p",
      title: "Procure-to-Pay (P2P)",
      description: "Managing supply chain transactions seamlessly, securing payment timeliness, and optimizing working capital.",
      items: [
        "Vendor master maintenance",
        "Workflow routing & approval validation",
        "Payment processing & scheduling",
        "Spend analysis & classification",
        "Vendor reconciliations & statement matching"
      ],
      colorPreset: "bg-sky-50 text-sky-800 border-sky-200"
    },
    {
      id: "o2c",
      title: "Order-to-Cash (O2C)",
      description: "Accelerating your revenue cycle, minimizing sales friction, and protecting customer relationships with professional communications.",
      items: [
        "Customer Masters & Credit setting",
        "Order processing & compliance",
        "Customer invoicing & delivery tracking",
        "Receipting & bank matching",
        "Debtors Management & strategic follow-up"
      ],
      colorPreset: "bg-blue-50 text-blue-800 border-blue-200"
    },
    {
      id: "fam",
      title: "Fixed Asset Management",
      description: "Ensuring flawless accounting, capitalization, and physical-to-financial reconciliation of corporate assets.",
      items: [
        "Asset master file initialization",
        "Acquisitions, additions, and capitalization",
        "Depreciation run & disposals matching",
        "Asset Register maintenance & alignment"
      ],
      colorPreset: "bg-cyan-50 text-cyan-800 border-cyan-200"
    },
    {
      id: "r2r",
      title: "Record-to-Report (R2R)",
      description: "Transforming raw numbers into structured financial ledgers and actionable intelligence for your executive team.",
      items: [
        "Bank Reconciliations & multi-currency clearing",
        "General Ledger Management & adjustments",
        "Balance sheet analysis & review",
        "Variance analysis & budget tracking",
        "Fraud Analytics & audit assistance",
        "Management Dashboards & Customized MIS"
      ],
      colorPreset: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      id: "fsa",
      title: "Financial Services & Analytics",
      description: "Delivering advanced risk calculations, security checks, and high-level analytical modeling for financial products.",
      items: [
        "Credit Evaluation & Affordability Calculations",
        "Identity verification & KYC",
        "Anti-Money Laundering (AML) Checks",
        "Evaluation of application forms for loans",
        "Compilation & summarization for Underwriters",
        "P&L Analysis & performance reviews",
        "Divisional & segment reporting"
      ],
      colorPreset: "bg-indigo-50 text-indigo-800 border-indigo-200"
    }
  ],
  backOffice: [
    {
      id: "bo-1",
      title: "Shipping Documentation",
      description: "Ensuring smooth international transit with flawless manifest entry and custom papers.",
      iconName: "Ship"
    },
    {
      id: "bo-2",
      title: "KYC's AML Checks",
      description: "Rigorous customer verification and security checks to maintain regulatory compliance.",
      iconName: "ShieldAlert"
    },
    {
      id: "bo-3",
      title: "Procurement Admin",
      description: "Supporting sourcing, purchase requests, and transactional vendor communications.",
      iconName: "ShoppingCart"
    },
    {
      id: "bo-4",
      title: "Customer & Supplier Helpdesk",
      description: "Serving as a single touchpoint for inquiries, processing tickets with high SLA speed.",
      iconName: "HelpCircle"
    },
    {
      id: "bo-5",
      title: "Call Centers",
      description: "Professional multi-lingual voice services supporting inbound and outbound calls.",
      iconName: "PhoneCall"
    },
    {
      id: "bo-6",
      title: "Lead Generation",
      description: "Conducting market qualification to fuel your active sales pipeline with targeted prospects.",
      iconName: "Target"
    },
    {
      id: "bo-7",
      title: "Data Entry & Image Annotation",
      description: "Delivering clean labels and structured schemas to fuel databases and AI models.",
      iconName: "FileText"
    },
    {
      id: "bo-8",
      title: "Process Mapping",
      description: "Drafting current state, standardizing SOPs, and engineering future-state workflows.",
      iconName: "GitMerge"
    },
    {
      id: "bo-9",
      title: "Payroll & HR Outsourcing",
      description: "Processing employee logs, calculating payroll, and handling contract admin securely.",
      iconName: "Users"
    }
  ],
  team: [
    {
      role: "CEO",
      experience: "30 years experience",
      count: "1",
      qualifications: "FCCA, FCMA, MBA"
    },
    {
      role: "COO",
      experience: "20 years experience",
      count: "1",
      qualifications: "FCMA, MBA"
    },
    {
      role: "Managers",
      experience: "20 years experience",
      count: "7",
      qualifications: "Degree/CA, ACCA, CIMA qualified"
    },
    {
      role: "Assistant Managers",
      experience: "7-10 years experience",
      count: "35",
      qualifications: "Degree/CA, ACCA, CIMA qualified"
    },
    {
      role: "Team Leaders",
      experience: "5+ years experience",
      count: "80",
      qualifications: "Degree/finalists in ACCA, CIMA, CA"
    },
    {
      role: "Senior Associate & Associate",
      experience: "1-5 years experience",
      count: "480",
      qualifications: "Degree/part qualified in ACCA, CIMA, CA"
    }
  ],
  social: [
    {
      id: "soc-1",
      title: "Child Action Lanka Collaboration",
      badge: "Education",
      description: "Infomate collaborates with Child Action Lanka, supporting projects that enhance the well-being and education of underprivileged children with an emphasis on career life skills and employment.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "soc-2",
      title: "Sri Lanka's First Rural BPO",
      badge: "Employment",
      description: "Our pioneering Rural Business Process Outsourcing (BPO) initiative provides employment opportunities in rural areas, fostering local economic development and reducing the urban-rural divide.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "soc-3",
      title: "Career Guidance & Tree Planting",
      badge: "Environment",
      description: "From career workshops for undergraduates to active participation in local beach cleanups and tree-planting drives, Infomate keeps sustainability and social responsibility at the core of our culture.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    }
  ],
  valueProps: [
    {
      number: 1,
      title: "Recommendations & Best Practices",
      description: "Drawing on two decades of process engineering to offer strategic workflow modifications."
    },
    {
      number: 2,
      title: "Focus on Your Core Business",
      description: "We handle time-consuming, administrative, and repetitive tasks, freeing your team for strategic growth."
    },
    {
      number: 3,
      title: "Highly Scalable Talent Pool",
      description: "Tap into an elastic team with immediate capacity adjustments to support seasonality and volume spikes."
    },
    {
      number: 4,
      title: "Multi-Industry Cross-Pollination",
      description: "Benefiting from operational models tested across hotels, retail, finance, telecom, and healthcare."
    },
    {
      number: 5,
      title: "Committed SLA & KPI Rigor",
      description: "Every process is strictly measured, documented, and reported through transparent monthly dashboard audits."
    },
    {
      number: 6,
      title: "Backed by Sri Lanka's No.1 Corporate",
      description: "Backed by the multi-billion rupee strength, governance, and ethics of John Keells Holdings PLC (JKH)."
    },
    {
      number: 7,
      title: "Personalized Partner Attention",
      description: "We are an agile boutique-feel extended workforce, avoiding faceless giant bureaucracy."
    },
    {
      number: 8,
      title: "Cost Efficiency & Variabilization",
      description: "Convert fixed staffing overheads into variable, transaction-linked costs to preserve cash flow."
    }
  ]
};
