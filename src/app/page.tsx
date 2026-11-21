import type { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "PropFlow — Your AI-Powered WhatsApp Sales Assistant",
  description:
    "PropFlow helps real-estate dealers manage WhatsApp enquiries, understand buyer requirements, match properties, and organize leads in one intelligent workspace.",
  keywords: [
    "real estate sales assistant",
    "whatsapp real estate bot",
    "property dealer CRM",
    "whatsapp property enquiries",
    "buyer lead qualification",
    "real estate inventory matching",
  ],
  openGraph: {
    title: "PropFlow — Your AI-Powered WhatsApp Sales Assistant",
    description:
      "PropFlow transforms your WhatsApp into an AI-powered property sales assistant—engaging buyers, understanding their requirements, matching your inventory, and helping you identify serious opportunities.",
    type: "website",
    siteName: "PropFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropFlow — Your AI-Powered WhatsApp Sales Assistant",
    description:
      "Your WhatsApp. Your Properties. Your AI Sales Team. Built for real-estate professionals who want to work smarter and move faster.",
  },
};

export default function HomePage() {
  return <LandingClient />;
}
