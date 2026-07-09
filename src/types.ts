export interface GeneralInfo {
  title: string;
  subtitle: string;
  date: string;
  edition: string;
  primaryColor: string;
  accentColor: string;
  pageBgColor?: string;
  textColor?: string;
  cardBgColor?: string;
  darkPageBgColor?: string;
  darkTextColor?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  ceoImageUrl?: string;
  ceoName: string;
  ceoTitle: string;
  ceoMessage: string;
  coverBgColor?: string;
  coverBgImageUrl?: string;
  ceoBgColor?: string;
  ceoBgImageUrl?: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  subtext: string;
  category: "sri-lanka" | "jkh" | "infomate";
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location?: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  items: string[];
  colorPreset: string;
}

export interface BackOfficeService {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TeamRole {
  role: string;
  experience: string;
  count: string;
  qualifications: string;
}

export interface SocialInitiative {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badge: string;
}

export interface ValueProposition {
  number: number;
  title: string;
  description: string;
}

export interface Page3Content {
  title: string;
  subtitle: string;
  description: string;
  accolades: { title: string; subtitle: string }[];
  commentaryTitle: string;
  commentaryText: string;
  tagline: string;
  bgColor?: string;
  bgImageUrl?: string;
}

export interface Page4Content {
  title: string;
  subtitle: string;
  description: string;
  trends: { title: string; text: string }[];
  takeawayTitle: string;
  takeawayText: string;
  takeawayLink: string;
  bgColor?: string;
  bgImageUrl?: string;
}

export interface Page5Content {
  title: string;
  subtitle: string;
  description: string;
  projects: { title: string; text: string }[];
  commitmentsTitle: string;
  commitmentsText: string;
  commitmentsTag: string;
  imageUrl?: string;
  bgColor?: string;
  bgImageUrl?: string;
}

export interface Page6Content {
  badge: string;
  title: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  quoteAuthorTitle: string;
  quoteCategory: string;
  bullet1: string;
  bullet2: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  bgGradientStart?: string;
  bgGradientEnd?: string;
}

export interface Page7Content {
  bgColor?: string;
  bgImageUrl?: string;
}

export interface Page8Content {
  title: string;
  subtitle: string;
  description: string;
  servicesTitle: string;
  automationTitle: string;
  complianceText: string;
  imageUrl?: string;
  bgColor?: string;
  bgImageUrl?: string;
}

export interface Page9Content {
  title: string;
  subtitle: string;
  description: string;
  hubsTitle: string;
  hubs: { title: string; desc: string }[];
  imageUrl?: string;
  bgColor?: string;
  bgImageUrl?: string;
}

export interface Page10Content {
  title: string;
  subtitle: string;
  socialTitle: string;
  imageUrl?: string;
  bgColor?: string;
  bgImageUrl?: string;
}

export interface WellnessItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface Page11Content {
  subtitle: string;
  title: string;
  description: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  tagline: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  layoutMode?: "grid" | "list" | "three-col" | "hero-split";
  wellnessItems?: WellnessItem[];
  gridCols?: 2 | 3;
  cardImageSize?: "small" | "medium" | "large";
}

export interface Page12Content {
  subtitle: string;
  title: string;
  description: string;
  highlights: string;
  tagline: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  layoutMode?: "grid" | "list" | "three-col" | "hero-split";
  wellnessItems?: WellnessItem[];
  gridCols?: 2 | 3;
  cardImageSize?: "small" | "medium" | "large";
}

export interface Page13Content {
  subtitle: string;
  title: string;
  description: string;
  panelTitle: string;
  panelText: string;
  tagline: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  layoutMode?: "grid" | "list" | "three-col" | "hero-split";
  wellnessItems?: WellnessItem[];
  gridCols?: 2 | 3;
  cardImageSize?: "small" | "medium" | "large";
}

export interface Page14Content {
  subtitle: string;
  title: string;
  description: string;
  speaker1Name: string;
  speaker1Title: string;
  speaker1Desc: string;
  speaker2Name: string;
  speaker2Title: string;
  speaker2Desc: string;
  takeaway: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  layoutMode?: "grid" | "list" | "three-col" | "hero-split";
  wellnessItems?: WellnessItem[];
  gridCols?: 2 | 3;
  cardImageSize?: "small" | "medium" | "large";
}

export interface Page15Content {
  subtitle: string;
  title: string;
  description: string;
  details: string;
  tagline: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  layoutMode?: "grid" | "list" | "three-col" | "hero-split";
  wellnessItems?: WellnessItem[];
  gridCols?: 2 | 3;
  cardImageSize?: "small" | "medium" | "large";
}

export interface Page16Content {
  subtitle: string;
  title: string;
  description: string;
  teamPageroText: string;
  teamFinanceText: string;
  tagline: string;
  imageUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageFit?: "contain" | "cover";
  bgColor?: string;
  bgImageUrl?: string;
  layoutMode?: "grid" | "list" | "three-col" | "hero-split";
  wellnessItems?: WellnessItem[];
  gridCols?: 2 | 3;
  cardImageSize?: "small" | "medium" | "large";
}

export interface NewsletterData {
  general: GeneralInfo;
  stats: StatCard[];
  testimonials: ClientTestimonial[];
  services: ServicePillar[];
  backOffice: BackOfficeService[];
  team: TeamRole[];
  social: SocialInitiative[];
  valueProps: ValueProposition[];
  visiblePages?: number[];
  page3?: Page3Content;
  page4?: Page4Content;
  page5?: Page5Content;
  page6?: Page6Content;
  page7?: Page7Content;
  page8?: Page8Content;
  page9?: Page9Content;
  page10?: Page10Content;
  page11?: Page11Content;
  page12?: Page12Content;
  page13?: Page13Content;
  page14?: Page14Content;
  page15?: Page15Content;
  page16?: Page16Content;
  useGlobalTheme?: boolean;
  pageStyles?: { [pageNumber: number]: PageStyles };
}

export interface PageStyles {
  primaryColor?: string;
  accentColor?: string;
  pageBgColor?: string;
  textColor?: string;
  cardBgColor?: string;
  fontSizeModifier?: "small" | "medium" | "large";
  paddingSize?: "compact" | "normal" | "comfortable";
  imageRounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  imageShadow?: "none" | "sm" | "md" | "lg";
  imageBorderWidth?: number;
  imageBorderColor?: string;
  bgGradientStart?: string;
  bgGradientEnd?: string;
  bgStyleMode?: "solid" | "gradient" | "image";
  bgImageOverlayOpacity?: number;
  bgImageUrl?: string;
  cardPaddingSize?: "compact" | "normal" | "comfortable";
  cardRounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  cardShadow?: "none" | "sm" | "md" | "lg";
  cardBorderWidth?: number;
  cardBorderColor?: string;
  imageFit?: "cover" | "contain";
  imageBorderStyle?: "solid" | "dashed" | "dotted";
  imageGrayscale?: boolean;
  contentGapSize?: "compact" | "normal" | "wide";
  fontFamilyTitle?: "inter" | "outfit" | "playfair" | "merriweather";
  fontFamilyBody?: "inter" | "outfit" | "sans" | "serif" | "merriweather" | "playfair";
  imageWidth?: number;
  imageHeight?: number;
  multiImageLayout?: "stacked" | "side-by-side";
  imageWidthUnit?: "%" | "px";
  imageHeightUnit?: "%" | "px";
  imagePositionType?: "static" | "relative" | "absolute";
  imageTop?: number;
  imageLeft?: number;
  imageAlignSelf?: "auto" | "flex-start" | "center" | "flex-end";
}

export const getExpandedPages = (visiblePages: number[], data: any): number[] => {
  const expanded: number[] = [];
  visiblePages.forEach((pageNum) => {
    expanded.push(pageNum);
    
    // Page 11 to 16 dynamic subpage expansion (each subpage gets capacity of 3 items)
    if (pageNum >= 11 && pageNum <= 16) {
      const pageKey = `page${pageNum}`;
      const pageData = data[pageKey];
      if (pageData?.wellnessItems) {
        const itemsCount = pageData.wellnessItems.length;
        const extraPages = Math.ceil(itemsCount / 3) - 1;
        for (let i = 1; i <= extraPages; i++) {
          expanded.push(pageNum + i * 100);
        }
      }
    }
  });
  return expanded;
};
