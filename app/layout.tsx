import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import AIAssistant from "@/components/AIAssistant";
import Providers from "@/components/Providers";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VerleSMP — Minecraft SMP Store",
    template: "%s | VerleSMP",
  },
  description:
    "Official web-store for VerleSMP. Buy Ranks, Crate Keys, and in-game Coins. Join us at play.yourserver.net",
  keywords: ["Minecraft", "SMP", "server store", "ranks", "crate keys", "VerleSMP"],
  openGraph: {
    title: "VerleSMP — Minecraft SMP Store",
    description: "Buy Ranks, Crate Keys & Coins for VerleSMP",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-full antialiased">
        <Providers>
          {/* Global Navbar — visible on every page */}
          <Navbar />

          {/* Sliding Cart Drawer — rendered globally */}
          <CartDrawer />

          {/* Dual Payment Checkout Modal — rendered globally */}
          <CheckoutModal />

          {/* AI Support Widget */}
          <AIAssistant />

          {/* Page Content */}
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b949e]">
              <p>
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-[#00ffab] font-semibold">VerleSMP</span>. All rights
                reserved.
              </p>
              <p className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffab] animate-pulse" />
                <span className="font-mono">play.yourserver.net</span>
              </p>
            </div>
          </footer>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
