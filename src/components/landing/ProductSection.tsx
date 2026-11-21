"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Reveal } from "./animations";

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState<"inventory" | "leads" | "chat" | "matcher">("inventory");

  const tabs = [
    {
      id: "inventory" as const,
      label: "Inventory Hub",
      icon: <GridViewOutlinedIcon sx={{ fontSize: 18 }} />,
      desc: "Manage your private property listings with complete pricing, location, and amenity parameters.",
    },
    {
      id: "leads" as const,
      label: "Lead Pipeline",
      icon: <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />,
      desc: "Track buyer intent, qualification scores, and site visit schedules in one clean pipeline.",
    },
    {
      id: "chat" as const,
      label: "WhatsApp Intelligence",
      icon: <ForumOutlinedIcon sx={{ fontSize: 18 }} />,
      desc: "Real-time visibility into buyer conversations with full requirement breakdown.",
    },
    {
      id: "matcher" as const,
      label: "Authoritative Matcher",
      icon: <FactCheckOutlinedIcon sx={{ fontSize: 18 }} />,
      desc: "Deterministic matching against your own inventory—zero hallucinated listings.",
    },
  ];

  return (
    <Box component="section" id="platform" className="pf-section">
      <Box className="pf-container">
        {/* Section Header */}
        <Reveal>
          <Box sx={{ maxWidth: 840, mx: "auto", textAlign: "center", mb: 6 }}>
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>DEALER WORKSPACE EXPERIENCE</span>
            </div>
            <h2 className="pf-heading-lg">
              One intelligent workspace. Your entire property operation.
            </h2>
            <p
              className="pf-body-lead"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              Designed specifically for the operational speed and inventory needs
              of independent dealers and boutique brokerage firms.
            </p>
          </Box>
        </Reveal>

        {/* Tab Switcher */}
        <Reveal delayMs={100}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              flexWrap: "wrap",
              mb: 4,
            }}
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: isSelected
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(255, 255, 255, 0.04)",
                    border: isSelected
                      ? "1px solid rgba(16, 185, 129, 0.4)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    color: isSelected ? "#34d399" : "#94a3b8",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </Box>
        </Reveal>

        {/* Interactive Workspace Mockup Canvas */}
        <Reveal delayMs={200}>
          <Box
            sx={{
              background: "var(--pf-bg-surface)",
              border: "1px solid var(--pf-border-subtle)",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              overflow: "hidden",
            }}
          >
            {/* Top Workspace Header Bar */}
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.02)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                px: 3,
                py: 1.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ display: "flex", gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ef4444" }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#f59e0b" }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#10b981" }} />
                </Box>
                <span style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 500 }}>
                  propflow.dealer.portal / workspace
                </span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#10b981",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  ● Active Dealer Session
                </span>
              </Box>
            </Box>

            {/* Mockup Workspace Body */}
            <Box sx={{ p: { xs: 2.5, md: 4 } }}>
              {/* TAB 1: INVENTORY HUB */}
              {activeTab === "inventory" && (
                <Box className="pf-animate-fade-in">
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                        Dealer Inventory Catalog
                      </h3>
                      <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0 }}>
                        38 Active Listings • 100% Private to your WhatsApp channel
                      </p>
                    </div>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#cbd5e1",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "6px 12px",
                          borderRadius: "6px",
                        }}
                      >
                        Filters: Noida • 2 & 3 BHK
                      </span>
                    </Box>
                  </Box>

                  {/* Listings Grid */}
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
                    {[
                      {
                        title: "Apex Elegance",
                        loc: "Sector 75, Noida",
                        bhk: "2 BHK • 1,080 sq.ft",
                        price: "₹58.5 Lakh",
                        status: "Available",
                        statusColor: "#10b981",
                        badge: "Verified Ready",
                      },
                      {
                        title: "Grand Omaxe Vista",
                        loc: "Sector 93B, Noida",
                        bhk: "3 BHK • 1,650 sq.ft",
                        price: "₹1.25 Crore",
                        status: "Under Offer",
                        statusColor: "#f59e0b",
                        badge: "High Demand",
                      },
                      {
                        title: "Prateek Edifice",
                        loc: "Sector 107, Noida",
                        bhk: "3 BHK + S • 2,050 sq.ft",
                        price: "₹1.95 Crore",
                        status: "Available",
                        statusColor: "#10b981",
                        badge: "Luxury Penthouse",
                      },
                    ].map((item) => (
                      <Box
                        key={item.title}
                        sx={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "10px",
                          p: 2.5,
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: item.statusColor,
                              textTransform: "uppercase",
                            }}
                          >
                            ● {item.status}
                          </span>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "#94a3b8",
                              background: "rgba(255, 255, 255, 0.05)",
                              padding: "2px 6px",
                              borderRadius: "4px",
                            }}
                          >
                            {item.badge}
                          </span>
                        </Box>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", margin: "4px 0" }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "0 0 8px 0" }}>
                          📍 {item.loc}
                        </p>
                        <div style={{ fontSize: "0.8rem", color: "#cbd5e1", marginBottom: "12px" }}>
                          {item.bhk}
                        </div>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pt: 1.5,
                            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                          }}
                        >
                          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#34d399" }}>
                            {item.price}
                          </span>
                          <span style={{ fontSize: "0.76rem", color: "#94a3b8" }}>
                            Ready to match
                          </span>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* TAB 2: LEAD PIPELINE */}
              {activeTab === "leads" && (
                <Box className="pf-animate-fade-in">
                  <Box sx={{ mb: 3 }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                      Intelligent Buyer Pipeline
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0 }}>
                      Automatic intent scoring and actionable site visit schedules
                    </p>
                  </Box>

                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
                    {[
                      {
                        name: "Rahul Verma",
                        phone: "+91 98765 43210",
                        budget: "₹55L - ₹62L",
                        bhk: "2 BHK Ready",
                        priority: "HOT LEAD",
                        priorityBg: "rgba(239, 68, 68, 0.15)",
                        priorityColor: "#ef4444",
                        stage: "Site Visit Requested for Saturday",
                        matched: "Apex Elegance #B-1402",
                      },
                      {
                        name: "Dr. Ananya Sen",
                        phone: "+91 98112 34567",
                        budget: "₹1.1Cr - ₹1.3Cr",
                        bhk: "3 BHK Luxury",
                        priority: "QUALIFIED",
                        priorityBg: "rgba(16, 185, 129, 0.15)",
                        priorityColor: "#10b981",
                        stage: "Property Brochure Delivered",
                        matched: "Grand Omaxe Vista #C-801",
                      },
                      {
                        name: "Vikram Malhotra",
                        phone: "+91 99201 88776",
                        budget: "₹1.8Cr - ₹2.0Cr",
                        bhk: "3 BHK + Study",
                        priority: "FOLLOW-UP",
                        priorityBg: "rgba(245, 158, 11, 0.15)",
                        priorityColor: "#f59e0b",
                        stage: "Awaiting Loan Pre-Approval",
                        matched: "Prateek Edifice #A-1904",
                      },
                    ].map((lead) => (
                      <Box
                        key={lead.name}
                        sx={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "10px",
                          p: 2.5,
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              background: lead.priorityBg,
                              color: lead.priorityColor,
                              padding: "3px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            {lead.priority}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                            WhatsApp Lead
                          </span>
                        </Box>
                        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>
                          {lead.name}
                        </h4>
                        <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "0 0 10px 0" }}>
                          {lead.phone}
                        </p>
                        <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                          <span style={{ fontSize: "0.75rem", background: "rgba(255, 255, 255, 0.05)", padding: "2px 6px", borderRadius: "4px", color: "#cbd5e1" }}>
                            💰 {lead.budget}
                          </span>
                          <span style={{ fontSize: "0.75rem", background: "rgba(255, 255, 255, 0.05)", padding: "2px 6px", borderRadius: "4px", color: "#cbd5e1" }}>
                            🛏️ {lead.bhk}
                          </span>
                        </Box>
                        <p style={{ fontSize: "0.8rem", color: "#38bdf8", margin: "0 0 6px 0", fontWeight: 500 }}>
                          ✓ {lead.stage}
                        </p>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                          Matched: <span style={{ color: "#ffffff" }}>{lead.matched}</span>
                        </div>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* TAB 3: WHATSAPP INTELLIGENCE */}
              {activeTab === "chat" && (
                <Box className="pf-animate-fade-in">
                  <Box sx={{ mb: 3 }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                      Live Conversation Intelligence
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0 }}>
                      Real-time transcripts with extracted criteria and dealer override controls
                    </p>
                  </Box>

                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: 3 }}>
                    <Box
                      sx={{
                        background: "#080e18",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "10px",
                        p: 2.5,
                      }}
                    >
                      <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, textTransform: "uppercase" }}>
                        Live WhatsApp Session • Dual Mode Active
                      </span>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
                        <Box sx={{ p: 1.5, borderRadius: "8px", background: "rgba(255, 255, 255, 0.03)" }}>
                          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Buyer:</span>
                          <p style={{ fontSize: "0.85rem", color: "#e2e8f0", margin: "2px 0 0 0" }}>
                            Hi, I saw your board in Sector 75. Do you have any 2 BHK available immediately?
                          </p>
                        </Box>
                        <Box sx={{ p: 1.5, borderRadius: "8px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                          <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: 600 }}>BuyerBot (PropFlow):</span>
                          <p style={{ fontSize: "0.85rem", color: "#ffffff", margin: "2px 0 0 0" }}>
                            Yes! We represent 2 verified ready-to-move 2 BHK apartments in Sector 75 with modular kitchens and car parking. What price bracket are you comfortable with?
                          </p>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "10px",
                        p: 2.5,
                      }}
                    >
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: "0 0 10px 0" }}>
                        Extracted Entity Card
                      </h4>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                          Target Locality: <strong style={{ color: "#ffffff" }}>Sector 75, Noida</strong>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                          Configuration: <strong style={{ color: "#ffffff" }}>2 BHK</strong>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                          Possession Timeline: <strong style={{ color: "#ffffff" }}>Immediate (Ready)</strong>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                          Dealer Intervention: <strong style={{ color: "#10b981" }}>Not Required Yet (AI Active)</strong>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* TAB 4: AUTHORITATIVE MATCHER */}
              {activeTab === "matcher" && (
                <Box className="pf-animate-fade-in">
                  <Box sx={{ mb: 3 }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                      Deterministic Matching Engine
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0 }}>
                      Guaranteed zero hallucination: only your database properties are queried and delivered
                    </p>
                  </Box>

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "10px",
                      background: "rgba(16, 185, 129, 0.06)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <ShieldOutlinedIcon sx={{ fontSize: 24, color: "#10b981" }} />
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                        Authoritative Inventory Boundary
                      </h4>
                    </Box>
                    <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                      Unlike general chatbots that make up nonexistent properties, PropFlow passes conversational requirements through your private `matchingService`. If a requirement cannot be fulfilled by your inventory, BuyerBot logs the request and notifies you without making false claims.
                    </p>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#34d399" }}>
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                        <span>Strict Price Range Boundary</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#34d399" }}>
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                        <span>Exact BHK & Locality Filtering</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#34d399" }}>
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                        <span>Exclusive Dealer Inventory Scope</span>
                      </div>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
