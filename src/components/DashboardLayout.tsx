"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Alert from "@mui/material/Alert";
import Sidebar, { DRAWER_WIDTH } from "./Sidebar";
import Navbar from "./Navbar";
import { TitanProvider, useTitan } from "@/context/TitanContext";

function PortalShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { error } = useTitan();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minWidth: 0,
        }}
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <Toolbar sx={{ display: { md: "none" } }} />

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {error && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TitanProvider>
      <PortalShell>{children}</PortalShell>
    </TitanProvider>
  );
}
