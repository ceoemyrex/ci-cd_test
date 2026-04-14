"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type QuoteRequestSuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  title: string;
  description: ReactNode;
  primaryButtonLabel: string;
};

function HeaderSparkles() {
  const stars = [
    { top: "12%", left: "8%", size: 10, opacity: 0.85 },
    { top: "22%", left: "78%", size: 14, opacity: 0.95 },
    { top: "8%", left: "42%", size: 8, opacity: 0.7 },
    { top: "55%", left: "12%", size: 12, opacity: 0.8 },
    { top: "48%", left: "88%", size: 9, opacity: 0.75 },
    { top: "68%", left: "55%", size: 11, opacity: 0.9 },
    { top: "38%", left: "28%", size: 7, opacity: 0.65 },
    { top: "18%", left: "62%", size: 6, opacity: 0.6 },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[20px]"
      aria-hidden
    >
      {stars.map((star, index) => (
        <svg
          key={index}
          className="absolute text-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1.5l2.2 6.3L21 9.5l-5.5 4L16.8 21 12 17.2 7.2 21l1.3-7.5L3 9.5l6.8-1.7L12 1.5z" />
        </svg>
      ))}
      <svg
        className="absolute text-white/70"
        style={{ top: "72%", left: "22%", width: 5, height: 5 }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      </svg>
      <svg
        className="absolute text-white/60"
        style={{ top: "30%", left: "92%", width: 4, height: 4 }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      </svg>
    </div>
  );
}

export function QuoteRequestSuccessModal({
  open,
  onOpenChange,
  onContinue,
  title,
  description,
  primaryButtonLabel,
}: QuoteRequestSuccessModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed left-1/2 top-1/2 z-50 flex h-[min(440px,calc(100dvh-2rem))] max-h-[440px] w-[min(100%-2rem,400px)] max-w-[400px] min-h-0 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[20px] border border-zinc-200/90 bg-white shadow-2xl outline-none"
      >
        <div className="relative min-h-0 shrink-0 grow-0 basis-[35%] bg-[rgba(115,192,87,1)]">
          <HeaderSparkles />
          <button
            type="button"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/15"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-1/2 justify-center px-4">
            <div className="rounded-full bg-[rgba(241,249,238,0.2)] p-[3px] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.22)] ring-1 ring-black/6">
              <div className="rounded-full bg-[rgba(241,249,238,0.2)] p-[3px]">
                <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/50">
                  <Check className="h-8 w-8 text-[#3D8D2F]" strokeWidth={2.5} aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-0 shrink-0 grow-0 basis-[65%] flex-col bg-white">
          <div className="flex min-h-0 flex-1 flex-col justify-center px-5 pb-3 pt-8">
            <p className="mb-2.5 text-center text-lg font-bold leading-snug text-[#2D3748]">
              {title}
            </p>
            <p className="mx-auto max-w-66 text-center text-sm leading-relaxed text-[#718096]">
              {description}
            </p>
          </div>
          <div className="shrink-0 border-t border-zinc-100/90 px-5 pb-5 pt-3">
            <button
              type="button"
              onClick={onContinue}
              className="w-full rounded-xl bg-[#214B8D] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(33,75,141,0.55)] transition hover:bg-[#1c4078]"
            >
              {primaryButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
