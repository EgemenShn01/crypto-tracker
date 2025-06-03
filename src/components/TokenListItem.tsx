import { Card } from "@/components/ui/card";
import type { Coin } from "@/types/coin";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Props = {
  coin: Coin;
  selected: boolean;
  onClick: () => void;
};

export function TokenListItem({ coin, selected, onClick }: Props) {
  return (
        <Card
        className={`flex items-center gap-3 cursor-pointer transition shadow-sm px-3 py-2 hover:shadow-md
            border border-zinc-200 dark:border-zinc-700
            ${selected ? "border-2 border-blue-600 bg-blue-50 dark:bg-blue-950" : "bg-white dark:bg-zinc-900"}
        `}
        onClick={onClick}
        >
         <Image
                src={coin.image}
                alt={coin.name}
                width={32}
                height={32}
                className="rounded-full bg-white dark:bg-zinc-800"
                />
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
            <span className="font-semibold truncate text-zinc-900 dark:text-white">{coin.name}</span>
            <Badge className="bg-gray-200 text-black">{coin.symbol.toUpperCase()}</Badge>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
            ${coin.current_price.toLocaleString()}
            </div>
        </div>
        <div className={`ml-2 font-bold text-sm ${coin.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-500"}`}>
            {coin.price_change_percentage_24h > 0 && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
        </Card>
  );
}
