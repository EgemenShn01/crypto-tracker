import { useState, useEffect } from "react";
import { TokenPriceChart } from "@/components/TokenPriceChart";
import { TokenDetail } from "@/components/TokenDetail";
import type { Coin } from "@/types/coin";

type Props = { token: Coin | null };

export function TokenChartArea({ token }: Props) {
  const [prices, setPrices] = useState<Array<[number, number]>>([]);

  useEffect(() => {
    setPrices([]);
  }, [token?.id]);

  return (
    <section className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl min-h-[450px]">
      {token ? (
        <>
          <h2 className="text-3xl font-bold mb-3 flex items-center gap-3 text-zinc-900 dark:text-white">
            <img src={token.image} alt={token.name} className="w-9 h-9 rounded-full bg-white" />
            {token.name}
            <span className="text-base text-gray-400 dark:text-gray-300">
              {token.symbol.toUpperCase()}
            </span>
          </h2>
          <TokenPriceChart coinId={token.id} onPrices={setPrices} />
          <TokenDetail token={token} prices={prices} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-300">
          <div className="text-xl mb-4">Please select a token to view its details and chart.</div>
          <div>Or select from the right to see data!</div>
        </div>
      )}
    </section>
  );
}
