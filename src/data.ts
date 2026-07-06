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
  visiblePages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
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
  ],
  page3: {
    subtitle: "01 · Regional Horizon",
    title: "Sri Lankan Economy Gathering Historic Momentum",
    description: "Sri Lanka's turnaround remains one of Asia's most compelling growth narratives. With strong policy support and expanding services trade, the country positions itself as an optimal, secure global hub.",
    accolades: [
      { title: "#1 Most Beautiful", subtitle: "Island - Big 7 Travel" },
      { title: "Most Family Friendly", subtitle: "Remitly Global Survey" },
      { title: "#7 Friendliest Country", subtitle: "Condé Nast Traveler" },
      { title: "Jaffna - Top Destination", subtitle: "Lonely Planet" }
    ],
    commentaryTitle: "ICT/BPM Export Explosion",
    commentaryText: "Overall services exports shot up by 24.59% in early 2026, driven directly by a stunning 60.21% year-on-year surge in ICT and business process management services. Colombo remains the regional nucleus for specialized finance outsourcing.",
    tagline: "Zero-rated VAT compliance for exporters in place"
  },
  page4: {
    subtitle: "02 · Financial Horizons",
    title: "Tectonic Shifts in the Global Financial Arena",
    description: "CFOs and treasury heads are managing three dramatic transitions that require increased compliance, deep analytical support, and back-office agility.",
    trends: [
      { title: "The $256T Shadow Banking Shift", text: "Non-bank financial institutions (NBFIs) now manage over half of global financial assets, peaking at USD 256.8 Trillion. Higher leverage increases the demand for strict risk modeling and compliance auditing." },
      { title: "Surging Private Credit", text: "Private credit continues to swell, matching USD 2.1 Trillion globally. CFOs seek rapid-origination capital to manage USD 620B of maturing corporate high-yield bonds due through 2027." },
      { title: "Agentic AI as Operating System", text: "70% of financial firms have transitioned from basic pilots to agentic AI workflows. 16% are fully automated in key compliance lines, leveraging human-in-the-loop oversight to ensure strict ledger safety." }
    ],
    takeawayTitle: "HOW INFOMATE RESPONDS",
    takeawayText: "We blend deep human accounting talent with specialized Robotic Process Automation (RPA) to help your treasury absorb these shifts with minimal friction.",
    takeawayLink: "View F&A stacks on page 7"
  },
  page5: {
    subtitle: "03 · Solid Corporate Backing",
    title: "John Keells Holdings PLC: Sri Lanka's Pre-eminent Corporate",
    description: "Infomate is a wholly-owned subsidiary of JKH, the largest listed conglomerate on the Colombo Stock Exchange. This backing provides unmatched financial stability and enterprise-grade governance.",
    projects: [
      { title: "CWIT Deep Terminal", text: "Strategic USD 840M port project in Colombo handling over 717,000 TEUs in its debut year." },
      { title: "Cinnamon Life mixed-use", text: "Colombo's landmark luxury destination, transforming regional luxury tourism and gaming/leisure." },
      { title: "BYD New Energy Vehicles", text: "Strong partnership launched to spearhead sustainable EV vehicle distribution." }
    ],
    commitmentsTitle: "Carbon & Environment Commitments",
    commitmentsText: "John Keells Holdings' commitment to sustainability translates directly to Infomate. Across our combined operations, carbon footprint per million rupees of revenue declined by 8.3%, and water withdrawal declined by 9.5% over the fiscal quarters.",
    commitmentsTag: "Adhering to UN Global Compact values",
    imageUrl: ""
  },
  page6: {
    badge: "Historic Achievement in FAO BPM",
    title: "The First Sri Lankan-Origin BPO Featured in Everest Group's PEAK Matrix®",
    description: "In their 2025 Finance and Accounting Outsourcing (FAO) Services PEAK Matrix Assessment, Everest Group named Infomate as an outstanding provider in the SMB and mid-market-focused segment.",
    quote: "Infomate is an SMB and mid-market-focused provider with strong expertise in delivering end-to-end transactional F&A services such as AP, AR, and general accounting, along with industry-contextualized services... Its strong document management and supplier portal capabilities, combined with positive client feedback, contributed to its position.",
    quoteAuthor: "Shirley Hung",
    quoteAuthorTitle: "Partner, Everest Group",
    quoteCategory: "Aspirant Category Listed",
    bullet1: "SSAE 18 Type II and ISO 27001 controls verified.",
    bullet2: "Over 20 years of continuous global F&A delivery.",
    imageUrl: "/FAO2025.jpeg",
    imageHeight: 180,
    imageWidth: 100,
    imagePosition: "bottom",
    imageFit: "contain"
  },
  page8: {
    subtitle: "05 · Extended Operations",
    title: "Back Office Portfolios & Automation DRIVE",
    description: "Beyond core finance, we optimize your wider business operations using process mapping and automated workflows.",
    servicesTitle: "Portfolio of Back Office Services",
    automationTitle: "Process Excellence DRIVE",
    complianceText: "SSAE 18 and GDPR Compliant Workflows",
    imageUrl: ""
  },
  page9: {
    subtitle: "06 · Professional Roster",
    title: "Infomate Team Structure & Global Footprint",
    description: "Operating securely across prime international markets, backed by qualified chartered, management, and cost accountants.",
    hubsTitle: "Primary Global Hubs",
    hubs: [
      { title: "United Kingdom", desc: "Financial & BPO Services Hub" },
      { title: "United States & Canada", desc: "Tech & Analytics Talent" },
      { title: "Australia", desc: "Operations, logistics & finance support" }
    ],
    imageUrl: ""
  },
  page10: {
    subtitle: "07 · Why Partner With Us",
    title: "Our Eight-Fold Value Proposition",
    socialTitle: "ESG & Social Initiatives",
    imageUrl: ""
  },
  page11: {
    subtitle: "08 · Employee Wellness",
    title: "Wellness in Focus: A Holistic Approach to Health",
    description: "Infomate recently conducted an insightful Wellness Program for our staff, focusing on building awareness and promoting healthier lifestyles.",
    bullet1: "Non-Communicable Diseases (NCDs) such as diabetes and heart disease.",
    bullet2: "Effective recovery modalities including rest, movement, and stress management.",
    bullet3: "A 360-degree holistic approach to wellness, addressing physical, mental, emotional, and lifestyle aspects.",
    tagline: "Inspiring everyone to prioritize their health and well-being.",
    imageUrl: "",
    imageHeight: 192,
    imageWidth: 40,
    imagePosition: "right",
    imageFit: "cover"
  },
  page12: {
    subtitle: "09 · Office Vibrancy",
    title: "Valentine’s Day Karaoke Night – Event Write-Up",
    description: "Love was in the air everywhere we turned… and so were the high notes!",
    highlights: "Our Valentine’s Day Karaoke Evening at Infomate turned into a stage full of stars! From power ballads to classic sing-alongs and everyone’s all-time favorite hits, the evening was filled with laughter, music, and unforgettable performances. Whether hitting the high notes perfectly or just singing their hearts out, our team truly brought the energy and vibes.",
    tagline: "More than just karaoke - a celebration of fun, friendship, and fearless singing!",
    imageUrl: "",
    imageHeight: 200,
    imageWidth: 40,
    imagePosition: "left",
    imageFit: "cover"
  },
  page13: {
    subtitle: "10 · Diversity & Inclusion",
    title: "Women’s Career Growth (International Women’s Day 2026)",
    description: "In celebration of International Women’s Day 2026, Infomate organized an engaging panel discussion titled “Navigating Career Growth as a Woman: Challenges, Choices & Confidence.”",
    panelTitle: "Navigating Career Growth as a Woman",
    panelText: "The session brought together inspiring female leaders and male leaders who shared their personal career journeys, the challenges they have encountered, and the choices that have shaped their professional growth. Through open and insightful discussions, the panel encouraged participants to embrace confidence, pursue opportunities, and support one another in their career paths.",
    tagline: "Empowering women and fostering inclusive workplaces where individuals can grow and thrive.",
    imageUrl: "",
    imageHeight: 192,
    imageWidth: 35,
    imagePosition: "right",
    imageFit: "cover"
  },
  page14: {
    subtitle: "11 · Learning & Development",
    title: "Infomate Commences the 2026 MATE Talk Series",
    description: "We kicked off the first MATE Talk Series for the year with an inspiring and thought-provoking panel discussion on “Beyond the Ladder: Crafting Meaningful Careers.”",
    speaker1Name: "Yolan Seimon",
    speaker1Title: "Head of Data and Advanced Analytics, OCTAVE",
    speaker1Desc: "Yolan's journey from an intern to leading Data and Advanced Analytics at OCTAVE shows the power of continuous learning.",
    speaker2Name: "Yasasi Perera",
    speaker2Title: "Assistant Director – Finance, Cinnamon Life Integrated Resort",
    speaker2Desc: "Yasasi's progression from a non-executive role to Assistant Director demonstrates resilience and dedication.",
    takeaway: "The discussion went beyond the traditional notion of climbing the corporate ladder, encouraging participants to reflect on personal growth, adaptability, and defining success on their own terms. The panelists also shared valuable advice on embracing opportunities, navigating challenges, and staying committed to long-term career development.",
    imageUrl: "",
    imageHeight: 100,
    imageWidth: 35,
    imagePosition: "right",
    imageFit: "cover"
  },
  page15: {
    subtitle: "12 · Cultural Celebrations",
    title: "Vesak Office Decoration Competition",
    description: "In celebration of Vesak, Infomate organized an engaging Vesak Decoration Competition across our office floors, encouraging teams to showcase their creativity while embracing the spirit of the season.",
    details: "The initiative brought employees together to design and decorate their respective spaces with meaningful Vesak themes, reflecting values of peace, compassion, and togetherness. From traditional lanterns and thematic displays to thoughtfully crafted decorations, each team contributed to making the celebration truly special and transforming their floors into vibrant displays of cultural artistry.",
    tagline: "Strengthening team spirit, collaboration, and cultural appreciation among employees.",
    imageUrl: "",
    imageHeight: 192,
    imageWidth: 40,
    imagePosition: "right",
    imageFit: "cover"
  },
  page16: {
    subtitle: "13 · Community Spirit",
    title: "Vesak Celebrations with Meaningful Dansala Initiatives",
    description: "As part of the Vesak celebrations, Infomate employees came together to embrace the spirit of generosity, sharing, and community through two special Dansala initiatives.",
    teamPageroText: "Team Pagero organized a refreshing Popsicle Ice Cream Dansala, sharing refreshing treats to bring a festive and welcoming atmosphere.",
    teamFinanceText: "The Ultimate Finance Team hosted a traditional Kimbula Bun Dansala, creating opportunities for employees to experience the joy of giving and togetherness.",
    tagline: "A wonderful reminder of the importance of giving back and coming together as one Infomate family.",
    imageUrl: "",
    imageHeight: 192,
    imageWidth: 40,
    imagePosition: "right",
    imageFit: "cover"
  }
};
