import apiClient from "./client";
import type { ApiResponse, Titan, TitanDetails } from "@/lib/types";

export async function getTitan(titanId: string): Promise<Titan> {
  const { data } = await apiClient.get<ApiResponse<Titan>>(
    `/api/titans/${titanId}`
  );
  return data.data;
}

export async function getTitanDetails(titanId: string): Promise<TitanDetails> {
  const { data } = await apiClient.get<ApiResponse<TitanDetails>>(
    `/api/admin/titans/${titanId}`
  );
  return data.data;
}
