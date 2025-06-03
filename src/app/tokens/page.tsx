"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "@/lib/api";
import {useEffect, useState } from "react";
import { TokenSidebar } from "@/components/TokenSidebar";
import { TokenChartArea } from "@/components/TokenChartArea";
import type { Coin } from "@/types/coin";
import { Loader } from "@/components/ui/loader";
import { Header } from "@/components/Header";

export default function TokensPage() {
const { data: coins, isLoading, isError } = useQuery({
  queryKey: ["coins"],
  queryFn: fetchCoins,
  staleTime: 1000 * 60,
});

  const [search, setSearch] = useState("");
  const [selectedToken, setSelectedToken] = useState<Coin | null>(null);


    useEffect(() => {
    if (coins && coins.length > 0 && !selectedToken) {
      const sorted = [...coins].sort((a, b) => b.market_cap - a.market_cap);
      setSelectedToken(sorted[0]);
    }
  }, [coins, selectedToken]);

 if (isLoading)
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader size={48} />
    </div>
  );
  if (isError || !coins)
    return <div className="text-red-600 text-center mt-20">Error loading data</div>;

  return (
    <>
    <Header />
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto py-8 px-3 md:px-6">
      <TokenChartArea token={selectedToken} />
      <TokenSidebar
        coins={coins}
        search={search}
        setSearch={setSearch}
        onSelect={setSelectedToken}
        selectedToken={selectedToken}
      />
    </div>
    </>
  );
}
