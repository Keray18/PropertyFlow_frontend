import apiClient from "./client";

export type WhatsAppConnectionStatus = "connected" | "connecting" | "disconnected";

export interface WhatsAppStatusResponse {
  success?: boolean;
  status: WhatsAppConnectionStatus;
  phone?: string | null;
  linked?: boolean;
  hasQr?: boolean;
  lastConnectedAt?: string | null;
}

export interface WhatsAppQrResponse {
  success?: boolean;
  status: string;
  qr: string | null;
}

export async function connectWhatsApp(): Promise<{ status: string }> {
  const { data } = await apiClient.post<{ success: boolean; status: string }>(
    "/api/whatsapp/connect"
  );
  return data;
}

export async function getWhatsAppQr(titanId: string): Promise<WhatsAppQrResponse> {
  const { data } = await apiClient.get<WhatsAppQrResponse>(`/api/whatsapp/qr/${titanId}`);
  return data;
}

export async function getWhatsAppStatus(titanId: string): Promise<WhatsAppStatusResponse> {
  const { data } = await apiClient.get<WhatsAppStatusResponse>(
    `/api/whatsapp/status/${titanId}`
  );
  return data;
}

export async function reconnectWhatsApp(): Promise<{ status: string }> {
  const { data } = await apiClient.post<{ success: boolean; status: string }>(
    "/api/whatsapp/reconnect"
  );
  return data;
}

export async function disconnectWhatsApp(): Promise<{ status: string }> {
  const { data } = await apiClient.post<{ success: boolean; status: string }>(
    "/api/whatsapp/disconnect"
  );
  return data;
}
