import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CRAV — Juicy Cheesy Fully Loaded Burgers",
  description:
    "Bold smashed burgers, toasted buns, punchy sauces, and CRAV-worthy take-away energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <SmoothScrollProvider>
          <CustomCursor />
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
