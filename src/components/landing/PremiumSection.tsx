"use client";

import React from "react";
import Box from "@mui/material/Box";
import BoltIcon from "@mui/icons-material/Bolt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Reveal } from "./animations";

export default function PremiumSection() {
  const metrics = [
    {
      icon: <BoltIcon sx={{ fontSize: 26, color: "#10b981" }} />,
      value: "< 3s",
      label: "First Response Latency",
      detail: "Immediate acknowledgment of inbound buyer queries at any hour",
    },
    {
      icon: <QueryStatsIcon sx={{ fontSize: 26, color: "#38bdf8" }} />,
      value: "100%",
      label: "Inventory Authority",
      detail: "Deterministic matching constrained strictly to your verified listings",
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 26, color: "#a855f7" }} />,
      value: "Zero",
      label: "Lead Marketplace Leakage",
      detail: "Complete exclusivity: buyer relationships belong entirely to you",
    },
  ];

  return (
    <Box component="section" className="pf-section">
      <Box className="pf-container">
        <Reveal>
          <Box
            sx={{
              position: "relative",
              borderRadius: "20px",
              background:
                "linear-gradient(180deg, rgba(14, 22, 36, 0.95) 0%, rgba(8, 14, 24, 0.98) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.09)",
              p: { xs: 4, md: 7 },
              textAlign: "center",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            }}
          >
            {/* Subtle radial emerald highlight */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "600px",
                height: "250px",
                background:
                  "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>THE PROFESSIONAL STANDARD</span>
            </div>

            <h2 className="pf-heading-lg" style={{ marginBottom: "20px" }}>
              Built for the dealers shaping what&apos;s next.
            </h2>

            <p
              className="pf-body-lead"
              style={{
                margin: "0 auto 48px auto",
                maxWidth: 720,
                textAlign: "center",
              }}
            >
              &ldquo;Real estate rewards relationships, responsiveness, and
              timing. PropFlow gives ambitious professionals a smarter way to
              manage the conversations behind every opportunity.&rdquo;
            </p>

            {/* Performance Pillars */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
                pt: 4,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {metrics.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <span
                    style={{
                      fontSize: "2.2rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.03em",
                      marginBottom: "6px",
                    }}
                  >
                    {item.value}
                  </span>

                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#e2e8f0",
                      marginBottom: "8px",
                    }}
                  >
                    {item.label}
                  </span>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {item.detail}
                  </p>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
