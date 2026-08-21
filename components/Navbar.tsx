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
    } catch {
      const el = document.createElement("textarea");
      el.value = SERVER_IP;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <header
      className="glass sticky top-0 z-50 w-full"
      style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}
    >
      {/* ── Main nav row ── */}
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="VerleSMP Home"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ffab] to-[#7f5af0] shadow-[0_0_16px_rgba(0,255,171,0.4)]">
            <Sword size={18} className="text-[#0d1117]" />
          </span>
          <span className="font-extrabold text-lg tracking-tight text-[#f0f6fc] group-hover:text-[#00ffab] transition-colors">
            Verle<span className="text-[#00ffab]">SMP</span>
          </span>
        </Link>

        {/* Desktop Nav Links — centered with generous gaps */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#8b949e] hover:text-[#f0f6fc] transition-colors duration-150 relative group"
            >
              {link.label}
              {/* Underline hover accent */}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00ffab] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right section: IP pill + Avatar + Cart */}
        <div className="flex items-center gap-3">

          {/* Server IP pill */}
          <button
            onClick={copyServerIP}
            title="Click to copy Server IP"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00ffab]/25 bg-[#00ffab]/5 hover:bg-[#00ffab]/10 hover:border-[#00ffab]/50 transition-all duration-200 cursor-pointer group"
            aria-label="Copy server IP to clipboard"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffab] animate-pulse shrink-0" />
            <span className="text-xs font-mono text-[#00ffab] font-semibold select-none tracking-wide">
              {SERVER_IP}
            </span>
            {copied ? (
              <Check size={11} className="text-[#00ffab] shrink-0" />
            ) : (
              <Copy size={11} className="text-[#00ffab]/40 group-hover:text-[#00ffab] transition-colors shrink-0" />
            )}
          </button>

          {/* Player Avatar */}
          <div className="relative hidden sm:block">
            <Link href="/profile" aria-label="Your profile">
              <Image
                src="https://cravatar.eu/helmavatar/Steve/32.png"
                alt="Player Avatar"
                width={34}
                height={34}
                className="rounded-lg border border-white/10 hover:border-[#00ffab]/40 transition-all duration-200"
                unoptimized
              />
            </Link>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00ffab] border-2 border-[#0d1117]" />
          </div>

          {/* Cart Button */}
          <button
            id="cart-trigger"
            onClick={toggleCart}
            className="btn-neon-green flex items-center gap-2 px-4 py-2 text-sm font-bold cursor-pointer"
            aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#0d1117] text-[#00ffab] text-xs font-bold">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Nav dropdown ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/8 px-6 pb-5 pt-3 animate-fade-up space-y-1">
          {/* Mobile IP */}
          <button
            onClick={copyServerIP}
            className="flex w-full items-center gap-2 px-4 py-2.5 mb-3 rounded-xl border border-[#00ffab]/20 bg-[#00ffab]/5 text-[#00ffab] text-xs font-mono font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffab] animate-pulse" />
            {SERVER_IP}
            {copied ? <Check size={11} className="ml-auto" /> : <Copy size={11} className="ml-auto opacity-50" />}
          </button>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex px-4 py-3 rounded-xl text-sm font-medium text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
