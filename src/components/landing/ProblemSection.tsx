"use client";

import React from "react";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Reveal } from "./animations";

export default function ProblemSection() {
  const problems = [
    {
      icon: <AccessTimeIcon sx={{ color: "#ef4444", fontSize: 24 }} />,
      time: "11:15 PM Inbound",
      title: "Delayed Replies Cost Serious Deals",
      pain: "High-intent buyers enquire late in the evening or during your site visits. An unanswered message means they reach out to the next broker in minutes.",
      solution: "Instant 24/7 engagement under 3 seconds ensures no buyer leaves without having their requirements acknowledged and logged.",
    },
    {
      icon: <FindInPageIcon sx={{ color: "#ef4444", fontSize: 24 }} />,
      time: "Inventory Scramble",
      title: "Searching Units on Your Phone is Slow",
      pain: "Remembering which developer launched which floor, carpet areas, and current prices across 40+ units leads to manual PDF digging while the buyer waits.",
      solution: "Authoritative deterministic matching evaluates your entire verified catalog immediately against budget and micro-locality constraints.",
    },
    {
      icon: <MarkChatUnreadIcon sx={{ color: "#ef4444", fontSize: 24 }} />,
      time: "Chat Overflow",
      title: "High-Intent Prospects Get Buried",
      pain: "Serious buyers with immediate budgets get lost beneath hundreds of casual greetings, vendor messages, and group chat notifications.",
      solution: "Automated qualification prioritizes hot leads, identifies site-visit readiness, and elevates serious buyers right to your dashboard.",
    },
    {
      icon: <TrendingDownIcon sx={{ color: "#ef4444", fontSize: 24 }} />,
      time: "Repetitive Cycles",
      title: "Endless Repetitive Questioning",
      pain: "Asking every single prospect 'What is your budget?', '2 BHK or 3 BHK?', and 'Ready or under construction?' burns hours of high-value broker time.",
      solution: "BuyerBot conversationally captures complete buyer parameters smoothly and hands you an actionable, pre-qualified profile.",
    },
  ];

  return (
    <Box component="section" id="problem" className="pf-section">
      <Box className="pf-container">
        {/* Editorial Section Header */}
        <Reveal>
          <Box sx={{ maxWidth: 840, mx: "auto", textAlign: "center", mb: 7 }}>
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>THE OPERATIONAL BOTTLENECK</span>
            </div>
            <h2 className="pf-heading-lg">
              Your next buyer won&apos;t always wait for your reply.
            </h2>
            <p
              className="pf-body-lead"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              Real estate moves at WhatsApp speed. When enquiries arrive while
              you&apos;re negotiating deals, managing site visits, or resting,
              every minute of delay costs your business opportunities.
            </p>
          </Box>
        </Reveal>

        {/* Narrative Comparison Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {problems.map((item, idx) => (
            <Reveal key={item.title} delayMs={idx * 100}>
              <Box
                className="pf-card"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: { xs: 3, md: 3.5 },
                }}
              >
                {/* Header with Time Badge & Icon */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "10px",
                      background: "rgba(239, 68, 68, 0.08)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      background: "rgba(255, 255, 255, 0.04)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.time}
                  </span>
                </Box>

                {/* Pain Point */}
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#f8fafc",
                    marginBottom: "10px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                  }}
                >
                  {item.pain}
                </p>

                {/* Solution Contrast */}
                <Box
                  sx={{
                    mt: "auto",
                    pt: 2,
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.2,
                  }}
                >
                  <CheckCircleOutlinedIcon
                    sx={{ fontSize: 18, color: "#10b981", mt: 0.3, flexShrink: 0 }}
                  />
                  <div>
                    <span
                      style={{
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        color: "#34d399",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      The PropFlow Difference
                    </span>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#cbd5e1",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.solution}
                    </p>
                  </div>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Narrative Summary Bar */}
        <Reveal delayMs={300}>
          <Box
            sx={{
              mt: 5,
              p: { xs: 3, md: 4 },
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 22, 36, 0.8) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Box sx={{ maxWidth: 720 }}>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                Stay responsive without personally managing every initial
                conversation.
              </h4>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#94a3b8",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                PropFlow handles the early conversational heavy lifting, filters
                out tire-kickers, and delivers verified buyer intent right into
                your hands when it is time to close.
              </p>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexShrink: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <SpeedIcon sx={{ fontSize: 18, color: "#10b981" }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#ffffff" }}>
                  &lt; 3s Response Time
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <ShieldOutlinedIcon sx={{ fontSize: 18, color: "#10b981" }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#ffffff" }}>
                  Zero Inventory Leakage
                </span>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
