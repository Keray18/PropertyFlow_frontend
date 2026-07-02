"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import StatusChip from "@/components/StatusChip";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {
  connectWhatsApp,
  disconnectWhatsApp,
  getWhatsAppQr,
  getWhatsAppStatus,
  reconnectWhatsApp,
  type WhatsAppConnectionStatus,
} from "@/lib/api/whatsapp";
import { formatDateTime, formatPhone } from "@/lib/utils/format";

interface WhatsAppConnectionCardProps {
  titanId: string;
  registeredPhone: string;
  compact?: boolean;
}

export default function WhatsAppConnectionCard({
  titanId,
  registeredPhone,
  compact = false,
}: WhatsAppConnectionCardProps) {
  const [status, setStatus] = useState<WhatsAppConnectionStatus>("disconnected");
  const [connectedPhone, setConnectedPhone] = useState<string | null>(null);
  const [lastConnectedAt, setLastConnectedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [disconnectOpen, setDisconnectOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showMessage = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const refreshStatus = useCallback(async () => {
    if (!titanId) return;

    try {
      const data = await getWhatsAppStatus(titanId);
      setStatus(data.status);
      setConnectedPhone(data.phone || null);
      setLastConnectedAt(data.lastConnectedAt || null);
    } catch (err) {
      setStatus("disconnected");
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

  useEffect(() => {
    if (!qrOpen || !titanId) return;

    const poll = async () => {
      try {
        const [statusRes, qrRes] = await Promise.all([
          getWhatsAppStatus(titanId),
          getWhatsAppQr(titanId),
        ]);

        setStatus(statusRes.status);
        setConnectedPhone(statusRes.phone || null);
        setLastConnectedAt(statusRes.lastConnectedAt || null);

        if (qrRes.qr) {
          setQrImage(qrRes.qr);
        }

        if (statusRes.status === "connected") {
          setQrOpen(false);
          setQrImage(null);
          showMessage("WhatsApp connected successfully.");
        }
      } catch (err) {
        showMessage(
          err instanceof Error ? err.message : "Failed to refresh QR code.",
          "error"
        );
      }
    };

    poll();
    pollRef.current = setInterval(poll, 1000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [qrOpen, titanId]);

  const handleConnect = async () => {
    try {
      setActionLoading(true);
      await connectWhatsApp();
      setStatus("connecting");
      setQrOpen(true);
      setQrImage(null);
      showMessage("Scan the QR code with WhatsApp on your phone.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to start connection.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReconnect = async () => {
    try {
      setActionLoading(true);
      await reconnectWhatsApp();
      setStatus("connecting");
      setQrOpen(true);
      setQrImage(null);
      showMessage("Reconnecting WhatsApp. Scan QR if prompted.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to reconnect.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setActionLoading(true);
      await disconnectWhatsApp();
      setStatus("disconnected");
      setConnectedPhone(null);
      setDisconnectOpen(false);
      showMessage("WhatsApp disconnected.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to disconnect.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const statusVariant =
    status === "connected" ? "connected" : status === "connecting" ? "connecting" : "disconnected";

  return (
    <>
      <Card sx={compact ? undefined : { height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            WhatsApp Connection
          </Typography>
          {!compact && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Connect your WhatsApp to receive buyer messages and manage inventory via BullBot.
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
                <StatusChip variant={statusVariant} />
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Registered Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatPhone(registeredPhone)}
                </Typography>
              </Box>

              {connectedPhone && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Connected Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatPhone(connectedPhone)}
                  </Typography>
                </Box>
              )}

              {lastConnectedAt && (
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
                {status === "disconnected" && (
                  <Button
                    variant="contained"
                    onClick={handleConnect}
                    disabled={actionLoading}
                  >
                    Connect WhatsApp
                  </Button>
                )}

                {status === "connecting" && (
                  <>
                    <Button variant="outlined" onClick={() => setQrOpen(true)} disabled={actionLoading}>
                      Show QR Code
                    </Button>
                    <Button variant="outlined" onClick={handleReconnect} disabled={actionLoading}>
                      Retry
                    </Button>
                  </>
                )}

                {status === "connected" && (
                  <>
                    <Button variant="outlined" onClick={handleReconnect} disabled={actionLoading}>
                      Reconnect
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setDisconnectOpen(true)}
                      disabled={actionLoading}
                    >
                      Disconnect
                    </Button>
                  </>
                )}

                <Button variant="text" onClick={refreshStatus} disabled={actionLoading}>
                  Refresh
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={qrOpen} onClose={() => setQrOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Scan WhatsApp QR Code</DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Open WhatsApp on your phone → Linked Devices → Link a Device → scan this code.
          </Typography>
          {qrImage ? (
            <Box
              component="img"
              src={qrImage}
              alt="WhatsApp QR Code"
              sx={{ width: "100%", maxWidth: 280, borderRadius: 1, border: "1px solid", borderColor: "divider" }}
            />
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={disconnectOpen}
        title="Disconnect WhatsApp?"
        message="You will need to scan the QR code again to reconnect. BuyerBot and BullBot will stop receiving messages until you reconnect."
        confirmLabel="Disconnect"
        confirmColor="error"
        loading={actionLoading}
        onConfirm={handleDisconnect}
        onCancel={() => setDisconnectOpen(false)}
      />

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
