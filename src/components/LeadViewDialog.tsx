"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { Lead } from "@/lib/types";
import { formatCurrency, formatDateTime, formatPhone } from "@/lib/utils/format";
import StatusChip from "./StatusChip";

interface LeadViewDialogProps {
  open: boolean;
  lead: Lead | null;
  loading?: boolean;
  onClose: () => void;
  onMarkContacted: (lead: Lead) => void;
  onMarkClosed: (lead: Lead) => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

export default function LeadViewDialog({
  open,
  lead,
  loading = false,
  onClose,
  onMarkContacted,
  onMarkClosed,
}: LeadViewDialogProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Buyer Details</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
          <StatusChip variant={lead.leadTemperature} />
          <StatusChip variant={lead.status} />
          <StatusChip variant={lead.buyOrRent} />
          {lead.siteVisitRequested && <StatusChip variant="siteVisit" />}
        </Stack>

        <Grid container spacing={2}>
          <Grid size={6}>
            <DetailRow label="Buyer Name" value={lead.buyerName} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Phone" value={formatPhone(lead.buyerPhone)} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Looking To" value={lead.buyOrRent === "buy" ? "Buy" : "Rent"} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Property Type" value={lead.propertyType} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="BHK" value={`${lead.bhk} BHK`} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Budget" value={formatCurrency(lead.budget)} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="City" value={lead.city} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Locality" value={lead.locality} />
          </Grid>
          <Grid size={12}>
            <DetailRow
              label="Last Activity"
              value={formatDateTime(lead.lastActivityAt)}
            />
          </Grid>
          {lead.siteVisitRequested && (
            <Grid size={12}>
              <DetailRow
                label="Site Visit Requested"
                value={
                  lead.siteVisitRequestedAt
                    ? formatDateTime(lead.siteVisitRequestedAt)
                    : "Yes"
                }
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, flexWrap: "wrap", gap: 1 }}>
        <Button onClick={onClose}>Close</Button>
        {lead.status !== "contacted" && lead.status !== "closed" && (
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => onMarkContacted(lead)}
          >
            Mark Contacted
          </Button>
        )}
        {lead.status !== "closed" && (
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => onMarkClosed(lead)}
          >
            Mark Closed
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
