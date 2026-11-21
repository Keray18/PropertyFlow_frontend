import apiClient from "./client";

export type WhatsAppConnectionStatus = "NOT_CONNECTED" | "ONBOARDING_REQUIRED" | "CONNECTED" | "TOKEN_INVALID" | "CONFIGURATION_ERROR";

export interface WhatsAppStatusResponse {
  success?: boolean;
  status: WhatsAppConnectionStatus;
  phone?: string | null;
  phoneNumberId?: string | null;
  provider?: string | null;
  qualityRating?: string | null;
  verifiedName?: string | null;
  linked?: boolean;
  lastConnectedAt?: string | null;
}

export async function startMetaOnboarding(): Promise<{ nonce: string }> {
  const { data } = await apiClient.post<{ success: boolean; nonce: string; }>(
    "/api/whatsapp/onboarding/start"
  );
  return data;
}

export async function completeMetaOnboarding(code: string, nonce: string): Promise<{ status: string }> {
  const { data } = await apiClient.post<{ success: boolean; status: string }>(
    "/api/whatsapp/onboarding/complete",
    { code, nonce }
  );
  return data;
}

export interface DirectConnectPayload {
  phoneNumberId?: string;
  accessToken?: string;
  wabaId?: string;
}

export async function connectWhatsAppDirect(
  payload?: DirectConnectPayload
): Promise<{ success: boolean; status: string; phone?: string }> {
  const { data } = await apiClient.post<{ success: boolean; status: string; phone?: string }>(
    "/api/whatsapp/connect",
    payload || {}
  );
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
