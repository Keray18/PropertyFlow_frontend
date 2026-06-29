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
  metaPhoneNumberId?: string | null;
  metaWabaId?: string | null;
  metaAccessToken?: string | null;
  active: boolean;
  setupFeePaid?: boolean;
  subscriptionPlan?: string;
  monthlyFee?: number;
  billingStatus?: "active" | "pending" | "overdue" | "paused";
  nextBillingDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  _id: string;
  titanId: string;
  propertyType: string;
  bhk: string;
  budget: number;
  city: string;
  locality: string;
  description: string;
  images: string[];
  videos: string[];
  active: boolean;
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

export interface TitanDetails {
  titan: Titan;
  properties: Property[];
  leads: Lead[];
  recentConversations: unknown[];
}

export interface PropertyFormData {
  propertyType: string;
  bhk: string;
  budget: number | "";
  city: string;
  locality: string;
  description: string;
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
