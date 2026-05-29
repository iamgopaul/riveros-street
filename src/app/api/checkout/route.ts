import { NextResponse } from "next/server";
import { computeTotalCents, type PostedLine } from "@/lib/order";
import { createPayment, squareConfig } from "@/lib/square";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

type Body = {
  sourceId: string;
  lines: PostedLine[];
  note?: string;
};

export async function POST(req: Request) {
  const { configured } = squareConfig();
  if (!configured) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (!body.sourceId || !Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Recompute the amount from the trusted MENU — never trust a client total.
  const amountCents = computeTotalCents(body.lines);
  if (amountCents <= 0) {
    return NextResponse.json({ ok: false, error: "empty_order" }, { status: 400 });
  }

  const result = await createPayment({
    sourceId: body.sourceId,
    amountCents,
    idempotencyKey: randomUUID(),
    note: body.note,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 402 });
  }

  return NextResponse.json({
    ok: true,
    paymentId: result.paymentId,
    receiptUrl: result.receiptUrl,
    amountCents,
  });
}
