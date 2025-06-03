import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function calculateStats(prices: Array<[number, number]>) {
  if (!prices.length) {
    return {
      current: 0,
      ath: 0,
      atl: 0,
      weekHigh: 0,
      athDistance: 0,
    };
  }

  const priceArr = prices.map(([, price]) => price);

  const ath = Math.max(...priceArr);
  const atl = Math.min(...priceArr);

  const current = priceArr.at(-1) ?? 0;

  const totalDays = 30;
  const perDay = Math.floor(priceArr.length / totalDays); 
  const weekPrices = priceArr.slice(-perDay * 7);
  const weekHigh = weekPrices.length ? Math.max(...weekPrices) : 0;

  const athDistance = ath ? (((current - ath) / ath) * 100) : 0;

  return { current, ath, atl, weekHigh, athDistance };
}