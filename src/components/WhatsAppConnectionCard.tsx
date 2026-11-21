"use client";

import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import StatusChip from "@/components/StatusChip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import {
  getWhatsAppStatus,
  startMetaOnboarding,
  completeMetaOnboarding,
  connectWhatsAppDirect,
  disconnectWhatsApp,
  type WhatsAppConnectionStatus,
} from "@/lib/api/whatsapp";
import { loadFacebookSDK, launchEmbeddedSignup } from "@/lib/metaSdk";
import { formatDateTime, formatPhone } from "@/lib/utils/format";

interface WhatsAppConnectionCardProps {
  titanId: string;
  registeredPhone: string;
  compact?: boolean;
}

export default function WhatsAppConnectionCard({
  titanId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registeredPhone,
  compact = false,
}: WhatsAppConnectionCardProps) {
  const [status, setStatus] = useState<WhatsAppConnectionStatus>("NOT_CONNECTED");
  const [connectedPhone, setConnectedPhone] = useState<string | null>(null);
  const [lastConnectedAt, setLastConnectedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [connecting, setConnecting] = useState(false);
  const [directDialogOpen, setDirectDialogOpen] = useState(false);
  const [directPhoneId, setDirectPhoneId] = useState("");
  const [directToken, setDirectToken] = useState("");
  const [directWabaId, setDirectWabaId] = useState("");
  const [directConnecting, setDirectConnecting] = useState(false);

  const showMessage = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleConnect = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_META_APP_ID || !process.env.NEXT_PUBLIC_META_CONFIG_ID) {
        throw new Error("Missing NEXT_PUBLIC_META_APP_ID or NEXT_PUBLIC_META_CONFIG_ID in environment.");
      }

      setConnecting(true);
      
      // 1. Load SDK first
      await loadFacebookSDK();

      // 2. Start onboarding session
      const { nonce } = await startMetaOnboarding();
      
      // 3. Launch popup
      const code = await launchEmbeddedSignup();
      
      // 4. Complete onboarding
      await completeMetaOnboarding(code, nonce);
      
      showMessage("WhatsApp connected successfully!", "success");
      await refreshStatus();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect WhatsApp";
      if (
        errorMessage.includes("cancelled") ||
        errorMessage.includes("failed") ||
        errorMessage.includes("BSP") ||
        errorMessage.includes("TP")
      ) {
        showMessage("Meta Embedded Signup requires verified BSP status. Please use 'Direct Connect' below.", "error");
      } else {
        showMessage(errorMessage, "error");
      }
    } finally {
      setConnecting(false);
    }
  };

  const handleDirectConnect = async (useEnvDefaults: boolean = false) => {
    try {
      setDirectConnecting(true);
      const payload = useEnvDefaults
        ? {}
        : {
            phoneNumberId: directPhoneId.trim() || undefined,
            accessToken: directToken.trim() || undefined,
            wabaId: directWabaId.trim() || undefined,
          };

      await connectWhatsAppDirect(payload);
      setDirectDialogOpen(false);
      showMessage("WhatsApp connected successfully!", "success");
      await refreshStatus();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect WhatsApp";
      showMessage(errorMessage, "error");
    } finally {
      setDirectConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      await disconnectWhatsApp();
      showMessage("WhatsApp disconnected.", "success");
      await refreshStatus();
    } catch (err: unknown) {
      showMessage(err instanceof Error ? err.message : "Failed to disconnect.", "error");
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = useCallback(async () => {
    if (!titanId) return;

    try {
      setLoading(true);
      const data = await getWhatsAppStatus(titanId);
      setStatus(data.status);
      setConnectedPhone(data.phone || null);
      setLastConnectedAt(data.lastConnectedAt || null);
    } catch (err) {
      setStatus("NOT_CONNECTED");
      showMessage(
        err instanceof Error ? err.message : "Failed to load WhatsApp status.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [titanId]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  // Derived styling and text for statuses
  let statusColor: "success" | "warning" | "error" | "default" = "default";
  let statusText = "Not Connected";
  let helperText = "";

  switch (status) {
    case "CONNECTED":
      statusColor = "success";
      statusText = "Connected";
      helperText = "Your WhatsApp Cloud API connection is active.";
      break;
    case "ONBOARDING_REQUIRED":
      statusColor = "warning";
      statusText = "Onboarding Required";
      helperText = "WhatsApp needs to be connected to Meta Cloud API.";
      break;
    case "TOKEN_INVALID":
      statusColor = "error";
      statusText = "Authorization Expired";
      helperText = "WhatsApp authorization expired. Please connect a fresh token.";
      break;
    case "CONFIGURATION_ERROR":
      statusColor = "error";
      statusText = "Configuration Error";
      helperText = "Your connection has a configuration error. Please check your credentials.";
      break;
    case "NOT_CONNECTED":
    default:
      statusColor = "default";
      statusText = "Not Connected";
      helperText = "You have not connected WhatsApp yet.";
      break;
  }

  return (
    <>
      <Card sx={compact ? undefined : { height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            WhatsApp Connection
          </Typography>
          {!compact && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Connect your WhatsApp to receive buyer messages.
            </Typography>
          )}
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                  Status
                </Typography>
                <StatusChip variant="connected" label={statusText} color={statusColor} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {helperText}
                </Typography>
              </Box>

              {status === "CONNECTED" && connectedPhone && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Connected Meta Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatPhone(connectedPhone)}
                  </Typography>
                </Box>
              )}

              {lastConnectedAt && status === "CONNECTED" && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Last Connected
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDateTime(lastConnectedAt)}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: 1 }}>
                {(status === "ONBOARDING_REQUIRED" || status === "NOT_CONNECTED" || status === "TOKEN_INVALID") && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => setDirectDialogOpen(true)}
                      disabled={connecting || directConnecting}
                    >
                      Direct Connect
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleConnect}
                      disabled={connecting || directConnecting}
                    >
                      {connecting ? "Connecting..." : "Connect with Meta"}
                    </Button>
                  </>
                )}

                {status === "CONNECTED" && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDisconnect}
                    disabled={loading}
                  >
                    Disconnect
                  </Button>
                )}

                <Button variant="text" onClick={refreshStatus}>
                  Refresh
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={directDialogOpen}
        onClose={() => setDirectDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Connect WhatsApp Cloud API</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Meta Embedded Signup requires Tech Provider (BSP) approval. For development or direct usage, connect your WhatsApp number using your Phone Number ID and Access Token from the Meta App Dashboard (<strong>WhatsApp &gt; API Setup</strong>).
          </Typography>

          <TextField
            label="Phone Number ID"
            placeholder="e.g. 1080679258471791 (leave empty to use backend .env)"
            value={directPhoneId}
            onChange={(e) => setDirectPhoneId(e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            label="Meta Access Token"
            placeholder="Paste fresh token from Meta Dashboard (leave empty to use backend .env)"
            value={directToken}
            onChange={(e) => setDirectToken(e.target.value)}
            fullWidth
            multiline
            rows={2}
            size="small"
          />

          <TextField
            label="WABA ID (Optional)"
            placeholder="e.g. 1742843106911911 (leave empty to use backend .env)"
            value={directWabaId}
            onChange={(e) => setDirectWabaId(e.target.value)}
            fullWidth
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => handleDirectConnect(true)}
            disabled={directConnecting}
          >
            Use Backend .env Values
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button onClick={() => setDirectDialogOpen(false)} disabled={directConnecting}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDirectConnect(false)}
              disabled={directConnecting}
            >
              {directConnecting ? "Connecting..." : "Connect"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
