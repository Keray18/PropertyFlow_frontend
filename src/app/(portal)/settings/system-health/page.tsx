"use client";

import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import LoadingScreen from "@/components/LoadingScreen";
import { getSystemHealth } from "@/lib/api/health";
import type { HealthCheck, SystemHealth } from "@/lib/types";

const STATUS_LABELS = {
  healthy: "Healthy",
  warning: "Warning",
  offline: "Offline",
} as const;

const STATUS_COLORS = {
  healthy: "success",
  warning: "warning",
  offline: "error",
} as const;

function ServiceCard({ service }: { service: HealthCheck }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1 }}>
          <Typography variant="h6">{service.name}</Typography>
          <Chip
            label={STATUS_LABELS[service.status]}
            color={STATUS_COLORS[service.status]}
            size="small"
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {service.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function SystemHealthPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSystemHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load system health.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHealth();
  }, [loadHealth]);

  if (loading && !health) {
    return <LoadingScreen message="Checking system health..." />;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            System Health
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Live status of services powering your dealer portal.
          </Typography>
        </Box>
        <Button variant="outlined" onClick={loadHealth} disabled={loading}>
          {loading ? "Refreshing..." : "Retry"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {health && (
        <>
          <Alert
            severity={
              health.overall === "healthy"
                ? "success"
                : health.overall === "warning"
                  ? "warning"
                  : "error"
            }
            sx={{ mb: 3 }}
          >
            Overall status: {STATUS_LABELS[health.overall]} · Pending messages:{" "}
            {health.pendingMessages} · Active WhatsApp sessions:{" "}
            {health.activeWhatsAppSessions ?? 0} · Last checked:{" "}
            {new Date(health.checkedAt).toLocaleString("en-IN")}
          </Alert>

          <Grid container spacing={2}>
            {health.services.map((service) => (
              <Grid key={service.name} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
