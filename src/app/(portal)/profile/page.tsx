"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import LoadingScreen from "@/components/LoadingScreen";
import StatusChip from "@/components/StatusChip";
import WhatsAppConnectionCard from "@/components/WhatsAppConnectionCard";
import { getBillingStatus } from "@/lib/api/billing";
import { useTitan } from "@/context/TitanContext";
import { formatCurrency, formatDate, formatPhone, getDealerName } from "@/lib/utils/format";
import type { BillingInfo } from "@/lib/types";

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ py: 1.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function ProfilePage() {
  const { titan, loading: authLoading } = useTitan();
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBilling() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBillingStatus();
        setBilling(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load billing info.");
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && titan) {
      loadBilling();
    }
  }, [authLoading, titan]);

  if (authLoading || loading) {
    return <LoadingScreen message="Loading your profile..." />;
  }

  if (!titan) {
    return <Alert severity="error">{error || "Could not load your profile."}</Alert>;
  }

  const billingVariant = billing?.billingStatus || "pending";

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your business details and account status.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dealer Information
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <ProfileRow
                label="Name"
                value={getDealerName(titan.firstName, titan.lastName)}
              />
              <ProfileRow
                label="Business Name"
                value={titan.businessName || "Not set"}
              />
              <ProfileRow
                label="WhatsApp Number"
                value={formatPhone(titan.whatsappNumber)}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Status
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                  Account
                </Typography>
                <StatusChip variant={titan.active ? "active" : "inactive"} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <WhatsAppConnectionCard
            titanId={titan._id}
            registeredPhone={titan.whatsappNumber}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Billing
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {billing ? (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <ProfileRow label="Plan" value={billing.subscriptionPlan} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <ProfileRow
                      label="Monthly Fee"
                      value={formatCurrency(billing.monthlyFee)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ py: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        Billing Status
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <StatusChip variant={billingVariant} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <ProfileRow
                      label="Next Billing Date"
                      value={
                        billing.nextBillingDate
                          ? formatDate(billing.nextBillingDate)
                          : "Not set"
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <ProfileRow
                      label="Setup Fee"
                      value={billing.setupFeePaid ? "Paid" : "Pending"}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Billing information is not available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
