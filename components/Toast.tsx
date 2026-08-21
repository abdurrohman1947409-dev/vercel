"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const ICON_MAP = {
  success: <CheckCircle size={16} className="text-[#00ffab] shrink-0" />,
  error: <XCircle size={16} className="text-[#ff4d6d] shrink-0" />,
  warning: <AlertCircle size={16} className="text-[#ffd700] shrink-0" />,
  info: <Info size={16} className="text-[#00b4d8] shrink-0" />,
};

const BORDER_MAP = {
  success: "border-[#00ffab]/30 bg-[#00ffab]/5",
  error: "border-[#ff4d6d]/30 bg-[#ff4d6d]/5",
  warning: "border-[#ffd700]/30 bg-[#ffd700]/5",
  info: "border-[#00b4d8]/30 bg-[#00b4d8]/5",
};

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(onClose, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose, duration]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        fixed bottom-6 right-6 z-[100] flex items-center gap-3
        px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl
        max-w-sm w-full animate-fade-up
        ${BORDER_MAP[type]}
      `}
    >
      {ICON_MAP[type]}
      <p className="text-sm font-medium text-[#f0f6fc] flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-[#8b949e] hover:text-[#f0f6fc] transition-colors ml-1"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
