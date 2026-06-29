import apiClient from "./client";
import type { ApiResponse, Lead } from "@/lib/types";

export async function getLeadsByTitan(titanId: string): Promise<Lead[]> {
  const { data } = await apiClient.get<ApiResponse<Lead[]>>(
    `/api/leads/titan/${titanId}`
  );
  return data.data;
}

export async function updateLeadStatus(
  id: string,
  status: Lead["status"]
): Promise<Lead> {
  const { data } = await apiClient.patch<ApiResponse<Lead>>(
    `/api/leads/${id}/status`,
    { status }
  );
  return data.data;
}
