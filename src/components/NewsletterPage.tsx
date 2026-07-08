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

const renderDynamicEventContent = (
  layoutMode: string,
  items: any[] | undefined | null,
  legacyImage: React.ReactNode,
  legacyBody: React.ReactNode,
  legacyPos: string,
  legacyImageUrl: string | undefined,
  primaryColor: string,
  accentColor: string,
  textColor: string,
  cardBgColor: string,
  configs?: {
    gridCols?: 2 | 3;
    cardImageSize?: "small" | "medium" | "large";
    imageRounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    imageShadow?: "none" | "sm" | "md" | "lg";
    imageBorderWidth?: number;
    imageBorderColor?: string;
    imageFit?: "cover" | "contain";
    imageBorderStyle?: "solid" | "dashed" | "dotted";
    imageGrayscale?: boolean;
    cardStyle?: React.CSSProperties;
    pageNumber?: number;
    selectedElement?: { type: "image" | "bg" | "card", pageNum: number, index?: number } | null;
    onSelectElement?: (element: { type: "image" | "bg" | "card", pageNum: number, index?: number } | null) => void;
  }
) => {
  if (!items || items.length === 0) {
    return legacyImageUrl ? (
      legacyPos === "left" ? (
        <div className="flex gap-6 items-center w-full">{legacyImage}{legacyBody}</div>
      ) : legacyPos === "right" ? (
        <div className="flex gap-6 items-center w-full">{legacyBody}{legacyImage}</div>
      ) : legacyPos === "top" ? (
        <div className="space-y-4 flex flex-col items-center w-full">{legacyImage}{legacyBody}</div>
      ) : (
        <div className="space-y-4 flex flex-col items-center w-full">{legacyBody}{legacyImage}</div>
      )
    ) : legacyBody;
  }

  const pageNumber = configs?.pageNumber || 0;
  const selectedElement = configs?.selectedElement || null;
  const onSelectElement = configs?.onSelectElement;

  const count = items.length;

  const getCardImageStyle = (idx: number, isCircle: boolean = false): React.CSSProperties => {
    const isSelected = selectedElement?.type === "image" && selectedElement?.pageNum === pageNumber && selectedElement?.index === idx;

    const rounded = configs?.imageRounded || "xl";
    const shadow = configs?.imageShadow || "sm";
    const borderWidth = configs?.imageBorderWidth !== undefined ? configs.imageBorderWidth : 0;
    const borderColor = configs?.imageBorderColor || "#cbd5e1";
    const fit = configs?.imageFit || "cover";
    const borderStyle = configs?.imageBorderStyle || "solid";
    const filter = configs?.imageGrayscale ? "grayscale(100%)" : "none";

    let borderRadius = "0.75rem";
    if (isCircle) {
      borderRadius = "9999px";
    } else {
      switch (rounded) {
        case "none": borderRadius = "0px"; break;
        case "sm": borderRadius = "0.125rem"; break;
        case "md": borderRadius = "0.375rem"; break;
        case "lg": borderRadius = "0.5rem"; break;
        case "xl": borderRadius = "0.75rem"; break;
        case "full": borderRadius = "9999px"; break;
      }
    }

    let boxShadow = "none";
    switch (shadow) {
      case "sm": boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"; break;
      case "md": boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"; break;
      case "lg": boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; break;
    }

    const baseStyle = {
      borderRadius,
      boxShadow,
      border: borderWidth > 0 ? `${borderWidth}px ${borderStyle} ${borderColor}` : "none",
      filter
    };

    if (isSelected) {
      return {
        ...baseStyle,
        boxShadow: "0 0 0 3px #0ea5e9, 0 10px 15px -3px rgba(14, 165, 233, 0.3)",
        borderColor: "#0ea5e9"
      };
    }
    return baseStyle;
  };

  const getCardStyle = (idx: number): React.CSSProperties => {
    const isSelected = selectedElement?.type === "card" && selectedElement?.pageNum === pageNumber && selectedElement?.index === idx;
    const baseStyle = configs?.cardStyle || {
      backgroundColor: cardBgColor,
      borderColor: `${textColor}10`,
      borderRadius: "1rem",
      padding: "1rem"
    };

    if (isSelected) {
      return {
        ...baseStyle,
        boxShadow: "0 0 0 3px #0ea5e9, 0 10px 15px -3px rgba(14, 165, 233, 0.3)",
        borderColor: "#0ea5e9"
      };
    }
    return baseStyle;
  };

  if (layoutMode === "grid") {
    const colsVal = configs?.gridCols || (count <= 2 ? 2 : 3);
    const gridColsClass = colsVal === 2 ? "grid-cols-2" : "grid-cols-3";
    
    const size = configs?.cardImageSize || (count > 4 ? "medium" : "large");
    let imgHeightClass = "h-26";
    let cardHeightClass = "h-64";
    if (size === "small") {
      imgHeightClass = "h-20";
      cardHeightClass = colsVal === 2 ? "h-56" : "h-[195px]";
    } else if (size === "medium") {
      imgHeightClass = "h-26";
      cardHeightClass = colsVal === 2 ? "h-64" : "h-[225px]";
    } else { // large
      imgHeightClass = "h-32";
      cardHeightClass = colsVal === 2 ? "h-72" : "h-[250px]";
    }
    
    return (
      <div className={`grid ${gridColsClass} gap-4 my-auto`}>
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className={`flex flex-col justify-between ${cardHeightClass} relative overflow-hidden group hover:border-sky-300 hover:shadow-md transition-all duration-300 cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.({ type: "card", pageNum: pageNumber, index: idx });
            }}
            style={getCardStyle(idx)}
          >
            <div className="space-y-1.5 h-full flex flex-col justify-between">
              <div>
                {item.imageUrl && (
                  <div 
                    className={`${imgHeightClass} w-full overflow-hidden mb-2 bg-slate-50 shrink-0 cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.({ type: "image", pageNum: pageNumber, index: idx });
                    }}
                    style={getCardImageStyle(idx)}
                  >
                    <img 
                      src={item.imageUrl} 
                      className="w-full h-full" 
                      style={{ objectFit: configs?.imageFit || "cover", borderRadius: "inherit" }} 
                      alt={item.title} 
                    />
                  </div>
                )}
                <h4 className="font-extrabold text-[11px] sm:text-[12px] leading-tight flex items-center gap-1.5" style={{ color: textColor }}>
                  <span className="w-4.5 h-4.5 rounded-full text-white font-extrabold text-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: primaryColor }}>
                    {idx + 1}
                  </span>
                  {item.title}
                </h4>
              </div>
              <p className="text-[10px] leading-normal font-medium line-clamp-3" style={{ color: `${textColor}99` }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layoutMode === "list") {
    const spacingClass = count > 4 ? "space-y-2" : "space-y-3";
    
    const size = configs?.cardImageSize || (count > 4 ? "medium" : "large");
    let imgSizeClass = "w-36 h-24";
    if (size === "small") {
      imgSizeClass = "w-20 h-14";
    } else if (size === "medium") {
      imgSizeClass = "w-28 h-20";
    } else { // large
      imgSizeClass = "w-36 h-24";
    }
    
    return (
      <div className={`${spacingClass} my-auto`}>
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const imgEl = item.imageUrl && (
            <div 
              className={`${imgSizeClass} overflow-hidden shrink-0 bg-slate-50 cursor-pointer`} 
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement?.({ type: "image", pageNum: pageNumber, index: idx });
              }}
              style={getCardImageStyle(idx)}
            >
              <img 
                src={item.imageUrl} 
                className="w-full h-full" 
                style={{ objectFit: configs?.imageFit || "cover", borderRadius: "inherit" }} 
                alt={item.title} 
              />
            </div>
          );
          const textEl = (
            <div className="space-y-0.5 flex-1">
              <h4 className="font-extrabold text-[11px] sm:text-xs flex items-center gap-1.5" style={{ color: textColor }}>
                <span className="w-4.5 h-4.5 rounded-full text-white font-extrabold text-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: primaryColor }}>
                  {idx + 1}
                </span>
                {item.title}
              </h4>
              <p className="text-[10px] leading-normal font-medium line-clamp-2" style={{ color: `${textColor}cc` }}>
                {item.description}
              </p>
            </div>
          );
          return (
            <div 
              key={item.id} 
              className="flex items-center gap-3 sm:gap-4 hover:border-sky-300 transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement?.({ type: "card", pageNum: pageNumber, index: idx });
              }}
              style={getCardStyle(idx)}
            >
              {isEven ? (
                <>
                  {textEl}
                  {imgEl}
                </>
              ) : (
                <>
                  {imgEl}
                  {textEl}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (layoutMode === "three-col") {
    const colsVal = configs?.gridCols || (count <= 2 ? 2 : 3);
    const gridColsClass = colsVal === 2 ? "grid-cols-2" : "grid-cols-3";
    const gapClass = count > 3 ? "gap-4" : "gap-6";
    
    const size = configs?.cardImageSize || (count > 3 ? "medium" : "large");
    let imgHeightClass = "h-36";
    if (size === "small") {
      imgHeightClass = "h-20";
    } else if (size === "medium") {
      imgHeightClass = "h-28";
    } else { // large
      imgHeightClass = "h-36";
    }
    
    return (
      <div className={`grid ${gridColsClass} ${gapClass} my-auto`}>
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className="flex flex-col space-y-2 hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.({ type: "image", pageNum: pageNumber, index: idx });
            }}
          >
            {item.imageUrl ? (
              <div 
                className={`${imgHeightClass} w-full overflow-hidden bg-slate-50`} 
                style={getCardImageStyle(idx)}
              >
                <img 
                  src={item.imageUrl} 
                  className="w-full h-full" 
                  style={{ objectFit: configs?.imageFit || "cover", borderRadius: "inherit" }} 
                  alt={item.title} 
                />
              </div>
            ) : (
              <div 
                className={`${imgHeightClass} w-full border border-dashed flex items-center justify-center text-slate-300 bg-slate-50/50`} 
                style={getCardImageStyle(idx)}
              >
                <span className="text-[9px] uppercase font-bold text-slate-400">Event Spotlight</span>
              </div>
            )}
            <div className="space-y-0.5">
              <h4 className="font-extrabold text-[11px] sm:text-xs flex items-center gap-1.5" style={{ color: textColor }}>
                <span className="w-4.5 h-4.5 rounded-full text-white font-extrabold text-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: primaryColor }}>
                  {idx + 1}
                </span>
                {item.title}
              </h4>
              <p className="text-[10px] leading-normal font-medium line-clamp-3" style={{ color: `${textColor}a0` }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layoutMode === "hero-split") {
    const heroItem = items[0];
    const sidebarItems = items.slice(1);
    
    const colsVal = configs?.gridCols || (count > 4 ? 2 : 3);
    const leftColSpan = colsVal === 2 ? "col-span-6" : "col-span-7";
    const rightColSpan = colsVal === 2 ? "col-span-6" : "col-span-5";
    
    const sidebarGapClass = sidebarItems.length > 3 ? "gap-2" : "gap-3";
    
    const size = configs?.cardImageSize || "medium";
    let heroImgHeightClass = "h-36 sm:h-44";
    let sidebarImgSizeClass = "w-16 h-16";
    if (size === "small") {
      heroImgHeightClass = "h-28 sm:h-32";
      sidebarImgSizeClass = "w-12 h-12";
    } else if (size === "medium") {
      heroImgHeightClass = "h-36 sm:h-44";
      sidebarImgSizeClass = "w-16 h-16";
    } else { // large
      heroImgHeightClass = "h-40 sm:h-52";
      sidebarImgSizeClass = "w-20 h-20";
    }
    
    return (
      <div className="grid grid-cols-12 gap-4 sm:gap-5 my-auto items-stretch">
        <div 
          className={`${leftColSpan} flex flex-col justify-between space-y-3 hover:border-sky-300 transition-all duration-300 cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement?.({ type: "card", pageNum: pageNumber, index: 0 });
          }}
          style={getCardStyle(0)}
        >
          <div className="space-y-1.5">
            <span className="inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase text-white" style={{ backgroundColor: primaryColor }}>
              Spotlight Event
            </span>
            <h3 className="text-xs sm:text-sm font-black tracking-tight" style={{ color: textColor }}>{heroItem?.title}</h3>
            <p className="text-[10px] leading-relaxed font-medium" style={{ color: `${textColor}cc` }}>{heroItem?.description}</p>
          </div>
          {heroItem?.imageUrl && (
            <div 
              className={`${heroImgHeightClass} w-full overflow-hidden bg-slate-50 shrink-0 cursor-pointer`} 
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
              }}
              style={getCardImageStyle(0)}
            >
              <img 
                src={heroItem.imageUrl} 
                className="w-full h-full" 
                style={{ objectFit: configs?.imageFit || "cover", borderRadius: "inherit" }} 
                alt={heroItem.title} 
              />
            </div>
          )}
        </div>

        <div className={`${rightColSpan} flex flex-col ${sidebarGapClass} justify-between`}>
          {sidebarItems.map((item, idx) => (
            <div 
              key={item.id} 
              className="flex-1 flex items-center gap-2 hover:border-sky-300 transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement?.({ type: "card", pageNum: pageNumber, index: idx + 1 });
              }}
              style={getCardStyle(idx + 1)}
            >
              {item.imageUrl && (
                <div 
                  className={`${sidebarImgSizeClass} overflow-hidden shrink-0 bg-slate-50 cursor-pointer`} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.({ type: "image", pageNum: pageNumber, index: idx + 1 });
                  }}
                  style={getCardImageStyle(idx + 1)}
                >
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-full" 
                    style={{ objectFit: configs?.imageFit || "cover", borderRadius: "inherit" }} 
                    alt={item.title} 
                  />
                </div>
              )}
              <div className="space-y-0.5 flex-1 min-w-0">
                <h4 className="font-extrabold text-[11px] flex items-center gap-1.5 truncate" style={{ color: textColor }}>
                  <span className="w-4 h-4 rounded-full text-white font-extrabold text-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                    {idx + 2}
                  </span>
                  {item.title}
                </h4>
                <p className="text-[9px] leading-tight font-medium line-clamp-2" style={{ color: `${textColor}a0` }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

interface NewsletterPageProps {
  pageNumber: number;
  data: NewsletterData;
  selectedElement?: { type: "image" | "bg" | "card", pageNum: number, index?: number } | null;
  onSelectElement?: (element: { type: "image" | "bg" | "card", pageNum: number, index?: number } | null) => void;
}

export function NewsletterPage({ pageNumber, data, selectedElement, onSelectElement }: NewsletterPageProps) {
  // Resolve page-specific style overrides if global theme is disabled
  const pageStyle = !data.useGlobalTheme ? data.pageStyles?.[pageNumber] : undefined;
  
  const primaryColor = pageStyle?.primaryColor || data.general.primaryColor;
  const accentColor = pageStyle?.accentColor || data.general.accentColor;
  const textColor = pageStyle?.textColor || data.general.textColor || "#1e293b";
  const cardBgColor = pageStyle?.cardBgColor || data.general.cardBgColor || "#f8fafc";
  
  const fontSizeModifier = pageStyle?.fontSizeModifier || "medium";
  const paddingSize = pageStyle?.paddingSize || "normal";
  
  const imgRounded = pageStyle?.imageRounded || "xl";
  const imgShadow = pageStyle?.imageShadow || "sm";
  const imgBorderWidth = pageStyle?.imageBorderWidth !== undefined ? pageStyle.imageBorderWidth : 0;
  const imgBorderColor = pageStyle?.imageBorderColor || "#cbd5e1";

  // Icon mapper helper
  const getIconComponent = (name: string) => {
    switch (name) {
      case "Ship": return <Ship className="w-5 h-5 text-sky-600" style={{ color: primaryColor }} />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case "ShoppingCart": return <ShoppingCart className="w-5 h-5 text-emerald-600" />;
      case "HelpCircle": return <HelpCircle className="w-5 h-5 text-indigo-500" />;
      case "PhoneCall": return <PhoneCall className="w-5 h-5 text-amber-500" style={{ color: accentColor }} />;
      case "Target": return <Target className="w-5 h-5 text-orange-500" style={{ color: accentColor }} />;
      case "FileText": return <FileText className="w-5 h-5 text-blue-500" />;
      case "GitMerge": return <GitMerge className="w-5 h-5 text-purple-600" />;
      case "Users": return <Users className="w-5 h-5 text-teal-600" />;
      default: return <Briefcase className="w-5 h-5 text-slate-500" />;
    }
  };

  // Font Scaling Style Helper
  const getScaledStyle = (baseRem: number): React.CSSProperties => {
    const scale = fontSizeModifier === "small" ? 0.85 : fontSizeModifier === "large" ? 1.15 : 1.0;
    return { fontSize: `${baseRem * scale}rem` };
  };

  // Extended Image Styling Helper
  const getImageStyle = (isRoundedFull: boolean = false, idx: number = 0): React.CSSProperties => {
    const isSelected = selectedElement?.type === "image" && selectedElement?.pageNum === pageNumber && selectedElement?.index === idx;

    const fit = pageStyle?.imageFit || "cover";
    const borderStyle = pageStyle?.imageBorderStyle || "solid";
    const filter = pageStyle?.imageGrayscale ? "grayscale(100%)" : "none";

    let borderRadius = "0.75rem";
    if (isRoundedFull) {
      borderRadius = "9999px";
    } else {
      switch (imgRounded) {
        case "none": borderRadius = "0px"; break;
        case "sm": borderRadius = "0.125rem"; break;
        case "md": borderRadius = "0.375rem"; break;
        case "lg": borderRadius = "0.5rem"; break;
        case "xl": borderRadius = "0.75rem"; break;
        case "full": borderRadius = "9999px"; break;
      }
    }

    let boxShadow = "none";
    switch (imgShadow) {
      case "sm": boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"; break;
      case "md": boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"; break;
      case "lg": boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; break;
    }

    const baseStyle = {
      borderRadius,
      boxShadow,
      border: imgBorderWidth > 0 ? `${imgBorderWidth}px ${borderStyle} ${imgBorderColor}` : "none",
      objectFit: fit as any,
      filter
    };

    if (isSelected) {
      return {
        ...baseStyle,
        boxShadow: "0 0 0 3px #0ea5e9, 0 10px 15px -3px rgba(14, 165, 233, 0.3)",
        borderColor: "#0ea5e9"
      };
    }
    return baseStyle;
  };

  // Card Styling Helper
  const getCardStyle = (): React.CSSProperties => {
    const rounded = pageStyle?.cardRounded || "2xl";
    const shadow = pageStyle?.cardShadow || "none";
    const borderWidth = pageStyle?.cardBorderWidth !== undefined ? pageStyle.cardBorderWidth : 1;
    const borderColor = pageStyle?.cardBorderColor || `${textColor}10`;
    const padding = pageStyle?.cardPaddingSize === "compact" ? "0.75rem" :
                    pageStyle?.cardPaddingSize === "comfortable" ? "1.5rem" :
                    "1rem";
                    
    let borderRadius = "1rem";
    switch (rounded) {
      case "none": borderRadius = "0px"; break;
      case "sm": borderRadius = "0.25rem"; break;
      case "md": borderRadius = "0.375rem"; break;
      case "lg": borderRadius = "0.5rem"; break;
      case "xl": borderRadius = "0.75rem"; break;
      case "2xl": borderRadius = "1rem"; break;
    }
    
    let boxShadow = "none";
    switch (shadow) {
      case "sm": boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"; break;
      case "md": boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"; break;
      case "lg": boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"; break;
    }
    
    return {
      backgroundColor: cardBgColor,
      borderRadius,
      boxShadow,
      border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
      padding
    };
  };

  // Content Layout Gap Helper
  const getContentGapClass = (isFlex: boolean = true) => {
    const gapSize = pageStyle?.contentGapSize || "normal";
    if (isFlex) {
      return gapSize === "compact" ? "space-y-3" : gapSize === "wide" ? "space-y-7" : "space-y-5";
    } else {
      return gapSize === "compact" ? "gap-3" : gapSize === "wide" ? "gap-6" : "gap-4";
    }
  };

  // Title Font Styling Helper
  const titleFontFamily = pageStyle?.fontFamilyTitle === "outfit" ? "'Outfit', sans-serif" :
                          pageStyle?.fontFamilyTitle === "playfair" ? "'Playfair Display', serif" :
                          pageStyle?.fontFamilyTitle === "merriweather" ? "'Merriweather', serif" :
                          pageStyle?.fontFamilyTitle === "inter" ? "'Inter', sans-serif" : "";

  const getTitleStyle = (baseRem: number): React.CSSProperties => {
    const styleObj = getScaledStyle(baseRem);
    if (titleFontFamily) {
      styleObj.fontFamily = titleFontFamily;
    }
    return styleObj;
  };

  // Common Header of pages
  const PageHeader = ({ sectionName }: { sectionName: string }) => (
    <div className="flex items-center justify-between pb-3 border-b mb-6 select-none" style={{ borderColor: `${textColor}15` }}>
      <Logo primaryColor={primaryColor} accentColor={accentColor} size="lg" logoUrl={data.general.logoUrl} />
      <div className="text-right">
        <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: `${textColor}60` }}>{data.general.edition}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
          {sectionName}
        </span>
      </div>
    </div>
  );

  // Common Footer of pages
  const PageFooter = ({ pageNo }: { pageNo: number }) => {
    const actualPages = data.visiblePages || [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 10];
    const displayPageNo = actualPages.indexOf(pageNo) + 1;

    return (
      <div className="flex items-center justify-between pt-4 border-t mt-auto text-[10px] font-bold select-none" style={{ borderColor: `${textColor}15`, color: `${textColor}60` }}>
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

  const renderPageContainer = (
    pageNum: number,
    contentBgColor: string | undefined,
    contentBgImageUrl: string | undefined,
    children: React.ReactNode,
    options?: { isDark?: boolean; isPage6?: boolean; paddingClass?: string }
  ) => {
    const isDark = options?.isDark || false;
    const isPage6 = options?.isPage6 || false;
    
    // Resolve padding class
    const padding = options?.paddingClass || (
      paddingSize === "compact" ? "p-6" :
      paddingSize === "comfortable" ? "p-14" : "p-10"
    );

    // Resolve bg style
    let bgStyle: React.CSSProperties = {};
    const bgMode = pageStyle?.bgStyleMode || (isPage6 ? "gradient" : pageNum === 1 ? "gradient" : "solid");
    
    if (bgMode === "gradient") {
      const gradStart = pageStyle?.bgGradientStart || (isPage6 ? (data.page6?.bgGradientStart || "#090d16") : pageNum === 1 ? (data.general.coverBgColor || data.general.darkPageBgColor || "#020617") : "#ffffff");
      const gradEnd = pageStyle?.bgGradientEnd || (isPage6 ? (data.page6?.bgGradientEnd || "#020617") : pageNum === 1 ? "#000000" : "#f8fafc");
      bgStyle = {
        backgroundImage: `linear-gradient(135deg, ${gradStart}, ${gradEnd})`
      };
    } else if (bgMode === "image") {
      bgStyle = {
        backgroundColor: "transparent"
      };
    } else { // solid
      const bgCol = pageStyle?.pageBgColor || contentBgColor || (isDark ? (data.general.darkPageBgColor || "#020617") : (data.general.pageBgColor || "#ffffff"));
      bgStyle = {
        backgroundColor: bgCol
      };
    }

    const resolvedBgImageUrl = pageStyle?.bgImageUrl || contentBgImageUrl;
    const overlayOpacity = pageStyle?.bgImageOverlayOpacity !== undefined ? pageStyle.bgImageOverlayOpacity : (pageNum === 1 ? 80 : 0);

    const bodyFontFamily = pageStyle?.fontFamilyBody === "outfit" ? "'Outfit', sans-serif" :
                           pageStyle?.fontFamilyBody === "serif" ? "Georgia, serif" :
                           pageStyle?.fontFamilyBody === "merriweather" ? "'Merriweather', serif" :
                           pageStyle?.fontFamilyBody === "inter" ? "'Inter', sans-serif" : "";

    return (
      <div 
        className={`h-full flex flex-col justify-between relative overflow-hidden select-none ${padding} cursor-pointer transition-all duration-200`}
        onClick={(e) => {
          onSelectElement?.({ type: "bg", pageNum: pageNumber });
        }}
        style={{ 
          ...bgStyle,
          color: isDark ? (data.general.darkTextColor || "#ffffff") : textColor,
          fontFamily: bodyFontFamily || undefined,
          boxShadow: selectedElement?.type === "bg" && selectedElement?.pageNum === pageNumber ? "0 0 0 4px #0ea5e9 inset" : undefined
        }}
      >
        {resolvedBgImageUrl && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
              style={{ backgroundImage: `url(${resolvedBgImageUrl})` }}
            />
            {overlayOpacity > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none z-0 bg-slate-950"
                style={{ opacity: overlayOpacity / 100 }}
              />
            )}
          </>
        )}
        <div className="relative z-10 h-full flex flex-col justify-between" style={{ fontSize: fontSizeModifier === "small" ? "0.9em" : fontSizeModifier === "large" ? "1.1em" : "1em" }}>
          {children}
        </div>
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
          className="h-full flex flex-col justify-between relative overflow-hidden p-12 select-none"
          style={{ 
            backgroundColor: data.general.coverBgColor || data.general.darkPageBgColor || "#020617",
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
          {data.general.coverBgImageUrl && (
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
              style={{ backgroundImage: `url(${data.general.coverBgImageUrl})` }}
            />
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
      return renderPageContainer(
        2,
        data.general.ceoBgColor,
        data.general.ceoBgImageUrl,
        <>
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
                    className="w-20 h-20 object-cover shrink-0 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
                    }}
                    style={getImageStyle(false, 0)}
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
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>01</span>
                  <span className="font-semibold text-slate-700">Sri Lanka Macro Horizon</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>02</span>
                  <span className="font-semibold text-slate-700">Global Financial Tectonics</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>03</span>
                  <span className="font-semibold text-slate-700">John Keells Performance</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>04</span>
                  <span className="font-semibold text-slate-700">Everest Peak Matrix 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-extrabold flex items-center justify-center text-[11px]" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>05</span>
                  <span className="font-semibold text-slate-700">Service Portfolios &amp; Team</span>
                </div>
              </div>

              <div className="bg-sky-50 p-3.5 rounded-xl border" style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}20` }}>
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: accentColor }}>Corporate Office</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  No. 4 Layden Bastian Road, Colombo 01, Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          <PageFooter pageNo={2} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 3: SRI LANKA HORIZON (MACRO FOCUS)
    // ----------------------------------------------------
    case 3:
      const p3 = data.page3 || {
        subtitle: "01 · Regional Horizon",
        title: "Sri Lankan Economy Gathering Historic Momentum",
        description: "Sri Lanka's turnaround remains one of Asia's most growth narratives...",
        accolades: [],
        commentaryTitle: "Export Explosion",
        commentaryText: "",
        tagline: ""
      };
      return renderPageContainer(
        3,
        p3.bgColor,
        p3.bgImageUrl,
        <>
          <PageHeader sectionName="Macro Environment" />

          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p3.subtitle}</span>
              <h2 className="text-3xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p3.title}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed max-w-3xl" style={{ color: `${data.general.textColor}99` }}>
                {p3.description}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {data.stats.filter(s => s.category === "sri-lanka").map((stat) => (
                <div key={stat.id} className="p-4 rounded-2xl border relative overflow-hidden group hover:border-sky-300 transition-all" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
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
                <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1" style={{ color: data.general.textColor }}>
                  <Globe className="w-4 h-4 text-sky-600" style={{ color: primaryColor }} />
                  Island Accolades (2025/2026)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(p3.accolades && p3.accolades.length > 0 ? p3.accolades : [
                    { title: "#1 Most Beautiful", subtitle: "Island - Big 7 Travel" },
                    { title: "Most Family Friendly", subtitle: "Remitly Global Survey" },
                    { title: "#7 Friendliest Country", subtitle: "Condé Nast Traveler" },
                    { title: "Jaffna - Top Destination", subtitle: "Lonely Planet" }
                  ]).map((accolade, idx) => (
                    <div key={idx} className="p-3 border rounded-xl" style={{ backgroundColor: `${data.general.cardBgColor}80`, borderColor: `${data.general.textColor}10` }}>
                      <span className="font-extrabold block" style={{ color: data.general.textColor }}>{accolade.title}</span>
                      <span className="text-[10px] text-slate-400">{accolade.subtitle}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border p-5 flex flex-col justify-between" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: data.general.textColor }}>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  {p3.commentaryTitle}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}cc` }}>
                  {p3.commentaryText}
                </p>
                {p3.tagline && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-max" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    <span>{p3.tagline}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PageFooter pageNo={3} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 4: GLOBAL FINANCE TECTONICS
    // ----------------------------------------------------
    case 4:
      const p4 = data.page4 || {
        subtitle: "02 · Financial Horizons",
        title: "Tectonic Shifts in the Global Financial Arena",
        description: "",
        trends: [],
        takeawayTitle: "",
        takeawayText: "",
        takeawayLink: ""
      };
      return renderPageContainer(
        4,
        p4.bgColor,
        p4.bgImageUrl,
        <>
          <PageHeader sectionName="Global Trends" />

          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p4.subtitle}</span>
              <h2 className="text-3xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p4.title}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed max-w-3xl" style={{ color: `${data.general.textColor}99` }}>
                {p4.description}
              </p>
            </div>

            {/* Three key trends block cards */}
            <div className="grid grid-cols-3 gap-4">
              {(p4.trends && p4.trends.length > 0 ? p4.trends : [
                { title: "Shadow Banking", text: "" },
                { title: "Private Credit", text: "" },
                { title: "Agentic AI", text: "" }
              ]).map((trend, idx) => (
                <div key={idx} className="p-4 border rounded-2xl relative space-y-3" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <h3 className="font-bold text-sm tracking-tight" style={{ color: data.general.textColor }}>{trend.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}b3` }}>
                    {trend.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick takeaway */}
            <div className="p-4 rounded-2xl text-white flex items-center justify-between gap-4" style={{ backgroundColor: primaryColor }}>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: accentColor }}>{p4.takeawayTitle}</span>
                <p className="text-xs text-white/90">
                  {p4.takeawayText}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-white shrink-0">
                <span>{p4.takeawayLink}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <PageFooter pageNo={4} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 5: JKH HOLDINGS GROUP HIGHLIGHTS
    // ----------------------------------------------------
    case 5:
      const p5 = data.page5 || {
        subtitle: "03 · Solid Corporate Backing",
        title: "John Keells Holdings PLC",
        description: "",
        projects: [],
        commitmentsTitle: "",
        commitmentsText: "",
        commitmentsTag: "",
      };
      return renderPageContainer(
        5,
        p5.bgColor,
        p5.bgImageUrl,
        <>
          <PageHeader sectionName="Parent Group" />

          <div className="space-y-6 my-auto">
            <div className="flex justify-between items-start gap-6">
              <div className="space-y-2 flex-1">
                <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p5.subtitle}</span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                  {p5.title}
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed max-w-2xl" style={{ color: `${data.general.textColor}99` }}>
                  {p5.description}
                </p>
              </div>
              {p5.imageUrl && (
                <div className="w-32 h-20 shrink-0 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-3 shadow-sm" style={{ borderColor: `${data.general.textColor}15` }}>
                  <img 
                    src={p5.imageUrl} 
                    className="max-w-full max-h-full object-contain" 
                    alt="John Keells Holdings Logo" 
                  />
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {data.stats.filter(s => s.category === "jkh").map((stat) => (
                <div key={stat.id} className="p-4 rounded-2xl border relative overflow-hidden group hover:border-sky-300 transition-all" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-tr-2xl" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{stat.label}</span>
                  <span className="text-2xl font-black block tracking-tight text-slate-800" style={{ color: data.general.textColor }}>{stat.value}</span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-1 leading-tight">{stat.subtext}</span>
                </div>
              ))}
            </div>

            {/* Strategic Projects Grid */}
            <div className="grid grid-cols-12 gap-6 pt-2">
              <div 
                className="rounded-2xl border p-5 space-y-3 col-span-6"
                style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}
              >
                <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5" style={{ color: data.general.textColor }}>
                  <Building2 className="w-4 h-4 text-sky-600" style={{ color: primaryColor }} />
                  Group Flagship Developments
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {(p5.projects && p5.projects.length > 0 ? p5.projects : []).map((proj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold mt-0.5" style={{ color: accentColor }}>·</span>
                      <span style={{ color: `${data.general.textColor}cc` }}>
                        <strong>{proj.title}:</strong> {proj.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div 
                className="rounded-2xl border p-5 space-y-3 col-span-6 flex flex-col justify-between"
                style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}
              >
                <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5" style={{ color: data.general.textColor }}>
                  <Heart className="w-4 h-4 text-rose-500" />
                  {p5.commitmentsTitle}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}cc` }}>
                  {p5.commitmentsText}
                </p>
                {p5.commitmentsTag && (
                  <div className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded-lg mt-2 max-w-full break-words" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    <span>{p5.commitmentsTag}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PageFooter pageNo={5} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 6: PEAK MATRIX RECOGNITION
    // ----------------------------------------------------
    case 6:
      const p6 = data.page6 || {
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
      };

      const p6Height = p6.imageHeight ? `${p6.imageHeight}px` : "180px";
      const p6Width = p6.imageWidth ? `${p6.imageWidth}%` : "100%";
      const p6Fit = p6.imageFit || "contain";
      const p6Pos = p6.imagePosition || "bottom";

      const p6Image = p6.imageUrl && (
        <div 
          className="flex justify-center items-center shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
          }}
          style={{ ...getImageStyle(false, 0), height: p6Height, width: p6Width }}
        >
          <img src={p6.imageUrl} className="w-full h-full" style={{ objectFit: p6Fit, borderRadius: "inherit" }} alt="PEAK Matrix Recognition Badge" />
        </div>
      );

      const p6Body = (
        <div className="space-y-4 flex-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
            <Quote className="absolute -top-3 left-4 w-6 h-6 text-orange-400/20 fill-orange-400/10" style={{ color: `${accentColor}30` }} />
            <p className="text-slate-300 text-[11px] italic leading-relaxed pl-4">
              "{p6.quote}"
            </p>
            <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-400 font-bold pl-4">
              <span>{p6.quoteAuthor}, {p6.quoteAuthorTitle}</span>
              <span className="text-orange-400" style={{ color: accentColor }}>{p6.quoteCategory}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-300">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{p6.bullet1}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{p6.bullet2}</span>
            </div>
          </div>
        </div>
      );

      return renderPageContainer(
        6,
        p6.bgColor,
        p6.bgImageUrl,
        <>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6 select-none relative z-10">
            <Logo primaryColor="#FFFFFF" accentColor={accentColor} size="lg" logoUrl={data.general.logoUrl} />
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{data.general.edition}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-orange-400" style={{ color: accentColor }}>
                Global Recognition
              </span>
            </div>
          </div>

          <div className="space-y-4 my-auto relative z-10 max-w-3xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-400">
                <Award className="w-4 h-4 text-orange-400" style={{ color: accentColor }} />
                <span>{p6.badge}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                {p6.title}
              </h2>

              <p className="text-slate-300 text-xs leading-relaxed">
                {p6.description}
              </p>
            </div>

            {p6.imageUrl ? (
              p6Pos === "left" ? (
                <div className="flex gap-6 items-center w-full">{p6Image}{p6Body}</div>
              ) : p6Pos === "right" ? (
                <div className="flex gap-6 items-center w-full">{p6Body}{p6Image}</div>
              ) : p6Pos === "top" ? (
                <div className="space-y-4 flex flex-col items-center w-full">{p6Image}{p6Body}</div>
              ) : (
                <div className="space-y-4 flex flex-col items-center w-full">{p6Body}{p6Image}</div>
              )
            ) : p6Body}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto text-[10px] text-slate-500 font-bold select-none relative z-10">
            <span>© 2026 Infomate (Pvt) Ltd · Confidential Partner Portfolio</span>
            <span className="flex items-center gap-1">
              <span>Page</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full text-slate-900 font-black text-[9px] bg-white">
                {(data.visiblePages || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).indexOf(6) + 1}
              </span>
            </span>
          </div>
        </>,
        { isDark: true, isPage6: true }
      );

    // ----------------------------------------------------
    // PAGE 7: CORE F&A SERVICE PORTFOLIO
    // ----------------------------------------------------
    case 7:
      return renderPageContainer(
        7,
        data.page7?.bgColor,
        data.page7?.bgImageUrl,
        <>
          <PageHeader sectionName="Core Services" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>04 · Functional Mastery</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                Finance &amp; Accounting Service Portfolio
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                With deep specialized talent pools, we manage end-to-end accounting processes with strict accuracy SLAs.
              </p>
            </div>

            {/* Service Pillars Grid (Horizontal Cards) */}
            <div className="space-y-3">
              {data.services.map((service) => (
                <div key={service.id} className="p-3.5 rounded-xl border flex items-start gap-4" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-1" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    {service.id.toUpperCase()}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-xs sm:text-sm" style={{ color: data.general.textColor }}>{service.title}</h3>
                    <p className="text-[11px] leading-relaxed" style={{ color: `${data.general.textColor}b3` }}>{service.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.items.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded border text-[9px] font-semibold" style={{ backgroundColor: data.general.pageBgColor, borderColor: `${data.general.textColor}10`, color: `${data.general.textColor}cc` }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Systems and ERP Competency */}
            <div className="p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs" style={{ backgroundColor: `${primaryColor}08`, borderColor: `${primaryColor}15` }}>
              <span className="font-extrabold uppercase tracking-widest text-[9px]" style={{ color: `${data.general.textColor}a0` }}>Systems and ERP Competency:</span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                {["SAP ERP", "Microsoft Dynamics", "Xero", "QuickBooks", "Sage", "MYOB"].map((erp) => (
                  <span key={erp} className="px-2.5 py-1 rounded border bg-white" style={{ borderColor: `${data.general.textColor}15`, color: data.general.textColor }}>{erp}</span>
                ))}
              </div>
            </div>
          </div>

          <PageFooter pageNo={7} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 8: BACK OFFICE & PROCESS EXCELLENCE
    // ----------------------------------------------------
    case 8:
      const p8 = data.page8 || {
        subtitle: "05 · Extended Operations",
        title: "Back Office Portfolios & Automation DRIVE",
        description: "",
        servicesTitle: "",
        automationTitle: "",
        complianceText: "",
        imageUrl: ""
      };
      return renderPageContainer(
        8,
        p8.bgColor,
        p8.bgImageUrl,
        <>
          <PageHeader sectionName="Operational Excellence" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p8.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p8.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p8.description}
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Back Office List (8 cols) */}
              <div className="col-span-8 space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: `${data.general.textColor}80` }}>{p8.servicesTitle}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {data.backOffice.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-xl border flex items-start gap-2.5" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                      <div className="p-1 rounded bg-white shadow-sm shrink-0 border" style={{ borderColor: `${data.general.textColor}10` }}>
                        {getIconComponent(item.iconName)}
                      </div>
                      <div className="leading-tight">
                        <span className="font-extrabold block text-[11px]" style={{ color: data.general.textColor }}>{item.title}</span>
                        <span className="text-[10px] leading-tight block mt-0.5" style={{ color: `${data.general.textColor}99` }}>{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Pillars (4 cols) */}
              <div className="col-span-4 rounded-2xl border p-4 flex flex-col justify-between" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: `${data.general.textColor}80` }}>{p8.automationTitle}</span>
                  
                  {p8.imageUrl ? (
                    <div 
                      className="h-28 my-1 bg-white overflow-hidden cursor-pointer" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
                      }}
                      style={getImageStyle(false, 0)}
                    >
                      <img src={p8.imageUrl} className="w-full h-full" style={{ objectFit: pageStyle?.imageFit || "cover", borderRadius: "inherit" }} alt="Process Work Culture" />
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-white rounded-xl border" style={{ borderColor: `${data.general.textColor}10` }}>
                        <span className="font-bold block" style={{ color: data.general.textColor }}>RPA Automation</span>
                        <span className="text-[10px] text-slate-500">Deploying Power Automate and custom VBA macros.</span>
                      </div>
                      <div className="p-2 bg-white rounded-xl border" style={{ borderColor: `${data.general.textColor}10` }}>
                        <span className="font-bold block" style={{ color: data.general.textColor }}>Intelligent Integrations</span>
                        <span className="text-[10px] text-slate-500">Utilizing n8n node-based mapping tools.</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-2 rounded-lg text-[10px] font-bold text-center border mt-2" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderColor: `${primaryColor}20` }}>
                  {p8.complianceText}
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNo={8} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 9: TEAM & GLOBAL OPERATIONS
    // ----------------------------------------------------
    case 9:
      const p9 = data.page9 || {
        subtitle: "06 · Professional Roster",
        title: "Infomate Team Structure",
        description: "",
        hubsTitle: "",
        hubs: [],
        imageUrl: ""
      };
      return renderPageContainer(
        9,
        p9.bgColor,
        p9.bgImageUrl,
        <>
          <PageHeader sectionName="Global Team" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p9.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p9.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p9.description}
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Table of Ranks (7 columns) */}
              <div className="col-span-7 rounded-2xl border overflow-hidden" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}15` }}>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[9px] tracking-wider border-b" style={{ backgroundColor: `${data.general.textColor}08`, borderColor: `${data.general.textColor}15` }}>
                    <tr>
                      <th className="p-2.5 pl-4" style={{ color: data.general.textColor }}>Role / Rank</th>
                      <th className="p-2.5 text-center" style={{ color: data.general.textColor }}>Trained Pool</th>
                      <th className="p-2.5 pl-4" style={{ color: data.general.textColor }}>Qualifications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: `${data.general.textColor}10` }}>
                    {data.team.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-100/50">
                        <td className="p-2.5 pl-4 font-bold" style={{ color: data.general.textColor }}>{row.role}</td>
                        <td className="p-2.5 text-center font-black" style={{ color: primaryColor }}>{row.count}</td>
                        <td className="p-2.5 pl-4 font-medium text-[11px]" style={{ color: `${data.general.textColor}a0` }}>{row.qualifications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Geo coverage & Diversity (5 columns) */}
              <div className="col-span-5 space-y-4">
                {/* Global Markets Chip */}
                <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                  <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: `${data.general.textColor}80` }}>{p9.hubsTitle}</span>
                  <div className="space-y-1.5 text-xs font-semibold">
                    {(p9.hubs && p9.hubs.length > 0 ? p9.hubs : [
                      { title: "United Kingdom", desc: "Financial & BPO Services Hub" },
                      { title: "United States", desc: "Tech & Analytics Talent" },
                      { title: "Australia", desc: "Operations support" }
                    ]).map((hub, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: idx === 0 ? primaryColor : idx === 1 ? accentColor : "#10b981" }} />
                        <span style={{ color: `${data.general.textColor}dd` }}>
                          <strong>{hub.title}:</strong> {hub.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diversity stats / Image display */}
                {p9.imageUrl ? (
                  <div 
                    className="h-24 relative bg-white overflow-hidden cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
                    }}
                    style={getImageStyle(false, 0)}
                  >
                    <img src={p9.imageUrl} className="w-full h-full" style={{ objectFit: pageStyle?.imageFit || "cover", borderRadius: "inherit" }} alt="Infomate work team culture" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                      <span className="text-xl font-black block leading-none" style={{ color: primaryColor }}>60:40</span>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase">Female : Male</span>
                    </div>
                    <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                      <span className="text-xl font-black block leading-none" style={{ color: primaryColor }}>90%</span>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase">AM+ Retention</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PageFooter pageNo={9} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 10: VALUE PROPS & SOCIAL RESPONSIBILITY
    // ----------------------------------------------------
    case 10:
      const p10 = data.page10 || {
        subtitle: "07 · Why Partner With Us",
        title: "Our Eight-Fold Value Proposition",
        socialTitle: "ESG & Social Initiatives",
        imageUrl: ""
      };
      return renderPageContainer(
        10,
        p10.bgColor,
        p10.bgImageUrl,
        <>
          <PageHeader sectionName="Value Proposition" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p10.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p10.title}
              </h2>
            </div>

            {/* Bento Grid of 8 value propositions */}
            <div className="grid grid-cols-4 gap-3">
              {data.valueProps.map((prop) => (
                <div key={prop.number} className="p-3 rounded-xl border flex flex-col justify-between space-y-1 relative group hover:border-sky-300 hover:shadow-sm transition-all duration-300" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
                  <div className="flex items-center justify-between">
                    <span className="w-5 h-5 rounded-full text-white font-extrabold text-[10px] flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                      {prop.number}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">VALUE</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[11px] leading-tight mt-1" style={{ color: data.general.textColor }}>{prop.title}</h4>
                    <p className="text-[10px] leading-tight mt-1 font-medium" style={{ color: `${data.general.textColor}99` }}>{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Initiatives banner */}
            <div className="p-4 rounded-2xl border space-y-3" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
              <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: `${data.general.textColor}80` }}>
                {p10.socialTitle}
              </span>
              <div className="grid grid-cols-12 gap-3">
                <div className={p10.imageUrl ? "col-span-9 grid grid-cols-3 gap-3 text-xs" : "col-span-12 grid grid-cols-3 gap-3 text-xs"}>
                  {data.social.map((soc) => (
                    <div key={soc.id} className="p-2.5 rounded-xl bg-white space-y-1 border" style={{ borderColor: `${data.general.textColor}10`, backgroundColor: data.general.pageBgColor }}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-extrabold text-amber-600 uppercase tracking-widest" style={{ color: accentColor }}>{soc.badge}</span>
                        <span className="text-[9px] text-slate-300">Infomate Core</span>
                      </div>
                      <h5 className="font-bold text-[11px]" style={{ color: data.general.textColor }}>{soc.title}</h5>
                      <p className="text-[10px] leading-relaxed font-medium" style={{ color: `${data.general.textColor}a0` }}>{soc.description}</p>
                    </div>
                  ))}
                </div>
                {p10.imageUrl && (
                  <div 
                    className="col-span-3 relative h-full bg-white overflow-hidden cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
                    }}
                    style={getImageStyle(false, 0)}
                  >
                    <img src={p10.imageUrl} className="w-full h-full" style={{ objectFit: pageStyle?.imageFit || "cover", borderRadius: "inherit" }} alt="ESG Social Work" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <PageFooter pageNo={10} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 11: WELLNESS IN FOCUS
    // ----------------------------------------------------
    case 11:
      const p11 = data.page11 || {
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
      };

      const p11Height = p11.imageHeight ? `${p11.imageHeight}px` : "240px";
      const p11Width = p11.imageWidth ? `${p11.imageWidth}%` : "48%";
      const p11Fit = p11.imageFit || "cover";
      const p11Pos = p11.imagePosition || "right";

      const p11Image = p11.imageUrl && (
        <div 
          className="overflow-hidden relative bg-white shrink-0 cursor-pointer" 
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement?.({ type: "image", pageNum: pageNumber, index: 0 });
          }}
          style={{ ...getImageStyle(false, 0), height: p11Height, width: p11Width }}
        >
          <img src={p11.imageUrl} className="w-full h-full" style={{ objectFit: pageStyle?.imageFit || p11Fit, borderRadius: "inherit" }} alt="Wellness Program Session" />
        </div>
      );

      const p11Body = (
        <div className="space-y-3 flex-1">
          {[p11.bullet1, p11.bullet2, p11.bullet3].map((bullet, idx) => (
            <div key={idx} className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-white" style={{ backgroundColor: primaryColor }}>
                {idx + 1}
              </div>
              <p className="text-xs leading-relaxed font-semibold text-slate-700" style={{ color: data.general.textColor }}>
                {bullet}
              </p>
            </div>
          ))}
        </div>
      );

      return renderPageContainer(
        11,
        p11.bgColor,
        p11.bgImageUrl,
        <>
          <PageHeader sectionName="Staff Wellness" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p11.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p11.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p11.description}
              </p>
            </div>

            {renderDynamicEventContent(
              p11.layoutMode || "grid",
              p11.wellnessItems,
              p11Image,
              p11Body,
              p11Pos,
              p11.imageUrl,
              primaryColor,
              accentColor,
              data.general.textColor || "#1e293b",
              data.general.cardBgColor || "#f8fafc",
              {
                gridCols: p11.gridCols,
                cardImageSize: p11.cardImageSize,
                imageRounded: imgRounded,
                imageShadow: imgShadow,
                imageBorderWidth: imgBorderWidth,
                imageBorderColor: imgBorderColor,
                imageFit: pageStyle?.imageFit,
                imageBorderStyle: pageStyle?.imageBorderStyle,
                imageGrayscale: pageStyle?.imageGrayscale,
                cardStyle: getCardStyle()
              }
            )}

            <div className="p-3.5 rounded-xl border text-center text-xs font-bold mt-4" style={{ backgroundColor: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}25` }}>
              {p11.tagline}
            </div>
          </div>

          <PageFooter pageNo={11} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 12: VALENTINE'S DAY KARAOKE NIGHT
    // ----------------------------------------------------
    case 12:
      const p12 = data.page12 || {
        subtitle: "09 · Office Vibrancy",
        title: "Valentine’s Day Karaoke Night",
        description: "Love was in the air everywhere we turned… and so were the high notes!",
        highlights: "Our Valentine’s Day Karaoke Evening at Infomate turned into a stage full of stars! From power ballads to classic sing-alongs and everyone’s all-time favorite hits, the evening was filled with laughter, music, and unforgettable performances. Whether hitting the high notes perfectly or just singing their hearts out, our team truly brought the energy and vibes.",
        tagline: "More than just karaoke - a celebration of fun, friendship, and fearless singing!",
        imageUrl: "",
        imageHeight: 200,
        imageWidth: 40,
        imagePosition: "left",
        imageFit: "cover"
      };

      const p12Height = p12.imageHeight ? `${p12.imageHeight}px` : "200px";
      const p12Width = p12.imageWidth ? `${p12.imageWidth}%` : "40%";
      const p12Fit = p12.imageFit || "cover";
      const p12Pos = p12.imagePosition || "left";

      const p12Image = p12.imageUrl && (
        <div 
          className="rounded-2xl overflow-hidden border shadow-md relative bg-white shrink-0" 
          style={{ height: p12Height, width: p12Width, borderColor: `${data.general.textColor || "#1e293b"}15` }}
        >
          <img src={p12.imageUrl} className="w-full h-full" style={{ objectFit: p12Fit }} alt="Karaoke Night" />
        </div>
      );

      const p12Body = (
        <div className="space-y-4 flex-1">
          <div className="relative pl-6 border-l-4 py-1" style={{ borderColor: accentColor }}>
            <p className="text-xs leading-relaxed font-bold text-slate-700 italic" style={{ color: data.general.textColor }}>
              "{p12.description}"
            </p>
          </div>
          <p className="text-xs leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}cc` }}>
            {p12.highlights}
          </p>
        </div>
      );

      return renderPageContainer(
        12,
        p12.bgColor,
        p12.bgImageUrl,
        <>
          <PageHeader sectionName="Office Vibrancy" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p12.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p12.title}
              </h2>
            </div>

            {renderDynamicEventContent(
              p12.layoutMode || "grid",
              p12.wellnessItems,
              p12Image,
              p12Body,
              p12Pos,
              p12.imageUrl,
              primaryColor,
              accentColor,
              data.general.textColor || "#1e293b",
              data.general.cardBgColor || "#f8fafc",
              {
                gridCols: p12.gridCols,
                cardImageSize: p12.cardImageSize,
                imageRounded: imgRounded,
                imageShadow: imgShadow,
                imageBorderWidth: imgBorderWidth,
                imageBorderColor: imgBorderColor,
                imageFit: pageStyle?.imageFit,
                imageBorderStyle: pageStyle?.imageBorderStyle,
                imageGrayscale: pageStyle?.imageGrayscale,
                cardStyle: getCardStyle(),
                pageNumber: 12,
                selectedElement,
                onSelectElement
              }
            )}

            <div className="p-3.5 rounded-2xl text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{p12.tagline}</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>
          </div>

          <PageFooter pageNo={12} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 13: WOMEN'S CAREER GROWTH PANEL
    // ----------------------------------------------------
    case 13:
      const p13 = data.page13 || {
        subtitle: "10 · Diversity & Inclusion",
        title: "Women’s Career Growth Panel",
        description: "In celebration of International Women’s Day 2026, Infomate organized an engaging panel discussion titled “Navigating Career Growth as a Woman: Challenges, Choices & Confidence.”",
        panelTitle: "Navigating Career Growth as a Woman",
        panelText: "The session brought together inspiring female leaders and male leaders who shared their personal career journeys, the challenges they have encountered, and the choices that have shaped their professional growth. Through open and insightful discussions, the panel encouraged participants to embrace confidence, pursue opportunities, and support one another in their career paths.",
        tagline: "Empowering women and fostering inclusive workplaces where individuals can grow and thrive.",
        imageUrl: "",
        imageHeight: 192,
        imageWidth: 35,
        imagePosition: "right",
        imageFit: "cover"
      };

      const p13Height = p13.imageHeight ? `${p13.imageHeight}px` : "192px";
      const p13Width = p13.imageWidth ? `${p13.imageWidth}%` : "35%";
      const p13Fit = p13.imageFit || "cover";
      const p13Pos = p13.imagePosition || "right";

      const p13Image = p13.imageUrl && (
        <div 
          className="rounded-2xl overflow-hidden border shadow-md relative bg-white shrink-0" 
          style={{ height: p13Height, width: p13Width, borderColor: `${data.general.textColor || "#1e293b"}15` }}
        >
          <img src={p13.imageUrl} className="w-full h-full" style={{ objectFit: p13Fit }} alt="International Women's Day Panel" />
        </div>
      );

      const p13Body = (
        <div className="space-y-3 flex-1">
          <div className="p-4 rounded-2xl border bg-slate-50 space-y-2" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
            <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: primaryColor }}>{p13.panelTitle}</h4>
            <p className="text-xs leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}cc` }}>
              {p13.panelText}
            </p>
          </div>
        </div>
      );

      return renderPageContainer(
        13,
        p13.bgColor,
        p13.bgImageUrl,
        <>
          <PageHeader sectionName="Diversity & Inclusion" />

          <div className="space-y-5 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p13.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p13.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p13.description}
              </p>
            </div>

            {renderDynamicEventContent(
              p13.layoutMode || "grid",
              p13.wellnessItems,
              p13Image,
              p13Body,
              p13Pos,
              p13.imageUrl,
              primaryColor,
              accentColor,
              data.general.textColor || "#1e293b",
              data.general.cardBgColor || "#f8fafc",
              {
                gridCols: p13.gridCols,
                cardImageSize: p13.cardImageSize,
                imageRounded: imgRounded,
                imageShadow: imgShadow,
                imageBorderWidth: imgBorderWidth,
                imageBorderColor: imgBorderColor,
                imageFit: pageStyle?.imageFit,
                imageBorderStyle: pageStyle?.imageBorderStyle,
                imageGrayscale: pageStyle?.imageGrayscale,
                cardStyle: getCardStyle(),
                pageNumber: 13,
                selectedElement,
                onSelectElement
              }
            )}

            <div className="p-3 rounded-xl border text-center text-xs font-bold" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor, borderColor: `${primaryColor}20` }}>
              {p13.tagline}
            </div>
          </div>

          <PageFooter pageNo={13} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 14: MATE TALK SERIES
    // ----------------------------------------------------
    case 14:
      const p14 = data.page14 || {
        subtitle: "11 · Learning & Development",
        title: "Infomate Commences the 2026 MATE Talk Series",
        description: "We kicked off the first MATE Talk Series for the year with an inspiring and thought-provoking panel discussion on “Beyond the Ladder: Crafting Meaningful Careers.”",
        speaker1Name: "Yolan Seimon",
        speaker1Title: "Head of Data and Advanced Analytics, OCTAVE",
        speaker1Desc: "Yolan's journey from an intern to leading Data and Advanced Analytics at OCTAVE shows the power of continuous learning.",
        speaker2Name: "Yasasi Perera",
        speaker2Title: "Assistant Director – Finance, Cinnamon Life Integrated Resort",
        speaker2Desc: "Yasasi's progression from a non-executive role to Assistant Director demonstrates resilience and dedication.",
        takeaway: "The discussion went beyond the traditional notion of climbing the corporate ladder, encouraging participants to reflect on personal growth, adaptability, and defining success on their own terms.",
        imageUrl: "",
        imageHeight: 100,
        imageWidth: 35,
        imagePosition: "right",
        imageFit: "cover"
      };

      const p14Height = p14.imageHeight ? `${p14.imageHeight}px` : "100px";
      const p14Width = p14.imageWidth ? `${p14.imageWidth}%` : "35%";
      const p14Fit = p14.imageFit || "cover";
      const p14Pos = p14.imagePosition || "right";

      const p14Image = p14.imageUrl && (
        <div 
          className="rounded-xl overflow-hidden border shadow-sm relative bg-white shrink-0" 
          style={{ height: p14Height, width: p14Width, borderColor: `${data.general.textColor || "#1e293b"}15` }}
        >
          <img src={p14.imageUrl} className="w-full h-full" style={{ objectFit: p14Fit }} alt="MATE Talk Session" />
        </div>
      );

      const p14Body = (
        <div className="space-y-3 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border space-y-2 relative" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: primaryColor }}>PANELIST</span>
              <div>
                <h4 className="font-extrabold text-xs" style={{ color: data.general.textColor }}>{p14.speaker1Name}</h4>
                <span className="text-[9px] font-bold text-slate-400 block leading-tight">{p14.speaker1Title}</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}a0` }}>{p14.speaker1Desc}</p>
            </div>

            <div className="p-3.5 rounded-xl border space-y-2 relative" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: primaryColor }}>PANELIST</span>
              <div>
                <h4 className="font-extrabold text-xs" style={{ color: data.general.textColor }}>{p14.speaker2Name}</h4>
                <span className="text-[9px] font-bold text-slate-400 block leading-tight">{p14.speaker2Title}</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}a0` }}>{p14.speaker2Desc}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Core Takeaway</span>
            <p className="text-[10px] leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}cc` }}>
              {p14.takeaway}
            </p>
          </div>
        </div>
      );

      return renderPageContainer(
        14,
        p14.bgColor,
        p14.bgImageUrl,
        <>
          <PageHeader sectionName="MATE Talk Series" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p14.subtitle}</span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p14.title}
              </h2>
              <p className="text-[11px] leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p14.description}
              </p>
            </div>

            {renderDynamicEventContent(
              p14.layoutMode || "grid",
              p14.wellnessItems,
              p14Image,
              p14Body,
              p14Pos,
              p14.imageUrl,
              primaryColor,
              accentColor,
              data.general.textColor || "#1e293b",
              data.general.cardBgColor || "#f8fafc",
              {
                gridCols: p14.gridCols,
                cardImageSize: p14.cardImageSize,
                imageRounded: imgRounded,
                imageShadow: imgShadow,
                imageBorderWidth: imgBorderWidth,
                imageBorderColor: imgBorderColor,
                imageFit: pageStyle?.imageFit,
                imageBorderStyle: pageStyle?.imageBorderStyle,
                imageGrayscale: pageStyle?.imageGrayscale,
                cardStyle: getCardStyle(),
                pageNumber: 14,
                selectedElement,
                onSelectElement
              }
            )}
          </div>

          <PageFooter pageNo={14} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 15: VESAK OFFICE DECORATION COMPETITION
    // ----------------------------------------------------
    case 15:
      const p15 = data.page15 || {
        subtitle: "12 · Cultural Celebrations",
        title: "Vesak Office Decoration Competition",
        description: "In celebration of Vesak, Infomate organized an engaging Vesak Decoration Competition across our office floors, encouraging teams to showcase their creativity while embracing the spirit of the season.",
        details: "The initiative brought employees together to design and decorate their respective spaces with meaningful Vesak themes, reflecting values of peace, compassion, and togetherness. From traditional lanterns and thematic displays to thoughtfully crafted decorations, each team contributed to making the celebration truly special.",
        tagline: "Strengthening team spirit, collaboration, and cultural appreciation among employees.",
        imageUrl: "",
        imageHeight: 192,
        imageWidth: 40,
        imagePosition: "right",
        imageFit: "cover"
      };

      const p15Height = p15.imageHeight ? `${p15.imageHeight}px` : "192px";
      const p15Width = p15.imageWidth ? `${p15.imageWidth}%` : "40%";
      const p15Fit = p15.imageFit || "cover";
      const p15Pos = p15.imagePosition || "right";

      const p15Image = p15.imageUrl && (
        <div 
          className="rounded-2xl overflow-hidden border shadow-md relative bg-white shrink-0" 
          style={{ height: p15Height, width: p15Width, borderColor: `${data.general.textColor || "#1e293b"}15` }}
        >
          <img src={p15.imageUrl} className="w-full h-full" style={{ objectFit: p15Fit }} alt="Vesak office decoration" />
        </div>
      );

      const p15Body = (
        <div className="p-4 rounded-2xl border bg-slate-50 space-y-2 shadow-sm flex-1" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Creativity & Teamwork</span>
          <p className="text-xs leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}cc` }}>
            {p15.details}
          </p>
        </div>
      );

      return renderPageContainer(
        15,
        p15.bgColor,
        p15.bgImageUrl,
        <>
          <PageHeader sectionName="Vesak Festival" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p15.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p15.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p15.description}
              </p>
            </div>

            {renderDynamicEventContent(
              p15.layoutMode || "grid",
              p15.wellnessItems,
              p15Image,
              p15Body,
              p15Pos,
              p15.imageUrl,
              primaryColor,
              accentColor,
              data.general.textColor || "#1e293b",
              data.general.cardBgColor || "#f8fafc",
              {
                gridCols: p15.gridCols,
                cardImageSize: p15.cardImageSize,
                imageRounded: imgRounded,
                imageShadow: imgShadow,
                imageBorderWidth: imgBorderWidth,
                imageBorderColor: imgBorderColor,
                imageFit: pageStyle?.imageFit,
                imageBorderStyle: pageStyle?.imageBorderStyle,
                imageGrayscale: pageStyle?.imageGrayscale,
                cardStyle: getCardStyle(),
                pageNumber: 15,
                selectedElement,
                onSelectElement
              }
            )}

            <div className="p-3.5 rounded-xl border text-center text-xs font-bold" style={{ backgroundColor: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}25` }}>
              {p15.tagline}
            </div>
          </div>

          <PageFooter pageNo={15} />
        </>
      );

    // ----------------------------------------------------
    // PAGE 16: VESAK DANSALA INITIATIVES
    // ----------------------------------------------------
    case 16:
      const p16 = data.page16 || {
        subtitle: "13 · Community Spirit",
        title: "Vesak Dansala Initiatives",
        description: "As part of the Vesak celebrations, Infomate employees came together to embrace the spirit of generosity, sharing, and community through two special Dansala initiatives.",
        teamPageroText: "Team Pagero organized a refreshing Popsicle Ice Cream Dansala, creating opportunities for employees to experience the joy of giving and togetherness.",
        teamFinanceText: "The Ultimate Finance Team hosted a traditional Kimbula Bun Dansala, creating a festive and welcoming atmosphere.",
        tagline: "Fostering collaboration, employee engagement, and a strong sense of community.",
        imageUrl: "",
        imageHeight: 192,
        imageWidth: 40,
        imagePosition: "right",
        imageFit: "cover"
      };

      const p16Height = p16.imageHeight ? `${p16.imageHeight}px` : "192px";
      const p16Width = p16.imageWidth ? `${p16.imageWidth}%` : "40%";
      const p16Fit = p16.imageFit || "cover";
      const p16Pos = p16.imagePosition || "right";

      const p16Image = p16.imageUrl && (
        <div 
          className="rounded-2xl overflow-hidden border shadow-md relative bg-white shrink-0" 
          style={{ height: p16Height, width: p16Width, borderColor: `${data.general.textColor || "#1e293b"}15` }}
        >
          <img src={p16.imageUrl} className="w-full h-full" style={{ objectFit: p16Fit }} alt="Vesak Dansala" />
        </div>
      );

      const p16Body = (
        <div className="space-y-3 flex-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[9px] font-black uppercase">
                <span>Popsicle Dansala</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block mt-1">TEAM PAGERO</span>
              <p className="text-[10px] leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}a0` }}>{p16.teamPageroText}</p>
            </div>

            <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: data.general.cardBgColor, borderColor: `${data.general.textColor}10` }}>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-black uppercase">
                <span>Kimbula Bun Dansala</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block mt-1">ULTIMATE FINANCE</span>
              <p className="text-[10px] leading-relaxed text-slate-600 font-medium" style={{ color: `${data.general.textColor}a0` }}>{p16.teamFinanceText}</p>
            </div>
          </div>
        </div>
      );

      return renderPageContainer(
        16,
        p16.bgColor,
        p16.bgImageUrl,
        <>
          <PageHeader sectionName="Community Initiatives" />

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest block" style={{ color: primaryColor }}>{p16.subtitle}</span>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: data.general.textColor }}>
                {p16.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: `${data.general.textColor}99` }}>
                {p16.description}
              </p>
            </div>

            {renderDynamicEventContent(
              p16.layoutMode || "grid",
              p16.wellnessItems,
              p16Image,
              p16Body,
              p16Pos,
              p16.imageUrl,
              primaryColor,
              accentColor,
              data.general.textColor || "#1e293b",
              data.general.cardBgColor || "#f8fafc",
              {
                gridCols: p16.gridCols,
                cardImageSize: p16.cardImageSize,
                imageRounded: imgRounded,
                imageShadow: imgShadow,
                imageBorderWidth: imgBorderWidth,
                imageBorderColor: imgBorderColor,
                imageFit: pageStyle?.imageFit,
                imageBorderStyle: pageStyle?.imageBorderStyle,
                imageGrayscale: pageStyle?.imageGrayscale,
                cardStyle: getCardStyle(),
                pageNumber: 16,
                selectedElement,
                onSelectElement
              }
            )}

            <div className="p-3 rounded-xl border text-center text-xs font-bold" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor, borderColor: `${primaryColor}20` }}>
              {p16.tagline}
            </div>
          </div>

          <PageFooter pageNo={16} />
        </>
      );

    default:
      return null;
  }
}
