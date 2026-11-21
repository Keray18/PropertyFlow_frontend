"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Reveal } from "./animations";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is PropFlow?",
      a: "PropFlow is an AI-powered WhatsApp sales assistant built specifically for real-estate dealers and brokerages. It connects directly with your official WhatsApp Business number to engage prospective buyers, understand their requirements (budget, BHK, micro-locality), deterministically match your private inventory, and log qualified leads directly into your dashboard.",
    },
    {
      q: "Is PropFlow a property listing website or marketplace?",
      a: "No. PropFlow is NOT a property marketplace or consumer portal like 99acres or MagicBricks. There is no public property directory. Each dealer has a private, isolated workspace where they manage their own property catalog, WhatsApp conversations, and proprietary leads.",
    },
    {
      q: "Does PropFlow use my own WhatsApp Business account?",
      a: "Yes. PropFlow connects to your verified WhatsApp Business presence using Meta's official Cloud API infrastructure. All messages are sent and received through your own phone number, displaying your business name, avatar, and branding to buyers.",
    },
    {
      q: "Can PropFlow recommend properties from my inventory?",
      a: "Yes. That is the core capability. You upload your active property listings (including location, price, configuration, carpet area, and brochure attachments) to your dashboard. When a buyer mentions their requirements, PropFlow's matching engine queries your listings and recommends exact matches.",
    },
    {
      q: "Can PropFlow invent or recommend properties outside my inventory?",
      a: "No. PropFlow adheres to strict deterministic guardrails. The AI model handles conversation and natural language extraction only. The backend matchingService is authoritative and strictly constrained to your verified database listings. If you do not have a match, PropFlow informs the buyer and records their requirement for you to review.",
    },
    {
      q: "Can I manage my leads and take over conversations?",
      a: "Yes. PropFlow features a dual-mode system. You can view all incoming enquiries, review extracted requirement cards, and monitor live chat transcripts. You can step into any WhatsApp conversation directly from your phone or dashboard whenever a lead is ready for site visits or negotiation.",
    },
    {
      q: "Does PropFlow replace the real estate dealer?",
      a: "Not at all. Real estate deals are closed on personal relationships, trust, site visits, and negotiation. PropFlow acts as your 24/7 digital sales assistant that eliminates repetitive initial qualification and ensures you never lose a buyer due to delayed replies.",
    },
    {
      q: "How do I get started?",
      a: "Getting started takes just a few minutes. Sign in with your phone number via secure OTP, add your initial property inventory to your catalog, and connect your WhatsApp Business account through Meta's supported onboarding flow.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <Box component="section" id="faq" className="pf-section">
      <Box className="pf-container-narrow">
        {/* Section Header */}
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-dot" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="pf-heading-lg">
              Everything you need to know.
            </h2>
            <p
              className="pf-body-lead"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              Clear answers regarding PropFlow&apos;s architecture, Meta WhatsApp
              integration, and dealer data privacy.
            </p>
          </Box>
        </Reveal>

        {/* Accordion List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={faq.q} delayMs={idx * 40}>
                <Box
                  sx={{
                    background: "var(--pf-bg-surface)",
                    border: isOpen
                      ? "1px solid var(--pf-border-emerald)"
                      : "1px solid var(--pf-border-subtle)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: isOpen ? "#ffffff" : "#e2e8f0",
                        transition: "color 0.18s ease",
                      }}
                    >
                      {faq.q}
                    </span>
                    <Box
                      sx={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        color: isOpen ? "#34d399" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <KeyboardArrowDownIcon sx={{ fontSize: 22 }} />
                    </Box>
                  </button>

                  {isOpen && (
                    <Box
                      sx={{
                        px: 3,
                        pb: 3,
                        pt: 0,
                        color: "#94a3b8",
                        fontSize: "0.92rem",
                        lineHeight: 1.65,
                        borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      }}
                      className="pf-animate-fade-in"
                    >
                      {faq.a}
                    </Box>
                  )}
                </Box>
              </Reveal>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
