import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=160&page=1";
  try {
    const r = await axios.get(url);
    return NextResponse.json(r.data);
  } catch {
    return NextResponse.json({ error: "Coingecko API error" }, { status: 500 });
  }
}
