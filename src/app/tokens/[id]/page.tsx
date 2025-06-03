"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetails, fetchCoinChart } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import {TokenPriceChart} from "@/components/TokenPriceChart";
import { useState } from "react";
import { Globe, Twitter, Link } from "lucide-react";


export default function TokenPage() {
  const { id } = useParams();
  const router = useRouter();
  const [chartDays, setChartDays] = useState(30);

const { data: coin, isLoading, isError } = useQuery({
  queryKey: ["coin-details", id],
  queryFn: () => fetchCoinDetails(id),
  staleTime: 1000 * 60,
});


  if (isLoading)
    return (
      <>
        <Header />
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader size={48} />
        </div>
      </>
    );

  if (isError || !coin)
    return (
      <>
        <Header />
        <div className="text-red-600 text-center mt-10">Token not found or failed to load.</div>
        <div className="flex justify-center mt-8">
          <Button onClick={() => router.push("/tokens")}>← Back to tokens</Button>
        </div>
      </>
    );

  const description = coin.description?.en?.replace(/<\/?a[^>]*>/g, '').slice(0, 300) + "...";

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-3 py-10">
        <div className="flex items-center gap-5 mb-6">
          <img src={coin.image.large || coin.image.small} alt={coin.name} className="w-16 h-16 rounded-full shadow" />
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {coin.name}
              <Badge className="ml-2">{coin.symbol.toUpperCase()}</Badge>
            </h1>
            <div className="mt-2 text-2xl font-semibold flex items-center gap-2">
              ${coin.market_data.current_price.usd.toLocaleString()}
              <span className={
                coin.market_data.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }>
                ({coin.market_data.price_change_percentage_24h > 0 && "+"}
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

          <TokenPriceChart coinId={coin.id} days={chartDays} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-gray-400 text-xs">Market Cap</div>
            <div className="font-medium">${coin.market_data.market_cap.usd.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Rank</div>
            <div className="font-medium">#{coin.market_cap_rank}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">ATH</div>
            <div className="font-medium">${coin.market_data.ath.usd.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">ATL</div>
            <div className="font-medium">${coin.market_data.atl.usd.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Total Supply</div>
            <div className="font-medium">{coin.market_data.total_supply?.toLocaleString() || "—"}</div>
          </div>
        </div>

        <div className="mb-5 text-sm text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: description }} />

            <div className="flex gap-3 mt-4 flex-wrap">
            <Button onClick={() => router.push("/tokens")}>← All Tokens</Button>
            {coin.links?.homepage?.[0] && (
                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                    <Globe className="inline-block mr-2 w-4 h-4" />
                    Website
                </Button>
                </a>
            )}
            {coin.links?.blockchain_site?.[0] && (
                <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                    <Link className="inline-block mr-2 w-4 h-4" />
                    Explorer
                </Button>
                </a>
            )}
            {coin.links?.twitter_screen_name && (
                <a href={`https://twitter.com/${coin.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                    <Twitter className="inline-block mr-2 w-4 h-4" />
                    Twitter
                </Button>
                </a>
            )}
            </div>
      </div>
    </>
  );
}
