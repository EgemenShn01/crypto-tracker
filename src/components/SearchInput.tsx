"use client";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  return (
    <div className="flex justify-center mb-8">
    <Input
      placeholder="Search coin…"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="
        max-w-xs
        bg-white dark:bg-zinc-900
        text-zinc-900 dark:text-white
        border border-zinc-300 dark:border-zinc-700
        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
        transition
      "
    />
    </div>
  );
}
