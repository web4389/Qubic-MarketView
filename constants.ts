import { Timeframe } from './types';

// Milliseconds per timeframe
export const TIMEFRAME_DURATION: Record<Timeframe, number> = {
  [Timeframe.M1]: 60 * 1000,
  [Timeframe.M5]: 5 * 60 * 1000,
  [Timeframe.M15]: 15 * 60 * 1000,
  [Timeframe.H1]: 60 * 60 * 1000,
  [Timeframe.H4]: 4 * 60 * 60 * 1000,
  [Timeframe.D1]: 24 * 60 * 60 * 1000,
};

export const COLORS = {
  background: '#0f172a',
  textColor: '#94a3b8',
  upColor: '#22c55e', // green-500
  downColor: '#ef4444', // red-500
  wickUpColor: '#22c55e',
  wickDownColor: '#ef4444',
  volumeUp: 'rgba(34, 197, 94, 0.3)',
  volumeDown: 'rgba(239, 68, 68, 0.3)',
  marketCapLine: '#6366f1', // indigo-500
  grid: '#1e293b',
};
