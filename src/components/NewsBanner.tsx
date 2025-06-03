import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";

const GRADIENTS = [
  "from-blue-500 to-violet-600",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-pink-500",
  "from-indigo-600 to-sky-400",
];

export function NewsBanner() {
  const [closed, setClosed] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setNewsList([
      {
        title: "Bitcoin price surges above $70,000",
        url: "https://cryptonews.com/news/bitcoin-surges-70k.htm",
        source: "CryptoNews",
        date: "2025-06-07",
      },
      {
        title: "Ethereum network upgrade completed successfully",
        url: "https://cryptonews.com/news/eth-upgrade.htm",
        source: "CryptoNews",
        date: "2025-06-06",
      },
      {
        title: "Ripple wins major court battle against SEC",
        url: "https://cryptonews.com/news/ripple-sec.htm",
        source: "CryptoNews",
        date: "2025-06-05",
      },
    ]);
  }, []);

  useEffect(() => {
    if (closed || newsList.length === 0) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % newsList.length);
        setFading(false);
      }, 400); 
    }, 6000);
    return () => clearInterval(interval);
  }, [closed, newsList, current]);

  if (closed || newsList.length === 0) return null;
  const news = newsList[current];
  const colorIndex = current % GRADIENTS.length;

  return (
    <div
      className={`
        relative overflow-hidden
        mb-8 rounded-xl shadow-lg
        h-[56px] flex items-center
      `}
    >
      <div
        className={`
          flex items-center justify-between gap-3 px-4 py-3
          w-full absolute inset-0 transition-opacity duration-500
          ${fading ? "opacity-0" : "opacity-100"}
          bg-gradient-to-r ${GRADIENTS[colorIndex]}
          text-white
        `}
      >
        <div className="flex items-center gap-3">
          <Megaphone className="w-6 h-6 text-white/90 animate-bounce" />
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-semibold">{news.source}:</span>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-200 transition"
            >
              {news.title}
            </a>
            <span className="hidden md:inline-block opacity-80 ml-2">{news.date}</span>
          </div>
        </div>
        <button onClick={() => setClosed(true)} aria-label="Close news banner">
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5 text-white/70 hover:text-white transition" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 8.586L3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 001.414 1.414L10 11.414l6.293 6.293a1 1 0 001.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </div>
  );
}
