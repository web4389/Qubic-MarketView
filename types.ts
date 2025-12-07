export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  image?: { small: string; large: string; thumb: string };
  market_data: {
    current_price: { usd: number };
    total_volume: { usd: number };
    market_cap: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
    sparkline_7d: {
      price: number[];
    };
    last_updated: string;
  };
}

export interface ChartDataPoint {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  marketCap?: number;
}

export enum Timeframe {
  M1 = '1m',
  M5 = '5m',
  M15 = '15m',
  H1 = '1h',
  H4 = '4h',
  D1 = '1d',
}

export interface ChartState {
  candles: ChartDataPoint[];
  marketCaps: { time: number; value: number }[];
  volumes: { time: number; value: number; color: string }[];
}