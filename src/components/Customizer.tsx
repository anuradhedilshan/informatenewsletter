import React, { useState } from "react";
import { NewsletterData } from "../types";
import { 
  Settings, 
  User, 
  TrendingUp, 
  MessageSquare, 
  Briefcase, 
  Sliders, 
  Palette,
  RefreshCw,
  Sparkles,
  Layers,
  FileText,
  Image,
  X
} from "lucide-react";

interface CustomizerProps {
  data: NewsletterData;
  onChange: (newData: NewsletterData) => void;
  onReset: () => void;
  onApplyPreset: (presetName: string) => void;
}

export function Customizer({ data, onChange, onReset, onApplyPreset }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<"general" | "branding" | "pages" | "stats" | "quotes" | "services">("general");

  const handleGeneralChange = (key: keyof NewsletterData["general"], value: string) => {
    onChange({
      ...data,
      general: {
        ...data.general,
        [key]: value,
      },
    });
  };

  const handleStatChange = (id: string, field: "label" | "value" | "subtext", value: string) => {
    const updatedStats = data.stats.map((s) => 
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange({
      ...data,
      stats: updatedStats,
    });
  };

  const handleTestimonialChange = (id: string, field: "quote" | "author" | "role" | "company" | "location", value: string) => {
    const updatedTestimonials = data.testimonials.map((t) => 
      t.id === id ? { ...t, [field]: value } : t
    );
    onChange({
      ...data,
      testimonials: updatedTestimonials,
    });
  };

  const handleServiceChange = (id: string, field: "title" | "description", value: string) => {
    const updatedServices = data.services.map((s) => 
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handlePageToggle = (pageNum: number) => {
    const currentList = data.visiblePages || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let newList: number[];
    if (currentList.includes(pageNum)) {
      if (pageNum === 1 || pageNum === 2) return; // Keep cover and CEO greeting enabled
      newList = currentList.filter((p) => p !== pageNum);
    } else {
      newList = [...currentList, pageNum].sort((a, b) => a - b);
    }
    onChange({
      ...data,
      visiblePages: newList,
    });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "coverImageUrl" | "ceoImageUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image is too large. Please upload an image smaller than 1.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({
        ...data,
        general: {
          ...data.general,
          [field]: reader.result as string,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = (field: "logoUrl" | "coverImageUrl" | "ceoImageUrl") => {
    onChange({
      ...data,
      general: {
        ...data.general,
        [field]: "",
      },
    });
  };

  const colorPresets = [
    { name: "Default Teal", primary: "#2596be", accent: "#f39200" },
    { name: "Ocean Dark Blue", primary: "#0b2d5e", accent: "#f5a623" },
    { name: "Sleek Charcoal", primary: "#334155", accent: "#0d7377" },
    { name: "Rich Forest", primary: "#064e3b", accent: "#eab308" },
  ];

  const pagesConfig = [
    { num: 1, title: "Cover Page", description: "Title, subtitle, stats and brand colors", required: true },
    { num: 2, title: "CEO Corner", description: "Chief Executive greeting message & TOC", required: true },
    { num: 3, title: "Sri Lanka Macro Focus", description: "Economic indicators & island accolades", required: false },
    { num: 4, title: "Global Finance Tectonics", description: "BPM, private credit, and shadow banking", required: false },
    { num: 5, title: "Parent Group (JKH PLC)", description: "John Keells Holdings portfolio & ESG metrics", required: false },
    { num: 6, title: "Everest Group PEAK Matrix", description: "Global F&A outsourcing recognition and awards", required: false },
    { num: 7, title: "Core F&A Service Portfolio", description: "Mastery, service lines and ERP competency", required: false },
    { num: 8, title: "Back Office Excellence", description: "DRIVE workflow automations and integrations", required: false },
    { num: 9, title: "Team & Global Operations", description: "Qualified accountant ranks & geo coverage", required: false },
    { num: 10, title: "Value Propositions & ESG", description: "8-fold value statement and social initiatives", required: false },
  ];

  const visiblePages = data.visiblePages || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div id="customizer-panel" className="w-full bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col h-full overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-sky-600" />
          <h2 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Newsletter Editor</h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-sky-600 bg-white border border-slate-200 px-2 py-1.5 rounded shadow-sm hover:border-sky-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 text-xs overflow-x-auto scrollbar-none snap-x">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-3 text-center font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
            activeTab === "general"
              ? "border-sky-500 text-sky-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          General
        </button>
        <button
          onClick={() => setActiveTab("branding")}
          className={`px-4 py-3 text-center font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
            activeTab === "branding"
              ? "border-sky-500 text-sky-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Branding &amp; Colors
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-3 text-center font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
            activeTab === "pages"
              ? "border-sky-500 text-sky-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Manage Blocks
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-3 text-center font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
            activeTab === "stats"
              ? "border-sky-500 text-sky-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Stats
        </button>
        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-4 py-3 text-center font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
            activeTab === "quotes"
              ? "border-sky-500 text-sky-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Quotes
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-3 text-center font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
            activeTab === "services"
              ? "border-sky-500 text-sky-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Services
        </button>
      </div>

      {/* Content scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
        {/* Preset Selector (Only on General/Branding tabs) */}
        {(activeTab === "general" || activeTab === "branding") && (
          <div className="bg-gradient-to-r from-sky-500/10 to-orange-500/10 p-3 rounded-xl border border-sky-100/50 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              Quick Story Presets
            </div>
            <p className="text-[11px] text-slate-500">
              Switch narrative presets to instantly load targeted financial, automation, or general content.
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => onApplyPreset("standard")}
                className="px-2 py-1.5 text-[11px] font-bold rounded-lg border border-sky-200 bg-white text-sky-700 hover:bg-sky-50 transition-colors text-left truncate cursor-pointer"
              >
                💼 Q2 Standard Update
              </button>
              <button
                onClick={() => onApplyPreset("tech")}
                className="px-2 py-1.5 text-[11px] font-bold rounded-lg border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50 transition-colors text-left truncate cursor-pointer"
              >
                🤖 Automation &amp; RPA Drive
              </button>
              <button
                onClick={() => onApplyPreset("finance")}
                className="px-2 py-1.5 text-[11px] font-bold rounded-lg border border-purple-200 bg-white text-purple-700 hover:bg-purple-50 transition-colors text-left truncate cursor-pointer"
              >
                📈 Global Finance focus
              </button>
              <button
                onClick={() => onApplyPreset("esg")}
                className="px-2 py-1.5 text-[11px] font-bold rounded-lg border border-orange-200 bg-white text-orange-700 hover:bg-orange-50 transition-colors text-left truncate cursor-pointer"
              >
                🌱 ESG &amp; Rural Impact
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: General Info */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Newsletter Edition</label>
              <input
                type="text"
                value={data.general.edition}
                onChange={(e) => handleGeneralChange("edition", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Publish Date</label>
              <input
                type="text"
                value={data.general.date}
                onChange={(e) => handleGeneralChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Newsletter Title</label>
              <input
                type="text"
                value={data.general.title}
                onChange={(e) => handleGeneralChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h3 className="font-bold text-slate-700 text-xs uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                CEO Corner Text
              </h3>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">CEO Name</label>
                <input
                  type="text"
                  value={data.general.ceoName}
                  onChange={(e) => handleGeneralChange("ceoName", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">CEO Role/Title</label>
                <input
                  type="text"
                  value={data.general.ceoTitle}
                  onChange={(e) => handleGeneralChange("ceoTitle", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">CEO Greeting Message</label>
                <textarea
                  value={data.general.ceoMessage}
                  onChange={(e) => handleGeneralChange("ceoMessage", e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Branding & Colors */}
        {activeTab === "branding" && (
          <div className="space-y-5">
            {/* Color Presets */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Color Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      onChange({
                        ...data,
                        general: {
                          ...data.general,
                          primaryColor: preset.primary,
                          accentColor: preset.accent,
                        }
                      });
                    }}
                    className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all text-xs cursor-pointer ${
                      data.general.primaryColor === preset.primary
                        ? "border-sky-500 bg-sky-50/50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full flex overflow-hidden border border-slate-300 shrink-0">
                      <span className="w-1/2 h-full" style={{ backgroundColor: preset.primary }} />
                      <span className="w-1/2 h-full" style={{ backgroundColor: preset.accent }} />
                    </span>
                    <span className="font-medium text-slate-700 truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Brand Colors */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-600 uppercase block">Custom Colors</label>
              
              {/* Primary & Accent */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Primary Color</span>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={data.general.primaryColor}
                      onChange={(e) => handleGeneralChange("primaryColor", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.general.primaryColor}
                      onChange={(e) => handleGeneralChange("primaryColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Accent Color</span>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={data.general.accentColor}
                      onChange={(e) => handleGeneralChange("accentColor", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.general.accentColor}
                      onChange={(e) => handleGeneralChange("accentColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Page Bg & Text Colors */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Page Background</span>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={data.general.pageBgColor || "#ffffff"}
                      onChange={(e) => handleGeneralChange("pageBgColor", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.general.pageBgColor || "#ffffff"}
                      onChange={(e) => handleGeneralChange("pageBgColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Page Text Color</span>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={data.general.textColor || "#1e293b"}
                      onChange={(e) => handleGeneralChange("textColor", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.general.textColor || "#1e293b"}
                      onChange={(e) => handleGeneralChange("textColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Card Background Color */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Card/Stats Background</span>
                <div className="flex gap-1.5 items-center">
                  <input
                    type="color"
                    value={data.general.cardBgColor || "#f8fafc"}
                    onChange={(e) => handleGeneralChange("cardBgColor", e.target.value)}
                    className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={data.general.cardBgColor || "#f8fafc"}
                    onChange={(e) => handleGeneralChange("cardBgColor", e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                  />
                </div>
              </div>

              {/* Dark Pages Bg & Text */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Dark Page Bg</span>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={data.general.darkPageBgColor || "#020617"}
                      onChange={(e) => handleGeneralChange("darkPageBgColor", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.general.darkPageBgColor || "#020617"}
                      onChange={(e) => handleGeneralChange("darkPageBgColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Dark Page Text</span>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={data.general.darkTextColor || "#ffffff"}
                      onChange={(e) => handleGeneralChange("darkTextColor", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.general.darkTextColor || "#ffffff"}
                      onChange={(e) => handleGeneralChange("darkTextColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Images Upload Section */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-600 uppercase block">Media &amp; Custom Images</label>
              
              {/* Logo Upload */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block uppercase">Brand Logo</span>
                {data.general.logoUrl ? (
                  <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                    <img src={data.general.logoUrl} alt="Logo preview" className="h-8 object-contain max-w-[150px]" />
                    <button 
                      onClick={() => handleClearImage("logoUrl")}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, "logoUrl")}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer w-full"
                    />
                  </div>
                )}
              </div>

              {/* Cover Page Background Upload */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block uppercase">Cover Background Image</span>
                {data.general.coverImageUrl ? (
                  <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                    <img src={data.general.coverImageUrl} alt="Cover preview" className="h-10 w-16 object-cover rounded" />
                    <button 
                      onClick={() => handleClearImage("coverImageUrl")}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, "coverImageUrl")}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer w-full"
                    />
                  </div>
                )}
              </div>

              {/* CEO Portrait Upload */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block uppercase">CEO Portrait (Page 2)</span>
                {data.general.ceoImageUrl ? (
                  <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                    <img src={data.general.ceoImageUrl} alt="CEO preview" className="h-10 w-10 object-cover rounded-full" />
                    <button 
                      onClick={() => handleClearImage("ceoImageUrl")}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, "ceoImageUrl")}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer w-full"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Manage Pages */}
        {activeTab === "pages" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 italic leading-relaxed">
              Show or hide specific content pages in the newsletter. Pages that are unticked will be excluded from the print layouts and the page index completely, and consecutive page numbers will adjust automatically.
            </p>

            <div className="space-y-2">
              {pagesConfig.map((page) => {
                const isChecked = visiblePages.includes(page.num);
                return (
                  <div 
                    key={page.num} 
                    onClick={() => !page.required && handlePageToggle(page.num)}
                    className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                      page.required 
                        ? "bg-slate-50 border-slate-200 opacity-80 cursor-not-allowed" 
                        : isChecked
                          ? "bg-sky-50/40 border-sky-200 hover:bg-sky-50/70 cursor-pointer"
                          : "bg-white border-slate-200 hover:bg-slate-50 cursor-pointer"
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      disabled={page.required}
                      onChange={() => {}} // Controlled via container onClick
                      className="mt-1 cursor-pointer accent-sky-600 shrink-0" 
                    />
                    <div className="leading-tight">
                      <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        Page {page.num}: {page.title}
                        {page.required && (
                          <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-1 rounded uppercase tracking-wider scale-90">Required</span>
                        )}
                      </span>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{page.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Stats */}
        {activeTab === "stats" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 italic leading-relaxed">
              Updating these key indicators will reflect instantly in the statistics layout sections of the newsletter pages.
            </p>

            {/* Sri Lanka Category */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-sky-700 border-b border-sky-100 pb-1 uppercase">🇱🇰 Sri Lanka Indicators</h3>
              {data.stats.filter(s => s.category === "sri-lanka").map((stat) => (
                <div key={stat.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-slate-400 font-semibold block uppercase">Val / Metric</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 font-semibold block uppercase">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 font-semibold block uppercase">Supporting context</label>
                    <input
                      type="text"
                      value={stat.subtext}
                      onChange={(e) => handleStatChange(stat.id, "subtext", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* JKH Category */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-sky-700 border-b border-sky-100 pb-1 uppercase">🏢 JKH Performance</h3>
              {data.stats.filter(s => s.category === "jkh").map((stat) => (
                <div key={stat.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-slate-400 font-semibold block uppercase">Val / Metric</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 font-semibold block uppercase">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 font-semibold block uppercase">Supporting context</label>
                    <input
                      type="text"
                      value={stat.subtext}
                      onChange={(e) => handleStatChange(stat.id, "subtext", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Infomate Team Category */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-sky-700 border-b border-sky-100 pb-1 uppercase">⚙️ Infomate Operations</h3>
              {data.stats.filter(s => s.category === "infomate").map((stat) => (
                <div key={stat.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-slate-400 font-semibold block uppercase">Val / Metric</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 font-semibold block uppercase">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 font-semibold block uppercase">Supporting context</label>
                    <input
                      type="text"
                      value={stat.subtext}
                      onChange={(e) => handleStatChange(stat.id, "subtext", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Quotes */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 italic leading-relaxed">
              Below are the actual client quotes extracted from Infomate's partner portfolio presentation. You can edit them to customize for specific proposals.
            </p>

            {data.testimonials.map((test, index) => (
              <div key={test.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-sky-700">Quote {index + 1}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{test.location || "Global"}</span>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block uppercase">Author / Role</label>
                  <input
                    type="text"
                    value={test.author}
                    onChange={(e) => handleTestimonialChange(test.id, "author", e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block uppercase">Company</label>
                  <input
                    type="text"
                    value={test.company}
                    onChange={(e) => handleTestimonialChange(test.id, "company", e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block uppercase">Quote Text</label>
                  <textarea
                    value={test.quote}
                    onChange={(e) => handleTestimonialChange(test.id, "quote", e.target.value)}
                    rows={4}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Services */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 italic leading-relaxed">
              Infomate's core F&amp;A (Finance &amp; Accounting) service pillars. Customize the headlines or descriptions as needed.
            </p>

            {data.services.map((service) => (
              <div key={service.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-sky-700 block uppercase">{service.title}</span>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block uppercase">Pillar Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(service.id, "title", e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block uppercase">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(service.id, "description", e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
