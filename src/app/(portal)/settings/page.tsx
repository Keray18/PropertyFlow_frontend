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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import LoadingScreen from "@/components/LoadingScreen";
import { useTitan } from "@/context/TitanContext";
import { getTitanSettings, updateTitanSettings } from "@/lib/api/settings";
import { ENABLED_QUESTION_OPTIONS } from "@/lib/utils/constants";
import type { EnabledQuestion, MatchingWeights, TitanPreferences } from "@/lib/types";

const DEFAULT_WEIGHTS: MatchingWeights = {
  budget: 30,
  city: 30,
  locality: 20,
  bhk: 10,
  type: 10,
};

const REQUIRED_QUESTIONS: EnabledQuestion[] = [
  "buyRent",
  "propertyType",
  "budget",
  "city",
  "locality",
  "bhk",
];

const WEIGHT_FIELDS: Array<{ key: keyof MatchingWeights; label: string }> = [
  { key: "budget", label: "Budget" },
  { key: "city", label: "City" },
  { key: "locality", label: "Locality" },
  { key: "bhk", label: "BHK" },
  { key: "type", label: "Property Type" },
];

export default function SettingsPage() {
  const { titan, titanId, loading: authLoading } = useTitan();
  const [preferences, setPreferences] = useState<TitanPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!titanId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getTitanSettings(titanId);
        setPreferences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && titanId) {
      loadSettings();
    }
  }, [authLoading, titanId]);

  const toggleQuestion = (question: EnabledQuestion) => {
    if (!preferences) return;

    if (REQUIRED_QUESTIONS.includes(question) && preferences.enabledQuestions.includes(question)) {
      setError("Core questions (Buy/Rent through BHK) cannot be disabled.");
      return;
    }

    const enabled = preferences.enabledQuestions.includes(question);
    const nextQuestions = enabled
      ? preferences.enabledQuestions.filter((item) => item !== question)
      : [...preferences.enabledQuestions, question];

    if (nextQuestions.length === 0) {
      setError("At least one question must remain enabled.");
      return;
    }

    setPreferences({ ...preferences, enabledQuestions: nextQuestions });
  };

  const updateWeight = (key: keyof MatchingWeights, value: string) => {
    if (!preferences) return;

    const weights = {
      ...(preferences.customMatchingWeights || DEFAULT_WEIGHTS),
      [key]: Number(value) || 0,
    };

    setPreferences({ ...preferences, customMatchingWeights: weights });
  };

  const handleSave = async () => {
    if (!preferences || !titanId) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const updated = await updateTitanSettings(titanId, {
        maxPropertiesPerMessage: preferences.maxPropertiesPerMessage,
        dailySummaryEnabled: preferences.dailySummaryEnabled,
        dailySummaryTime: preferences.dailySummaryTime || null,
        enabledQuestions: preferences.enabledQuestions,
        customMatchingWeights: preferences.customMatchingWeights,
      });

      setPreferences(updated);
      setSuccess("Settings saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <LoadingScreen message="Loading settings..." />;
  }

  if (!titan || !preferences) {
    return <Alert severity="error">{error || "Could not load settings."}</Alert>;
  }

  const weights = preferences.customMatchingWeights || DEFAULT_WEIGHTS;
  const fallbackSummaryTime = preferences.defaultDailySummaryTime || "20:00";

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure your BuyerBot flow, property matching, and daily summary preferences.
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
                Daily Summary
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.dailySummaryEnabled}
                    onChange={(event) =>
                      setPreferences({
                        ...preferences,
                        dailySummaryEnabled: event.target.checked,
                      })
                    }
                  />
                }
                label="Enable daily WhatsApp summary"
              />
              <TextField
                fullWidth
                label="Summary time (HH:mm)"
                type="time"
                value={preferences.dailySummaryTime || fallbackSummaryTime}
                onChange={(event) =>
                  setPreferences({ ...preferences, dailySummaryTime: event.target.value })
                }
                margin="normal"
                helperText={`Leave blank to use system default (${fallbackSummaryTime} IST).`}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Properties Per Message
              </Typography>
              <TextField
                fullWidth
                label="Max properties sent per batch"
                type="number"
                value={preferences.maxPropertiesPerMessage}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    maxPropertiesPerMessage: Math.max(1, Number(event.target.value) || 1),
                  })
                }
                inputProps={{ min: 1, max: 20 }}
                helperText="Used when BuyerBot sends matching properties (default: 5)."
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Question Flow
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select and order the questions BuyerBot asks new leads.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {ENABLED_QUESTION_OPTIONS.map((option) => {
                  const selected = preferences.enabledQuestions.includes(option.value);

                  return (
                    <Chip
                      key={option.value}
                      label={option.label}
                      color={selected ? "primary" : "default"}
                      variant={selected ? "filled" : "outlined"}
                      onClick={() => toggleQuestion(option.value)}
                    />
                  );
                })}
              </Box>
              {preferences.enabledQuestions.length > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                  Active order:{" "}
                  {preferences.enabledQuestions
                    .map(
                      (key) =>
                        ENABLED_QUESTION_OPTIONS.find((option) => option.value === key)?.label || key
                    )
                    .join(" → ")}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Matching Weights
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Adjust how properties are scored for your leads. Higher values mean stronger importance.
              </Typography>
              <Grid container spacing={2}>
                {WEIGHT_FIELDS.map((field) => (
                  <Grid key={field.key} size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      fullWidth
                      label={field.label}
                      type="number"
                      value={weights[field.key]}
                      onChange={(event) => updateWeight(field.key, event.target.value)}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Platform admin?{" "}
          <Link href="/settings/admin">Configure system-wide settings</Link>
        </Typography>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </Box>
    </Box>
  );
}
