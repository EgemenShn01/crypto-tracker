import { SearchInput } from "@/components/SearchInput";
import { TokenList } from "@/components/TokenList";
import type { Coin } from "@/types/coin";

type Props = {
  coins: Coin[];
  search: string;
  setSearch: (s: string) => void;
  onSelect: (coin: Coin) => void;
  selectedToken: Coin | null;
};

export function TokenSidebar({
  coins, search, setSearch, onSelect, selectedToken,
}: Props) {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-xl h-fit sticky top-8 self-start">
      <SearchInput value={search} onChange={setSearch} />
      <TokenList
        coins={coins}
        search={search}
        onSelect={onSelect}
        selectedToken={selectedToken}
      />
    </aside>
  );
}
