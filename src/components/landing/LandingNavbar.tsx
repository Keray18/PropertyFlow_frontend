"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "The AI Advantage", href: "#ai-advantage" },
    { label: "Why PropFlow", href: "#why-propflow" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        height: "var(--pf-nav-height)",
        display: "flex",
        alignItems: "center",
        transition: "all 0.25s ease-in-out",
        backgroundColor: scrolled ? "rgba(6, 10, 16, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid transparent",
        px: { xs: 2.5, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1240px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(16, 185, 129, 0.35)",
              color: "#ffffff",
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span
                style={{
                  fontSize: "1.28rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#f8fafc",
                }}
              >
                Prop<span style={{ color: "#34d399" }}>Flow</span>
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#10b981",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              >
                AI Sales
              </span>
            </Box>
          </Box>
        </Link>

        {/* Desktop Nav Links */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3.5,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: "#94a3b8",
                fontSize: "0.92rem",
                fontWeight: 500,
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

        {/* Right CTA Actions */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link
            href="/login"
            style={{
              color: "#e2e8f0",
              fontSize: "0.92rem",
              fontWeight: 500,
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.18s ease",
            }}
          >
            Log In
          </Link>
          <Link
            href="/login"
            className="pf-btn-primary"
            style={{ padding: "9px 20px", fontSize: "0.88rem" }}
          >
            <span>Get Started</span>
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Box>

        {/* Mobile Hamburger Toggle */}
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#e2e8f0",
          }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Slide-in Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "280px",
              backgroundColor: "#080e18",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <WhatsAppIcon sx={{ fontSize: 18 }} />
                </Box>
                <span
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  Prop<span style={{ color: "#34d399" }}>Flow</span>
                </span>
              </Box>
              <IconButton
                onClick={() => setMobileOpen(false)}
                sx={{ color: "#94a3b8" }}
                aria-label="Close Navigation Menu"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              component="nav"
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "#e2e8f0",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "6px 0",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 4 }}>
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              fullWidth
              sx={{
                color: "#e2e8f0",
                borderColor: "rgba(255, 255, 255, 0.15)",
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                },
              }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                boxShadow: "0 4px 16px rgba(16, 185, 129, 0.35)",
              }}
            >
              Get Started
            </Button>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
