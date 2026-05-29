// Server-only module — imported solely by the /api/checkout route handler.
// Never import this from a client component (it reads SQUARE_ACCESS_TOKEN).

/**
 * Square Payments via the REST API (no SDK dependency). Configure with:
 *   SQUARE_ACCESS_TOKEN   — server access token (sandbox or production)
 *   SQUARE_LOCATION_ID    — location to attribute payments to
 *   SQUARE_ENV            — "sandbox" (default) | "production"
 */
export function squareConfig() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN ?? "";
  const locationId = process.env.SQUARE_LOCATION_ID ?? "";
  const env = (process.env.SQUARE_ENV ?? "sandbox").toLowerCase();
  const apiBase =
    env === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
  return { accessToken, locationId, env, apiBase, configured: !!(accessToken && locationId) };
}

export type SquarePaymentResult =
  | { ok: true; paymentId: string; receiptUrl?: string }
  | { ok: false; error: string };

/**
 * Charge a tokenized card (the `sourceId` from the Web Payments SDK).
 * Amount is in cents and is computed server-side from the validated cart.
 */
export async function createPayment(args: {
  sourceId: string;
  amountCents: number;
  idempotencyKey: string;
  note?: string;
}): Promise<SquarePaymentResult> {
  const { accessToken, locationId, apiBase, configured } = squareConfig();
  if (!configured) return { ok: false, error: "not_configured" };

  try {
    const res = await fetch(`${apiBase}/v2/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-10-17",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: args.sourceId,
        idempotency_key: args.idempotencyKey,
        location_id: locationId,
        amount_money: { amount: args.amountCents, currency: "USD" },
        note: args.note?.slice(0, 500),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data?.errors?.[0]?.detail ?? `Square error (${res.status})`;
      return { ok: false, error: msg };
    }
    return {
      ok: true,
      paymentId: data.payment?.id ?? "",
      receiptUrl: data.payment?.receipt_url,
    };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
