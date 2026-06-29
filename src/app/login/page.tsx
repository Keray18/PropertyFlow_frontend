"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sendOtp, verifyOtp } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugOtp, setDebugOtp] = useState<string | null>(null);

  const normalizePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 10) {
      return `+91${digits}`;
    }

    if (digits.startsWith("91") && digits.length === 12) {
      return `+${digits}`;
    }

    return value.startsWith("+") ? value : `+${digits}`;
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      const normalized = normalizePhone(phoneNumber);
      const result = await sendOtp(normalized);
      setPhoneNumber(normalized);
      setDebugOtp(result.debugOtp || null);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      await verifyOtp(phoneNumber, otp);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <WhatsAppIcon sx={{ color: "primary.main", fontSize: 36 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                PropFlow
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dealer Login
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in with your registered WhatsApp number.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {step === "phone" ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || phoneNumber.trim().length < 10}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                slotProps={{ htmlInput: { inputMode: "numeric" } }}
              />
              {debugOtp && (
                <Alert severity="info">
                  Development OTP: <strong>{debugOtp}</strong>
                </Alert>
              )}
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || otp.length !== 6}
                onClick={handleVerifyOtp}
              >
                Verify & Login
              </Button>
              <Button
                fullWidth
                variant="text"
                disabled={loading}
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setDebugOtp(null);
                }}
              >
                Change Number
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
