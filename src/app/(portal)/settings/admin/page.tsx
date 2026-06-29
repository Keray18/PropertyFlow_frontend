"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import LoadingScreen from "@/components/LoadingScreen";
import { getSystemSettings, updateSystemSettings } from "@/lib/api/settings";
import { LEAD_TEMPERATURE_OPTIONS } from "@/lib/utils/constants";
import type { LeadScoringRules, MatchingWeights, SystemSettings } from "@/lib/types";

const ADMIN_KEY_STORAGE = "propflow_admin_key";

const DEFAULT_WEIGHTS: MatchingWeights = {
  budget: 30,
  city: 30,
  locality: 20,
  bhk: 10,
  type: 10,
};

const DEFAULT_RULES: LeadScoringRules = {
  siteVisit: "hot",
  interested: "hot",
  viewed: "warm",
  inactive14Days: "cold",
};

export default function AdminSettingsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (storedKey) {
      setAdminKey(storedKey);
      loadSettings(storedKey);
    }
  }, []);

  async function loadSettings(key: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await getSystemSettings(key);
      setSettings(data);
      setAuthenticated(true);
      sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
    } catch (err) {
      setAuthenticated(false);
      setSettings(null);
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      setError(err instanceof Error ? err.message : "Failed to load system settings.");
    } finally {
      setLoading(false);
    }
  }

  const handleAuthenticate = async () => {
    if (!adminKey.trim()) {
      setError("Admin API key is required.");
      return;
    }

    await loadSettings(adminKey.trim());
  };

  const handleSave = async () => {
    if (!settings || !adminKey) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const updated = await updateSystemSettings(adminKey, {
        adminPhone: settings.adminPhone,
        adminEmail: settings.adminEmail,
        retryIntervals: settings.retryIntervals,
        handoffKeywords: settings.handoffKeywords,
        matchingWeights: settings.matchingWeights,
        leadScoringRules: settings.leadScoringRules,
        defaultDailySummaryTime: settings.defaultDailySummaryTime,
      });

      setSettings(updated);
      setSuccess("System settings saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save system settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <Box sx={{ maxWidth: 480 }}>
        <Typography variant="h5" gutterBottom>
          Admin Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your platform admin API key to configure system-wide settings.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Admin API Key"
          type="password"
          value={adminKey}
          onChange={(event) => setAdminKey(event.target.value)}
          margin="normal"
        />

        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleAuthenticate}>
            Continue
          </Button>
          <Button component={Link} href="/settings">
            Back to Dealer Settings
          </Button>
        </Box>
      </Box>
    );
  }

  if (loading || !settings) {
    return <LoadingScreen message="Loading system settings..." />;
  }

  const weights = settings.matchingWeights || DEFAULT_WEIGHTS;
  const rules = settings.leadScoringRules || DEFAULT_RULES;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Admin Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure platform-wide retry intervals, handoff keywords, and lead scoring rules.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Retry Intervals (seconds)
              </Typography>
              <TextField
                fullWidth
                label="Retry intervals"
                value={settings.retryIntervals.join(", ")}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    retryIntervals: event.target.value
                      .split(",")
                      .map((item) => Number(item.trim()))
                      .filter((value) => Number.isFinite(value) && value > 0),
                  })
                }
                helperText="Comma-separated values, e.g. 30, 300, 900"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Default daily summary time"
                type="time"
                value={settings.defaultDailySummaryTime}
                onChange={(event) =>
                  setSettings({ ...settings, defaultDailySummaryTime: event.target.value })
                }
                margin="normal"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Handoff Keywords
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Keywords (one per line)"
                value={settings.handoffKeywords.join("\n")}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    handoffKeywords: event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
                helperText="Buyer messages containing these phrases trigger human handoff."
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lead Scoring Rules
              </Typography>
              <Grid container spacing={2}>
                {(
                  [
                    ["siteVisit", "Site visit requested"],
                    ["interested", "Buyer interested / handoff"],
                    ["viewed", "Properties sent / viewed"],
                    ["inactive14Days", "Inactive 14+ days"],
                  ] as const
                ).map(([key, label]) => (
                  <Grid key={key} size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      fullWidth
                      select
                      label={label}
                      value={rules[key]}
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          leadScoringRules: {
                            ...rules,
                            [key]: event.target.value as LeadScoringRules[typeof key],
                          },
                        })
                      }
                    >
                      {LEAD_TEMPERATURE_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Default Matching Weights
              </Typography>
              <Grid container spacing={2}>
                {(Object.keys(DEFAULT_WEIGHTS) as Array<keyof MatchingWeights>).map((key) => (
                  <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      fullWidth
                      label={key}
                      type="number"
                      value={weights[key]}
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          matchingWeights: {
                            ...weights,
                            [key]: Number(event.target.value) || 0,
                          },
                        })
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button component={Link} href="/settings">
          Back to Dealer Settings
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save System Settings"}
        </Button>
      </Box>
    </Box>
  );
}
