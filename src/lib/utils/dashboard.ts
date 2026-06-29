import type { DashboardMetrics, Lead, Property } from "@/lib/types";
import { isToday } from "./format";

export function computeDashboardMetrics(
  leads: Lead[],
  properties: Property[]
): DashboardMetrics {
  return {
    todaysLeads: leads.filter((lead) => isToday(lead.createdAt)).length,
    hotLeads: leads.filter((lead) => lead.leadTemperature === "hot").length,
    interestedBuyers: leads.filter((lead) => lead.handoff).length,
    siteVisitRequests: leads.filter((lead) => lead.siteVisitRequested).length,
    propertiesAvailable: properties.filter((property) => property.active).length,
  };
}
