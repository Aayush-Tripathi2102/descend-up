import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Syne,
  Inter,
  Geist,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DescendUp",
  description:
    "A platform for creators to monetize their content through NFTs and subscriptions.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={cn(
          geist.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          syne.variable,
          inter.variable,
          "antialiased",
        )}
      >
        <Navbar user={null} />
        {children}
        <Toaster richColors position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
