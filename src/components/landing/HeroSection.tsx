"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TuneIcon from "@mui/icons-material/Tune";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-advance through demo steps smoothly unless paused by user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const demoSteps = [
    {
      id: 0,
      title: "1. Buyer Inbound",
      desc: "Buyer texts your WhatsApp",
      icon: <PersonOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      id: 1,
      title: "2. Understanding Need",
      desc: "AI collects criteria",
      icon: <AutoAwesomeIcon sx={{ fontSize: 16 }} />,
    },
    {
      id: 2,
      title: "3. Inventory Match",
      desc: "Deterministic lookup",
      icon: <Inventory2OutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      id: 3,
      title: "4. Lead Captured",
      desc: "Actionable dealer alert",
      icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    },
  ];

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        pt: { xs: "120px", md: "150px" },
        pb: { xs: "70px", md: "110px" },
        px: { xs: 2.5, md: 4 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box className="pf-container">
        {/* Main Hero Typography & CTAs */}
        <Box sx={{ maxWidth: 880, mx: "auto", textAlign: "center" }}>
          {/* Eyebrow */}
          <div className="pf-eyebrow">
            <span className="pf-eyebrow-dot" />
            <span>THE NEXT ERA OF REAL ESTATE SALES</span>
          </div>

          {/* Primary Headline */}
          <h1 className="pf-heading-xl">
            Your WhatsApp.
            <br />
            Your Properties.
            <br />
            <span className="pf-gradient-emerald">Your AI Sales Team.</span>
          </h1>

          {/* Supporting Text */}
          <p
            className="pf-body-lead"
            style={{ margin: "0 auto 36px auto", textAlign: "center" }}
          >
            PropFlow transforms your WhatsApp into an AI-powered property sales
            assistant—engaging buyers, understanding their requirements,
            matching your inventory, and helping you identify serious
            opportunities.
          </p>

          {/* Action CTAs */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1.5, sm: 2.5 },
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Link
              href="/login"
              className="pf-btn-primary"
              style={{ padding: "14px 32px", fontSize: "1rem" }}
            >
              <span>Get Started</span>
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Link>

            <a
              href="#platform"
              className="pf-btn-secondary"
              style={{ padding: "14px 28px", fontSize: "1rem" }}
            >
              <span>Explore the Platform</span>
              <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
            </a>
          </Box>

          {/* Reassurance text */}
          <p
            style={{
              fontSize: "0.85rem",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            Built for real-estate professionals who want to work smarter and move
            faster.
          </p>
        </Box>

        {/* Interactive Live Product Demonstration */}
        <Box
          className="pf-hero-showcase"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left: WhatsApp Buyer Engagement Simulation */}
          <Box className="pf-wa-window">
            {/* Header */}
            <Box className="pf-wa-header">
              <Box className="pf-wa-avatar">AR</Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#e9edef",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Apex Realty
                  </span>
                  <VerifiedIcon sx={{ fontSize: 15, color: "#10b981" }} />
                </Box>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#25d366",
                    display: "block",
                  }}
                >
                  PropFlow Assistant • Online
                </span>
              </Box>
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "#94a3b8",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                Verified Business
              </span>
            </Box>

            {/* Conversation Flow */}
            <Box className="pf-wa-chatbody">
              {/* Message 1: Buyer Inbound */}
              <Box className="pf-wa-msg pf-wa-msg-buyer">
                <p>Looking for a 2 BHK in Noida around ₹60 lakh.</p>
                <div className="pf-wa-time">
                  <span>10:42 PM</span>
                </div>
              </Box>

              {/* Message 2: PropFlow Bot Clarification */}
              {activeStep >= 1 && (
                <Box className="pf-wa-msg pf-wa-msg-bot pf-animate-fade-in">
                  <p>
                    Hello! Glad to assist on behalf of Apex Realty. Got it. Do
                    you have a preferred sector or locality?
                  </p>
                  <div className="pf-wa-time">
                    <span>10:42 PM</span>
                    <DoneAllIcon sx={{ fontSize: 13, color: "#53bdeb" }} />
                  </div>
                </Box>
              )}

              {/* Message 3: Buyer Locality Response */}
              {activeStep >= 1 && (
                <Box className="pf-wa-msg pf-wa-msg-buyer pf-animate-fade-in">
                  <p>Sector 75 or nearby, preferably ready to move.</p>
                  <div className="pf-wa-time">
                    <span>10:43 PM</span>
                  </div>
                </Box>
              )}

              {/* Message 4: Bot Inventory Match */}
              {activeStep >= 2 && (
                <Box className="pf-wa-msg pf-wa-msg-bot pf-animate-fade-in">
                  <p>
                    I&apos;ll check the available properties matching your
                    preferences in our verified inventory.
                  </p>
                  <div className="pf-wa-time">
                    <span>10:43 PM</span>
                    <DoneAllIcon sx={{ fontSize: 13, color: "#53bdeb" }} />
                  </div>
                </Box>
              )}

              {/* Property Card Recommendation in WhatsApp */}
              {activeStep >= 2 && (
                <Box
                  className="pf-wa-property-card pf-animate-fade-in"
                  sx={{ alignSelf: "flex-end", maxWidth: "90%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#34d399",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Exact Match • Sector 75
                      </span>
                      <h4
                        style={{
                          fontSize: "0.92rem",
                          color: "#ffffff",
                          fontWeight: 700,
                          margin: "2px 0 0 0",
                        }}
                      >
                        Apex Elegance 2 BHK
                      </h4>
                    </div>
                    <span
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 800,
                        color: "#ffffff",
                      }}
                    >
                      ₹58.5 L
                    </span>
                  </Box>

                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "#94a3b8",
                      margin: "0 0 8px 0",
                    }}
                  >
                    1,080 sq.ft • Ready to move • 14th Floor • Reserved Car
                    Parking • Club Access
                  </p>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 1,
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <span style={{ fontSize: "0.72rem", color: "#25d366" }}>
                      ✓ Verified in Dealer Inventory
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#38bdf8",
                        fontWeight: 600,
                      }}
                    >
                      Schedule Site Visit →
                    </span>
                  </Box>
                </Box>
              )}

              {activeStep >= 3 && (
                <Box className="pf-wa-msg pf-wa-msg-bot pf-animate-fade-in">
                  <p>
                    I have notified Mr. Sharma from Apex Realty regarding your
                    preferred site visit time. He will follow up directly!
                  </p>
                  <div className="pf-wa-time">
                    <span>10:44 PM</span>
                    <DoneAllIcon sx={{ fontSize: 13, color: "#53bdeb" }} />
                  </div>
                </Box>
              )}
            </Box>
          </Box>

          {/* Right: PropFlow Dealer Cockpit & Matching Engine */}
          <Box className="pf-engine-window">
            {/* Window Header */}
            <Box className="pf-engine-header">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#f8fafc",
                    letterSpacing: "-0.01em",
                  }}
                >
                  PropFlow Matching Engine
                </span>
              </Box>
              <div className="pf-badge-live">
                <span>Deterministic Mode</span>
              </div>
            </Box>

            {/* Pipeline Step Navigation Tabs */}
            <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 1,
                  mb: 2.5,
                }}
              >
                {demoSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      setIsAutoPlaying(false);
                    }}
                    style={{
                      background:
                        activeStep === step.id
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(255, 255, 255, 0.03)",
                      border:
                        activeStep === step.id
                          ? "1px solid rgba(16, 185, 129, 0.4)"
                          : "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "8px",
                      padding: "8px 6px",
                      color: activeStep === step.id ? "#34d399" : "#94a3b8",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {step.icon}
                    <span style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                      Step {step.id + 1}
                    </span>
                  </button>
                ))}
              </Box>

              {/* Dynamic Step Content Details */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {/* 1. Inbound Card */}
                <Box
                  className={`pf-pipeline-step ${activeStep >= 0 ? "active" : ""}`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.76rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Inbound Enquiry Captured
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      WhatsApp Business
                    </span>
                  </Box>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#f8fafc",
                      margin: 0,
                    }}
                  >
                    +91 98765 43210 • New Buyer Enquiry
                  </p>
                </Box>

                {/* 2. Structured Parameters Extracted */}
                <Box
                  className={`pf-pipeline-step ${activeStep >= 1 ? "active" : ""}`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.76rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Buyer Requirements Extracted
                    </span>
                    <TuneIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        color: "#e2e8f0",
                      }}
                    >
                      📍 Sector 75, Noida
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        color: "#e2e8f0",
                      }}
                    >
                      🛏️ 2 BHK
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        color: "#e2e8f0",
                      }}
                    >
                      💰 Budget: ≤ ₹60 Lakh
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        color: "#e2e8f0",
                      }}
                    >
                      🔑 Ready to Move
                    </span>
                  </Box>
                </Box>

                {/* 3. Deterministic Inventory Match */}
                <Box
                  className={`pf-pipeline-step ${activeStep >= 2 ? "active" : ""}`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.76rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Authoritative Inventory Matching
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#34d399",
                        fontWeight: 700,
                      }}
                    >
                      2 Matches Found
                    </span>
                  </Box>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Queried 48 active units in Apex Realty&apos;s inventory. 0
                    hallucinations.
                  </p>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "6px",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      Unit #B-1402 • Apex Elegance
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#34d399",
                        fontWeight: 700,
                      }}
                    >
                      96% Match Score
                    </span>
                  </Box>
                </Box>

                {/* 4. CRM Lead Stage */}
                <Box
                  className={`pf-pipeline-step ${activeStep >= 3 ? "active" : ""}`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.76rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Dealer Lead Pipeline Updated
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#f59e0b",
                        background: "rgba(245, 158, 11, 0.12)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: 700,
                      }}
                    >
                      HOT LEAD
                    </span>
                  </Box>
                  <p
                    style={{
                      fontSize: "0.84rem",
                      color: "#e2e8f0",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Lead generated • Ready for Dealer Site Visit Follow-up
                  </p>
                </Box>
              </Box>

              {/* Sample Data Disclaimer Note */}
              <Box
                sx={{
                  pt: 1.5,
                  mt: "auto",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "#64748b",
                    letterSpacing: "0.02em",
                  }}
                >
                  * Illustrative product simulation with sample dealer data
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "#94a3b8",
                    fontWeight: 500,
                  }}
                >
                  Meta Cloud API Ready
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
