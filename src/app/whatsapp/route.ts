import { NextRequest, NextResponse } from "next/server";

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function GET(request: NextRequest) {
  const phone = normalizePhone(process.env.WHATSAPP_PHONE_NUMBER ?? "");
  if (!phone) {
    return NextResponse.redirect(new URL("/contato", request.url), 307);
  }

  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") ?? "";
  const destination = new URL("https://web.whatsapp.com/send");
  destination.searchParams.set("phone", phone);
  if (text) destination.searchParams.set("text", text);
  destination.searchParams.set("app_absent", "0");

  return NextResponse.redirect(destination, 307);
}
