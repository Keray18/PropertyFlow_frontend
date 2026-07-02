"use client";

import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import StatusChip from "./StatusChip";
import { useTitan } from "@/context/TitanContext";
import { getDealerName } from "@/lib/utils/format";
import { getWhatsAppStatus, type WhatsAppConnectionStatus } from "@/lib/api/whatsapp";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { titan, loading, logout } = useTitan();
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppConnectionStatus>("disconnected");

  useEffect(() => {
    if (!titan?._id) return;

    let active = true;

    const loadStatus = async () => {
      try {
        const data = await getWhatsAppStatus(titan._id);
        if (active) setWhatsappStatus(data.status);
      } catch {
        if (active) setWhatsappStatus("disconnected");
      }
    };

    loadStatus();
    const interval = setInterval(loadStatus, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [titan?._id]);

  const dealerName = titan
    ? getDealerName(titan.firstName, titan.lastName)
    : "Dealer";
  const businessName = titan?.businessName || "Your Business";

  const statusVariant =
    whatsappStatus === "connected"
      ? "connected"
      : whatsappStatus === "connecting"
        ? "connecting"
        : "disconnected";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
          aria-label="Open menu"
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            {loading ? "Loading..." : dealerName}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {loading ? "" : businessName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {!loading && <StatusChip variant={statusVariant} />}
          </Box>
          {!loading && (
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={logout}
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
