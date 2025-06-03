import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

type Props = {
  coins: Coin[];
  search: string;
};

export function CardList({ coins, search }: Props) {
  const filtered = coins?.filter(
    coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (!filtered?.length)
    return <div className="text-center text-gray-400 mt-10">No coins found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map(coin => (
        <Link
          key={coin.id}
          href={`/tokens/${coin.id}`}
          className="block"
        >
          <Card className="p-6 flex flex-col items-center shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2 rounded-full bg-white" />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold">{coin.name}</span>
              <Badge>{coin.symbol.toUpperCase()}</Badge>
            </div>
                <div className="mb-2 text-lg font-semibold !dark:text-gray-900 dark:text-white">
                ${coin.current_price.toLocaleString()}
                </div>
            <div className={`mb-1 font-medium ${coin.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-500"}`}>
              {coin.price_change_percentage_24h > 0 && "+"}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-500">
              Market Cap: ${coin.market_cap.toLocaleString()}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}