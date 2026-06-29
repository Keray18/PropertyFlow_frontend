"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import type { Property } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import StatusChip from "./StatusChip";

interface PropertyViewDialogProps {
  open: boolean;
  property: Property | null;
  onClose: () => void;
  onEdit: (property: Property) => void;
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

export default function PropertyViewDialog({
  open,
  property,
  onClose,
  onEdit,
}: PropertyViewDialogProps) {
  if (!property) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Property Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <StatusChip variant={property.active ? "active" : "inactive"} />
        </Box>

        <Grid container spacing={2}>
          <Grid size={6}>
            <DetailRow label="Property Type" value={property.propertyType} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="BHK" value={`${property.bhk} BHK`} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Budget" value={formatCurrency(property.budget)} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="City" value={property.city} />
          </Grid>
          <Grid size={12}>
            <DetailRow label="Locality" value={property.locality} />
          </Grid>
          <Grid size={12}>
            <DetailRow
              label="Added On"
              value={formatDate(property.createdAt)}
            />
          </Grid>
        </Grid>

        {property.description && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body2">{property.description}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => onEdit(property)}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
