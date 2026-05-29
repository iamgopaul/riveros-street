import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Intro } from "@/components/Intro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Extend under the notch/Dynamic Island so the nav can cover the safe area,
  // and match the browser chrome to the dark theme (no light strip on iOS).
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Rivero's Street | Comida Venezolana Callejera",
  description:
    "Rivero's Street is a Venezuelan food truck and clothing label in Freeport, FL. Arepas, empanadas, and cachapas. Eat, wear, live.",
  metadataBase: new URL("https://riverosstreet.com"),
  openGraph: {
    title: "Rivero's Street",
    description: "Comida Venezolana Callejera · Freeport, FL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground grain street-bg">
        <LanguageProvider>
          <Intro />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
