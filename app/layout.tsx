import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const SITE_URL = "https://www.masterantique.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Master Antique — Curators of Fine Antiques Since 1892",
    template: "%s — Master Antique",
  },
  description:
    "Master Antique has been curating the world's finest antiques since 1892. Discover Victorian, Georgian, Art Deco and Mid-Century pieces, each authenticated and restored by master craftsmen.",
  keywords: [
    "antiques",
    "Victorian",
    "Georgian",
    "Art Deco",
    "Mid-Century",
    "collectibles",
    "restoration",
    "Karachi",
  ],
  authors: [{ name: "Master Antique" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Master Antique",
    title: "Master Antique — Curators of Fine Antiques Since 1892",
    description:
      "Discover authenticated Victorian, Georgian, Art Deco and Mid-Century antiques, each restored by master craftsmen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Antique — Curators of Fine Antiques Since 1892",
    description:
      "Discover authenticated Victorian, Georgian, Art Deco and Mid-Century antiques, each restored by master craftsmen.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F0E6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
