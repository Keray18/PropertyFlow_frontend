import apiClient from "./client";
import type { ApiResponse, Property, PropertyFormData } from "@/lib/types";

export async function getPropertiesByTitan(titanId: string): Promise<Property[]> {
  const { data } = await apiClient.get<ApiResponse<Property[]>>(
    `/api/properties/titan/${titanId}`
  );
  return data.data;
}

export async function createProperty(
  titanId: string,
  payload: PropertyFormData
): Promise<Property> {
  const { data } = await apiClient.post<ApiResponse<Property>>(
    "/api/properties",
    {
      titanId,
      ...payload,
      budget: Number(payload.budget),
    }
  );
  return data.data;
}

export async function updateProperty(
  id: string,
  payload: Partial<PropertyFormData> & { active?: boolean }
): Promise<Property> {
  const body = { ...payload };
  if (body.budget !== undefined && body.budget !== "") {
    body.budget = Number(body.budget);
  }
  const { data } = await apiClient.put<ApiResponse<Property>>(
    `/api/properties/${id}`,
    body
  );
  return data.data;
}

export async function deleteProperty(id: string): Promise<void> {
  await apiClient.delete(`/api/properties/${id}`);
}
