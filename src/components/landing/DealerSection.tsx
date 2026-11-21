"use client";

import React from "react";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Reveal } from "./animations";

export default function DealerSection() {
  const pillars = [
    {
      icon: <BusinessOutlinedIcon sx={{ fontSize: 24, color: "#10b981" }} />,
      title: "Isolated Dealer Workspace",
      desc: "Your property listings are strictly private to your account. Unlike public portals, your inventory is never surfaced to competing brokers or pooled into a shared marketplace.",
    },
    {
      icon: <WhatsAppIcon sx={{ fontSize: 24, color: "#25d366" }} />,
      title: "Your Verified WhatsApp Identity",
      desc: "All conversations take place through your connected WhatsApp Business profile. Buyers see your business name, logo, phone number, and official green checkmark.",
    },
    {
      icon: <GroupsOutlinedIcon sx={{ fontSize: 24, color: "#38bdf8" }} />,
      title: "Exclusive Lead Ownership",
      desc: "Every lead generated through your WhatsApp number belongs exclusively to you. PropFlow never distributes, resells, or auctions buyer enquiries to other parties.",
    },
    {
      icon: <LockOutlinedIcon sx={{ fontSize: 24, color: "#a855f7" }} />,
      title: "Private Conversation Data",
      desc: "Transcripts, client budgets, and negotiated terms remain within your authenticated workspace, giving you a private CRM asset that grows with your business.",
    },
  ];

  return (
    <Box component="section" id="why-propflow" className="pf-section">
      <Box className="pf-container">
        {/* Section Header */}
        <Reveal>
          <Box sx={{ maxWidth: 840, mx: "auto", textAlign: "center", mb: 7 }}>
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>INDEPENDENCE &amp; TRUST</span>
            </div>
            <h2 className="pf-heading-lg">
              Your business stays yours.
            </h2>
            <p
              className="pf-body-lead"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              PropFlow is an operational infrastructure tool built for dealers,
              not a consumer property marketplace competing with you for buyer
              relationships.
            </p>
          </Box>
        </Reveal>

        {/* 4 Pillars Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
            mb: 5,
          }}
        >
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.title} delayMs={idx * 90}>
              <Box
                className="pf-card"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: { xs: 3, md: 3.8 },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                  }}
                >
                  {pillar.icon}
                </Box>

                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#f8fafc",
                    marginBottom: "10px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "#94a3b8",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Workspace Independence Visual Diagram */}
        <Reveal delayMs={250}>
          <Box
            sx={{
              background: "var(--pf-bg-surface)",
              borderRadius: "16px",
              border: "1px solid var(--pf-border-subtle)",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Box sx={{ maxWidth: 650 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <ShieldOutlinedIcon sx={{ fontSize: 20, color: "#10b981" }} />
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#10b981",
                    textTransform: "uppercase",
                  }}
                >
                  Zero Marketplace Sharing Policy
                </span>
              </Box>
              <h4
                style={{
                  fontSize: "1.18rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "8px",
                }}
              >
                We empower real estate professionals, not replace them.
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Your clients talk to your business. Your listings close under your
                terms. PropFlow works silently behind your WhatsApp, giving you
                an unfair operational advantage.
              </p>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
                flexShrink: 0,
              }}
            >
              {[
                "100% Dedicated Dealer Tenancy",
                "Official Meta Cloud API Partner Tech",
                "Non-Exclusive Inventory Exclusivity",
              ].map((badge) => (
                <Box
                  key={badge}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 16, color: "#34d399" }} />
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: "#e2e8f0",
                      fontWeight: 500,
                    }}
                  >
                    {badge}
                  </span>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
