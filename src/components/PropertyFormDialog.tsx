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
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import type { Property, PropertyFormData } from "@/lib/types";
import { BHK_OPTIONS, PROPERTY_TYPES } from "@/lib/utils/constants";
import MediaUploadDropzone from "./MediaUploadDropzone";
const DRAFT_KEY = "property_form_draft";

const emptyForm: PropertyFormData = {
  propertyType: "",
  purpose: "Sale",
  bhk: "",
  price: "",
  negotiable: false,
  city: "",
  locality: "",
  description: "",
  availability: "Ready",
  availableFrom: "",
  images: [],
  videos: [],
  ownerName: "",
  ownerPhone: "",
  alternatePhone: "",
  internalNotes: "",
  status: "Available",
  details: {
    areaValue: "",
    areaUnit: "Sq Ft",
    lowestAcceptablePrice: "",
    commissionPercentage: ""
  },
};

interface PropertyFormDialogProps {
  open: boolean;
  property?: Property | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<PropertyFormData, "status"> & { status: string }) => Promise<void>;
}

const STEPS = ["Essential Info", "Media"];

export default function PropertyFormDialog({
  open,
  property,
  loading = false,
  onClose,
  onSubmit,
}: PropertyFormDialogProps) {
  const [form, setForm] = useState<PropertyFormData>(emptyForm);
  const [activeStep, setActiveStep] = useState(0);
  const isEdit = Boolean(property);

  useEffect(() => {
    if (open) {
      if (property) {
        // Edit mode mapping
        let uiStatus: PropertyFormData["status"] = "Available";
        if (property.status === "Sold" || property.status === "Rented") {
          uiStatus = property.status;
        } else if (property.status === "Expired" || property.status === "On Hold") {
          uiStatus = "Inactive";
        }

        setForm({
          propertyType: property.propertyType || "",
          purpose: property.purpose || "Sale",
          bhk: property.bhk || "",
          price: property.price ?? property.budget ?? "",
          negotiable: Boolean(property.negotiable),
          city: property.city || "",
          locality: property.locality || "",
          description: property.description || "",
          availability: property.availability || "Ready",
          availableFrom: property.availableFrom ? new Date(property.availableFrom).toISOString().split('T')[0] : "",
          images: property.images || [],
          videos: property.videos || [],
          ownerName: property.ownerName || "",
          ownerPhone: property.ownerPhone || "",
          alternatePhone: property.alternatePhone || "",
          internalNotes: property.internalNotes || "",
          status: uiStatus,
          details: property.details || { areaValue: "", areaUnit: "Sq Ft", lowestAcceptablePrice: "", commissionPercentage: "" },
        });
        setActiveStep(0);
      } else {
        // Add mode: try to load draft
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
          try {
            const parsed = JSON.parse(draft);
            setForm({ ...emptyForm, ...parsed }); // Merge with empty form for safety
          } catch {
            setForm(emptyForm);
          }
        } else {
          setForm(emptyForm);
        }
        setActiveStep(0);
      }
    }
  }, [property, open]);

  // Auto-save draft for Step 1
  useEffect(() => {
    if (!isEdit && open) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }
  }, [form, isEdit, open]);

  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  const handleChange = <K extends keyof PropertyFormData>(field: K, value: PropertyFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };



  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    // Map status back to backend enum
    let backendStatus = "Active";
    if (form.status === "Sold") backendStatus = "Sold";
    if (form.status === "Rented") backendStatus = "Rented";
    if (form.status === "Inactive") backendStatus = "Expired";

    const dataToSubmit = {
      ...form,
      status: backendStatus,
    };

    await onSubmit(dataToSubmit);
    if (!isEdit) {
      localStorage.removeItem(DRAFT_KEY); // clear draft on successful submit
    }
  };

  const requiresBhk = ["Apartment", "Flat", "Builder Floor", "Independent House", "Villa"].includes(form.propertyType);

  const isStep1Valid =
    form.propertyType &&
    (!requiresBhk || form.bhk) &&
    form.price !== "" &&
    Number(form.price) > 0 &&
    form.city.trim().length >= 2 &&
    form.locality.trim().length >= 2;

  const renderStep1 = () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          fullWidth
          label="Purpose"
          value={form.purpose}
          onChange={(e) => handleChange("purpose", e.target.value as PropertyFormData["purpose"])}
        >
          <MenuItem value="Sale">Sale</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
        </TextField>
      </Grid>
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

      {requiresBhk && (
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
      )}

      <Grid size={{ xs: 12, sm: requiresBhk ? 6 : 12 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            fullWidth
            label="Price / Expected Price (₹)"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value === "" ? "" : Number(e.target.value))}
          />
          <FormControlLabel
            control={
              <Switch 
                checked={form.negotiable} 
                onChange={(e) => handleChange("negotiable", e.target.checked)} 
              />
            }
            label="Negotiable"
            sx={{ whiteSpace: 'nowrap', m: 0 }}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="City"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Locality"
          value={form.locality}
          onChange={(e) => handleChange("locality", e.target.value)}
        />
      </Grid>


    </Grid>
  );

  const renderStep2 = () => (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Images and videos will communicate the remaining details (Bathrooms, Balcony, Kitchen, Flooring, etc.) to the buyers.
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          placeholder="Enter property details..."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Property Images</Typography>
        <MediaUploadDropzone
          type="image"
          mediaList={form.images}
          onChange={(newList) => handleChange("images", newList)}
          maxFiles={10}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Property Videos</Typography>
        <MediaUploadDropzone
          type="video"
          mediaList={form.videos}
          onChange={(newList) => handleChange("videos", newList)}
          maxFiles={2}
        />
      </Grid>
    </Grid>
  );



  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? "Edit Property" : "Add Property"}</DialogTitle>
      
      <Box sx={{ width: '100%', pt: 2, px: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <DialogContent dividers sx={{ minHeight: '300px' }}>
        {activeStep === 0 && renderStep1()}
        {activeStep === 1 && renderStep2()}

      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2, pt: 2, justifyContent: 'space-between' }}>
        <Button onClick={handleClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
          >
            Back
          </Button>
          
          {activeStep === STEPS.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !isStep1Valid}
            >
              {isEdit ? "Save Changes" : "Submit"}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === 0 && !isStep1Valid}
            >
              Next
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
