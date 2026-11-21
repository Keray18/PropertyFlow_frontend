"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Reveal } from "./animations";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      badge: "Meta Onboarding",
      title: "Connect Your WhatsApp Business",
      subtitle: "Official Meta Cloud API integration directly on your number",
      desc: "Connect your official WhatsApp Business account through Meta's supported onboarding flow. Retain your phone number, brand name, profile information, and customer familiarity.",
      highlights: [
        "Retains your verified WhatsApp identity",
        "Official Meta Cloud API connectivity",
        "Safe, authorized dealer-level onboarding",
      ],
      icon: <HubOutlinedIcon sx={{ fontSize: 26, color: "#10b981" }} />,
      codeSnippet: `// Dealer WhatsApp Meta Connection
Status: Connected
Phone ID: +91 98XXX XXXXX
Meta Webhook: Verified (200 OK)
Mode: Dual-Mode (AI + Direct)`,
    },
    {
      number: "02",
      badge: "Dealer Inventory",
      title: "Add & Maintain Your Inventory",
      subtitle: "Your private, isolated catalog of verified properties",
      desc: "Maintain the listings you represent. Input price points, locations, BHK configurations, carpet areas, amenities, and property images. Your listings remain strictly in your private workspace.",
      highlights: [
        "Private dealer catalog—never shared publicly",
        "High-res floor plans & image attachments",
        "Structured budget, BHK, & locality tags",
      ],
      icon: <AddHomeWorkOutlinedIcon sx={{ fontSize: 26, color: "#10b981" }} />,
      codeSnippet: `// Inventory Catalog Schema
Listing: Sector 75 Luxury 2 BHK
Carpet: 1,080 sq.ft
Price: ₹58,50,000 (Firm)
Status: Available | Ready to Move
Possession: Immediate`,
    },
    {
      number: "03",
      badge: "BuyerBot AI",
      title: "Let AI Handle the First Conversation",
      subtitle: "Instant 24/7 engagement with context-aware requirement collection",
      desc: "When a potential buyer messages, PropFlow's BuyerBot greets them immediately. It conversationally extracts budget, locality, and size preferences, then matches against your inventory.",
      highlights: [
        "Understands natural Indian real estate nuances",
        "Instant reply under 3 seconds",
        "Deterministic property matching engine",
      ],
      icon: <ForumOutlinedIcon sx={{ fontSize: 26, color: "#10b981" }} />,
      codeSnippet: `// BuyerBot Inference & Match
Extracted: { BHK: 2, Locality: "Sector 75", MaxBudget: 6000000 }
Authoritative Match: 2 units identified
Delivered: Rich WhatsApp property brochure`,
    },
    {
      number: "04",
      badge: "CRM Pipeline",
      title: "Focus on Serious Opportunities",
      subtitle: "Structured leads with full context ready for site visits",
      desc: "Receive pre-qualified leads with structured requirements and conversation transcripts. Step in when buyers request site visits or pricing negotiations, ready to close.",
      highlights: [
        "Pre-qualified buyer intent scoring",
        "Instant dealer alerts for site visits",
        "Clean pipeline management in dashboard",
      ],
      icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 26, color: "#10b981" }} />,
      codeSnippet: `// CRM Lead Card Generated
Buyer: +91 98765 43210 (Mr. Verma)
Lead Priority: HIGH (Hot Lead)
Intent: Requested site visit for Saturday 11 AM
Action: Dealer follow-up assigned`,
    },
  ];

  return (
    <Box component="section" id="how-it-works" className="pf-section">
      <Box className="pf-container">
        {/* Section Header */}
        <Reveal>
          <Box sx={{ maxWidth: 840, mx: "auto", textAlign: "center", mb: 7 }}>
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>THE 4-STAGE PIPELINE</span>
            </div>
            <h2 className="pf-heading-lg">
              From first message to serious opportunity.
            </h2>
            <p
              className="pf-body-lead"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              How PropFlow streamlines your sales operations into an automated,
              intelligent workflow without disrupting your existing phone number
              or client relationships.
            </p>
          </Box>
        </Reveal>

        {/* 4-Step Interactive Horizontal Journey */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2.5,
            mb: 4,
          }}
        >
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <Reveal key={step.number} delayMs={idx * 80}>
                <Box
                  onClick={() => setActiveStep(idx)}
                  className="pf-card"
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderColor: isSelected
                      ? "var(--pf-border-emerald)"
                      : "var(--pf-border-subtle)",
                    background: isSelected
                      ? "rgba(16, 185, 129, 0.07)"
                      : "var(--pf-bg-card)",
                    p: 3,
                    position: "relative",
                  }}
                >
                  {/* Step Number & Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: 800,
                        color: isSelected ? "#34d399" : "#475569",
                        letterSpacing: "-0.04em",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {step.number}
                    </span>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "10px",
                        background: isSelected
                          ? "rgba(16, 185, 129, 0.18)"
                          : "rgba(255, 255, 255, 0.04)",
                        border: isSelected
                          ? "1px solid rgba(16, 185, 129, 0.4)"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.icon}
                    </Box>
                  </Box>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: isSelected ? "#ffffff" : "#e2e8f0",
                      marginBottom: "6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 20,
                        right: 20,
                        height: 3,
                        borderRadius: "2px",
                        background: "linear-gradient(90deg, #10b981, #34d399)",
                      }}
                    />
                  )}
                </Box>
              </Reveal>
            );
          })}
        </Box>

        {/* Detailed Active Step Inspector Preview */}
        <Reveal delayMs={200}>
          <Box
            sx={{
              background: "var(--pf-bg-surface)",
              borderRadius: "16px",
              border: "1px solid var(--pf-border-emerald)",
              p: { xs: 3, md: 4.5 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
              gap: 4,
              alignItems: "center",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Left Description & Highlights */}
            <div>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#10b981",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Stage {steps[activeStep].number} • {steps[activeStep].badge}
                </span>
              </Box>

              <h4
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "14px",
                }}
              >
                {steps[activeStep].title}
              </h4>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#94a3b8",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                {steps[activeStep].desc}
              </p>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {steps[activeStep].highlights.map((highlight) => (
                  <Box
                    key={highlight}
                    sx={{ display: "flex", alignItems: "center", gap: 1.2 }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 18, color: "#10b981" }} />
                    <span
                      style={{
                        fontSize: "0.88rem",
                        color: "#e2e8f0",
                        fontWeight: 500,
                      }}
                    >
                      {highlight}
                    </span>
                  </Box>
                ))}
              </Box>
            </div>

            {/* Right System Log / Code Inspector Preview */}
            <Box
              sx={{
                background: "#080e18",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                p: 2.5,
                fontFamily: "monospace",
                fontSize: "0.82rem",
                color: "#38bdf8",
                lineHeight: 1.7,
                overflowX: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1.5,
                  pb: 1,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                  SYSTEM LOG • STEP {steps[activeStep].number}
                </span>
                <span
                  style={{
                    color: "#25d366",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  VERIFIED
                </span>
              </Box>
              <pre
                style={{
                  margin: 0,
                  color: "#e2e8f0",
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                }}
              >
                {steps[activeStep].codeSnippet}
              </pre>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
