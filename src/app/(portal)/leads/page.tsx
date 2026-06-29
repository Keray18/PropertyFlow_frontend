"use client";

import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LeadTable from "@/components/LeadTable";
import LoadingScreen from "@/components/LoadingScreen";
import { getLeadsByTitan } from "@/lib/api/leads";
import { useTitan } from "@/context/TitanContext";
import type { Lead } from "@/lib/types";

export default function LeadsPage() {
  const { titanId, loading: authLoading } = useTitan();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    if (!titanId) {
      return;
    }

    try {
      setError(null);
      const data = await getLeadsByTitan(titanId);
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  }, [titanId]);

  useEffect(() => {
    if (!authLoading && titanId) {
      loadLeads();
    }
  }, [authLoading, titanId, loadLeads]);

  if (authLoading || loading) {
    return <LoadingScreen message="Loading your leads..." />;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Leads
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Track buyers who reached out through WhatsApp.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <LeadTable leads={leads} onRefresh={loadLeads} />
    </Box>
  );
}
