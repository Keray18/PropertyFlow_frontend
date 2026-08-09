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
import Chip from "@mui/material/Chip";
import type { Property } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import StatusChip from "./StatusChip";

interface PropertyViewDialogProps {
  open: boolean;
  property: Property | null;
  onClose: () => void;
  onEdit: (property: Property) => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
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

  const propertyPrice = property.price || property.budget;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Property Details</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
          <StatusChip variant={property.active ? "active" : "inactive"} />
          <Chip label={property.purpose} color="primary" size="small" variant="outlined" />
          <Chip label={property.status || "Active"} size="small" />
        </Box>

        <Grid container spacing={2}>
          <Grid size={12}>
             <Typography variant="subtitle2" color="primary">Basic Details</Typography>
          </Grid>
          <Grid size={6}>
            <DetailRow label="Property Type" value={property.propertyType} />
          </Grid>
          {property.bhk && (
            <Grid size={6}>
              <DetailRow label="BHK" value={`${property.bhk} BHK`} />
            </Grid>
          )}
          <Grid size={6}>
            <DetailRow 
              label="Price / Expected" 
              value={`${formatCurrency(propertyPrice)} ${property.negotiable ? "(Negotiable)" : ""}`} 
            />
          </Grid>
          <Grid size={6}>
            <DetailRow 
              label="Availability" 
              value={property.availability === "Available From Date" ? `From ${formatDate(property.availableFrom || "")}` : property.availability} 
            />
          </Grid>

          <Grid size={12}>
             <Divider sx={{ my: 1 }} />
             <Typography variant="subtitle2" color="primary">Location</Typography>
          </Grid>
          <Grid size={6}>
            <DetailRow label="City" value={property.city} />
          </Grid>
          <Grid size={6}>
            <DetailRow label="Locality" value={property.locality} />
          </Grid>
          {property.fullAddress && (
            <Grid size={12}>
              <DetailRow label="Full Address" value={property.fullAddress} />
            </Grid>
          )}
          <Grid size={6}>
            <DetailRow label="Landmark" value={property.landmark} />
          </Grid>
          
          {Object.keys(property.details || {}).length > 0 && (
            <>
              <Grid size={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" color="primary">Property Specific Details</Typography>
              </Grid>
              {Object.entries(property.details).map(([key, val]) => (
                <Grid size={6} key={key}>
                  <DetailRow 
                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                    value={String(val)} 
                  />
                </Grid>
              ))}
            </>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <>
              <Grid size={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" color="primary">Amenities & Features</Typography>
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {property.amenities.map(a => (
                    <Chip key={a} label={a} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </>
          )}

          {(property.ownerName || property.ownerPhone || property.internalNotes) && (
            <>
              <Grid size={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" color="error">Confidential Details</Typography>
              </Grid>
              <Grid size={6}>
                <DetailRow label="Owner Name" value={property.ownerName} />
              </Grid>
              <Grid size={6}>
                <DetailRow label="Owner Phone" value={property.ownerPhone} />
              </Grid>
              {property.alternatePhone && (
                <Grid size={6}>
                  <DetailRow label="Alternate Phone" value={property.alternatePhone} />
                </Grid>
              )}
              {property.internalNotes && (
                <Grid size={12}>
                  <DetailRow label="Internal Notes" value={property.internalNotes} />
                </Grid>
              )}
            </>
          )}
          
          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
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
      <DialogActions sx={{ px: 3, pb: 2, pt: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => onEdit(property)}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
