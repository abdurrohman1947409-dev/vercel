"use client";

/**
 * Providers — Client-side wrapper for all context providers.
 * Rendered inside the RSC root layout so Next.js streaming still works.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // Zustand stores are self-contained; no explicit context provider needed.
  // Add future auth / toast providers here.
  return <>{children}</>;
}
