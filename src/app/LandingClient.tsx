"use client";

import React from "react";
import "./landing.css";
import {
  LandingNavbar,
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  ProductSection,
  AIAdvantageSection,
  DealerSection,
  PremiumSection,
  FAQSection,
  FinalCTASection,
  LandingFooter,
} from "@/components/landing";

export default function LandingClient() {
  return (
    <div className="pf-landing-root">
      <LandingNavbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <ProductSection />
        <AIAdvantageSection />
        <DealerSection />
        <PremiumSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
