export async function fetchCoins() {
  const res = await fetch('/api/coins');
  return res.json();
}

export async function fetchCoinDetails(id: string) {
  const res = await fetch(`/api/details?id=${id}`);
  return res.json();
}

export async function fetchCoinChart(coinId: string, days: number = 30) {
  const res = await fetch(`/api/chart?coin=${coinId}&days=${days}`);
  return res.json().then(data => data.prices);
}
