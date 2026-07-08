import React, { useState, useEffect } from "react";
import { NewsletterData } from "./types";
import { initialNewsletterData } from "./data";
import { Header } from "./components/Header";
import { Customizer } from "./components/Customizer";
import { NewsletterPage } from "./components/NewsletterPage";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Info,
  Layers,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [data, setData] = useState<NewsletterData>(initialNewsletterData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"continuous" | "pages">("pages");
  const [currentPage, setCurrentPage] = useState(1);

  const visiblePages = data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10];
  const currentPageIndex = visiblePages.indexOf(currentPage);
  const displayTotalPages = visiblePages.length;

  // Make sure currentPage is always inside visiblePages
  useEffect(() => {
    if (visiblePages.length > 0 && !visiblePages.includes(currentPage)) {
      const closest = visiblePages.reduce((prev, curr) => 
        Math.abs(curr - currentPage) < Math.abs(prev - currentPage) ? curr : prev
      , visiblePages[0]);
      setCurrentPage(closest);
    }
  }, [visiblePages, currentPage]);

  // Sync keyboard arrow keys for book page navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "pages") return;
      if (e.key === "ArrowLeft") {
        setCurrentPage((prev) => {
          const idx = visiblePages.indexOf(prev);
          return idx > 0 ? visiblePages[idx - 1] : prev;
        });
      } else if (e.key === "ArrowRight") {
        setCurrentPage((prev) => {
          const idx = visiblePages.indexOf(prev);
          return idx < visiblePages.length - 1 ? visiblePages[idx + 1] : prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, visiblePages]);

  // Reset to default
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all edits to standard Infomate Q2 Defaults?")) {
      setData(initialNewsletterData);
      setCurrentPage(1);
    }
  };

  // Story Presets logic
  const handleApplyPreset = (presetName: string) => {
    switch (presetName) {
      case "standard":
        setData(initialNewsletterData);
        setCurrentPage(1);
        break;

      case "tech":
        setData({
          ...initialNewsletterData,
          general: {
            ...initialNewsletterData.general,
            edition: "Automation & Process Innovation Special",
            ceoMessage: "This quarter, we are shining a bright spotlight on our advanced Intelligent Automation capabilities. As CFOs face unprecedented pressures to streamline and accelerate cycles, our 'DRIVE' automation program combines standard RPA workflows with cutting-edge agentic process runners. By pairing our highly trained human accountants with these tools, we're not only increasing accuracy but compressing month-end closing times by up to 40%. Our Everest Group PEAK Matrix recognition directly validates this tech-augmented approach. This newsletter details our specific automation modules, our n8n and Power Automate technology stack, and how you can leverage these capabilities to variabilize your transactional overheads."
          },
          stats: initialNewsletterData.stats.map((s) => {
            if (s.id === "sl-export") {
              return { ...s, label: "Automation Accuracy", value: "99.8%", subtext: "Driven by human-in-the-loop validation" };
            }
            if (s.id === "info-team") {
              return { ...s, label: "Automated Processes Active", value: "240+", subtext: "Reducing human click counts" };
            }
            return s;
          })
        });
        setCurrentPage(5); // Go to service updates
        break;

      case "finance":
        setData({
          ...initialNewsletterData,
          general: {
            ...initialNewsletterData.general,
            edition: "Global Financial Trends Report",
            ceoMessage: "The global financial ecosystem is undergoing deep structural shifts. As outlined inside, the transition towards private credit and the growing footprint of shadow banking manage trillions of dollars in non-bank financial assets. These shifts bring significant risk-monitoring and compliance-auditing challenges for global CFOs. At Infomate, we are directly responding by expanding our Financial Services & Analytics practice. Our teams now handle complex credit valuations, identity verifications, and anti-money laundering (AML) checks for premium institutions in the UK, Europe, and Australia. Backed by JKH's rigorous governance frameworks, we ensure your treasury and compliance vectors are fully protected."
          },
          stats: initialNewsletterData.stats.map((s) => {
            if (s.id === "jkh-revenue") {
              return { ...s, label: "Private Credit Handled", value: "USD 120M+", subtext: "Audited & reconciled under active SLAs" };
            }
            if (s.id === "sl-pmi") {
              return { ...s, label: "Compliance Pass Rate", value: "100.0%", subtext: "ISO 27001 & SSAE 18 verified" };
            }
            return s;
          })
        });
        setCurrentPage(4); // Go to global finance trends
        break;

      case "esg":
        setData({
          ...initialNewsletterData,
          general: {
            ...initialNewsletterData.general,
            edition: "Sustainability & Impact Highlight",
            ceoMessage: "At John Keells Holdings and Infomate, we believe business growth must go hand-in-hand with environmental stewardship and social equity. This special edition outlines our active sustainability projects. We have pioneered Sri Lanka's very first Rural BPO offices—creating premium careers directly in countryside communities and reducing the urban-rural economic divide. Our team actively partners with Child Action Lanka to fund children's educational charities, while our carbon emissions per revenue unit have declined by a remarkable 8.3%. When you partner with Infomate, your back-office operations directly support clean, inclusive, and socially responsible regional development."
          },
          stats: initialNewsletterData.stats.map((s) => {
            if (s.id === "sl-gdp") {
              return { ...s, label: "Rural Careers Generated", value: "180+", subtext: "Pioneering countryside BPO operations" };
            }
            if (s.id === "info-gender") {
              return { ...s, label: "ESG Carbon Mitigation", value: "−8.3%", subtext: "Reflecting JKH Group active policies" };
            }
            return s;
          })
        });
        setCurrentPage(10); // Go to value props/social
        break;

      default:
        break;
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased print:p-0 print:bg-white overflow-x-hidden"
      style={{
        ['--primary-color' as any]: data.general.primaryColor,
        ['--accent-color' as any]: data.general.accentColor,
        ['--page-bg' as any]: data.general.pageBgColor || '#ffffff',
        ['--text-color' as any]: data.general.textColor || '#1e293b',
        ['--card-bg' as any]: data.general.cardBgColor || '#f8fafc',
        ['--dark-page-bg' as any]: data.general.darkPageBgColor || '#020617',
        ['--dark-text-color' as any]: data.general.darkTextColor || '#ffffff',
      }}
    >
      
      {/* Premium Navigation Header */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        viewMode={viewMode}
        setViewMode={setViewMode}
        primaryColor={data.general.primaryColor}
        accentColor={data.general.accentColor}
      />

      {/* Main Workspace split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        
        {/* Left Sidebar Customizer Editor */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "350px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="shrink-0 h-full overflow-hidden print:hidden lg:sticky lg:top-0 z-20 shadow-lg border-r border-slate-200"
            >
              <div className="w-[350px] h-full">
                <Customizer
                  data={data}
                  onChange={setData}
                  onReset={handleReset}
                  onApplyPreset={handleApplyPreset}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Preview Canvas area */}
        <main className="flex-1 overflow-y-auto bg-slate-100/60 p-4 md:p-8 flex flex-col items-center justify-start min-h-0 print:p-0 print:bg-white relative">
          
          {/* Quick instructions bar for web-view users */}
          <div className="w-full max-w-[800px] mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 shadow-sm text-xs text-amber-800 print:hidden select-none">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">How to export this Newsletter as a clean PDF:</span>
              <p className="mt-0.5 leading-relaxed text-amber-700/90">
                This app is optimized for high-fidelity printing. Just click <strong className="font-bold">Export PDF</strong> in the header (or press <kbd className="bg-amber-100 px-1 border border-amber-300 rounded text-[10px]">Ctrl+P</kbd>), choose <strong className="font-bold">Save as PDF</strong>, enable <strong className="font-bold">Background Graphics</strong>, set margins to <strong className="font-bold">None</strong>, and hit Save.
              </p>
            </div>
          </div>

          {/* RENDERING MODE: PAGES / BOOK LAYOUT */}
          {viewMode === "pages" && visiblePages.length > 0 && (
            <div className="w-full flex flex-col items-center justify-center space-y-6 print:hidden">
              {/* Pagination controls */}
              <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm select-none">
                <button
                  onClick={() => {
                    if (currentPageIndex > 0) {
                      setCurrentPage(visiblePages[currentPageIndex - 1]);
                    }
                  }}
                  disabled={currentPageIndex === 0}
                  className="p-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-xs font-black text-slate-700 tracking-wide">
                  PAGE {currentPageIndex + 1} OF {displayTotalPages}
                </span>

                <button
                  onClick={() => {
                    if (currentPageIndex < visiblePages.length - 1) {
                      setCurrentPage(visiblePages[currentPageIndex + 1]);
                    }
                  }}
                  disabled={currentPageIndex === visiblePages.length - 1}
                  className="p-1.5 rounded-lg hover:bg-slate-50 border border-slate-200 text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* The Slide Container */}
              <div 
                className="w-full max-w-[800px] aspect-[1/1.414] bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200/60 print:shadow-none print:border-none relative"
                style={{ contentVisibility: "auto" }}
              >
                <NewsletterPage pageNumber={currentPage} data={data} />
              </div>

              {/* Page Thumbnails Bar */}
              <div className="w-full max-w-[800px] flex items-center justify-center gap-1.5 flex-wrap pt-2 select-none">
                {visiblePages.map((pageNum, i) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "text-white scale-110 shadow"
                        : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                    }`}
                    style={{ backgroundColor: currentPage === pageNum ? data.general.primaryColor : undefined }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RENDERING MODE: CONTINUOUS SCROLL / FLOW LAYOUT */}
          {viewMode === "continuous" && (
            <div className="w-full flex flex-col items-center gap-8 print:gap-0 print:p-0">
              {visiblePages.map((pageNum) => (
                <div
                  key={pageNum}
                  className="w-full max-w-[800px] aspect-[1/1.414] bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200/60 print-page-container print:shadow-none print:border-none print:rounded-none relative"
                >
                  <NewsletterPage pageNumber={pageNum} data={data} />
                </div>
              ))}
            </div>
          )}

          {/* PRINT-ONLY ELEMENT */}
          {/* This renders all pages in a sequence, hidden in browser view but formatted cleanly when printing */}
          <div className="hidden print:block print:p-0">
            {visiblePages.map((pageNum) => (
              <div
                key={pageNum}
                className="print-page-container"
              >
                <NewsletterPage pageNumber={pageNum} data={data} />
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
