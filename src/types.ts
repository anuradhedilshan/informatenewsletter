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

export interface Page3Content {
  title: string;
  subtitle: string;
  description: string;
  accolades: { title: string; subtitle: string }[];
  commentaryTitle: string;
  commentaryText: string;
  tagline: string;
}

export interface Page4Content {
  title: string;
  subtitle: string;
  description: string;
  trends: { title: string; text: string }[];
  takeawayTitle: string;
  takeawayText: string;
  takeawayLink: string;
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
}

export interface Page8Content {
  title: string;
  subtitle: string;
  description: string;
  servicesTitle: string;
  automationTitle: string;
  complianceText: string;
  imageUrl?: string;
}

export interface Page9Content {
  title: string;
  subtitle: string;
  description: string;
  hubsTitle: string;
  hubs: { title: string; desc: string }[];
  imageUrl?: string;
}

export interface Page10Content {
  title: string;
  subtitle: string;
  socialTitle: string;
  imageUrl?: string;
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
  page8?: Page8Content;
  page9?: Page9Content;
  page10?: Page10Content;
}
