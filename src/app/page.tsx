"use client";
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchCoins } from "@/lib/api"; 
import { SearchInput } from "@/components/SearchInput";
import { CardList } from "@/components/CardList";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Loader } from '@/components/ui/loader';
import { Header } from "@/components/Header";
import { NewsBanner } from '@/components/NewsBanner';

export default function Home() {
const { data, isLoading, isError } = useQuery({
  queryKey: ['coins'],
  queryFn: fetchCoins,
  staleTime: 1000 * 60,
});

  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader size={48} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="w-10 h-10 mb-2 rounded-full" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-4 w-16" />
            </Card>
          ))}
        </div>
      </>
    );
  }

  if (isError)
    return (
      <>
        <div className="text-red-600 text-center mt-10">Error loading data</div>
      </>
    );

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-2 mt-10">
        <NewsBanner />  
        <h1 className="text-4xl font-bold mb-8 text-center">Crypto Tracker</h1>
        <SearchInput value={search} onChange={setSearch} />
        <CardList coins={data ?? []} search={search} />
      </div>
    </>
  );
}
