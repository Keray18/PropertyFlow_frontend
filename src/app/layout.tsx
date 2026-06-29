import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropFlow — Dealer Portal",
  description: "Simple dashboard for property dealers to manage leads and listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
