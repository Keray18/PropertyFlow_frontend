"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        background: "#04070b",
        pt: 8,
        pb: 6,
        px: { xs: 2.5, md: 4 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box className="pf-container">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1.5fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            mb: 6,
          }}
        >
          {/* Brand Column */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 20 }} />
              </Box>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#f8fafc",
                }}
              >
                Prop<span style={{ color: "#34d399" }}>Flow</span>
              </span>
            </Box>

            <p
              style={{
                fontSize: "0.88rem",
                color: "#94a3b8",
                lineHeight: 1.6,
                maxWidth: 360,
                margin: "0 0 16px 0",
              }}
            >
              The AI-powered WhatsApp sales assistant engineered for real-estate
              dealers and property consultants.
            </p>

            <span
              style={{
                fontSize: "0.78rem",
                color: "#64748b",
                display: "block",
              }}
            >
              Your WhatsApp • Your Properties • Your AI Sales Team
            </span>
          </Box>

          {/* Navigation Column */}
          <Box>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h4>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { label: "Platform Overview", href: "#platform" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "The AI Advantage", href: "#ai-advantage" },
                { label: "Why PropFlow", href: "#why-propflow" },
                { label: "Frequently Asked Questions", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.18s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  {link.label}
                </a>
              ))}
            </Box>
          </Box>

          {/* Portal & Legal Column */}
          <Box>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Dealer Access &amp; Legal
            </h4>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="/login"
                style={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Dealer Log In
              </Link>
              <Link
                href="/login"
                style={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Register Account
              </Link>
              <Link
                href="/privacy"
                style={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Privacy Policy
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Bottom copyright line */}
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
            © {currentYear} PropFlow. All rights reserved. Built for professional
            real-estate dealers.
          </span>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
            Meta WhatsApp Cloud API Integration
          </span>
        </Box>
      </Box>
    </Box>
  );
}
