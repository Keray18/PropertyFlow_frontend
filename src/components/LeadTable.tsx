"use client";

import { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import type { Lead, LeadFilter } from "@/lib/types";
import { updateLeadStatus } from "@/lib/api/leads";
import { formatCurrency, formatPhone } from "@/lib/utils/format";
import EmptyState from "./EmptyState";
import StatusChip from "./StatusChip";
import LeadViewDialog from "./LeadViewDialog";

interface LeadTableProps {
  leads: Lead[];
  onRefresh: () => Promise<void>;
}

const FILTER_OPTIONS: { value: LeadFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cold", label: "Cold" },
  { value: "warm", label: "Warm" },
  { value: "hot", label: "Hot" },
  { value: "interested", label: "Interested" },
  { value: "siteVisit", label: "Site Visit" },
];

function matchesFilter(lead: Lead, filter: LeadFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "cold":
      return lead.leadTemperature === "cold";
    case "warm":
      return lead.leadTemperature === "warm";
    case "hot":
      return lead.leadTemperature === "hot";
    case "interested":
      return lead.handoff;
    case "siteVisit":
      return lead.siteVisitRequested;
    default:
      return true;
  }
}

export default function LeadTable({ leads, onRefresh }: LeadTableProps) {
  const [filter, setFilter] = useState<LeadFilter>("all");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (!matchesFilter(lead, filter)) return false;
      if (statusFilter && lead.status !== statusFilter) return false;
      return true;
    });
  }, [leads, filter, statusFilter]);

  const updateStatus = useCallback(
    async (lead: Lead, status: Lead["status"]) => {
      try {
        setLoading(true);
        setError(null);
        await updateLeadStatus(lead._id, status);
        await onRefresh();
        setViewLead((current) =>
          current?._id === lead._id ? { ...current, status } : current
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update lead.");
      } finally {
        setLoading(false);
      }
    },
    [onRefresh]
  );

  const columns: GridColDef<Lead>[] = useMemo(
    () => [
      {
        field: "buyerName",
        headerName: "Buyer",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "buyerPhone",
        headerName: "Phone",
        flex: 1,
        minWidth: 140,
        valueFormatter: (value: string) => formatPhone(value),
      },
      {
        field: "leadTemperature",
        headerName: "Interest",
        width: 100,
        renderCell: (params: GridRenderCellParams<Lead>) => (
          <StatusChip variant={params.row.leadTemperature} />
        ),
      },
      {
        field: "propertyType",
        headerName: "Type",
        width: 120,
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
        width: 110,
        valueFormatter: (value: number) => formatCurrency(value),
      },
      {
        field: "city",
        headerName: "City",
        width: 100,
      },
      {
        field: "status",
        headerName: "Status",
        width: 110,
        renderCell: (params: GridRenderCellParams<Lead>) => (
          <StatusChip variant={params.row.status} />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 260,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<Lead>) => {
          const lead = params.row;
          return (
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", height: "100%" }}>
              <Button size="small" onClick={() => setViewLead(lead)}>
                View
              </Button>
              {lead.status !== "contacted" && lead.status !== "closed" && (
                <Button
                  size="small"
                  onClick={() => updateStatus(lead, "contacted")}
                  disabled={loading}
                >
                  Mark Contacted
                </Button>
              )}
              {lead.status !== "closed" && (
                <Button
                  size="small"
                  color="success"
                  onClick={() => updateStatus(lead, "closed")}
                  disabled={loading}
                >
                  Mark Closed
                </Button>
              )}
            </Box>
          );
        },
      },
    ],
    [loading, updateStatus]
  );

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
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, value) => value && setFilter(value)}
          size="small"
          sx={{ flexWrap: "wrap" }}
        >
          {FILTER_OPTIONS.map((option) => (
            <ToggleButton key={option.value} value={option.value}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 140, ml: { md: "auto" } }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="contacted">Contacted</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
          <MenuItem value="lost">Lost</MenuItem>
        </TextField>
      </Box>

      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads found"
          description={
            leads.length === 0
              ? "Buyers from WhatsApp will appear here when they show interest."
              : "Try changing your filters."
          }
        />
      ) : (
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={filteredLeads}
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

      <LeadViewDialog
        open={Boolean(viewLead)}
        lead={viewLead}
        loading={loading}
        onClose={() => setViewLead(null)}
        onMarkContacted={(lead) => updateStatus(lead, "contacted")}
        onMarkClosed={(lead) => updateStatus(lead, "closed")}
      />
    </Box>
  );
}
