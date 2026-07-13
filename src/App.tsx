import React, { useState, useEffect } from "react";
import { NewsletterData, getExpandedPages } from "./types";
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
  const [selectedElement, setSelectedElement] = useState<{ type: "image" | "bg" | "card" | "logo", pageNum: number, index?: number } | null>({ type: "bg", pageNum: 1 });

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
    let styleUpdates = { [key]: value };
    if (key === "imagePositionType") {
      styleUpdates = {
        ...styleUpdates,
        imageTop: undefined as any,
        imageLeft: undefined as any
      };
    }
    setData({
      ...data,
      pageStyles: {
        ...pageStyles,
        [activePageNum]: {
          ...styles,
          ...styleUpdates
        }
      }
    });
  };

  const handleRemoveImage = () => {
    if (!selectedElement || selectedElement.type !== "image") return;
    const pageNum = selectedElement.pageNum;
    const idx = selectedElement.index; // idx of the card/item

    // 1. Resolve base page number (e.g. 11 for subpage 111)
    const basePage = pageNum % 100;
    const pageKey = `page${basePage}`;

    setData((prev: any) => {
      const pageData = prev[pageKey];
      if (!pageData) return prev;

      // 2. If it is one of the multiple-events pages (11-16) and a card index is selected:
      if (basePage >= 11 && basePage <= 16 && idx !== undefined) {
        const wellnessItems = [...(pageData.wellnessItems || [])];
        if (wellnessItems[idx]) {
          // Clear image from this wellness item (if it is using imageUrls, clear the first slot)
          const newImages = [...(wellnessItems[idx].imageUrls || [])];
          newImages.shift(); // remove the first image slot
          wellnessItems[idx] = {
            ...wellnessItems[idx],
            imageUrls: newImages,
            imageUrl: newImages[0] || ""
          };
        }
        return {
          ...prev,
          [pageKey]: {
            ...pageData,
            wellnessItems
          }
        };
      }

      // 3. Otherwise, it is a single-image page (e.g., page 5, 6, 8, 9, 10, etc.)
      return {
        ...prev,
        [pageKey]: {
          ...pageData,
          imageUrl: ""
        }
      };
    });

    // Clear selection so the toolbar closes
    setSelectedElement(null);
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
          {styles.bgImageUrl && (
            <button
              type="button"
              onClick={() => {
                handleStyleChange("bgImageUrl", "");
                handleStyleChange("bgStyleMode", "solid");
              }}
              className="px-1.5 py-1 text-[9px] font-black text-rose-600 bg-rose-50 hover:bg-rose-100 rounded cursor-pointer transition-colors"
              title="Remove background image"
            >
              Remove Image
            </button>
          )}
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

      {/* Card Width slider + Unit Toggle */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[9px] font-black text-slate-400 uppercase">Width</span>
        <input
          type="range"
          min="10"
          max={styles.cardWidthUnit === "px" ? 800 : 100}
          value={styles.cardWidth !== undefined ? styles.cardWidth : (styles.cardWidthUnit === "px" ? 300 : 100)}
          onChange={(e) => handleStyleChange("cardWidth", parseInt(e.target.value))}
          className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          title={`Card Width (${styles.cardWidthUnit || "%"})`}
        />
        <input
          type="number"
          min="10"
          max={styles.cardWidthUnit === "px" ? 800 : 100}
          value={styles.cardWidth !== undefined ? styles.cardWidth : (styles.cardWidthUnit === "px" ? 300 : 100)}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) handleStyleChange("cardWidth", val);
          }}
          className="w-10 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
          title="Custom Card Width"
        />
        <span className="text-[9px] font-bold text-slate-500">{styles.cardWidthUnit || "%"}</span>
        
        {/* Width Unit button group */}
        <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 text-[8px] font-black shrink-0">
          {(["%", "px"] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => handleStyleChange("cardWidthUnit", unit)}
              className={`px-1 py-0.2 rounded transition-all cursor-pointer ${
                (styles.cardWidthUnit || "%") === unit ? "bg-white text-sky-700 shadow-xs" : "text-slate-500"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Card Height slider + Unit Toggle */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[9px] font-black text-slate-400 uppercase">Height</span>
        <input
          type="range"
          min="50"
          max={styles.cardHeightUnit === "%" ? 100 : 500}
          value={styles.cardHeight !== undefined ? styles.cardHeight : (styles.cardHeightUnit === "%" ? 100 : 250)}
          onChange={(e) => handleStyleChange("cardHeight", parseInt(e.target.value))}
          className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          title={`Card Height (${styles.cardHeightUnit || "px"})`}
        />
        <input
          type="number"
          min="50"
          max={styles.cardHeightUnit === "%" ? 100 : 500}
          value={styles.cardHeight !== undefined ? styles.cardHeight : (styles.cardHeightUnit === "%" ? 100 : 250)}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) handleStyleChange("cardHeight", val);
          }}
          className="w-10 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
          title="Custom Card Height"
        />
        <span className="text-[9px] font-bold text-slate-500">{styles.cardHeightUnit || "px"}</span>
        
        {/* Height Unit button group */}
        <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 text-[8px] font-black shrink-0">
          {(["px", "%"] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => handleStyleChange("cardHeightUnit", unit)}
              className={`px-1 py-0.2 rounded transition-all cursor-pointer ${
                (styles.cardHeightUnit || "px") === unit ? "bg-white text-sky-700 shadow-xs" : "text-slate-500"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Per Page (only for pages 11-16 or their subpages) */}
      {(() => {
        const basePage = activePageNum % 100;
        if (basePage >= 11 && basePage <= 16) {
          const pageKey = `page${basePage}`;
          const pageData = data[pageKey as keyof NewsletterData] as any;
          return (
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[9px] font-black text-slate-400 uppercase">Cards/Page</span>
              <select
                value={pageData?.cardsPerPage || 3}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setData((prev) => ({
                    ...prev,
                    [pageKey]: {
                      ...prev[pageKey as keyof NewsletterData] as any,
                      cardsPerPage: val
                    }
                  }));
                }}
                className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
                title="Max Cards per Page"
              >
                <option value={2}>2 Cards</option>
                <option value={3}>3 Cards</option>
                <option value={4}>4 Cards</option>
              </select>
            </div>
          );
        }
        return null;
      })()}
    </div>
  );

  const renderLogoToolbar = () => {
    if (!selectedElement || selectedElement.type !== "logo") return null;
    const pageNum = selectedElement.pageNum;
    const pageStyles = data.pageStyles || {};
    const styles = pageStyles[pageNum] || {};

    return (
      <div className="flex items-center gap-3 flex-wrap">
        {/* Background Color */}
        <ColorPickerPopover 
          label="Logo Bg" 
          color={styles.logoBgColor || "#ffffff"} 
          onChange={(val) => handleStyleChange("logoBgColor", val)} 
        />

        {/* Background Opacity */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[9px] font-black text-slate-400 uppercase">Bg Opacity</span>
          <input
            type="range"
            min="0"
            max="100"
            value={styles.logoBgOpacity !== undefined ? styles.logoBgOpacity : 5}
            onChange={(e) => handleStyleChange("logoBgOpacity", parseInt(e.target.value))}
            className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            title="Logo Backdrop Opacity"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={styles.logoBgOpacity !== undefined ? styles.logoBgOpacity : 5}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) handleStyleChange("logoBgOpacity", val);
            }}
            className="w-9 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
            title="Custom Opacity %"
          />
          <span className="text-[9px] font-bold text-slate-500">%</span>
        </div>

        {/* Border Width */}
        <select
          value={styles.logoBorderWidth !== undefined ? styles.logoBorderWidth : 1}
          onChange={(e) => handleStyleChange("logoBorderWidth", parseInt(e.target.value))}
          className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
          title="Logo Border Width"
        >
          <option value={0}>No Border</option>
          <option value={1}>1px Border</option>
          <option value={2}>2px Border</option>
          <option value={3}>3px Border</option>
          <option value={4}>4px Border</option>
        </select>

        {/* Border Color */}
        <ColorPickerPopover 
          label="Border Color" 
          color={styles.logoBorderColor || "#ffffff"} 
          onChange={(val) => handleStyleChange("logoBorderColor", val)} 
        />

        {/* Shadow */}
        <select
          value={styles.logoShadow || "lg"}
          onChange={(e) => handleStyleChange("logoShadow", e.target.value)}
          className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
          title="Logo Container Shadow"
        >
          <option value="none">No Shadow</option>
          <option value="sm">Subtle Shadow</option>
          <option value="md">Medium Shadow</option>
          <option value="lg">Strong Shadow</option>
        </select>
      </div>
    );
  };

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

      {/* Width slider + Unit Toggle */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[9px] font-black text-slate-400 uppercase">Width</span>
        <input
          type="range"
          min="10"
          max={styles.imageWidthUnit === "px" ? 500 : 100}
          value={styles.imageWidth !== undefined ? styles.imageWidth : (styles.imageWidthUnit === "px" ? 150 : 100)}
          onChange={(e) => handleStyleChange("imageWidth", parseInt(e.target.value))}
          className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          title={`Image Width (${styles.imageWidthUnit || "%"})`}
        />
        <input
          type="number"
          min="10"
          max={styles.imageWidthUnit === "px" ? 500 : 100}
          value={styles.imageWidth !== undefined ? styles.imageWidth : (styles.imageWidthUnit === "px" ? 150 : 100)}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) handleStyleChange("imageWidth", val);
          }}
          className="w-10 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
          title="Custom Image Width"
        />
        <span className="text-[9px] font-bold text-slate-500">{styles.imageWidthUnit || "%"}</span>
        
        {/* Width Unit button group */}
        <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 text-[8px] font-black shrink-0">
          {(["%", "px"] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => handleStyleChange("imageWidthUnit", unit)}
              className={`px-1 py-0.2 rounded transition-all cursor-pointer ${
                (styles.imageWidthUnit || "%") === unit ? "bg-white text-sky-700 shadow-xs" : "text-slate-500"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Height slider + Unit Toggle */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[9px] font-black text-slate-400 uppercase">Height</span>
        <input
          type="range"
          min="10"
          max={styles.imageHeightUnit === "%" ? 100 : 350}
          value={styles.imageHeight !== undefined ? styles.imageHeight : (styles.imageHeightUnit === "%" ? 100 : 180)}
          onChange={(e) => handleStyleChange("imageHeight", parseInt(e.target.value))}
          className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          title={`Image Height (${styles.imageHeightUnit || "px"})`}
        />
        <input
          type="number"
          min="10"
          max={styles.imageHeightUnit === "%" ? 100 : 350}
          value={styles.imageHeight !== undefined ? styles.imageHeight : (styles.imageHeightUnit === "%" ? 100 : 180)}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) handleStyleChange("imageHeight", val);
          }}
          className="w-10 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
          title="Custom Image Height"
        />
        <span className="text-[9px] font-bold text-slate-500">{styles.imageHeightUnit || "px"}</span>
        
        {/* Height Unit button group */}
        <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 text-[8px] font-black shrink-0">
          {(["px", "%"] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => handleStyleChange("imageHeightUnit", unit)}
              className={`px-1 py-0.2 rounded transition-all cursor-pointer ${
                (styles.imageHeightUnit || "px") === unit ? "bg-white text-sky-700 shadow-xs" : "text-slate-500"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Position type */}
      <select
        value={styles.imagePositionType || "relative"}
        onChange={(e) => handleStyleChange("imagePositionType", e.target.value)}
        className="px-1 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Position Mode"
      >
        <option value="relative">Inline (Relative)</option>
        <option value="absolute">Floating (Absolute)</option>
      </select>

      {/* Alignment */}
      <select
        value={styles.imageAlignSelf || "auto"}
        onChange={(e) => handleStyleChange("imageAlignSelf", e.target.value)}
        className="px-1 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Self Alignment"
      >
        <option value="auto">Align: Auto</option>
        <option value="flex-start">Align: Left</option>
        <option value="center">Align: Center</option>
        <option value="flex-end">Align: Right</option>
      </select>

      {/* Floating Offset Sliders */}
      {styles.imagePositionType === "absolute" && (
        <>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] font-black text-slate-400 uppercase">Top</span>
            <input
              type="range"
              min="-150"
              max="250"
              value={styles.imageTop !== undefined ? styles.imageTop : 0}
              onChange={(e) => handleStyleChange("imageTop", parseInt(e.target.value))}
              className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              title="Top Offset (px)"
            />
            <input
              type="number"
              min="-150"
              max="250"
              value={styles.imageTop !== undefined ? styles.imageTop : 0}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) handleStyleChange("imageTop", val);
              }}
              className="w-10 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
              title="Custom Top Offset"
            />
            <span className="text-[9px] font-bold text-slate-500">px</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] font-black text-slate-400 uppercase">Left</span>
            <input
              type="range"
              min="-150"
              max="250"
              value={styles.imageLeft !== undefined ? styles.imageLeft : 0}
              onChange={(e) => handleStyleChange("imageLeft", parseInt(e.target.value))}
              className="w-12 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              title="Left Offset (px)"
            />
            <input
              type="number"
              min="-150"
              max="250"
              value={styles.imageLeft !== undefined ? styles.imageLeft : 0}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) handleStyleChange("imageLeft", val);
              }}
              className="w-10 px-1 py-0.5 text-[9px] font-black border border-slate-200 rounded text-center bg-white"
              title="Custom Left Offset"
            />
            <span className="text-[9px] font-bold text-slate-500">px</span>
          </div>
        </>
      )}

      {/* Multi-Image Layout */}
      <select
        value={styles.multiImageLayout || "side-by-side"}
        onChange={(e) => handleStyleChange("multiImageLayout", e.target.value)}
        className="px-1.5 py-1 text-[10px] font-bold border border-slate-200 rounded bg-white text-slate-700 cursor-pointer"
        title="Multi-Photo Layout"
      >
        <option value="side-by-side">Collage: Side-by-Side (Horiz)</option>
        <option value="stacked">Collage: Stacked (Vert)</option>
      </select>

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

      {/* Remove Image Action */}
      <button
        type="button"
        onClick={handleRemoveImage}
        className="px-2 py-1 text-[10px] font-black text-rose-600 bg-rose-50 hover:bg-rose-100 rounded cursor-pointer transition-colors ml-auto flex items-center gap-1"
        title="Remove this photo from page"
      >
        <span>🗑️</span> Remove Image
      </button>
    </div>
  );

  const visiblePages = data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10];
  const expandedPages = getExpandedPages(visiblePages, data);
  const currentPageIndex = expandedPages.indexOf(currentPage);
  const displayTotalPages = expandedPages.length;

  // Make sure currentPage is always inside expandedPages
  useEffect(() => {
    if (expandedPages.length > 0 && !expandedPages.includes(currentPage)) {
      const closest = expandedPages.reduce((prev, curr) => 
        Math.abs(curr - currentPage) < Math.abs(prev - currentPage) ? curr : prev
      , expandedPages[0]);
      setCurrentPage(closest);
    }
  }, [expandedPages, currentPage]);

  // Sync keyboard arrow keys for book page navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "pages") return;
      if (e.key === "ArrowLeft") {
        setCurrentPage((prev) => {
          const idx = expandedPages.indexOf(prev);
          return idx > 0 ? expandedPages[idx - 1] : prev;
        });
      } else if (e.key === "ArrowRight") {
        setCurrentPage((prev) => {
          const idx = expandedPages.indexOf(prev);
          return idx < expandedPages.length - 1 ? expandedPages[idx + 1] : prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, expandedPages]);

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
      className="h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased print:h-auto print:p-0 print:bg-white overflow-hidden"
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
          

          {/* RENDERING MODE: PAGES / BOOK LAYOUT */}
          {viewMode === "pages" && expandedPages.length > 0 && (
            <div className="w-full flex flex-col items-center justify-center space-y-6 print:hidden">
              {/* Pagination controls */}
              <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm select-none">
                <button
                  onClick={() => {
                    if (currentPageIndex > 0) {
                      setCurrentPage(expandedPages[currentPageIndex - 1]);
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
                    if (currentPageIndex < expandedPages.length - 1) {
                      setCurrentPage(expandedPages[currentPageIndex + 1]);
                    }
                  }}
                  disabled={currentPageIndex === expandedPages.length - 1}
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
                      {selectedElement.type === "bg" ? "🖼️ Page Background" : selectedElement.type === "card" ? "🎴 Card Frame" : selectedElement.type === "logo" ? "🏢 Brand Logo Container" : "📷 Event Image"}
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
                      {selectedElement.type === "logo" && renderLogoToolbar()}
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
                {expandedPages.map((pageNum, i) => (
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
              {expandedPages.map((pageNum) => (
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
            {expandedPages.map((pageNum) => (
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
