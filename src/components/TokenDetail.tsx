import { calculateStats } from "@/lib/utils";
import { StatItem } from "@/components/StatItem";
import { Card } from "@/components/ui/card";
import type { Coin } from "@/types/coin";

type Props = { token: Coin; prices: Array<[number, number]> };

export function TokenDetail({ token, prices }: Props) {
  const { current, ath, atl, weekHigh, athDistance } = calculateStats(prices);

  return (
    <Card className="mt-6 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm
      bg-gray-50 dark:bg-zinc-800
      border border-gray-200 dark:border-zinc-700
      text-zinc-900 dark:text-gray-200
    ">
      <StatItem label="Current Price" value={`$${current?.toLocaleString() ?? "-"}`} />
      <StatItem label="Market Cap" value={`$${token.market_cap?.toLocaleString() ?? "-"}`} />
      <StatItem label="All Time High" value={ath ? `$${ath.toLocaleString()}` : "—"} />
      <StatItem label="7d High" value={weekHigh ? `$${weekHigh.toLocaleString()}` : "—"} />
      <StatItem label="All Time Low" value={atl ? `$${atl.toLocaleString()}` : "—"} />
      <StatItem label="ATH Distance" value={`${athDistance?.toFixed(2) ?? "-"}%`} />
    </Card>
  );
}
