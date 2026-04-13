import { LucideIcon } from "lucide-react";

export type CollateralType = "nedvizhimost" | "zemelnyj-uchastok" | "avto" | "spectehnika";

export interface HeroData {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}

export interface ConditionsData {
  items: { label: string; value: string }[];
  requirements: string[];
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  time: string;
}

export interface CollateralCard {
  slug: CollateralType;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
}

export interface CalculatorDefaults {
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  defaultRate: number;
}

export interface PageData {
  slug: CollateralType;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: HeroData;
  heroImageLabel: string;
  heroImage?: string;
  conditions: ConditionsData;
  benefits: Benefit[];
  steps: Step[];
  calculator: CalculatorDefaults;
}

export interface ContactInfo {
  companyName: string;
  license: string;
  phones: string[];
  whatsapp: string;
  whatsappDisplay: string;
  offices: { city: string; address: string; hours: string }[];
}
