import apiClient from "./client";
import type { ApiResponse, SystemSettings, TitanPreferences } from "@/lib/types";

export async function getTitanSettings(titanId: string): Promise<TitanPreferences> {
  const { data } = await apiClient.get<ApiResponse<TitanPreferences>>(
    `/api/settings/titan/${titanId}`
  );
  return data.data;
}

export async function updateTitanSettings(
  titanId: string,
  payload: Partial<TitanPreferences>
): Promise<TitanPreferences> {
  const { data } = await apiClient.put<ApiResponse<TitanPreferences>>(
    `/api/settings/titan/${titanId}`,
    payload
  );
  return data.data;
}

export async function getSystemSettings(adminKey: string): Promise<SystemSettings> {
  const { data } = await apiClient.get<ApiResponse<SystemSettings>>("/api/settings/system", {
    headers: { "x-admin-key": adminKey },
  });
  return data.data;
}

export async function updateSystemSettings(
  adminKey: string,
  payload: Partial<SystemSettings>
): Promise<SystemSettings> {
  const { data } = await apiClient.put<ApiResponse<SystemSettings>>(
    "/api/settings/system",
    payload,
    { headers: { "x-admin-key": adminKey } }
  );
  return data.data;
}
