export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface Titan {
  _id: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  businessName: string | null;
  active: boolean;
  setupFeePaid?: boolean;
  subscriptionPlan?: string;
  monthlyFee?: number;
  billingStatus?: "active" | "pending" | "overdue" | "paused";
  nextBillingDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyMedia {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  bytes?: number;
}

export interface Property {
  _id: string;
  titanId: string;
  propertyType: string;
  purpose: "Sale" | "Rent";
  budget: number; // Mapped to 'price' in the backend schema logic, but we can type it as budget if backend sends it as budget
  price?: number; // Some parts of the frontend might expect price based on our changes, we'll keep budget and price in sync
  negotiable: boolean;
  bhk?: string;
  city: string;
  locality: string;
  fullAddress: string;
  description: string;
  availability: "Ready" | "Available From Date";
  availableFrom?: string;
  images: (string | PropertyMedia)[];
  videos: (string | PropertyMedia)[];
  ownerName: string;
  ownerPhone: string;
  alternatePhone: string;
  internalNotes: string;
  landmark: string;
  googleMapsLink: string;
  amenities: string[];
  status: "Active" | "Sold" | "Rented" | "On Hold" | "Expired";
  active: boolean;
  details: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  _id: string;
  titanId: string;
  buyerName: string;
  buyerPhone: string;
  buyOrRent: "buy" | "rent";
  propertyType: string;
  budget: number;
  city: string;
  locality: string;
  bhk: string;
  status: "new" | "contacted" | "closed" | "lost";
  handoff: boolean;
  leadTemperature: "cold" | "warm" | "hot";
  siteVisitRequested: boolean;
  contactedByTitan: boolean;
  handoffAt: string | null;
  siteVisitRequestedAt: string | null;
  lastActivityAt: string;
  propertiesSentCount: number;
  todayPropertiesSent: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFormData {
  propertyType: string;
  purpose: "Sale" | "Rent";
  bhk: string;
  price: number | "";
  negotiable: boolean;
  city: string;
  locality: string;
  description: string;
  availability: "Ready" | "Available From Date";
  availableFrom: string;
  images: (string | PropertyMedia)[];
  videos: (string | PropertyMedia)[];
  ownerName: string;
  ownerPhone: string;
  alternatePhone: string;
  internalNotes: string;
  status: "Active" | "Sold" | "Rented" | "On Hold" | "Expired";
  details: Record<string, unknown>;
}

export type LeadFilter =
  | "all"
  | "cold"
  | "warm"
  | "hot"
  | "interested"
  | "siteVisit";

export interface DashboardMetrics {
  todaysLeads: number;
  hotLeads: number;
  interestedBuyers: number;
  siteVisitRequests: number;
  propertiesAvailable: number;
}

export interface BillingInfo {
  setupFeePaid: boolean;
  subscriptionPlan: string;
  monthlyFee: number;
  billingStatus: "active" | "pending" | "overdue" | "paused";
  nextBillingDate: string | null;
  active: boolean;
}

export interface HealthCheck {
  name: string;
  status: "healthy" | "warning" | "offline";
  message: string;
  url?: string;
}

export interface SystemHealth {
  overall: "healthy" | "warning" | "offline";
  checkedAt: string;
  pendingMessages: number;
  activeWhatsAppSessions?: number;
  services: HealthCheck[];
}

export interface MatchingWeights {
  budget: number;
  city: number;
  locality: number;
  bhk: number;
  type: number;
}

export interface LeadScoringRules {
  siteVisit: "cold" | "warm" | "hot";
  interested: "cold" | "warm" | "hot";
  viewed: "cold" | "warm" | "hot";
  inactive14Days: "cold" | "warm" | "hot";
}

export interface SystemSettings {
  _id?: string;
  adminPhone: string | null;
  adminEmail: string | null;
  retryIntervals: number[];
  handoffKeywords: string[];
  matchingWeights: MatchingWeights;
  leadScoringRules: LeadScoringRules;
  defaultDailySummaryTime: string;
  createdAt?: string;
  updatedAt?: string;
}

export type EnabledQuestion =
  | "buyRent"
  | "propertyType"
  | "budget"
  | "city"
  | "locality"
  | "bhk"
  | "facing"
  | "floor"
  | "builder"
  | "propertyAge"
  | "possessionDate";

export interface TitanPreferences {
  _id?: string;
  titanId: string;
  maxPropertiesPerMessage: number;
  dailySummaryEnabled: boolean;
  dailySummaryTime: string | null;
  enabledQuestions: EnabledQuestion[];
  customMatchingWeights: MatchingWeights | null;
  active: boolean;
  defaultDailySummaryTime?: string;
  createdAt?: string;
  updatedAt?: string;
}
