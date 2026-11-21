"use client";

import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import StorageIcon from "@mui/icons-material/Storage";
import ShieldIcon from "@mui/icons-material/Shield";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Reveal } from "./animations";

export default function AIAdvantageSection() {
  const comparisonRows = [
    {
      aspect: "Understanding Complex Queries",
      basic: "Fails on natural phrasing. Requires strict keywords like 'TYPE 1 FOR 2BHK'.",
      propflow: "Understands conversational nuances: 'looking for 2 bhk around 60-65L in sector 75 ready to move'.",
    },
    {
      aspect: "Inventory Matching Authority",
      basic: "Sends static PDF catalogs or generic links that buyers must scroll through themselves.",
      propflow: "Deterministic matching queries your active database for exact matches based on verified parameters.",
    },
    {
      aspect: "Guardrails & Hallucination Prevention",
      basic: "Generative LLM chatbots often invent fake addresses, prices, or amenities without verification.",
      propflow: "LLM handles conversation only. The authoritative backend matchingService controls all property data.",
    },
    {
      aspect: "Lead Prioritization & Context",
      basic: "Dumps raw chat notifications without structured data or qualification intent.",
      propflow: "Extracts budget, configuration, timeline, and urgency into structured CRM leads with visit alerts.",
    },
    {
      aspect: "Dealer Intervention & Control",
      basic: "All-or-nothing bots that lock you out or annoy buyers with robotic loops.",
      propflow: "Seamless dual-mode: monitor live conversations and jump in directly whenever you choose.",
    },
  ];

  return (
    <Box component="section" id="ai-advantage" className="pf-section">
      <Box className="pf-container">
        {/* Section Header */}
        <Reveal>
          <Box sx={{ maxWidth: 840, mx: "auto", textAlign: "center", mb: 7 }}>
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>INTELLIGENT CONVERSATION LAYER</span>
            </div>
            <h2 className="pf-heading-lg">
              Not just automated replies.
              <br />
              <span className="pf-gradient-emerald">
                Context-aware conversations.
              </span>
            </h2>
            <p
              className="pf-body-lead"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              Indian real estate sales require understanding colloquial budgets,
              micro-market locations, and buyer nuances. Generic chatbots
              frustrate buyers; PropFlow understands them.
            </p>
          </Box>
        </Reveal>

        {/* Technical Architecture Callout Card */}
        <Reveal delayMs={100}>
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(14, 22, 36, 0.9) 0%, rgba(10, 16, 26, 0.95) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "16px",
              p: { xs: 3, md: 4.5 },
              mb: 5,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 4,
                alignItems: "center",
              }}
            >
              {/* Architecture Explanation */}
              <div>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#34d399",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    mb: 1.5,
                  }}
                >
                  <ShieldIcon sx={{ fontSize: 18 }} />
                  <span>The Architectural Principle</span>
                </Box>
                <h3
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}
                >
                  The LLM is the conversational layer.
                  <br />
                  Your inventory remains authoritative.
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "#94a3b8",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  We never let an AI model fabricate property listings.
                  BuyerBot&apos;s role is strictly conversational: it engages the
                  buyer naturally, clarifies their intent, and passes extracted
                  criteria to PropFlow&apos;s deterministic matching engine.
                  Only real, active listings from your workspace are ever
                  recommended.
                </p>
              </div>

              {/* Two-Pillar Visual Diagram */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    p: 2.2,
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.8,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
                      background: "rgba(56, 189, 248, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#38bdf8",
                      flexShrink: 0,
                    }}
                  >
                    <PsychologyIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <div>
                    <h4
                      style={{
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Layer 1: Conversational Intelligence
                    </h4>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Understands natural language, budget tolerances, micro-market
                      localities, and buyer readiness.
                    </p>
                  </div>
                </Box>

                <Box
                  sx={{
                    p: 2.2,
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.8,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
                      background: "rgba(16, 185, 129, 0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#34d399",
                      flexShrink: 0,
                    }}
                  >
                    <StorageIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <div>
                    <h4
                      style={{
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Layer 2: Deterministic matchingService
                    </h4>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Strict database queries filter solely through your verified
                      inventory with zero hallucination.
                    </p>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Reveal>

        {/* Side-by-Side Comparison Table */}
        <Reveal delayMs={200}>
          <Box
            sx={{
              background: "var(--pf-bg-surface)",
              border: "1px solid var(--pf-border-subtle)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.2fr 1.4fr 1.4fr" },
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)",
                p: { xs: 2, md: 3 },
                fontWeight: 700,
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" }, color: "#94a3b8", fontSize: "0.85rem" }}>
                CAPABILITY
              </Box>
              <Box sx={{ color: "#ef4444", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 1 }}>
                <CloseIcon sx={{ fontSize: 16 }} />
                <span>Basic Auto-Reply / Dumb Bot</span>
              </Box>
              <Box sx={{ color: "#34d399", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 1, mt: { xs: 1, md: 0 } }}>
                <CheckIcon sx={{ fontSize: 16 }} />
                <span>PropFlow AI Sales Assistant</span>
              </Box>
            </Box>

            {/* Rows */}
            {comparisonRows.map((row, idx) => (
              <Box
                key={row.aspect}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.2fr 1.4fr 1.4fr" },
                  p: { xs: 2.5, md: 3 },
                  borderBottom:
                    idx < comparisonRows.length - 1
                      ? "1px solid rgba(255, 255, 255, 0.04)"
                      : "none",
                  gap: { xs: 1.5, md: 2 },
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.015)",
                  },
                }}
              >
                <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.92rem" }}>
                  {row.aspect}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.86rem", lineHeight: 1.55 }}>
                  <span style={{ display: "inline-block", color: "#f87171", marginRight: "6px" }}>✕</span>
                  {row.basic}
                </div>
                <div style={{ color: "#e2e8f0", fontSize: "0.86rem", lineHeight: 1.55 }}>
                  <span style={{ display: "inline-block", color: "#34d399", marginRight: "6px" }}>✓</span>
                  {row.propflow}
                </div>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
