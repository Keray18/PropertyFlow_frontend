"use client";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import type { Property, PropertyFormData } from "@/lib/types";
import { BHK_OPTIONS, PROPERTY_TYPES } from "@/lib/utils/constants";

const emptyForm: PropertyFormData = {
  propertyType: "",
  bhk: "",
  budget: "",
  city: "",
  locality: "",
  description: "",
};

interface PropertyFormDialogProps {
  open: boolean;
  property?: Property | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => Promise<void>;
}

export default function PropertyFormDialog({
  open,
  property,
  loading = false,
  onClose,
  onSubmit,
}: PropertyFormDialogProps) {
  const [form, setForm] = useState<PropertyFormData>(emptyForm);
  const isEdit = Boolean(property);

  useEffect(() => {
    if (property) {
      setForm({
        propertyType: property.propertyType,
        bhk: property.bhk,
        budget: property.budget,
        city: property.city,
        locality: property.locality,
        description: property.description,
      });
    } else {
      setForm(emptyForm);
    }
  }, [property, open]);

  const handleChange = (field: keyof PropertyFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(form);
  };

  const isValid =
    form.propertyType &&
    form.bhk &&
    form.budget !== "" &&
    Number(form.budget) > 0 &&
    form.city.trim().length >= 2 &&
    form.locality.trim().length >= 2;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Property" : "Add Property"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Property Type"
              value={form.propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
            >
              {PROPERTY_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="BHK"
              value={form.bhk}
              onChange={(e) => handleChange("bhk", e.target.value)}
            >
              {BHK_OPTIONS.map((bhk) => (
                <MenuItem key={bhk} value={bhk}>
                  {bhk} BHK
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Budget (₹)"
              type="number"
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              helperText="Enter amount in rupees"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Locality"
              value={form.locality}
              onChange={(e) => handleChange("locality", e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description (optional)"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid || loading}
        >
          {isEdit ? "Save Changes" : "Add Property"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
