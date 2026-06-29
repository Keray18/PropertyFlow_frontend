import apiClient from "./client";
import type { ApiResponse, SystemHealth } from "@/lib/types";

export async function getSystemHealth(): Promise<SystemHealth> {
  const { data } = await apiClient.get<ApiResponse<SystemHealth>>(
    "/api/settings/system-health"
  );
  return data.data;
}
