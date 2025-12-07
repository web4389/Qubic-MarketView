import React, { useMemo } from 'react';
import { CoinGeckoResponse } from '../types';

interface StatsPanelProps {
  data: CoinGeckoResponse | null;
  loading: boolean;
}

const StatBox = ({ label, value, subValue, highlight = false, trend = null, delay = "" }: { label: string, value: string, subValue?: string, highlight?: boolean, trend?: 'up' | 'down' | null, delay?: string }) => (
  <div className={`bg-[#0f172a] border border-slate-800 rounded-lg p-5 flex flex-col justify-center min-h-[100px] hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1 animate-fade-in-up ${delay}`}>
    <p className="text-slate-500 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider group-hover:text-slate-400 transition-colors">{label}</p>
    <div className={`text-lg sm:text-xl xl:text-2xl font-bold truncate ${highlight ? 'text-white' : 'text-slate-200'} ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : ''}`}>
      {value}
    </div>
    {subValue && (
        <div className="mt-1 text-xs text-slate-500">
            {subValue}
        </div>
    )}
  </div>
);

const FearGreedBox = ({ value, delay = "" }: { value: number, delay?: string }) => {
    return (
        <div className={`bg-[#0f172a] border border-slate-800 rounded-lg p-5 flex flex-col justify-center min-h-[100px] hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1 animate-fade-in-up ${delay}`}>
            <p className="text-slate-500 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider group-hover:text-slate-400 transition-colors">Fear & Greed</p>
            <div className="flex items-center gap-3">
                <span className={`text-2xl font-bold ${value >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                    {Math.round(value)}
                </span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden max-w-[80px]">
                    <div 
                        className={`h-full transition-all duration-1000 ease-out ${value >= 50 ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${value}%` }} 
                    />
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
                {value > 75 ? 'Extreme Greed' : value > 55 ? 'Greed' : value < 25 ? 'Extreme Fear' : value < 45 ? 'Fear' : 'Neutral'}
            </p>
        </div>
    );
};

const StatsPanel: React.FC<StatsPanelProps> = ({ data, loading }) => {
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatPrice = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 6, maximumFractionDigits: 8 }).format(val);

  // Mock Fear and Greed based on 24h change for display purposes
  const fearGreedIndex = useMemo(() => {
    if (!data) return 50;
    const change = data.market_data.price_change_percentage_24h;
    // Map -10% to +10% change to a 0-100 scale loosely
    let score = 50 + (change * 3); 
    return Math.min(Math.max(score, 10), 95);
  }, [data]);

  if (loading && !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full max-w-7xl mx-auto px-4 mb-8">
         {[1,2,3,4,5,6].map(i => <div key={i} className="h-24 bg-slate-800/50 animate-pulse rounded-lg" />)}
      </div>
    );
  }

  // Fallback if data is null
  if (!data) return null;

  const { market_data } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full max-w-7xl mx-auto px-4 mb-8">
      <StatBox 
        label="Market Cap" 
        value={formatCurrency(market_data.market_cap.usd)}
        delay="delay-100"
      />
      
      <StatBox 
        label="24h Volume" 
        value={formatCurrency(market_data.total_volume.usd)}
        delay="delay-200"
      />
      
      <StatBox 
        label="24h High" 
        value={formatPrice(market_data.high_24h.usd)}
        delay="delay-300"
      />
      
      <StatBox 
        label="24h Low" 
        value={formatPrice(market_data.low_24h.usd)}
        delay="delay-300"
      />
      
      <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-5 flex flex-col justify-center min-h-[100px] hover:border-slate-700 transition-colors group animate-fade-in-up delay-500">
        <p className="text-slate-500 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider group-hover:text-slate-400 transition-colors">24h Change</p>
        <div className={`text-xl xl:text-2xl font-bold flex items-center gap-2 ${market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {market_data.price_change_percentage_24h > 0 ? '+' : ''}{market_data.price_change_percentage_24h.toFixed(2)}%
            <span className={`text-xs px-2 py-0.5 rounded-full ${market_data.price_change_percentage_24h >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                {market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'}
            </span>
        </div>
      </div>

      <FearGreedBox value={fearGreedIndex} delay="delay-500" />
    </div>
  );
};

export default StatsPanel;