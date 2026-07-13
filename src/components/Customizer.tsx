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
  X,
  Plus,
  Globe,
  Heart,
  Award,
  BookOpen,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface CustomizerProps {
  data: NewsletterData;
  onChange: (newData: NewsletterData) => void;
  onReset: () => void;
  onApplyPreset: (presetName: string) => void;
}

export function Customizer({ data, onChange, onReset, onApplyPreset }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<"general" | "branding" | "pages" | "content">("general");
  const [selectedContentPage, setSelectedContentPage] = useState<"page1" | "page2" | "page3" | "page4" | "page5" | "page6" | "page7" | "page8" | "page9" | "page10" | "page11" | "page12" | "page13" | "page14" | "page15" | "page16">("page1");

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

  const handleServiceChange = (id: string, field: "title" | "description" | "items", value: any) => {
    const updatedServices = data.services.map((s) => 
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handlePageToggle = (pageNum: number) => {
    const currentList = data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10];
    let newList: number[];
    if (currentList.includes(pageNum)) {
      if (pageNum === 1 || pageNum === 2) return;
      newList = currentList.filter((p) => p !== pageNum);
    } else {
      newList = [...currentList, pageNum];
    }
    onChange({
      ...data,
      visiblePages: newList,
    });
  };

  const movePageUp = (pageNum: number) => {
    const currentList = [...(data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10])];
    const idx = currentList.indexOf(pageNum);
    if (idx > 0) {
      const temp = currentList[idx];
      currentList[idx] = currentList[idx - 1];
      currentList[idx - 1] = temp;
      onChange({
        ...data,
        visiblePages: currentList
      });
    }
  };

  const movePageDown = (pageNum: number) => {
    const currentList = [...(data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10])];
    const idx = currentList.indexOf(pageNum);
    if (idx !== -1 && idx < currentList.length - 1) {
      const temp = currentList[idx];
      currentList[idx] = currentList[idx + 1];
      currentList[idx + 1] = temp;
      onChange({
        ...data,
        visiblePages: currentList
      });
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "coverImageUrl" | "ceoImageUrl" | "page5Url" | "page6Url" | "page8Url" | "page9Url" | "page10Url" | "page11Url" | "page12Url" | "page13Url" | "page14Url" | "page15Url" | "page16Url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image is too large. Please upload an image smaller than 1.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const resultStr = reader.result as string;
      if (field === "logoUrl" || field === "coverImageUrl" || field === "ceoImageUrl") {
        onChange({
          ...data,
          general: {
            ...data.general,
            [field]: resultStr,
          },
        });
      } else {
        const pageKey = field.replace("Url", "") as "page5" | "page6" | "page8" | "page9" | "page10" | "page11" | "page12" | "page13" | "page14" | "page15" | "page16";
        onChange({
          ...data,
          [pageKey]: {
            ...(data[pageKey] || {}),
            imageUrl: resultStr,
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = (field: "logoUrl" | "coverImageUrl" | "ceoImageUrl" | "page5Url" | "page6Url" | "page8Url" | "page9Url" | "page10Url" | "page11Url" | "page12Url" | "page13Url" | "page14Url" | "page15Url" | "page16Url") => {
    if (field === "logoUrl" || field === "coverImageUrl" || field === "ceoImageUrl") {
      onChange({
        ...data,
        general: {
          ...data.general,
          [field]: "",
        },
      });
    } else {
      const pageKey = field.replace("Url", "") as "page5" | "page6" | "page8" | "page9" | "page10" | "page11" | "page12" | "page13" | "page14" | "page15" | "page16";
      onChange({
        ...data,
        [pageKey]: {
          ...(data[pageKey] || {}),
          imageUrl: "",
        },
      });
    }
  };

  // Page Specific Content Handlers
  const handlePage3Change = (key: keyof NonNullable<NewsletterData["page3"]>, value: any) => {
    onChange({ ...data, page3: { ...(data.page3 || {}), [key]: value } as any });
  };
  const handlePage3AccoladeChange = (idx: number, field: "title" | "subtitle", value: string) => {
    const list = data.page3?.accolades || [];
    const newList = list.map((a, i) => i === idx ? { ...a, [field]: value } : a);
    handlePage3Change("accolades", newList);
  };

  const handlePage4Change = (key: keyof NonNullable<NewsletterData["page4"]>, value: any) => {
    onChange({ ...data, page4: { ...(data.page4 || {}), [key]: value } as any });
  };
  const handlePage4TrendChange = (idx: number, field: "title" | "text", value: string) => {
    const list = data.page4?.trends || [];
    const newList = list.map((t, i) => i === idx ? { ...t, [field]: value } : t);
    handlePage4Change("trends", newList);
  };

  const handlePage5Change = (key: keyof NonNullable<NewsletterData["page5"]>, value: any) => {
    onChange({ ...data, page5: { ...(data.page5 || {}), [key]: value } as any });
  };
  const handlePage5ProjectChange = (idx: number, field: "title" | "text", value: string) => {
    const list = data.page5?.projects || [];
    const newList = list.map((p, i) => i === idx ? { ...p, [field]: value } : p);
    handlePage5Change("projects", newList);
  };

  const handlePage6Change = (key: keyof NonNullable<NewsletterData["page6"]>, value: any) => {
    onChange({ ...data, page6: { ...(data.page6 || {}), [key]: value } as any });
  };

  const handlePage7Change = (key: keyof NonNullable<NewsletterData["page7"]>, value: any) => {
    onChange({ ...data, page7: { ...(data.page7 || {}), [key]: value } as any });
  };

  const handlePage8Change = (key: keyof NonNullable<NewsletterData["page8"]>, value: any) => {
    onChange({ ...data, page8: { ...(data.page8 || {}), [key]: value } as any });
  };
  const handleBackOfficeChange = (id: string, field: "title" | "description", value: string) => {
    const list = data.backOffice.map((item) => item.id === id ? { ...item, [field]: value } : item);
    onChange({ ...data, backOffice: list });
  };

  const handlePage9Change = (key: keyof NonNullable<NewsletterData["page9"]>, value: any) => {
    onChange({ ...data, page9: { ...(data.page9 || {}), [key]: value } as any });
  };
  const handlePage9HubChange = (idx: number, field: "title" | "desc", value: string) => {
    const list = data.page9?.hubs || [];
    const newList = list.map((h, i) => i === idx ? { ...h, [field]: value } : h);
    handlePage9Change("hubs", newList);
  };
  const handleTeamRoleChange = (idx: number, field: "role" | "count" | "qualifications", value: string) => {
    const list = data.team.map((row, i) => i === idx ? { ...row, [field]: value } : row);
    onChange({ ...data, team: list });
  };

  const handlePage10Change = (key: keyof NonNullable<NewsletterData["page10"]>, value: any) => {
    onChange({ ...data, page10: { ...(data.page10 || {}), [key]: value } as any });
  };
  const handlePage11Change = (key: keyof NonNullable<NewsletterData["page11"]>, value: any) => {
    onChange({ ...data, page11: { ...(data.page11 || {}), [key]: value } as any });
  };
  const handlePage12Change = (key: keyof NonNullable<NewsletterData["page12"]>, value: any) => {
    onChange({ ...data, page12: { ...(data.page12 || {}), [key]: value } as any });
  };
  const handlePage13Change = (key: keyof NonNullable<NewsletterData["page13"]>, value: any) => {
    onChange({ ...data, page13: { ...(data.page13 || {}), [key]: value } as any });
  };
  const handlePage14Change = (key: keyof NonNullable<NewsletterData["page14"]>, value: any) => {
    onChange({ ...data, page14: { ...(data.page14 || {}), [key]: value } as any });
  };
  const handlePage15Change = (key: keyof NonNullable<NewsletterData["page15"]>, value: any) => {
    onChange({ ...data, page15: { ...(data.page15 || {}), [key]: value } as any });
  };
  const handlePage16Change = (key: keyof NonNullable<NewsletterData["page16"]>, value: any) => {
    onChange({ ...data, page16: { ...(data.page16 || {}), [key]: value } as any });
  };
  const handleValuePropChange = (num: number, field: "title" | "description", value: string) => {
    const list = data.valueProps.map((p) => p.number === num ? { ...p, [field]: value } : p);
    onChange({ ...data, valueProps: list });
  };
  const handleSocialInitiativeChange = (id: string, field: "title" | "description" | "badge", value: string) => {
    const list = data.social.map((s) => s.id === id ? { ...s, [field]: value } : s);
    onChange({ ...data, social: list });
  };

  const logoPresets = ["#2596be", "#f39200", "#002f6c", "#1e293b", "#f8fafc", "#ffffff"];

  const renderCustomColorPicker = (label: string, value: string, onColorChange: (val: string) => void) => {
    return (
      <div className="space-y-1.5 text-left">
        <span className="text-[10px] text-slate-500 font-bold block uppercase">{label}</span>
        <div className="flex gap-1.5 items-center">
          <input 
            type="color" 
            value={value || "#ffffff"} 
            onChange={(e) => onColorChange(e.target.value)} 
            className="w-8 h-8 rounded border border-slate-200 p-0 cursor-pointer shrink-0" 
          />
          <input 
            type="text" 
            value={value || ""} 
            onChange={(e) => onColorChange(e.target.value)} 
            className="w-full px-2 py-1 text-xs border border-slate-200 rounded font-mono" 
          />
        </div>
        <div className="flex gap-1 pt-0.5">
          {logoPresets.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onColorChange(color)}
              className="w-4 h-4 rounded-full border border-slate-200 transition-transform hover:scale-110 shadow-sm shrink-0"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    );
  };



  const renderMultipleEventsControls = (
    pageKey: "page11" | "page12" | "page13" | "page14" | "page15" | "page16",
    pageData: any,
    handlePageChange: (key: any, value: any) => void
  ) => {
    const items = pageData?.wellnessItems || [];
    
    const handleItemChange = (id: string, key: string, value: any) => {
      const updated = items.map((item: any) => item.id === id ? { ...item, [key]: value } : item);
      handlePageChange("wellnessItems", updated);
    };

    const handleItemImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          handleItemChange(id, "imageUrl", reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const addItem = () => {
      const newItem = {
        id: `item-${Date.now()}`,
        title: "New Event / Card",
        description: "Add event details here.",
        imageUrl: ""
      };
      handlePageChange("wellnessItems", [...items, newItem]);
    };

    const deleteItem = (id: string) => {
      handlePageChange("wellnessItems", items.filter((item: any) => item.id !== id));
    };

    const moveItem = (index: number, direction: "up" | "down") => {
      const newList = [...items];
      if (direction === "up" && index > 0) {
        const temp = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = temp;
      } else if (direction === "down" && index < newList.length - 1) {
        const temp = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = temp;
      }
      handlePageChange("wellnessItems", newList);
    };

    return (
      <div className="space-y-3 pt-3 border-t mt-3">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500 font-bold uppercase block">Layout Style Option</label>
          <select 
            value={pageData?.layoutMode || "grid"} 
            onChange={(e) => handlePageChange("layoutMode", e.target.value)}
            className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md bg-white font-semibold"
          >
            <option value="grid">Grid Card Layout</option>
            <option value="list">Alternating List Layout</option>
            <option value="three-col">Three-Column Spotlight</option>
            <option value="hero-split">Hero Spotlight + Sidebar</option>
          </select>
        </div>

        {/* Columns Layout Selection */}
        {(pageData?.layoutMode === "grid" || pageData?.layoutMode === "three-col" || pageData?.layoutMode === "hero-split" || !pageData?.layoutMode) && (
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase block">Columns Layout</label>
            <select 
              value={pageData?.gridCols || 3} 
              onChange={(e) => handlePageChange("gridCols", parseInt(e.target.value))}
              className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md bg-white font-semibold"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
            </select>
          </div>
        )}

        {/* Card Image Size Option */}
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500 font-bold uppercase block">Image Size Option</label>
          <select 
            value={pageData?.cardImageSize || "medium"} 
            onChange={(e) => handlePageChange("cardImageSize", e.target.value)}
            className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md bg-white font-semibold"
          >
            <option value="small">Small (Compact)</option>
            <option value="medium">Medium (Standard)</option>
            <option value="large">Large (Prominent)</option>
          </select>
        </div>

        {/* Cards Per Page */}
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500 font-bold uppercase block">Cards Per Page</label>
          <select 
            value={pageData?.cardsPerPage || 3} 
            onChange={(e) => handlePageChange("cardsPerPage", parseInt(e.target.value))}
            className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md bg-white font-semibold"
          >
            <option value={2}>2 Cards per Page</option>
            <option value={3}>3 Cards per Page</option>
            <option value={4}>4 Cards per Page</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center bg-slate-100/50 p-1.5 rounded-lg border">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Spotlight Cards ({items.length})</span>
            <button 
              type="button"
              onClick={addItem}
              className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[9px] font-bold uppercase tracking-wider transition-colors"
            >
              + Add Card
            </button>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {items.map((item: any, idx: number) => (
              <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-sky-700 uppercase">Card #{idx + 1}</span>
                  <div className="flex gap-2 items-center">
                    <button 
                      type="button"
                      onClick={() => moveItem(idx, "up")} 
                      disabled={idx === 0}
                      className="text-slate-400 hover:text-slate-600 disabled:opacity-30 text-[10px] font-bold"
                    >
                      ▲
                    </button>
                    <button 
                      type="button"
                      onClick={() => moveItem(idx, "down")} 
                      disabled={idx === items.length - 1}
                      className="text-slate-400 hover:text-slate-600 disabled:opacity-30 text-[10px] font-bold"
                    >
                      ▼
                    </button>
                    <button 
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      className="text-rose-500 hover:text-rose-700 text-[10px] font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <input 
                  type="text" 
                  value={item.title || ""} 
                  onChange={(e) => handleItemChange(item.id, "title", e.target.value)} 
                  placeholder="Card Title"
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white font-bold" 
                />

                <textarea 
                  value={item.description || ""} 
                  onChange={(e) => handleItemChange(item.id, "description", e.target.value)} 
                  placeholder="Card Description (Enter lines starting with '-' for a bullet list)"
                  rows={3}
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white leading-normal" 
                />
                <span className="text-[8px] text-slate-400 font-semibold block leading-tight">
                  💡 Tip: Enter each bullet point on a new line starting with '-' or '•'
                </span>

                {/* 3-Slot Image Collage Editor */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[9px] text-slate-400 font-bold block uppercase">Card Photos (Up to 3)</label>
                  <div className="grid grid-cols-3 gap-1 bg-white p-1.5 rounded-lg border border-slate-200">
                    {[0, 1, 2].map((slotIdx) => {
                      const itemImages = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);
                      const img = itemImages[slotIdx];
                      
                      const handleSetImageAtSlot = (val: string) => {
                        const newImages = [...itemImages];
                        if (val === "") {
                          newImages.splice(slotIdx, 1);
                        } else {
                          newImages[slotIdx] = val;
                        }
                        const updated = items.map((it: any) => 
                          it.id === item.id 
                            ? { ...it, imageUrls: newImages, imageUrl: newImages[0] || "" } 
                            : it
                        );
                        handlePageChange("wellnessItems", updated);
                      };

                      const handleUploadSlot = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            handleSetImageAtSlot(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      };

                      return (
                        <div key={slotIdx} className="relative aspect-video bg-slate-50 border border-slate-100 rounded overflow-hidden flex flex-col items-center justify-center">
                          {img ? (
                            <>
                              <img src={img} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleSetImageAtSlot("")}
                                className="absolute top-0.5 right-0.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold text-[8px] leading-none shrink-0"
                                title="Remove photo"
                              >
                                ✕
                              </button>
                            </>
                          ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-sky-500 hover:bg-slate-100/50 transition-colors">
                              <span className="text-[10px] font-black leading-none">+</span>
                              <span className="text-[7px] font-bold uppercase leading-none mt-0.5">Slot {slotIdx + 1}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadSlot}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-[10px] text-slate-400 italic text-center py-2">No custom items. Falling back to the single layout template.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderImageAdjustmentControls = (
    pageData: { imageHeight?: number; imageWidth?: number; imagePosition?: "top" | "bottom" | "left" | "right"; imageFit?: "contain" | "cover"; imageUrl?: string } | undefined,
    onFieldChange: (field: string, value: any) => void
  ) => {
    if (!pageData?.imageUrl) return null;

    return (
      <div className="p-3 bg-slate-50 border rounded-lg space-y-3 mt-3 shadow-inner">
        <h4 className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Image Layout Adjustments</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Height (px)</label>
            <input 
              type="number" 
              min={80} 
              max={400} 
              value={pageData.imageHeight || 192} 
              onChange={(e) => onFieldChange("imageHeight", parseInt(e.target.value) || 192)} 
              className="w-full px-2 py-1 text-xs border rounded bg-white"
            />
          </div>
          <div>
            <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Width (%)</label>
            <input 
              type="number" 
              min={10} 
              max={100} 
              value={pageData.imageWidth || 40} 
              onChange={(e) => onFieldChange("imageWidth", parseInt(e.target.value) || 40)} 
              className="w-full px-2 py-1 text-xs border rounded bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Position</label>
            <select 
              value={pageData.imagePosition || "right"} 
              onChange={(e) => onFieldChange("imagePosition", e.target.value)} 
              className="w-full px-2 py-1 text-xs border rounded bg-white"
            >
              <option value="right">Right (Side-by-Side)</option>
              <option value="left">Left (Side-by-Side)</option>
              <option value="top">Top (Stack)</option>
              <option value="bottom">Bottom (Stack)</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Fit Mode</label>
            <select 
              value={pageData.imageFit || "cover"} 
              onChange={(e) => onFieldChange("imageFit", e.target.value)} 
              className="w-full px-2 py-1 text-xs border rounded bg-white"
            >
              <option value="cover">Crop/Cover</option>
              <option value="contain">Fit/Contain</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderBackgroundControls = (
    pageData: { bgColor?: string; bgImageUrl?: string; bgGradientStart?: string; bgGradientEnd?: string } | undefined,
    onFieldChange: (field: string, value: any) => void,
    isPage6 = false
  ) => {
    return (
      <div className="p-3 bg-slate-50 border rounded-lg space-y-3 mt-3 shadow-inner">
        <h4 className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Page Background Settings</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Bg Color</label>
            <div className="flex gap-1">
              <input 
                type="color" 
                value={pageData?.bgColor || "#ffffff"} 
                onChange={(e) => onFieldChange("bgColor", e.target.value)} 
                className="w-8 h-6 border rounded cursor-pointer p-0"
              />
              <input 
                type="text" 
                value={pageData?.bgColor || ""} 
                onChange={(e) => onFieldChange("bgColor", e.target.value)} 
                placeholder="#ffffff"
                className="flex-1 px-1 py-0.5 text-[9px] border rounded bg-white text-slate-700 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Bg Pattern</label>
            {pageData?.bgImageUrl ? (
              <button 
                onClick={() => onFieldChange("bgImageUrl", "")} 
                className="w-full py-0.5 text-[9px] border border-rose-200 text-rose-600 bg-rose-50 rounded hover:bg-rose-100 font-bold"
              >
                Remove Pattern
              </button>
            ) : (
              <span className="text-[9px] text-slate-400 italic block mt-1">No overlay pattern</span>
            )}
          </div>
        </div>

        <div>
          <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Upload Overlay Pattern (Shadow/PNG)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  onFieldChange("bgImageUrl", reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }} 
            className="text-[10px] w-full" 
          />
        </div>

        {isPage6 && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <div>
              <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Gradient Start</label>
              <div className="flex gap-1">
                <input 
                  type="color" 
                  value={pageData?.bgGradientStart || "#020617"} 
                  onChange={(e) => onFieldChange("bgGradientStart", e.target.value)} 
                  className="w-8 h-6 border rounded cursor-pointer p-0"
                />
                <input 
                  type="text" 
                  value={pageData?.bgGradientStart || ""} 
                  onChange={(e) => onFieldChange("bgGradientStart", e.target.value)} 
                  placeholder="#020617"
                  className="flex-1 px-1 py-0.5 text-[9px] border rounded bg-white text-slate-700 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] text-slate-500 font-semibold block mb-0.5">Gradient End</label>
              <div className="flex gap-1">
                <input 
                  type="color" 
                  value={pageData?.bgGradientEnd || "#0f172a"} 
                  onChange={(e) => onFieldChange("bgGradientEnd", e.target.value)} 
                  className="w-8 h-6 border rounded cursor-pointer p-0"
                />
                <input 
                  type="text" 
                  value={pageData?.bgGradientEnd || ""} 
                  onChange={(e) => onFieldChange("bgGradientEnd", e.target.value)} 
                  placeholder="#0f172a"
                  className="flex-1 px-1 py-0.5 text-[9px] border rounded bg-white text-slate-700 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderImageUploadControls = (
    imageUrl: string | undefined,
    field: "ceoImageUrl" | "coverImageUrl" | "page5Url" | "page6Url" | "page8Url" | "page9Url" | "page10Url" | "page11Url" | "page12Url" | "page13Url" | "page14Url" | "page15Url" | "page16Url",
    label = "Page Graphic / Photo"
  ) => {
    return (
      <div className="p-3 bg-slate-50 border rounded-lg space-y-1 mt-3">
        <span className="text-[10px] font-bold text-sky-800 block uppercase tracking-wider">{label}</span>
        {imageUrl ? (
          <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
            <img src={imageUrl} className="h-10 w-16 object-cover rounded" />
            <button onClick={() => handleClearImage(field)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field)} className="text-[11px] w-full" />
        )}
      </div>
    );
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
    { num: 11, title: "Wellness & Events", description: "Staff wellness and office vibrancy/social events", required: false },
  ];

  const visiblePages = data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10];

  return (
    <div id="customizer-panel" className="w-full bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col h-full overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-sky-600" />
          <h2 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Newsletter Editor</h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-sky-600 bg-white border border-slate-200 px-2 py-1.5 rounded shadow-sm hover:border-sky-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 text-xs overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex-1 py-3 text-center font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 ${
            activeTab === "general" ? "border-sky-500 text-sky-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          General
        </button>
        <button
          onClick={() => setActiveTab("branding")}
          className={`flex-1 py-3 text-center font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 ${
            activeTab === "branding" ? "border-sky-500 text-sky-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Branding
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex-1 py-3 text-center font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 ${
            activeTab === "pages" ? "border-sky-500 text-sky-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Blocks
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-3 text-center font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 ${
            activeTab === "content" ? "border-sky-500 text-sky-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Content
        </button>
      </div>

      {/* Content scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
        {/* Preset Selector */}
        {(activeTab === "general" || activeTab === "branding") && (
          <div className="bg-gradient-to-r from-sky-500/10 to-orange-500/10 p-3 rounded-xl border border-sky-100/50 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              Quick Presets
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button onClick={() => onApplyPreset("standard")} className="px-2 py-1.5 text-[10px] font-bold rounded-lg border bg-white text-sky-700 hover:bg-sky-50 cursor-pointer truncate">💼 Standard</button>
              <button onClick={() => onApplyPreset("tech")} className="px-2 py-1.5 text-[10px] font-bold rounded-lg border bg-white text-emerald-700 hover:bg-emerald-50 cursor-pointer truncate">🤖 Automation</button>
              <button onClick={() => onApplyPreset("finance")} className="px-2 py-1.5 text-[10px] font-bold rounded-lg border bg-white text-purple-700 hover:bg-purple-50 cursor-pointer truncate">📈 Global Finance</button>
              <button onClick={() => onApplyPreset("esg")} className="px-2 py-1.5 text-[10px] font-bold rounded-lg border bg-white text-orange-700 hover:bg-orange-50 cursor-pointer truncate">🌱 ESG &amp; Social</button>
            </div>
          </div>
        )}

        {/* Tab 1: General Info */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Publishing Edition</label>
              <input type="text" value={data.general.edition} onChange={(e) => handleGeneralChange("edition", e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-sky-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Publish Date</label>
              <input type="text" value={data.general.date} onChange={(e) => handleGeneralChange("date", e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-sky-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Newsletter Main Title</label>
              <input type="text" value={data.general.title} onChange={(e) => handleGeneralChange("title", e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-sky-500" />
            </div>
          </div>
        )}

        {/* Tab 2: Branding & Colors */}
        {activeTab === "branding" && (
          <div className="space-y-5">
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
                    className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all text-xs cursor-pointer ${data.general.primaryColor === preset.primary ? "border-sky-500 bg-sky-50/50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
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

            {/* Global Theme Checkbox Toggle */}
            <div className="flex items-center gap-2 p-3 bg-sky-50/50 rounded-xl border border-sky-100 text-left">
              <input 
                type="checkbox" 
                id="global-theme-toggle"
                checked={data.useGlobalTheme !== false} 
                onChange={(e) => onChange({ ...data, useGlobalTheme: e.target.checked })} 
                className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer animate-scale"
              />
              <label htmlFor="global-theme-toggle" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                Use Global Theme for all pages
              </label>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-600 uppercase block text-left">Custom Color Scheme</label>
              <div className="grid grid-cols-2 gap-3">
                {renderCustomColorPicker("Primary Color", data.general.primaryColor, (val) => handleGeneralChange("primaryColor", val))}
                {renderCustomColorPicker("Accent Color", data.general.accentColor, (val) => handleGeneralChange("accentColor", val))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {renderCustomColorPicker("Page Background", data.general.pageBgColor || "#ffffff", (val) => handleGeneralChange("pageBgColor", val))}
                {renderCustomColorPicker("Text Color", data.general.textColor || "#1e293b", (val) => handleGeneralChange("textColor", val))}
              </div>

              {renderCustomColorPicker("Card Background", data.general.cardBgColor || "#f8fafc", (val) => handleGeneralChange("cardBgColor", val))}
            </div>

            {/* Media Upload Section */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-600 uppercase block">Media &amp; Images</label>
              
              {/* Logo */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-700 block uppercase">Brand Logo Image</span>
                {data.general.logoUrl ? (
                  <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                    <img src={data.general.logoUrl} className="h-8 object-contain" />
                    <button onClick={() => handleClearImage("logoUrl")} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logoUrl")} className="text-xs w-full" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Pages Block Visibility */}
        {activeTab === "pages" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 block uppercase">Page Visibility Toggles</span>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">Show/Hide specific sections dynamically. Excluded pages won't be exported, and pagination numbers will automatically adjust.</p>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {pagesConfig.map((page) => {
                const isChecked = visiblePages.includes(page.num);
                return (
                  <div 
                    key={page.num} 
                    onClick={() => !page.required && handlePageToggle(page.num)}
                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${page.required ? "bg-slate-50 border-slate-200 opacity-80 cursor-not-allowed" : isChecked ? "bg-sky-50/40 border-sky-200 hover:bg-sky-50/70 cursor-pointer" : "bg-white border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
                  >
                    <input type="checkbox" checked={isChecked} disabled={page.required} onChange={() => {}} className="mt-0.5 cursor-pointer accent-sky-600 shrink-0" />
                    <div className="leading-tight">
                      <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        Page {page.num}: {page.title}
                        {page.required && <span className="text-[8px] font-black text-slate-400 border border-slate-200 px-1 rounded uppercase tracking-wider scale-90">Required</span>}
                      </span>
                      <p className="text-[9px] text-slate-500 leading-normal mt-0.5">{page.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Page Export Sequence */}
            <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block uppercase">Arrange Page Order (Export Sequence)</span>
                <p className="text-[10px] text-slate-500 italic">Use the arrow buttons to arrange pages in your preferred printing order.</p>
              </div>
              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {visiblePages.map((pageNum, index) => {
                  const pageConfig = pagesConfig.find(p => p.num === pageNum) || { title: `Page ${pageNum}`, description: "" };
                  return (
                    <div 
                      key={pageNum}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {index + 1}
                        </span>
                        <div className="leading-tight">
                          <span className="font-bold text-slate-800">Page {pageNum}: {pageConfig.title}</span>
                        </div>
                      </div>

                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); movePageUp(pageNum); }}
                          disabled={index === 0}
                          className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:hover:bg-white text-slate-500 transition-colors"
                          title="Move Page Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); movePageDown(pageNum); }}
                          disabled={index === visiblePages.length - 1}
                          className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:hover:bg-white text-slate-500 transition-colors"
                          title="Move Page Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Content Editor (100% editable fields) */}
        {activeTab === "content" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Select Page to Edit Content</label>
              <select 
                value={selectedContentPage} 
                onChange={(e) => setSelectedContentPage(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white"
              >
                <option value="page1">Page 1: Newsletter Cover Page</option>
                <option value="page2">Page 2: CEO Corner &amp; Greeting</option>
                <option value="page3">Page 3: Sri Lanka Macro Focus</option>
                <option value="page4">Page 4: Global Finance Tectonics</option>
                <option value="page5">Page 5: Parent Group Conglomerate</option>
                <option value="page6">Page 6: PEAK Matrix Recognition</option>
                <option value="page7">Page 7: F&amp;A Service Pillars</option>
                <option value="page8">Page 8: Back Office &amp; automation</option>
                <option value="page9">Page 9: Global Team Ranks</option>
                <option value="page10">Page 10: Value Props &amp; Social</option>
                <option value="page11">Page 11: Wellness &amp; Events</option>
              </select>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-4">
              {/* PAGE 1: COVER PAGE */}
              {selectedContentPage === "page1" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Newsletter Cover Page</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Title</label>
                    <input type="text" value={data.general.title} onChange={(e) => handleGeneralChange("title", e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Subtitle</label>
                    <input type="text" value={data.general.subtitle} onChange={(e) => handleGeneralChange("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Date Info</label>
                    <input type="text" value={data.general.date} onChange={(e) => handleGeneralChange("date", e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Edition Info</label>
                    <input type="text" value={data.general.edition} onChange={(e) => handleGeneralChange("edition", e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
                  </div>
                  {renderImageUploadControls(data.general.coverImageUrl, "coverImageUrl", "Cover Background Image")}
                  {renderBackgroundControls(
                    { bgColor: data.general.coverBgColor, bgImageUrl: data.general.coverBgImageUrl },
                    (field, value) => {
                      const updatedField = field === "bgColor" ? "coverBgColor" : "coverBgImageUrl";
                      onChange({ ...data, general: { ...data.general, [updatedField]: value } });
                    }
                  )}
                </div>
              )}

              {/* PAGE 2 CEO CORNER */}
              {selectedContentPage === "page2" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">CEO Corner Settings</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase">CEO Portrait Image</label>
                    {data.general.ceoImageUrl ? (
                      <div className="flex items-center justify-between bg-white p-2 rounded border">
                        <img src={data.general.ceoImageUrl} className="h-10 w-10 rounded-full object-cover" />
                        <button onClick={() => handleClearImage("ceoImageUrl")} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "ceoImageUrl")} className="text-xs w-full" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">CEO Name</label>
                    <input type="text" value={data.general.ceoName} onChange={(e) => handleGeneralChange("ceoName", e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">CEO Title</label>
                    <input type="text" value={data.general.ceoTitle} onChange={(e) => handleGeneralChange("ceoTitle", e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">CEO Message</label>
                    <textarea value={data.general.ceoMessage} onChange={(e) => handleGeneralChange("ceoMessage", e.target.value)} rows={6} className="w-full px-2 py-1 text-xs border border-slate-200 rounded leading-normal" />
                  </div>

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Testimonials &amp; Quotes</h4>
                  {data.testimonials.map((test, index) => (
                    <div key={test.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold text-sky-700 uppercase">Quote #{index+1} ({test.location})</span>
                      <input type="text" value={test.author} onChange={(e) => handleTestimonialChange(test.id, "author", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" placeholder="Author name" />
                      <input type="text" value={test.company} onChange={(e) => handleTestimonialChange(test.id, "company", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" placeholder="Company" />
                      <textarea value={test.quote} onChange={(e) => handleTestimonialChange(test.id, "quote", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded bg-white leading-normal" />
                    </div>
                  ))}

                  {renderBackgroundControls(
                    { bgColor: data.general.ceoBgColor, bgImageUrl: data.general.ceoBgImageUrl },
                    (field, value) => {
                      const updatedField = field === "bgColor" ? "ceoBgColor" : "ceoBgImageUrl";
                      onChange({ ...data, general: { ...data.general, [updatedField]: value } });
                    }
                  )}
                </div>
              )}

              {/* PAGE 3 SRI LANKA MACRO */}
              {selectedContentPage === "page3" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Sri Lanka Macro Focus</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Subtitle</label>
                    <input type="text" value={data.page3?.subtitle || ""} onChange={(e) => handlePage3Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Main Title</label>
                    <input type="text" value={data.page3?.title || ""} onChange={(e) => handlePage3Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block uppercase">Description</label>
                    <textarea value={data.page3?.description || ""} onChange={(e) => handlePage3Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Macro Stats Indicators</h4>
                  {data.stats.filter(s => s.category === "sri-lanka").map((stat) => (
                    <div key={stat.id} className="p-3 bg-slate-50 rounded-lg border space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={stat.value} onChange={(e) => handleStatChange(stat.id, "value", e.target.value)} className="px-2 py-1 text-xs border rounded bg-white font-bold" placeholder="Value" />
                        <input type="text" value={stat.label} onChange={(e) => handleStatChange(stat.id, "label", e.target.value)} className="px-2 py-1 text-xs border rounded bg-white" placeholder="Label" />
                      </div>
                      <input type="text" value={stat.subtext} onChange={(e) => handleStatChange(stat.id, "subtext", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" placeholder="Supporting text" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Island Accolades</h4>
                  {(data.page3?.accolades || []).map((accolade, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded border">
                      <input type="text" value={accolade.title} onChange={(e) => handlePage3AccoladeChange(idx, "title", e.target.value)} className="px-2 py-1 text-xs border rounded bg-white font-bold" />
                      <input type="text" value={accolade.subtitle} onChange={(e) => handlePage3AccoladeChange(idx, "subtitle", e.target.value)} className="px-2 py-1 text-xs border rounded bg-white" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Commentary &amp; Tag</h4>
                  <input type="text" value={data.page3?.commentaryTitle || ""} onChange={(e) => handlePage3Change("commentaryTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" placeholder="Commentary title" />
                  <textarea value={data.page3?.commentaryText || ""} onChange={(e) => handlePage3Change("commentaryText", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" placeholder="Commentary description" />
                  <input type="text" value={data.page3?.tagline || ""} onChange={(e) => handlePage3Change("tagline", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Tagline text" />
                  {renderBackgroundControls(data.page3, handlePage3Change)}
                </div>
              )}

              {/* PAGE 4 GLOBAL FINANCE */}
              {selectedContentPage === "page4" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Global Finance Tectonics</h3>
                  <input type="text" value={data.page4?.subtitle || ""} onChange={(e) => handlePage4Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page4?.title || ""} onChange={(e) => handlePage4Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page4?.description || ""} onChange={(e) => handlePage4Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" placeholder="Description" />

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Three Financial Trends</h4>
                  {(data.page4?.trends || []).map((trend, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border space-y-2">
                      <input type="text" value={trend.title} onChange={(e) => handlePage4TrendChange(idx, "title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white font-bold" placeholder="Trend Title" />
                      <textarea value={trend.text} onChange={(e) => handlePage4TrendChange(idx, "text", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded bg-white" placeholder="Trend description" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Takeaway Responses</h4>
                  <input type="text" value={data.page4?.takeawayTitle || ""} onChange={(e) => handlePage4Change("takeawayTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Takeaway title" />
                  <textarea value={data.page4?.takeawayText || ""} onChange={(e) => handlePage4Change("takeawayText", e.target.value)} rows={2} className="w-full px-2 py-1 text-xs border rounded" placeholder="Takeaway text" />
                  <input type="text" value={data.page4?.takeawayLink || ""} onChange={(e) => handlePage4Change("takeawayLink", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Reference link page" />
                  {renderBackgroundControls(data.page4, handlePage4Change)}
                </div>
              )}

              {/* PAGE 5 PARENT GROUP */}
              {selectedContentPage === "page5" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">John Keells Holdings PLC</h3>
                  <input type="text" value={data.page5?.subtitle || ""} onChange={(e) => handlePage5Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <input type="text" value={data.page5?.title || ""} onChange={(e) => handlePage5Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <textarea value={data.page5?.description || ""} onChange={(e) => handlePage5Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" />

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">JKH Financial Stats</h4>
                  {data.stats.filter(s => s.category === "jkh").map((stat) => (
                    <div key={stat.id} className="p-3 bg-slate-50 rounded-lg border space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={stat.value} onChange={(e) => handleStatChange(stat.id, "value", e.target.value)} className="px-2 py-1 text-xs border rounded bg-white font-bold" />
                        <input type="text" value={stat.label} onChange={(e) => handleStatChange(stat.id, "label", e.target.value)} className="px-2 py-1 text-xs border rounded bg-white" />
                      </div>
                      <input type="text" value={stat.subtext} onChange={(e) => handleStatChange(stat.id, "subtext", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Flagship Projects</h4>
                  {(data.page5?.projects || []).map((proj, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border space-y-2">
                      <input type="text" value={proj.title} onChange={(e) => handlePage5ProjectChange(idx, "title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white font-bold" />
                      <textarea value={proj.text} onChange={(e) => handlePage5ProjectChange(idx, "text", e.target.value)} rows={2} className="w-full px-2 py-1 text-xs border rounded bg-white" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Environment commitments</h4>
                  <input type="text" value={data.page5?.commitmentsTitle || ""} onChange={(e) => handlePage5Change("commitmentsTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" />
                  <textarea value={data.page5?.commitmentsText || ""} onChange={(e) => handlePage5Change("commitmentsText", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" />
                  <input type="text" value={data.page5?.commitmentsTag || ""} onChange={(e) => handlePage5Change("commitmentsTag", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-semibold" />
                  
                  {renderImageUploadControls(data.page5?.imageUrl, "page5Url", "Flagship Image")}
                  {renderBackgroundControls(data.page5, handlePage5Change)}
                </div>
              )}

              {/* PAGE 6 PEAK MATRIX */}
              {selectedContentPage === "page6" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">PEAK Matrix Recognition</h3>
                  <input type="text" value={data.page6?.badge || ""} onChange={(e) => handlePage6Change("badge", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Badge text" />
                  <input type="text" value={data.page6?.title || ""} onChange={(e) => handlePage6Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page6?.description || ""} onChange={(e) => handlePage6Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" placeholder="Description" />
                  
                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Everest Quote</h4>
                  <textarea value={data.page6?.quote || ""} onChange={(e) => handlePage6Change("quote", e.target.value)} rows={5} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Quote" />
                  <input type="text" value={data.page6?.quoteAuthor || ""} onChange={(e) => handlePage6Change("quoteAuthor", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" placeholder="Author" />
                  <input type="text" value={data.page6?.quoteAuthorTitle || ""} onChange={(e) => handlePage6Change("quoteAuthorTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Author Title" />
                  <input type="text" value={data.page6?.quoteCategory || ""} onChange={(e) => handlePage6Change("quoteCategory", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Category status" />

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Check Bullet Points</h4>
                  <input type="text" value={data.page6?.bullet1 || ""} onChange={(e) => handlePage6Change("bullet1", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <input type="text" value={data.page6?.bullet2 || ""} onChange={(e) => handlePage6Change("bullet2", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  
                  {renderImageUploadControls(data.page6?.imageUrl, "page6Url", "Everest Recognition Badge")}
                  {renderImageAdjustmentControls(data.page6, handlePage6Change)}
                  {renderBackgroundControls(data.page6, handlePage6Change, true)}
                </div>
              )}

              {/* PAGE 7 SERVICE PILLARS */}
              {selectedContentPage === "page7" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Core Service Pillars</h3>
                  {data.services.map((service) => (
                    <div key={service.id} className="p-3 bg-slate-50 rounded border space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Pillar {service.id.toUpperCase()}</span>
                      <input type="text" value={service.title} onChange={(e) => handleServiceChange(service.id, "title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white font-bold" />
                      <textarea value={service.description} onChange={(e) => handleServiceChange(service.id, "description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded bg-white leading-normal" />
                      
                      <div>
                        <label className="text-[8px] text-slate-400 font-bold block uppercase">Capabilities (Comma-separated)</label>
                        <input 
                          type="text" 
                          value={service.items.join(", ")} 
                          onChange={(e) => handleServiceChange(service.id, "items", e.target.value.split(",").map((s: string) => s.trim()))} 
                          className="w-full px-2 py-1 text-xs border rounded bg-white"
                        />
                      </div>
                    </div>
                  ))}
                  {renderBackgroundControls(data.page7, handlePage7Change)}
                </div>
              )}

              {/* PAGE 8 BACK OFFICE & AUTOMATION */}
              {selectedContentPage === "page8" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Back Office Excellence</h3>
                  <input type="text" value={data.page8?.subtitle || ""} onChange={(e) => handlePage8Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <input type="text" value={data.page8?.title || ""} onChange={(e) => handlePage8Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <textarea value={data.page8?.description || ""} onChange={(e) => handlePage8Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" />
                  
                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Individual Services</h4>
                  {data.backOffice.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded border space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">{item.id}</span>
                      <input type="text" value={item.title} onChange={(e) => handleBackOfficeChange(item.id, "title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white font-bold" />
                      <input type="text" value={item.description} onChange={(e) => handleBackOfficeChange(item.id, "description", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Automation DRIVE Settings</h4>
                  <input type="text" value={data.page8?.automationTitle || ""} onChange={(e) => handlePage8Change("automationTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" />
                  <input type="text" value={data.page8?.complianceText || ""} onChange={(e) => handlePage8Change("complianceText", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  
                  {renderImageUploadControls(data.page8?.imageUrl, "page8Url", "Process/DRIVE Image")}
                  {renderBackgroundControls(data.page8, handlePage8Change)}
                </div>
              )}

              {/* PAGE 9 GLOBAL TEAM */}
              {selectedContentPage === "page9" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Global Team structure</h3>
                  <input type="text" value={data.page9?.subtitle || ""} onChange={(e) => handlePage9Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <input type="text" value={data.page9?.title || ""} onChange={(e) => handlePage9Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <textarea value={data.page9?.description || ""} onChange={(e) => handlePage9Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded" />

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Primary Hubs</h4>
                  <input type="text" value={data.page9?.hubsTitle || ""} onChange={(e) => handlePage9Change("hubsTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" />
                  {(data.page9?.hubs || []).map((hub, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded border space-y-1">
                      <input type="text" value={hub.title} onChange={(e) => handlePage9HubChange(idx, "title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white font-bold" />
                      <input type="text" value={hub.desc} onChange={(e) => handlePage9HubChange(idx, "desc", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">Table of Ranks Pool</h4>
                  {data.team.map((row, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded border space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 block">{row.role}</span>
                      <div className="grid grid-cols-3 gap-1">
                        <input type="text" value={row.role} onChange={(e) => handleTeamRoleChange(idx, "role", e.target.value)} className="px-2 py-1 text-[10px] border rounded bg-white font-bold col-span-2" />
                        <input type="text" value={row.count} onChange={(e) => handleTeamRoleChange(idx, "count", e.target.value)} className="px-2 py-1 text-[10px] border rounded bg-white text-center" />
                      </div>
                      <input type="text" value={row.qualifications} onChange={(e) => handleTeamRoleChange(idx, "qualifications", e.target.value)} className="w-full px-2 py-1 text-[10px] border rounded bg-white" />
                    </div>
                  ))}
                  
                  {renderImageUploadControls(data.page9?.imageUrl, "page9Url", "Team / Work Culture Photo")}
                  {renderBackgroundControls(data.page9, handlePage9Change)}
                </div>
              )}

              {/* PAGE 10 VALUE PROPS & ESG */}
              {selectedContentPage === "page10" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Value Props &amp; ESG</h3>
                  <input type="text" value={data.page10?.subtitle || ""} onChange={(e) => handlePage10Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  <input type="text" value={data.page10?.title || ""} onChange={(e) => handlePage10Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" />
                  
                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">8 Value Propositions</h4>
                  {data.valueProps.map((prop) => (
                    <div key={prop.number} className="p-2.5 bg-slate-50 rounded border space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-400">Value #{prop.number}</span>
                      <input type="text" value={prop.title} onChange={(e) => handleValuePropChange(prop.number, "title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white font-bold" />
                      <input type="text" value={prop.description} onChange={(e) => handleValuePropChange(prop.number, "description", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" />
                    </div>
                  ))}

                  <h4 className="text-[11px] font-bold text-slate-600 uppercase pt-2 border-t">ESG Initiatives Banner</h4>
                  <input type="text" value={data.page10?.socialTitle || ""} onChange={(e) => handlePage10Change("socialTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" />
                  {data.social.map((soc) => (
                    <div key={soc.id} className="p-2.5 bg-slate-50 rounded border space-y-1.5">
                      <div className="flex gap-2">
                        <input type="text" value={soc.badge} onChange={(e) => handleSocialInitiativeChange(soc.id, "badge", e.target.value)} className="px-2 py-1 text-[10px] border rounded bg-white font-bold w-1/3" />
                        <input type="text" value={soc.title} onChange={(e) => handleSocialInitiativeChange(soc.id, "title", e.target.value)} className="px-2 py-1 text-[10px] border rounded bg-white font-bold w-2/3" />
                      </div>
                      <textarea value={soc.description} onChange={(e) => handleSocialInitiativeChange(soc.id, "description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded bg-white leading-normal" />
                    </div>
                  ))}
                  
                  {renderImageUploadControls(data.page10?.imageUrl, "page10Url", "Social Responsibility Photo")}
                  {renderBackgroundControls(data.page10, handlePage10Change)}
                </div>
              )}

              {/* PAGE 11 STAFF WELLNESS */}
              {selectedContentPage === "page11" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Staff Wellness Settings</h3>
                  <input type="text" value={data.page11?.subtitle || ""} onChange={(e) => handlePage11Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page11?.title || ""} onChange={(e) => handlePage11Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page11?.description || ""} onChange={(e) => handlePage11Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Description" />
                  <input type="text" value={data.page11?.tagline || ""} onChange={(e) => handlePage11Change("tagline", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Tagline" />
                  
                  {renderMultipleEventsControls("page11", data.page11, handlePage11Change)}

                  {(!data.page11?.wellnessItems || data.page11.wellnessItems.length === 0) && (
                    <>
                      <input type="text" value={data.page11?.bullet1 || ""} onChange={(e) => handlePage11Change("bullet1", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Bullet 1" />
                      <input type="text" value={data.page11?.bullet2 || ""} onChange={(e) => handlePage11Change("bullet2", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Bullet 2" />
                      <input type="text" value={data.page11?.bullet3 || ""} onChange={(e) => handlePage11Change("bullet3", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Bullet 3" />
                      {renderImageUploadControls(data.page11?.imageUrl, "page11Url", "Wellness Photo")}
                      {renderImageAdjustmentControls(data.page11, handlePage11Change)}
                    </>
                  )}

                  {renderBackgroundControls(data.page11, handlePage11Change)}
                </div>
              )}

              {/* PAGE 12 VALENTINE'S KARAOKE */}
              {selectedContentPage === "page12" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Valentine's Day Karaoke Settings</h3>
                  <input type="text" value={data.page12?.subtitle || ""} onChange={(e) => handlePage12Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page12?.title || ""} onChange={(e) => handlePage12Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page12?.description || ""} onChange={(e) => handlePage12Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Description" />
                  <input type="text" value={data.page12?.tagline || ""} onChange={(e) => handlePage12Change("tagline", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Tagline" />
                  
                  {renderMultipleEventsControls("page12", data.page12, handlePage12Change)}

                  {(!data.page12?.wellnessItems || data.page12.wellnessItems.length === 0) && (
                    <>
                      <textarea value={data.page12?.highlights || ""} onChange={(e) => handlePage12Change("highlights", e.target.value)} rows={4} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Highlights" />
                      {renderImageUploadControls(data.page12?.imageUrl, "page12Url", "Karaoke Photo")}
                      {renderImageAdjustmentControls(data.page12, handlePage12Change)}
                    </>
                  )}

                  {renderBackgroundControls(data.page12, handlePage12Change)}
                </div>
              )}

              {/* PAGE 13 WOMEN'S DAY PANEL */}
              {selectedContentPage === "page13" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Women's Career Growth Settings</h3>
                  <input type="text" value={data.page13?.subtitle || ""} onChange={(e) => handlePage13Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page13?.title || ""} onChange={(e) => handlePage13Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page13?.description || ""} onChange={(e) => handlePage13Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Description" />
                  <input type="text" value={data.page13?.tagline || ""} onChange={(e) => handlePage13Change("tagline", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Tagline" />
                  
                  {renderMultipleEventsControls("page13", data.page13, handlePage13Change)}

                  {(!data.page13?.wellnessItems || data.page13.wellnessItems.length === 0) && (
                    <>
                      <input type="text" value={data.page13?.panelTitle || ""} onChange={(e) => handlePage13Change("panelTitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold" placeholder="Panel Title" />
                      <textarea value={data.page13?.panelText || ""} onChange={(e) => handlePage13Change("panelText", e.target.value)} rows={4} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Panel discussion details" />
                      {renderImageUploadControls(data.page13?.imageUrl, "page13Url", "Women's Day Photo")}
                      {renderImageAdjustmentControls(data.page13, handlePage13Change)}
                    </>
                  )}

                  {renderBackgroundControls(data.page13, handlePage13Change)}
                </div>
              )}

              {/* PAGE 14 MATE TALK */}
              {selectedContentPage === "page14" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">MATE Talk Series Settings</h3>
                  <input type="text" value={data.page14?.subtitle || ""} onChange={(e) => handlePage14Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page14?.title || ""} onChange={(e) => handlePage14Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page14?.description || ""} onChange={(e) => handlePage14Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Description" />
                  
                  {renderMultipleEventsControls("page14", data.page14, handlePage14Change)}

                  {(!data.page14?.wellnessItems || data.page14.wellnessItems.length === 0) && (
                    <>
                      <div className="p-2.5 bg-slate-50 rounded border space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Panelist 1</span>
                        <input type="text" value={data.page14?.speaker1Name || ""} onChange={(e) => handlePage14Change("speaker1Name", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold bg-white" placeholder="Name" />
                        <input type="text" value={data.page14?.speaker1Title || ""} onChange={(e) => handlePage14Change("speaker1Title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" placeholder="Title" />
                        <textarea value={data.page14?.speaker1Desc || ""} onChange={(e) => handlePage14Change("speaker1Desc", e.target.value)} rows={2} className="w-full px-2 py-1 text-xs border rounded bg-white leading-normal" placeholder="Brief bio/points" />
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded border space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Panelist 2</span>
                        <input type="text" value={data.page14?.speaker2Name || ""} onChange={(e) => handlePage14Change("speaker2Name", e.target.value)} className="w-full px-2 py-1 text-xs border rounded font-bold bg-white" placeholder="Name" />
                        <input type="text" value={data.page14?.speaker2Title || ""} onChange={(e) => handlePage14Change("speaker2Title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded bg-white" placeholder="Title" />
                        <textarea value={data.page14?.speaker2Desc || ""} onChange={(e) => handlePage14Change("speaker2Desc", e.target.value)} rows={2} className="w-full px-2 py-1 text-xs border rounded bg-white leading-normal" placeholder="Brief bio/points" />
                      </div>

                      <textarea value={data.page14?.takeaway || ""} onChange={(e) => handlePage14Change("takeaway", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Takeaway message" />
                      {renderImageUploadControls(data.page14?.imageUrl, "page14Url", "MATE Talk Photo")}
                      {renderImageAdjustmentControls(data.page14, handlePage14Change)}
                    </>
                  )}

                  {renderBackgroundControls(data.page14, handlePage14Change)}
                </div>
              )}

              {/* PAGE 15 VESAK OFFICE DECORATION */}
              {selectedContentPage === "page15" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Vesak Decoration Competition</h3>
                  <input type="text" value={data.page15?.subtitle || ""} onChange={(e) => handlePage15Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page15?.title || ""} onChange={(e) => handlePage15Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page15?.description || ""} onChange={(e) => handlePage15Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Description" />
                  <input type="text" value={data.page15?.tagline || ""} onChange={(e) => handlePage15Change("tagline", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Tagline" />
                  
                  {renderMultipleEventsControls("page15", data.page15, handlePage15Change)}

                  {(!data.page15?.wellnessItems || data.page15.wellnessItems.length === 0) && (
                    <>
                      <textarea value={data.page15?.details || ""} onChange={(e) => handlePage15Change("details", e.target.value)} rows={4} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Competition details" />
                      {renderImageUploadControls(data.page15?.imageUrl, "page15Url", "Vesak Decoration Photo")}
                      {renderImageAdjustmentControls(data.page15, handlePage15Change)}
                    </>
                  )}

                  {renderBackgroundControls(data.page15, handlePage15Change)}
                </div>
              )}

              {/* PAGE 16 VESAK DANSALA INITIATIVES */}
              {selectedContentPage === "page16" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-sky-700 uppercase">Vesak Dansala Settings</h3>
                  <input type="text" value={data.page16?.subtitle || ""} onChange={(e) => handlePage16Change("subtitle", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Subtitle" />
                  <input type="text" value={data.page16?.title || ""} onChange={(e) => handlePage16Change("title", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Title" />
                  <textarea value={data.page16?.description || ""} onChange={(e) => handlePage16Change("description", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Description" />
                  <input type="text" value={data.page16?.tagline || ""} onChange={(e) => handlePage16Change("tagline", e.target.value)} className="w-full px-2 py-1 text-xs border rounded" placeholder="Tagline" />
                  
                  {renderMultipleEventsControls("page16", data.page16, handlePage16Change)}

                  {(!data.page16?.wellnessItems || data.page16.wellnessItems.length === 0) && (
                    <>
                      <textarea value={data.page16?.teamPageroText || ""} onChange={(e) => handlePage16Change("teamPageroText", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Team Pagero Popsicle Dansala details" />
                      <textarea value={data.page16?.teamFinanceText || ""} onChange={(e) => handlePage16Change("teamFinanceText", e.target.value)} rows={3} className="w-full px-2 py-1 text-xs border rounded leading-normal" placeholder="Ultimate Finance Bun Dansala details" />
                      {renderImageUploadControls(data.page16?.imageUrl, "page16Url", "Vesak Dansala Photo")}
                      {renderImageAdjustmentControls(data.page16, handlePage16Change)}
                    </>
                  )}

                  {renderBackgroundControls(data.page16, handlePage16Change)}
                </div>
              )}

              {/* Canva Style Editing Tip */}
              {selectedContentPage && (
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5 mt-4 space-y-1.5 text-xs text-sky-800 text-left">
                  <span className="font-bold flex items-center gap-1.5 text-sky-900">
                    🎨 Visual Editor Tip
                  </span>
                  <p className="leading-relaxed text-sky-700/90 text-[11px]">
                    To style this page's background, card frames, or photos, simply **click on them directly in the preview** window.
                  </p>
                  <p className="leading-relaxed text-sky-700/90 text-[11px]">
                    A context-aware editor toolbar will slide open at the top of the canvas (like Canva) to configure colors, sizing, corners, borders, shadows, and grayscale filters!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
