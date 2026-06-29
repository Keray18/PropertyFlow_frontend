"use client";

import Chip from "@mui/material/Chip";

type StatusVariant =
  | "connected"
  | "disconnected"
  | "active"
  | "inactive"
  | "new"
  | "contacted"
  | "closed"
  | "lost"
  | "cold"
  | "warm"
  | "hot"
  | "buy"
  | "rent"
  | "siteVisit"
  | "pending"
  | "overdue"
  | "paused";

const STATUS_CONFIG: Record<
  StatusVariant,
  { label: string; color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" }
> = {
  connected: { label: "WhatsApp Connected", color: "success" },
  disconnected: { label: "WhatsApp Not Connected", color: "warning" },
  active: { label: "Active", color: "success" },
  inactive: { label: "Inactive", color: "default" },
  new: { label: "New", color: "info" },
  contacted: { label: "Contacted", color: "primary" },
  closed: { label: "Closed", color: "success" },
  lost: { label: "Lost", color: "default" },
  cold: { label: "Cold", color: "info" },
  warm: { label: "Warm", color: "warning" },
  hot: { label: "Hot", color: "error" },
  buy: { label: "Buy", color: "primary" },
  rent: { label: "Rent", color: "secondary" },
  siteVisit: { label: "Site Visit", color: "warning" },
  pending: { label: "Payment Pending", color: "warning" },
  overdue: { label: "Payment Overdue", color: "error" },
  paused: { label: "Paused", color: "default" },
};

interface StatusChipProps {
  variant: StatusVariant;
  size?: "small" | "medium";
}

export default function StatusChip({ variant, size = "small" }: StatusChipProps) {
  const config = STATUS_CONFIG[variant];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant="outlined"
    />
  );
}
