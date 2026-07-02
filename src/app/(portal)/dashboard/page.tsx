"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TodayIcon from "@mui/icons-material/Today";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MetricCard from "@/components/MetricCard";
import LoadingScreen from "@/components/LoadingScreen";
import WhatsAppConnectionCard from "@/components/WhatsAppConnectionCard";
import { getLeadsByTitan } from "@/lib/api/leads";
import { getPropertiesByTitan } from "@/lib/api/properties";
import { computeDashboardMetrics } from "@/lib/utils/dashboard";
import { useTitan } from "@/context/TitanContext";
import type { DashboardMetrics } from "@/lib/types";

export default function DashboardPage() {
  const { titanId, titan, loading: authLoading } = useTitan();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      if (!titanId) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const [leads, properties] = await Promise.all([
          getLeadsByTitan(titanId),
          getPropertiesByTitan(titanId),
        ]);
        setMetrics(computeDashboardMetrics(leads, properties));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && titanId) {
      loadDashboard();
    }
  }, [titanId, authLoading]);

  if (authLoading || loading) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        A quick look at your business today.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2.5}>
        {titan && (
          <Grid size={{ xs: 12 }}>
            <WhatsAppConnectionCard
              titanId={titan._id}
              registeredPhone={titan.whatsappNumber}
              compact
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <MetricCard
            title="Today's Leads"
            value={metrics?.todaysLeads ?? 0}
            icon={TodayIcon}
            color="#128C7E"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <MetricCard
            title="Hot Leads"
            value={metrics?.hotLeads ?? 0}
            icon={WhatshotIcon}
            color="#e65100"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <MetricCard
            title="Interested Buyers"
            value={metrics?.interestedBuyers ?? 0}
            icon={FavoriteIcon}
            color="#c2185b"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <MetricCard
            title="Site Visit Requests"
            value={metrics?.siteVisitRequests ?? 0}
            icon={LocationOnIcon}
            color="#1565c0"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <MetricCard
            title="Properties Available"
            value={metrics?.propertiesAvailable ?? 0}
            icon={HomeWorkIcon}
            color="#2e7d32"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
