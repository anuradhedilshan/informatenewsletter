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

// Premium Popover Color Picker (with corporate Swatches)
const ColorPickerPopover = ({ 
  label, 
  color, 
  onChange 
}: { 
  label: string; 
  color: string; 
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const swatches = ["#2596be", "#f39200", "#002f6c", "#1e293b", "#f8fafc", "#ffffff"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors bg-white text-left cursor-pointer shadow-sm select-none"
        title={label}
      >
        <span 
          className="w-3.5 h-3.5 rounded-full border border-slate-200 block shrink-0" 
          style={{ backgroundColor: color }} 
        />
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 shadow-xl rounded-xl p-3.5 z-40 w-44 space-y-2 text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{label}</span>
            
            {/* Presets */}
            <div className="grid grid-cols-6 gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              {swatches.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => {
                    onChange(swatch);
                    setOpen(false);
                  }}
                  className="w-4.5 h-4.5 rounded-full border border-slate-200 cursor-pointer block hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: swatch }}
                  title={swatch}
                />
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-6 h-6 border border-slate-200 rounded cursor-pointer p-0 shrink-0 bg-transparent"
              />
              <input
                type="text"
                value={color.toUpperCase()}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-1.5 py-0.5 text-[9px] font-bold border border-slate-200 rounded text-slate-700 bg-slate-50 text-center uppercase"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<NewsletterData>(initialNewsletterData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"continuous" | "pages">("pages");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedElement, setSelectedElement] = useState<{ type: "image" | "bg" | "card", pageNum: number, index?: number } | null>({ type: "bg", pageNum: 1 });

  // Sync selected element's page number when current page changes
  useEffect(() => {
    if (selectedElement) {
      setSelectedElement({ type: "bg", pageNum: currentPage });
    }
  }, [currentPage]);

  const pageStyles = data.pageStyles || {};
  const activePageNum = selectedElement?.pageNum || currentPage;
  const styles = pageStyles[activePageNum] || {};

  const handleStyleChange = (key: string, value: any) => {
    setData({
      ...data,
      pageStyles: {
        ...pageStyles,
        [activePageNum]: {
          ...styles,
          [key]: value
        }
      }
    });
  };

  const renderBgToolbar = () => (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Background Mode Selector */}
      <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 text-[10px] font-bold shrink-0">
        {(["solid", "gradient", "image"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => handleStyleChange("bgStyleMode", mode)}
            className={`px-2 py-0.5 rounded-md uppercase transition-all cursor-pointer ${
              (styles.bgStyleMode || (activePageNum === 1 || activePageNum === 6 ? "gradient" : "solid")) === mode
                ? "bg-white text-sky-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Colors based on Mode */}
      {((styles.bgStyleMode || (activePageNum === 1 || activePageNum === 6 ? "gradient" : "solid")) === "solid") && (
        <div className="flex items-center gap-1.5 shrink-0">
          <ColorPickerPopover label="Page Bg" color={styles.pageBgColor || "#ffffff"} onChange={(val) => handleStyleChange("pageBgColor", val)} />
          <ColorPickerPopover label="Text" color={styles.textColor || "#1e293b"} onChange={(val) => handleStyleChange("textColor", val)} />
          <ColorPickerPopover label="Card Bg" color={styles.cardBgColor || "#f8fafc"} onChange={(val) => handleStyleChange("cardBgColor", val)} />
        </div>
      )}

      {((styles.bgStyleMode || (activePageNum === 1 || activePageNum === 6 ? "gradient" : "solid")) === "gradient") && (
        <div className="flex items-center gap-1.5 shrink-0">
          <ColorPickerPopover label="Start" color={styles.bgGradientStart || (activePageNum === 6 ? "#090d16" : "#020617")} onChange={(val) => handleStyleChange("bgGradientStart", val)} />
          <ColorPickerPopover label="End" color={styles.bgGradientEnd || (activePageNum === 6 ? "#020617" : "#000000")} onChange={(val) => handleStyleChange("bgGradientEnd", val)} />
        </div>
      )}

      {((styles.bgStyleMode || (activePageNum === 1 || activePageNum === 6 ? "gradient" : "solid")) === "image") && (
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={styles.bgImageUrl || ""}
            onChange={(e) => handleStyleChange("bgImageUrl", e.target.value)}
            placeholder="Image URL"
            className="px-2 py-1 text-[10px] font-semibold border border-slate-200 rounded w-28 bg-white"
          />
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-black text-slate-400 uppercase">Overlay</span>
            <input
              type="range"
              min="0"
              max="100"
              value={styles.bgImageOverlayOpacity !== undefined ? styles.bgImageOverlayOpacity : 0}
              onChange={(e) => handleStyleChange("bgImageOverlayOpacity", parseInt(e.target.value))}
              className="w-12 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <span className="text-[9px] font-bold text-slate-500 w-5">{styles.bgImageOverlayOpacity || 0}%</span>
          </div>
        </div>
      )}

      <div className="w-px h-5 bg-slate-200 shrink-0" />

      {/* Typography */}
      <select
        value={styles.fontFamilyTitle || "inter"}
        onChange={(e) => handleStyleChange("fontFamilyTitle", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Title Font"
      >
        <option value="inter">Inter (Title)</option>
        <option value="outfit">Outfit (Title)</option>
        <option value="playfair">Playfair (Title)</option>
        <option value="merriweather">Merriweather (Title)</option>
      </select>

      <select
        value={styles.fontFamilyBody || "inter"}
        onChange={(e) => handleStyleChange("fontFamilyBody", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Body Font"
      >
        <option value="inter">Inter (Body)</option>
        <option value="outfit">Outfit (Body)</option>
        <option value="sans">System Sans (Body)</option>
        <option value="serif">System Serif (Body)</option>
        <option value="merriweather">Merriweather (Body)</option>
        <option value="playfair">Playfair (Body)</option>
      </select>

      {/* Gaps / Padding */}
      <select
        value={styles.paddingSize || "normal"}
        onChange={(e) => handleStyleChange("paddingSize", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Page Padding"
      >
        <option value="compact">Compact Padding</option>
        <option value="normal">Normal Padding</option>
        <option value="comfortable">Wide Padding</option>
      </select>

      <select
        value={styles.contentGapSize || "normal"}
        onChange={(e) => handleStyleChange("contentGapSize", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Row Gaps"
      >
        <option value="compact">Compact Gaps</option>
        <option value="normal">Normal Gaps</option>
        <option value="wide">Wide Gaps</option>
      </select>

      <select
        value={styles.fontSizeModifier || "medium"}
        onChange={(e) => handleStyleChange("fontSizeModifier", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Font Scale"
      >
        <option value="small">Small Text</option>
        <option value="medium">Normal Text</option>
        <option value="large">Large Text</option>
      </select>
    </div>
  );

  const renderCardToolbar = () => (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Padding */}
      <select
        value={styles.cardPaddingSize || "normal"}
        onChange={(e) => handleStyleChange("cardPaddingSize", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Card Padding"
      >
        <option value="compact">Compact Card Padding</option>
        <option value="normal">Normal Card Padding</option>
        <option value="comfortable">Comfortable Card Padding</option>
      </select>

      {/* Corners */}
      <select
        value={styles.cardRounded || "xl"}
        onChange={(e) => handleStyleChange("cardRounded", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Card Corners"
      >
        <option value="none">Sharp Corners</option>
        <option value="sm">Small Corners</option>
        <option value="md">Medium Corners</option>
        <option value="lg">Large Corners</option>
        <option value="xl">XL Corners</option>
        <option value="2xl">2XL Corners</option>
      </select>

      {/* Shadow */}
      <select
        value={styles.cardShadow || "none"}
        onChange={(e) => handleStyleChange("cardShadow", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Card Shadow"
      >
        <option value="none">No Card Shadow</option>
        <option value="sm">Subtle Card Shadow</option>
        <option value="md">Medium Card Shadow</option>
        <option value="lg">Strong Card Shadow</option>
      </select>

      {/* Border Width */}
      <select
        value={styles.cardBorderWidth !== undefined ? styles.cardBorderWidth : 1}
        onChange={(e) => handleStyleChange("cardBorderWidth", parseInt(e.target.value))}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Card Border Width"
      >
        <option value={0}>No Border</option>
        <option value={1}>1px Border</option>
        <option value={2}>2px Border</option>
        <option value={4}>4px Border</option>
      </select>

      {/* Border Color */}
      <ColorPickerPopover label="Border Color" color={styles.cardBorderColor || "#cbd5e1"} onChange={(val) => handleStyleChange("cardBorderColor", val)} />
    </div>
  );

  const renderImageToolbar = () => (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Fit */}
      <select
        value={styles.imageFit || "cover"}
        onChange={(e) => handleStyleChange("imageFit", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Image Fit"
      >
        <option value="cover">Crop to Fit (Cover)</option>
        <option value="contain">Show Entire Photo (Contain)</option>
      </select>

      {/* Corners */}
      <select
        value={styles.imageRounded || "xl"}
        onChange={(e) => handleStyleChange("imageRounded", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Image Corners"
      >
        <option value="none">Sharp Corners</option>
        <option value="sm">Small Corners</option>
        <option value="md">Medium Corners</option>
        <option value="lg">Large Corners</option>
        <option value="xl">XL Corners</option>
        <option value="full">Circle Corners</option>
      </select>

      {/* Shadow */}
      <select
        value={styles.imageShadow || "sm"}
        onChange={(e) => handleStyleChange("imageShadow", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Image Shadow"
      >
        <option value="none">No Shadow</option>
        <option value="sm">Subtle Shadow</option>
        <option value="md">Medium Shadow</option>
        <option value="lg">Strong Shadow</option>
      </select>

      {/* Border Width */}
      <select
        value={styles.imageBorderWidth !== undefined ? styles.imageBorderWidth : 0}
        onChange={(e) => handleStyleChange("imageBorderWidth", parseInt(e.target.value))}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Image Border Width"
      >
        <option value={0}>No Image Border</option>
        <option value={1}>1px Border</option>
        <option value={2}>2px Border</option>
        <option value={3}>3px Border</option>
        <option value={4}>4px Border</option>
      </select>

      {/* Border Style */}
      <select
        value={styles.imageBorderStyle || "solid"}
        onChange={(e) => handleStyleChange("imageBorderStyle", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Border Style"
      >
        <option value="solid">Solid Line</option>
        <option value="dashed">Dashed Line</option>
        <option value="dotted">Dotted Line</option>
      </select>

      {/* Border Color */}
      <ColorPickerPopover label="Border Color" color={styles.imageBorderColor || "#cbd5e1"} onChange={(val) => handleStyleChange("imageBorderColor", val)} />

      {/* Grayscale filter */}
      <div className="flex items-center gap-1.5">
        <input
          type="checkbox"
          id="toolbar-img-gray"
          checked={styles.imageGrayscale || false}
          onChange={(e) => handleStyleChange("imageGrayscale", e.target.checked)}
          className="w-3.5 h-3.5 text-sky-600 border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
        />
        <label htmlFor="toolbar-img-gray" className="text-[10px] font-bold text-slate-500 cursor-pointer select-none">
          Grayscale
        </label>
      </div>
    </div>
  );

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
      <div className="flex-1 flex flex-row min-h-0 relative overflow-hidden">
        
        {/* Left Sidebar Customizer Editor */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "320px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="shrink-0 h-full overflow-hidden print:hidden border-r border-slate-200 z-20 shadow-md bg-white"
            >
              <div className="w-[320px] h-full flex flex-col">
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

              {/* CANVA-STYLE TOP TOOLBAR */}
              {selectedElement && (
                <div className="w-full max-w-[800px] bg-white border border-slate-200 shadow-md rounded-2xl p-2.5 flex items-center justify-between gap-4 select-none animate-fade-in relative z-20 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-1 bg-sky-100 text-sky-700 rounded-lg uppercase tracking-wider">
                      {selectedElement.type === "bg" ? "🖼️ Page Background" : selectedElement.type === "card" ? "🎴 Card Frame" : "📷 Event Image"}
                    </span>
                    {data.useGlobalTheme !== false ? (
                      <button
                        onClick={() => setData({ ...data, useGlobalTheme: false })}
                        className="text-[9px] font-black px-2 py-1 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg uppercase tracking-wider cursor-pointer"
                        title="Click to override style for this page individually"
                      >
                        ⚠️ Global Theme Active (Click to Override Page)
                      </button>
                    ) : (
                      <button
                        onClick={() => setData({ ...data, useGlobalTheme: true })}
                        className="text-[9px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg uppercase tracking-wider cursor-pointer"
                        title="Click to reset and use global theme"
                      >
                        ✅ Custom Styles Active (Reset to Global)
                      </button>
                    )}
                  </div>
                  
                  {data.useGlobalTheme === false ? (
                    <div className="flex items-center gap-3 flex-wrap justify-end">
                      {selectedElement.type === "bg" && renderBgToolbar()}
                      {selectedElement.type === "card" && renderCardToolbar()}
                      {selectedElement.type === "image" && renderImageToolbar()}
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">
                      Individual page custom styling is disabled. Click the yellow badge on the left to unlock design controls.
                    </span>
                  )}
                </div>
              )}

              {/* The Slide Container */}
              <div 
                className="w-full max-w-[800px] aspect-[1/1.414] bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200/60 print:shadow-none print:border-none relative"
                style={{ contentVisibility: "auto" }}
              >
                <NewsletterPage 
                  pageNumber={currentPage} 
                  data={data} 
                  selectedElement={selectedElement}
                  onSelectElement={setSelectedElement}
                />
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
