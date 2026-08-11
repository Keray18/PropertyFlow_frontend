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
  payload: Omit<PropertyFormData, "status"> & { status: string }
): Promise<Property> {
  const { data } = await apiClient.post<ApiResponse<Property>>(
    "/api/properties",
    {
      titanId,
      ...payload,
      price: Number(payload.price),
    }
  );
  return data.data;
}

export async function updateProperty(
  id: string,
  payload: Partial<Omit<PropertyFormData, "status"> & { status: string }> & { active?: boolean }
): Promise<Property> {
  const body = { ...payload };
  if (body.price !== undefined && body.price !== "") {
    body.price = Number(body.price);
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

export async function uploadPropertyMedia(
  file: File,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProgress?: (progressEvent: any) => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await apiClient.post<ApiResponse<any>>(
    "/api/properties/media",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onProgress,
    }
  );
  return data.data;
}

export async function deletePropertyMedia(
  publicId: string,
  resourceType: "image" | "video" = "image"
): Promise<void> {
  await apiClient.delete("/api/properties/media", {
    data: { publicId, resourceType },
  });
}
