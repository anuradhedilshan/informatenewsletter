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
}
