"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, ShoppingCart, Sword, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const SERVER_IP = "play.yourserver.net";
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/announcements", label: "Announcements" },
  { href: "/rules", label: "Rules" },
];

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);

  const copyServerIP = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement("textarea");
      el.value = SERVER_IP;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <>
      <header
        className="glass sticky top-0 z-50 w-full"
        style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 group"
              aria-label="Home"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ffab] to-[#7f5af0] shadow-[0_0_12px_rgba(0,255,171,0.4)]">
                <Sword size={16} className="text-[#0d1117]" />
              </span>
              <span className="font-bold text-lg tracking-tight text-[#f0f6fc] group-hover:text-[#00ffab] transition-colors">
                Verle<span className="text-[#00ffab]">SMP</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Server IP Badge ── */}
            <button
              onClick={copyServerIP}
              title="Click to copy Server IP"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00ffab]/20 bg-[#00ffab]/5 hover:bg-[#00ffab]/10 hover:border-[#00ffab]/40 transition-all duration-200 cursor-pointer group animate-pulse-glow"
              aria-label="Copy server IP to clipboard"
            >
              <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse shrink-0" />
              <span className="text-xs font-mono text-[#00ffab] font-semibold select-none">
                {SERVER_IP}
              </span>
              {copied ? (
                <Check size={12} className="text-[#00ffab] shrink-0" />
              ) : (
                <Copy size={12} className="text-[#00ffab]/50 group-hover:text-[#00ffab] transition-colors shrink-0" />
              )}
              {copied && (
                <span className="text-xs text-[#00ffab] font-bold animate-fade-up">
                  Copied!
                </span>
              )}
            </button>

            {/* ── Right: Avatar + Cart + Mobile Toggle ── */}
            <div className="flex items-center gap-2">
              {/* Player Avatar (Steve fallback) */}
              <div className="relative hidden sm:block">
                <Link href="/profile" aria-label="Your profile">
                  <Image
                    src="https://cravatar.eu/helmavatar/Steve/32.png"
                    alt="Player Avatar"
                    width={32}
                    height={32}
                    className="rounded-md border border-white/10 hover:border-[#00ffab]/40 transition-all duration-200"
                    unoptimized // cravatar serves pre-optimized PNGs
                  />
                </Link>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00ffab] border-2 border-[#0d1117]" />
              </div>

              {/* Cart Button */}
              <button
                id="cart-trigger"
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm text-[#0d1117] cursor-pointer transition-all duration-200 btn-neon-green"
                aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0d1117] text-[#00ffab] text-xs font-bold leading-none">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* ── Mobile Nav ── */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-white/5 mt-2 pt-3 animate-fade-up">
              {/* Mobile Server IP */}
              <button
                onClick={copyServerIP}
                className="flex w-full items-center gap-2 px-3 py-2 mb-2 rounded-lg border border-[#00ffab]/20 bg-[#00ffab]/5 text-[#00ffab] text-xs font-mono font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse" />
                {SERVER_IP}
                {copied ? <Check size={12} /> : <Copy size={12} className="ml-auto" />}
              </button>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex px-3 py-2.5 rounded-lg text-sm font-medium text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
