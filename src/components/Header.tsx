import React from "react";
import { Logo } from "./Logo";
import { 
  Printer, 
  Eye, 
  Edit3, 
  Layout, 
  HelpCircle,
  FileDown
} from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  viewMode: "continuous" | "pages";
  setViewMode: (mode: "continuous" | "pages") => void;
  primaryColor: string;
  accentColor: string;
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  viewMode,
  setViewMode,
  primaryColor,
  accentColor
}: HeaderProps) {

  const handlePrint = () => {
    // Before printing, show a quick alert instruction if necessary, then run print
    window.print();
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none print:hidden shadow-sm z-30 relative">
      {/* Brand logo & title */}
      <div className="flex items-center gap-4">
        <Logo primaryColor={primaryColor} accentColor={accentColor} size="lg" />
        <div className="hidden sm:block h-8 w-px bg-slate-200" />
        <div className="hidden sm:block">
          <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Internal Publisher</span>
          <span className="text-sm font-bold text-slate-700">Client Partner Update</span>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Toggle Customizer */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            sidebarOpen
              ? "bg-slate-800 text-white border-slate-800"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
          }`}
          title="Open/Close Editing Sidebar"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{sidebarOpen ? "Hide Editor" : "Open Editor"}</span>
        </button>

        {/* View mode toggle */}
        <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 flex">
          <button
            onClick={() => setViewMode("continuous")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === "continuous"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Document Flow</span>
          </button>
          <button
            onClick={() => setViewMode("pages")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === "pages"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Book Pages</span>
          </button>
        </div>

        {/* PDF Guide Tooltip */}
        <div className="relative group">
          <div className="flex items-center gap-1 text-slate-400 hover:text-slate-600 p-2 cursor-pointer transition-colors">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 text-white p-3 rounded-lg text-xs leading-relaxed hidden group-hover:block shadow-xl z-50 border border-slate-700">
            <p className="font-bold mb-1 text-orange-400">PDF Export Instructions:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Click the <strong className="text-sky-300">Export PDF</strong> button.</li>
              <li>In the Print Dialog, set Destination to <strong className="text-sky-300">Save as PDF</strong>.</li>
              <li>Check <strong className="text-sky-300">Background Graphics</strong> to enable brand colors and shapes.</li>
              <li>Set margins to <strong className="text-sky-300">None</strong> for a perfect fit.</li>
            </ol>
          </div>
        </div>

        {/* Export to PDF */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-sm hover:shadow transition-all cursor-pointer border border-sky-600/30"
        >
          <Printer className="w-4 h-4" />
          <span>Export PDF</span>
        </button>
      </div>
    </header>
  );
}
