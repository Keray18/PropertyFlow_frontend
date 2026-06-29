"use client";

import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import PropertyTable from "@/components/PropertyTable";
import LoadingScreen from "@/components/LoadingScreen";
import { getPropertiesByTitan } from "@/lib/api/properties";
import { useTitan } from "@/context/TitanContext";
import type { Property } from "@/lib/types";

export default function PropertiesPage() {
  const { titanId, loading: authLoading } = useTitan();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProperties = useCallback(async () => {
    if (!titanId) {
      return;
    }

    try {
      setError(null);
      const data = await getPropertiesByTitan(titanId);
      setProperties(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load properties."
      );
    } finally {
      setLoading(false);
    }
  }, [titanId]);

  useEffect(() => {
    if (!authLoading && titanId) {
      loadProperties();
    }
  }, [authLoading, titanId, loadProperties]);

  if (authLoading || loading) {
    return <LoadingScreen message="Loading your properties..." />;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Properties
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage the listings you share with buyers on WhatsApp.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <PropertyTable
        properties={properties}
        titanId={titanId}
        onRefresh={loadProperties}
      />
    </Box>
  );
}
