import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { CatalogProvider } from "@/components/catalog-provider";
import { SiteHeader } from "@/components/site-header";
import { getCatalog } from "@/lib/catalog-store";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AliloArtz",
  description:
    "Original sketchbook art and prints — travel pages, ink stories, portraits, and sacred forms.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = await getCatalog();

  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CatalogProvider initial={catalog}>
          <CartProvider>
            <SiteHeader />
            {children}
          </CartProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
