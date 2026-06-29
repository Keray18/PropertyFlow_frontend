import apiClient from "./client";
import type { ApiResponse, Titan } from "@/lib/types";

export async function sendOtp(phoneNumber: string): Promise<{ message: string; debugOtp?: string }> {
  const { data } = await apiClient.post<{ success: boolean; message: string; debugOtp?: string }>(
    "/api/auth/send-otp",
    { phoneNumber }
  );
  return { message: data.message, debugOtp: data.debugOtp };
}

export async function verifyOtp(
  phoneNumber: string,
  otp: string
): Promise<Titan> {
  const { data } = await apiClient.post<ApiResponse<{ titan: Titan }>>(
    "/api/auth/verify-otp",
    { phoneNumber, otp }
  );
  return data.data.titan;
}

export async function logout(): Promise<void> {
  await apiClient.post("/api/auth/logout");
}

export async function getMe(): Promise<Titan> {
  const { data } = await apiClient.get<ApiResponse<Titan>>("/api/auth/me");
  return data.data;
}
