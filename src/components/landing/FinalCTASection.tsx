"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Reveal } from "./animations";

export default function FinalCTASection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, md: 4 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box className="pf-container-narrow">
        <Reveal>
          <Box
            sx={{
              position: "relative",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 22, 36, 0.95) 50%, rgba(6, 10, 16, 0.98) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              p: { xs: 4, sm: 6, md: 8 },
              textAlign: "center",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
              overflow: "hidden",
            }}
          >
            {/* Ambient emerald background glow */}
            <Box
              sx={{
                position: "absolute",
                top: "-40%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "500px",
                height: "350px",
                background:
                  "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>START YOUR AI SALES OPERATION</span>
            </div>

            <h2
              className="pf-heading-lg"
              style={{
                maxWidth: "680px",
                margin: "0 auto 20px auto",
              }}
            >
              The future of your real-estate business starts with one connection.
            </h2>

            <p
              className="pf-body-lead"
              style={{
                margin: "0 auto 36px auto",
                textAlign: "center",
                maxWidth: "580px",
              }}
            >
              Bring your properties, enquiries, and buyer conversations into one
              intelligent workflow.
            </p>

            {/* CTAs */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              <Link
                href="/login"
                className="pf-btn-primary"
                style={{ padding: "14px 34px", fontSize: "1rem" }}
              >
                <span>Get Started</span>
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Link>

              <Link
                href="/login"
                className="pf-btn-secondary"
                style={{ padding: "14px 30px", fontSize: "1rem" }}
              >
                <span>Log In</span>
              </Link>
            </Box>

            {/* Trust Assurances */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2, sm: 3 },
                flexWrap: "wrap",
                pt: 2,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#10b981" }} />
                <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                  Instant WhatsApp Setup
                </span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#10b981" }} />
                <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                  Official Meta Cloud API
                </span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#10b981" }} />
                <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                  100% Private Dealer Inventory
                </span>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
