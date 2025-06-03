"use client";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { fetchCoinChart } from "@/lib/api";
import { useEffect, useState } from "react";
import { Loader } from "./ui/loader";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  coinId: string;
  onPrices?: (prices: Array<[number, number]>) => void;
};

const DAY_OPTIONS = [
  { label: "1D", value: 1 },
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
];

export function TokenPriceChart({ coinId, onPrices }: Props) {
  const [days, setDays] = useState(30);

const { data, isLoading, isError } = useQuery({
  queryKey: ["coin-chart", coinId, days],
  queryFn: () => fetchCoinChart(coinId, days),
  enabled: !!coinId,
  staleTime: 1000 * 60,
});


  useEffect(() => {
    if (data && onPrices) onPrices(data);
  }, [data, onPrices]);

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader size={48} />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-600 dark:text-red-400 text-center mt-10">After a while the error occurred again, API limit reached.</div>;
  }

  const series = [
    {
      name: "Price",
      data: data.map(([ts, price]: [number, number]) => [ts, price]),
    },
  ];

const options: ApexOptions = {
    chart: {
      type: "area",
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
      foreColor: isDark ? "#f1f5f9" : "#222",
    },
    theme: {
      mode: isDark ? "dark" : "light"
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
        },
      },
      axisBorder: {
        show: true,
        color: isDark ? "#334155" : "#E5E7EB",
      },
      axisTicks: {
        show: true,
        color: isDark ? "#334155" : "#E5E7EB",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
        },
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#E5E7EB",
      strokeDashArray: 3,
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      style: {
        fontSize: "14px",
      },
      x: { format: "dd MMM" },
      marker: {
        show: true,
        fillColors: isDark ? ["#60A5FA"] : ["#2563EB"],
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: isDark ? "dark" : "light",
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: [isDark ? "#3B82F6" : "#2563EB"],
    },
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 mb-4">
        {DAY_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setDays(opt.value)}
            className={`px-3 py-1 rounded-full border font-medium text-sm transition cursor-pointer
              ${days === opt.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-zinc-700"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </div>
  );
}
