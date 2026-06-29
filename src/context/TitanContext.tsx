"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Titan } from "@/lib/types";
import { getMe, logout as logoutRequest } from "@/lib/api/auth";

interface TitanContextValue {
  titan: Titan | null;
  titanId: string;
  loading: boolean;
  error: string | null;
  refreshTitan: () => Promise<void>;
  logout: () => Promise<void>;
}

const TitanContext = createContext<TitanContextValue | undefined>(undefined);

export function TitanProvider({ children }: { children: React.ReactNode }) {
  const [titan, setTitan] = useState<Titan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTitan = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMe();
      setTitan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dealer info.");
      setTitan(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setTitan(null);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    refreshTitan();
  }, [refreshTitan]);

  const value = useMemo(
    () => ({
      titan,
      titanId: titan?._id || "",
      loading,
      error,
      refreshTitan,
      logout,
    }),
    [titan, loading, error, refreshTitan, logout]
  );

  return (
    <TitanContext.Provider value={value}>{children}</TitanContext.Provider>
  );
}

export function useTitan() {
  const context = useContext(TitanContext);
  if (!context) {
    throw new Error("useTitan must be used within TitanProvider");
  }
  return context;
}
