import React from "react";
import { NewsletterData, StatCard, ServicePillar, BackOfficeService, TeamRole, SocialInitiative, ValueProposition } from "../types";
import { Logo } from "./Logo";
import { 
  TrendingUp, 
  Compass, 
  DollarSign, 
  Building2, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  Users, 
  CheckCircle2, 
  Heart, 
  Cpu, 
  Layers, 
  Ship, 
  ShieldAlert, 
  ShoppingCart, 
  HelpCircle, 
  PhoneCall, 
  Target, 
  FileText, 
  GitMerge,
  MapPin,
  ChevronRight,
  Quote,
  Star,
  Check
} from "lucide-react";

interface NewsletterPageProps {
  pageNumber: number;
  data: NewsletterData;
}

export function NewsletterPage({ pageNumber, data }: NewsletterPageProps) {
  const primaryColor = data.general.primaryColor;
  const accentColor = data.general.accentColor;

  // Icon mapper helper
  const getIconComponent = (name: string) => {
    switch (name) {
      case "Ship": return <Ship className="w-5 h-5 text-sky-600" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case "ShoppingCart": return <ShoppingCart className="w-5 h-5 text-emerald-600" />;
      case "HelpCircle": return <HelpCircle className="w-5 h-5 text-indigo-500" />;
      case "PhoneCall": return <PhoneCall className="w-5 h-5 text-amber-500" />;
      case "Target": return <Target className="w-5 h-5 text-orange-500" />;
      case "FileText": return <FileText className="w-5 h-5 text-blue-500" />;
      case "GitMerge": return <GitMerge className="w-5 h-5 text-purple-600" />;
      case "Users": return <Users className="w-5 h-5 text-teal-600" />;
      default: return <Briefcase className="w-5 h-5 text-slate-500" />;
    }
  };

  // Common Header of pages
  const PageHeader = ({ sectionName }: { sectionName: string }) => (
    <div className="flex items-center justify-between pb-3 border-b mb-6 select-none" style={{ borderColor: `${data.general.textColor || "#1e293b"}15` }}>
      <Logo primaryColor={primaryColor} accentColor={accentColor} size="lg" logoUrl={data.general.logoUrl} />
      <div className="text-right">
        <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: `${data.general.textColor || "#1e293b"}60` }}>{data.general.edition}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
          {sectionName}
        </span>
      </div>
    </div>
  );

  // Common Footer of pages
  const PageFooter = ({ pageNo }: { pageNo: number }) => {
    const actualPages = data.visiblePages || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const displayPageNo = actualPages.indexOf(pageNo) + 1;

    return (
      <div className="flex items-center justify-between pt-4 border-t mt-auto text-[10px] font-bold select-none" style={{ borderColor: `${data.general.textColor || "#1e293b"}15`, color: `${data.general.textColor || "#1e293b"}60` }}>
        <span>© 2026 Infomate (Pvt) Ltd · Confidential Partner Portfolio</span>
        <span className="flex items-center gap-1">
          <span>Page</span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-white font-black text-[9px]" style={{ backgroundColor: primaryColor }}>
            {displayPageNo > 0 ? displayPageNo : pageNo}
          </span>
        </span>
      </div>
    );
  };

  switch (pageNumber) {
    // ----------------------------------------------------
    // PAGE 1: COVER PAGE
    // ----------------------------------------------------
    case 1:
      return (
        <div 
          className="h-full flex flex-col justify-between relative overflow-hidden p-12"
          style={{ 
            backgroundColor: data.general.darkPageBgColor || "#020617",
            color: data.general.darkTextColor || "#ffffff"
          }}
        >
          {/* Subtle background overlays */}
          {data.general.coverImageUrl ? (
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.75), rgba(2, 6, 23, 0.9)), url(${data.general.coverImageUrl})` 
              }} 
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/60 via-slate-950 to-slate-950 z-0" />
              <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: primaryColor }} />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: accentColor }} />
            </>
          )}
          
          {/* Brand Logo Grid Header */}
          <div className="relative z-10 flex justify-between items-start">
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-lg">
              <Logo primaryColor="#FFFFFF" accentColor={accentColor} size="xl" logoUrl={data.general.logoUrl} />
            </div>
            <div className="text-right bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold">
              <span className="text-orange-400 uppercase tracking-widest font-extrabold block text-[10px] mb-0.5" style={{ color: accentColor }}>EXCLUSIVE PARTNER REVIEW</span>
              <span className="text-slate-300">{data.general.date} Edition</span>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="relative z-10 my-auto max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-400">
              <Award className="w-4 h-4 text-orange-400" style={{ color: accentColor }} />
              <span>Sri Lanka's Premier F&amp;A Outsourcing Partner</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
              {data.general.title.split(" ").map((word, i) => (
                <span key={i} className={i >= 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-500" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Co-creating back-office intelligence and scaling operations for world-class enterprises. Empowering your core team through Sri Lanka's finest financial and professional talent pools.
            </p>

            {/* Quick Chips Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
                <span className="text-xl font-extrabold text-orange-400 block" style={{ color: accentColor }}>20+</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Years Experience</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
                <span className="text-xl font-extrabold text-sky-400 block">600+</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Professionals</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
                <span className="text-xl font-extrabold text-emerald-400 block">Everest</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Matrix Listed</span>
              </div>
            </div>
          </div>

          {/* Footer of the cover */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <span className="font-bold text-slate-400">Infomate (Pvt) Ltd</span> · A John Keells Holdings PLC Wholly Owned Subsidiary
            </div>
            <div className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">
              CONFIDENTIAL · Q2 2026
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // PAGE 2: CEO GREETING & TABLE OF CONTENTS
    // ----------------------------------------------------
    case 2:
      return (
        <div 
          className="h-full flex flex-col justify-between p-10"
          style={{ 
            backgroundColor: data.general.pageBgColor || "#ffffff",
            color: data.general.textColor || "#1e293b"
          }}
        >
          <PageHeader sectionName="Executive Corner" />
          
          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            {/* CEO block (8 columns) */}
            <div className="col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                <Quote className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>Leader's perspective</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                A Message From Our Chief Executive
              </h2>
              
              <div className="flex gap-4 items-start">
                {data.general.ceoImageUrl && (
                  <img 
                    src={data.general.ceoImageUrl} 
                    alt={data.general.ceoName} 
                    className="w-20 h-20 rounded-xl object-cover border shadow-sm shrink-0" 
                    style={{ borderColor: `${data.general.textColor || "#1e293b"}20` }}
                  />
                )}
                <div className="relative pl-6 border-l-4" style={{ borderColor: primaryColor }}>
                  <p className="text-xs sm:text-sm leading-relaxed italic" style={{ color: `${data.general.textColor || "#1e293b"}e0` }}>
                    "{data.general.ceoMessage}"
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-extrabold block text-sm" style={{ color: data.general.textColor }}>{data.general.ceoName}</span>
                <span className="text-xs font-semibold" style={{ color: `${data.general.textColor || "#1e293b"}99` }}>{data.general.ceoTitle}</span>
              </div>
            </div>

            {/* Quick TOC / Index Card (4 columns) */}
            <div 
              className="col-span-4 rounded-2xl border p-5 space-y-4"
              style={{ 
                backgroundColor: data.general.cardBgColor || "#f8fafc", 
                borderColor: `${data.general.textColor || "#1e293b"}10` 
              }}
            >
              <span className="text-xs font-black uppercase text-slate-500 tracking-widest block">In This Issue</span>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]">01</span>
                  <span className="font-semibold text-slate-700">Sri Lanka Macro Horizona</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]">02</span>
                  <span className="font-semibold text-slate-700">Global Financial Tectonics</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]">03</span>
                  <span className="font-semibold text-slate-700">John Keells Performance</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]">04</span>
                  <span className="font-semibold text-slate-700">Everest Peak Matrix 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]">05</span>
                  <span className="font-semibold text-slate-700">Service Portfolios &amp; Team</span>
                </div>
              </div>

              <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-100/50">
                <span className="text-[10px] font-bold text-sky-800 uppercase tracking-widest block mb-1">Corporate Office</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  No. 4 Layden Bastian Road, Colombo 01, Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          <PageFooter pageNo={2} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 3: SRI LANKA HORIZON (MACRO FOCUS)
    // ----------------------------------------------------
    case 3:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Macro Environment" />

          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>01 · Regional Horizon</span>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                Sri Lankan Economy Gathering Historic Momentum
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
                Sri Lanka's turnaround remains one of Asia's most compelling growth narratives. With strong policy support and expanding services trade, the country positions itself as an optimal, secure global hub.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {data.stats.filter(s => s.category === "sri-lanka").map((stat) => (
                <div key={stat.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group hover:border-sky-300 transition-all">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sky-500/10 to-transparent rounded-tr-2xl" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{stat.label}</span>
                  <span className="text-2xl font-black block tracking-tight" style={{ color: primaryColor }}>{stat.value}</span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-1 leading-tight">{stat.subtext}</span>
                </div>
              ))}
            </div>

            {/* Accolades & Commentary */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-widest flex items-center gap-1">
                  <Globe className="w-4 h-4 text-sky-600" />
                  Island Accolades (2025/2026)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <span className="font-extrabold text-slate-800 block">#1 Most Beautiful</span>
                    <span className="text-[10px] text-slate-400">Island - Big 7 Travel</span>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <span className="font-extrabold text-slate-800 block">Most Family Friendly</span>
                    <span className="text-[10px] text-slate-400">Remitly Global Survey</span>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <span className="font-extrabold text-slate-800 block">#7 Friendliest Country</span>
                    <span className="text-[10px] text-slate-400">Condé Nast Traveler</span>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <span className="font-extrabold text-slate-800 block">Jaffna - Top Destination</span>
                    <span className="text-[10px] text-slate-400">Lonely Planet</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 flex flex-col justify-between">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-widest mb-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  ICT/BPM Export Explosion
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Overall services exports shot up by 24.59% in early 2026, driven directly by a stunning <strong>60.21% year-on-year surge</strong> in ICT and business process management services. Colombo remains the regional nucleus for specialized finance outsourcing.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-max">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Zero-rated VAT compliance for exporters in place</span>
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNo={3} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 4: GLOBAL FINANCE TECTONICS
    // ----------------------------------------------------
    case 4:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Global Trends" />

          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>02 · Financial Horizons</span>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                Tectonic Shifts in the Global Financial Arena
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
                CFOs and treasury heads are managing three dramatic transitions that require increased compliance, deep analytical support, and back-office agility.
              </p>
            </div>

            {/* Three key trends block cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-slate-100 bg-slate-50 rounded-2xl relative space-y-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">A</div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">The $256T Shadow Banking Shift</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Non-bank financial institutions (NBFIs) now manage over half of global financial assets, peaking at <strong>USD 256.8 Trillion</strong>. Higher leverage increases the demand for strict risk modeling and compliance auditing.
                </p>
              </div>

              <div className="p-4 border border-slate-100 bg-slate-50 rounded-2xl relative space-y-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">B</div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">Surging Private Credit</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Private credit continues to swell, matching USD 2.1 Trillion globally. CFOs seek rapid-origination capital to manage USD 620B of maturing corporate high-yield bonds due through 2027.
                </p>
              </div>

              <div className="p-4 border border-slate-100 bg-slate-50 rounded-2xl relative space-y-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">C</div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">Agentic AI as Operating System</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong>70% of financial firms</strong> have transitioned from basic pilots to agentic AI workflows. 16% are fully automated in key compliance lines, leveraging human-in-the-loop oversight to ensure strict ledger safety.
                </p>
              </div>
            </div>

            {/* Quick takeaway */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">HOW INFOMATE RESPONDS</span>
                <p className="text-xs text-slate-300">
                  We blend deep human accounting talent with specialized Robotic Process Automation (RPA) to help your treasury absorb these shifts with minimal friction.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 shrink-0">
                <span>View F&amp;A stacks on page 7</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <PageFooter pageNo={4} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 5: JKH HOLDINGS GROUP HIGHLIGHTS
    // ----------------------------------------------------
    case 5:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Parent Group" />

          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>03 · Solid Corporate Backing</span>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                John Keells Holdings PLC: Sri Lanka's Pre-eminent Corporate
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
                Infomate is a wholly-owned subsidiary of JKH, the largest listed conglomerate on the Colombo Stock Exchange. This backing provides unmatched financial stability and enterprise-grade governance.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {data.stats.filter(s => s.category === "jkh").map((stat) => (
                <div key={stat.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group hover:border-sky-300 transition-all">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-tr-2xl" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{stat.label}</span>
                  <span className="text-2xl font-black block tracking-tight text-slate-800">{stat.value}</span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-1 leading-tight">{stat.subtext}</span>
                </div>
              ))}
            </div>

            {/* Strategic Projects Grid */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-widest flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  Group Flagship Developments
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5">·</span>
                    <span><strong>CWIT Deep Terminal:</strong> Strategic USD 840M port project in Colombo handling over 717,000 TEUs in its debut year.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5">·</span>
                    <span><strong>Cinnamon Life Mixed-Use:</strong> Colombo's landmark luxury destination, transforming regional luxury tourism and gaming/leisure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5">·</span>
                    <span><strong>BYD New Energy Vehicles:</strong> Strong partnership launched to spearhead sustainable EV vehicle distribution.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3 flex flex-col justify-between">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-widest flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Carbon &amp; Environment Commitments
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  John Keells Holdings' commitment to sustainability translates directly to Infomate. Across our combined operations, carbon footprint per million rupees of revenue declined by <strong>8.3%</strong>, and water withdrawal declined by <strong>9.5%</strong> over the fiscal quarters.
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded-lg w-max mt-2">
                  <span>Adhering to UN Global Compact values</span>
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNo={5} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 6: PEAK MATRIX RECOGNITION
    // ----------------------------------------------------
    case 6:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-slate-950 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/50 to-slate-950 z-0" />
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6 select-none relative z-10">
            <Logo primaryColor="#FFFFFF" accentColor={accentColor} size="lg" />
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{data.general.edition}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-orange-400">
                Global Recognition
              </span>
            </div>
          </div>

          <div className="space-y-6 my-auto relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-400">
              <Award className="w-4 h-4 text-orange-400" />
              <span>Historic Achievement in FAO BPM</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
              The First Sri Lankan-Origin BPO Featured in Everest Group's PEAK Matrix®
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              In their 2025 Finance and Accounting Outsourcing (FAO) Services PEAK Matrix Assessment, Everest Group named Infomate as an outstanding provider in the SMB and mid-market-focused segment.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <Quote className="absolute -top-3 left-4 w-8 h-8 text-orange-400/20 fill-orange-400/10" />
              <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed pl-4">
                "Infomate is an SMB and mid-market-focused provider with strong expertise in delivering end-to-end transactional F&amp;A services such as AP, AR, and general accounting, along with industry-contextualized services... Its strong document management and supplier portal capabilities, combined with positive client feedback, contributed to its position."
              </p>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-bold pl-4">
                <span>Shirley Hung, Partner, Everest Group</span>
                <span className="text-orange-400">Aspirant Category Listed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>SSA 18 Type II</strong> and <strong>ISO 27001</strong> controls verified.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Over 20 years of continuous global F&amp;A delivery.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto text-[10px] text-slate-500 font-bold select-none relative z-10">
            <span>© 2026 Infomate (Pvt) Ltd · Confidential Partner Portfolio</span>
            <span className="flex items-center gap-1">
              <span>Page</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full text-slate-900 font-black text-[9px] bg-white">
                6
              </span>
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // PAGE 7: CORE F&A SERVICE PORTFOLIO
    // ----------------------------------------------------
    case 7:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Core Services" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>04 · Functional Mastery</span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                Finance &amp; Accounting Service Portfolio
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                With deep specialized talent pools, we manage end-to-end accounting processes with strict accuracy SLAs.
              </p>
            </div>

            {/* Service Pillars Grid (Horizontal Cards) */}
            <div className="space-y-3">
              {data.services.map((service) => (
                <div key={service.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs shrink-0 mt-1">
                    {service.id.toUpperCase()}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{service.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.items.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-100 text-[9px] text-slate-600 font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Systems and ERP Competency */}
            <div className="p-3 bg-slate-100/50 rounded-xl border border-slate-200/50 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-extrabold text-slate-600 uppercase tracking-widest text-[9px]">Systems and ERP Competency:</span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-700">
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200">SAP ERP</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200">Microsoft Dynamics</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200">Xero</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200">QuickBooks</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200">Sage</span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200">MYOB</span>
              </div>
            </div>
          </div>

          <PageFooter pageNo={7} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 8: BACK OFFICE & PROCESS EXCELLENCE
    // ----------------------------------------------------
    case 8:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Operational Excellence" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>05 · Extended Operations</span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                Back Office Portfolios &amp; Automation DRIVE
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Beyond core finance, we optimize your wider business operations using process mapping and automated workflows.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Back Office List (8 cols) */}
              <div className="col-span-8 space-y-2">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Portfolio of Back Office Services</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {data.backOffice.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-2.5">
                      <div className="p-1 rounded bg-white shadow-sm shrink-0">
                        {getIconComponent(item.iconName)}
                      </div>
                      <div className="leading-tight">
                        <span className="font-extrabold text-slate-800 block text-[11px]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Pillars (4 cols) */}
              <div className="col-span-4 bg-slate-50 rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Process Excellence DRIVE</span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800 block">RPA Automation</span>
                      <span className="text-[10px] text-slate-500">Deploying Power Automate and custom VBA macros to eliminate high-volume keystrokes.</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800 block">Intelligent Integrations</span>
                      <span className="text-[10px] text-slate-500">Utilizing n8n node-based mapping to weave legacy systems together seamlessly.</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800 block">Power BI Dashboards</span>
                      <span className="text-[10px] text-slate-500">Developing real-time pipeline visualizers for deep management insight.</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-sky-50 rounded-lg text-[10px] text-sky-800 font-bold text-center border border-sky-100 mt-2">
                  SSAE 18 and GDPR Compliant Workflows
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNo={8} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 9: TEAM & GLOBAL OPERATIONS
    // ----------------------------------------------------
    case 9:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Global Team" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>06 · Professional Roster</span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                Infomate Team Structure &amp; Global Footprint
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Operating securely across prime international markets, backed by qualified chartered, management, and cost accountants.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Table of Ranks (7 columns) */}
              <div className="col-span-7 bg-slate-50 rounded-2xl border border-slate-150 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[9px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 pl-4">Role / Rank</th>
                      <th className="p-2.5 text-center">Trained Pool</th>
                      <th className="p-2.5 pl-4">Qualifications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {data.team.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-100/50">
                        <td className="p-2.5 pl-4 font-bold text-slate-800">{row.role}</td>
                        <td className="p-2.5 text-center font-black text-sky-700">{row.count}</td>
                        <td className="p-2.5 pl-4 text-slate-500 font-medium text-[11px]">{row.qualifications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Geo coverage & Diversity (5 columns) */}
              <div className="col-span-5 space-y-4">
                {/* Global Markets Chip */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Primary Global Hubs</span>
                  <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      <span><strong>United Kingdom:</strong> Financial &amp; BPO Services Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span><strong>United States &amp; Canada:</strong> Tech &amp; Analytics Talent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span><strong>Australia:</strong> Operations, logistics &amp; finance support</span>
                    </div>
                  </div>
                </div>

                {/* Diversity stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-xl font-black block text-sky-700 leading-none">60:40</span>
                    <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase">Female : Male</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-xl font-black block text-sky-700 leading-none">90%</span>
                    <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase">AM+ Retention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNo={9} />
        </div>
      );

    // ----------------------------------------------------
    // PAGE 10: VALUE PROPS & SOCIAL RESPONSIBILITY
    // ----------------------------------------------------
    case 10:
      return (
        <div className="h-full flex flex-col justify-between p-10 bg-white">
          <PageHeader sectionName="Value Proposition" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>07 · Why Partner With Us</span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                Our Eight-Fold Value Proposition
              </h2>
            </div>

            {/* Bento Grid of 8 value propositions */}
            <div className="grid grid-cols-4 gap-3">
              {data.valueProps.map((prop) => (
                <div key={prop.number} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col justify-between space-y-1 relative group hover:border-sky-300 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="w-5 h-5 rounded-full text-white font-extrabold text-[10px] flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                      {prop.number}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">VALUE</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight mt-1">{prop.title}</h4>
                    <p className="text-slate-500 text-[10px] leading-tight mt-1 font-medium">{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Initiatives banner */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 space-y-3">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">ESG &amp; Social Initiatives</span>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {data.social.map((soc) => (
                  <div key={soc.id} className="p-2.5 rounded-xl border border-slate-150 bg-white space-y-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-extrabold text-amber-600 uppercase tracking-widest">{soc.badge}</span>
                      <span className="text-[9px] text-slate-300">Infomate Core</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-[11px]">{soc.title}</h5>
                    <p className="text-slate-500 text-[10px] leading-relaxed font-medium">{soc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter pageNo={10} />
        </div>
      );

    default:
      return null;
  }
}
