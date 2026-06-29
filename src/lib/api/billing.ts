import apiClient from "./client";
import type { ApiResponse, BillingInfo } from "@/lib/types";

export async function getBillingStatus(): Promise<BillingInfo> {
  const { data } = await apiClient.get<ApiResponse<BillingInfo>>("/api/billing/status");
  return data.data;
}
