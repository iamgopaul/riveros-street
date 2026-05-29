"use client";

import { useEffect, useRef, useState } from "react";
import type { PostedLine } from "@/lib/order";
import { useI18n } from "@/lib/i18n";

const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID ?? "";
const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? "";
const ENV = (process.env.NEXT_PUBLIC_SQUARE_ENV ?? "sandbox").toLowerCase();
const SDK_URL =
  ENV === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";

export const squareConfigured = !!(APP_ID && LOCATION_ID);

// minimal shape of the Square Web Payments SDK we use
type SquareCardInstance = { attach: (sel: string) => Promise<void>; tokenize: () => Promise<{ status: string; token?: string }> };
type SquareSDK = { payments: (appId: string, locationId: string) => { card: () => Promise<SquareCardInstance> } };
declare global {
  interface Window {
    Square?: SquareSDK;
  }
}

let sdkPromise: Promise<void> | null = null;
function loadSdk(): Promise<void> {
  if (window.Square) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SDK_URL;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("sdk_load_failed"));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export function SquareCard({
  lines,
  note,
  amountLabel,
  onPaid,
}: {
  lines: PostedLine[];
  note: string;
  amountLabel: string;
  onPaid: (paymentId: string) => void;
}) {
  const { t } = useI18n();
  const cardRef = useRef<SquareCardInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!squareConfigured) return;
    (async () => {
      try {
        await loadSdk();
        if (cancelled || !window.Square) return;
        const payments = window.Square.payments(APP_ID, LOCATION_ID);
        const card = await payments.card();
        await card.attach("#sq-card");
        if (cancelled) return;
        cardRef.current = card;
        setReady(true);
      } catch {
        setError(t("pay.loadError"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [t]);

  async function pay() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK" || !result.token) {
        setError(t("pay.cardError"));
        setBusy(false);
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: result.token, lines, note }),
      });
      const data = await res.json();
      if (data.ok) {
        onPaid(data.paymentId as string);
      } else {
        setError(data.error === "not_configured" ? t("pay.notConfigured") : t("pay.declined"));
        setBusy(false);
      }
    } catch {
      setError(t("pay.declined"));
      setBusy(false);
    }
  }

  if (!squareConfigured) {
    return (
      <div className="border border-border p-4 text-xs text-foreground/50 leading-relaxed">
        {t("pay.notConfigured")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div id="sq-card" className="min-h-[44px] border border-border bg-white px-3 py-1.5" />
      {error && <p className="text-xs text-accent">{error}</p>}
      <button
        type="button"
        onClick={pay}
        disabled={!ready || busy}
        className="w-full h-14 bg-accent text-white font-mono uppercase tracking-widest text-xs hover:bg-accent-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {busy ? t("pay.processing") : `${t("pay.pay")} ${amountLabel}`}
      </button>
    </div>
  );
}
