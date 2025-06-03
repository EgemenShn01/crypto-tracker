import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  try {
    const r = await axios.get(url);
    return NextResponse.json(r.data);
  } catch {
    return NextResponse.json({ error: "Coingecko API error" }, { status: 500 });
  }
}
