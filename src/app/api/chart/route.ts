import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const coin = searchParams.get("coin");
  const days = searchParams.get("days") || 30;
  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;
  try {
    const r = await axios.get(url);
    return NextResponse.json(r.data);
  } catch {
    return NextResponse.json({ error: "Coingecko API error" }, { status: 500 });
  }
}
