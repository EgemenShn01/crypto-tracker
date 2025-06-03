import { TokenListItem } from "@/components/TokenListItem";
import type { Coin } from "@/types/coin";

type Props = {
  coins: Coin[];
  search: string;
  onSelect: (coin: Coin) => void;
  selectedToken: Coin | null;
};

export function TokenList({ coins, search, onSelect, selectedToken }: Props) {
  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto pr-1 mt-2">
      {filtered.length === 0 && (
        <div className="text-gray-400 text-center mt-6">No tokens found.</div>
      )}
      {filtered.map((coin) => (
        <TokenListItem
          key={coin.id}
          coin={coin}
          selected={selectedToken?.id === coin.id}
          onClick={() => onSelect(coin)}
        />
      ))}
    </div>
  );
}
