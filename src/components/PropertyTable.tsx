"use client";

import { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import type { Property, PropertyFormData } from "@/lib/types";
import { createProperty, deleteProperty, updateProperty } from "@/lib/api/properties";
import { formatCurrency } from "@/lib/utils/format";
import { BHK_OPTIONS, PROPERTY_TYPES } from "@/lib/utils/constants";
import EmptyState from "./EmptyState";
import ConfirmationDialog from "./ConfirmationDialog";
import PropertyFormDialog from "./PropertyFormDialog";
import PropertyViewDialog from "./PropertyViewDialog";

interface PropertyTableProps {
  properties: Property[];
  titanId: string;
  onRefresh: () => Promise<void>;
}

export default function PropertyTable({
  properties,
  titanId,
  onRefresh,
}: PropertyTableProps) {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [bhkFilter, setBhkFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cities = useMemo(
    () => [...new Set(properties.map((p) => p.city))].sort(),
    [properties]
  );

  const filteredProperties = useMemo(() => {
    const query = search.toLowerCase().trim();

    return properties.filter((property) => {
      if (cityFilter && property.city !== cityFilter) return false;
      if (bhkFilter && property.bhk !== bhkFilter) return false;
      if (typeFilter && property.propertyType !== typeFilter) return false;

      if (budgetFilter === "under50") {
        if (property.budget >= 5000000) return false;
      } else if (budgetFilter === "50to1cr") {
        if (property.budget < 5000000 || property.budget >= 10000000) return false;
      } else if (budgetFilter === "above1cr") {
        if (property.budget < 10000000) return false;
      }

      if (!query) return true;

      const haystack = [
        property.propertyType,
        property.city,
        property.locality,
        property.bhk,
        formatCurrency(property.budget),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [properties, search, cityFilter, bhkFilter, typeFilter, budgetFilter]);

  const handleSave = async (data: PropertyFormData) => {
    try {
      setLoading(true);
      setError(null);

      if (editProperty) {
        await updateProperty(editProperty._id, data);
      } else {
        await createProperty(titanId, data);
      }

      await onRefresh();
      setFormOpen(false);
      setEditProperty(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save property.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setLoading(true);
      setError(null);
      await deleteProperty(deleteTarget._id);
      await onRefresh();
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete property.");
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef<Property>[] = useMemo(
    () => [
      {
        field: "propertyType",
        headerName: "Type",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "bhk",
        headerName: "BHK",
        width: 80,
        valueFormatter: (value: string) => `${value} BHK`,
      },
      {
        field: "budget",
        headerName: "Budget",
        flex: 1,
        minWidth: 110,
        valueFormatter: (value: number) => formatCurrency(value),
      },
      {
        field: "city",
        headerName: "City",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "locality",
        headerName: "Locality",
        flex: 1.2,
        minWidth: 130,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 220,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<Property>) => (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", height: "100%" }}>
            <Button
              size="small"
              onClick={() => setViewProperty(params.row)}
            >
              View
            </Button>
            <Button
              size="small"
              onClick={() => {
                setEditProperty(params.row);
                setFormOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => setDeleteTarget(params.row)}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const handleEditFromView = useCallback((property: Property) => {
    setViewProperty(null);
    setEditProperty(property);
    setFormOpen(true);
  }, []);

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          label="Search"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200, flex: 1 }}
        />
        <TextField
          select
          size="small"
          label="City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All Cities</MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="BHK"
          value={bhkFilter}
          onChange={(e) => setBhkFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All BHK</MenuItem>
          {BHK_OPTIONS.map((bhk) => (
            <MenuItem key={bhk} value={bhk}>
              {bhk} BHK
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Budget"
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Budgets</MenuItem>
          <MenuItem value="under50">Under ₹50 L</MenuItem>
          <MenuItem value="50to1cr">₹50 L – ₹1 Cr</MenuItem>
          <MenuItem value="above1cr">Above ₹1 Cr</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          label="Property Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {PROPERTY_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditProperty(null);
            setFormOpen(true);
          }}
          sx={{ ml: { md: "auto" } }}
        >
          Add Property
        </Button>
      </Box>

      {filteredProperties.length === 0 ? (
        <EmptyState
          title="No properties found"
          description={
            properties.length === 0
              ? "Add your first property to start sharing listings on WhatsApp."
              : "Try changing your search or filters."
          }
          action={
            properties.length === 0 ? (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setFormOpen(true)}
              >
                Add Property
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={filteredProperties}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "grey.50",
              },
            }}
          />
        </Paper>
      )}

      <PropertyFormDialog
        open={formOpen}
        property={editProperty}
        loading={loading}
        onClose={() => {
          setFormOpen(false);
          setEditProperty(null);
        }}
        onSubmit={handleSave}
      />

      <PropertyViewDialog
        open={Boolean(viewProperty)}
        property={viewProperty}
        onClose={() => setViewProperty(null)}
        onEdit={handleEditFromView}
      />

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        title="Delete Property"
        message={`Are you sure you want to delete this ${deleteTarget?.propertyType} in ${deleteTarget?.locality}? This cannot be undone.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
