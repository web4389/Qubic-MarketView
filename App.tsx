import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChartDataPoint, ChartState, CoinGeckoResponse, Timeframe } from './types';
import { fetchCoinData, generateSyntheticHistory } from './services/api';
import { TIMEFRAME_DURATION, COLORS } from './constants';
import ChartContainer from './components/ChartContainer';
import ChartSkeleton from './components/ChartSkeleton';
import StatsPanel from './components/StatsPanel';
import TimeframeSelector from './components/TimeframeSelector';
import { Navbar, Hero, FeaturesSection, ComputationSection, Footer } from './components/LandingParts';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CoinGeckoResponse | null>(null);
  const [isLive, setIsLive] = useState(false);
  
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.H1);
  const [chartData, setChartData] = useState<ChartState>({ candles: [], marketCaps: [], volumes: [] });

  const rawDataRef = useRef<ChartDataPoint[]>([]);

  const processDataForTimeframe = useCallback((rawPoints: ChartDataPoint[], tf: Timeframe) => {
    const tfDuration = TIMEFRAME_DURATION[tf];
    if (!rawPoints.length) return;

    const aggregatedCandles: ChartDataPoint[] = [];
    let currentBucketStart = Math.floor(rawPoints[0].time * 1000 / tfDuration) * tfDuration;
    
    let tempCandle: ChartDataPoint = { ...rawPoints[0] };
    let tempVolume = 0;

    for (let i = 0; i < rawPoints.length; i++) {
      const p = rawPoints[i];
      const pTimeMs = p.time * 1000;

      if (pTimeMs < currentBucketStart + tfDuration) {
        tempCandle.high = Math.max(tempCandle.high, p.high);
        tempCandle.low = Math.min(tempCandle.low, p.low);
        tempCandle.close = p.close;
        tempVolume += (p.volume || 0);
        tempCandle.marketCap = p.marketCap;
      } else {
        aggregatedCandles.push({ 
            ...tempCandle, 
            time: currentBucketStart / 1000,
            volume: tempVolume 
        });
        currentBucketStart = Math.floor(pTimeMs / tfDuration) * tfDuration;
        tempCandle = { ...p }; 
        tempVolume = p.volume || 0;
      }
    }
    aggregatedCandles.push({ 
        ...tempCandle, 
        time: currentBucketStart / 1000, 
        volume: tempVolume 
    });

    const finalCandles = aggregatedCandles;
    const finalVolumes = aggregatedCandles.map(c => ({
      time: c.time,
      value: c.volume || 0,
      color: (c.close >= c.open) ? COLORS.volumeUp : COLORS.volumeDown
    }));
    const finalMCs = aggregatedCandles.map(c => ({
      time: c.time,
      value: c.marketCap || 0
    }));

    setChartData({
      candles: finalCandles,
      volumes: finalVolumes,
      marketCaps: finalMCs
    });
  }, []);

  // Data Fetching Logic
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const res = await fetchCoinData();
        setData(res);
        setIsLive(true);
        const history = generateSyntheticHistory(res);
        rawDataRef.current = history;
        processDataForTimeframe(history, timeframe);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetchCoinData();
        setData(res);
        setIsLive(true);

        const currentPrice = res.market_data.current_price.usd;
        const currentMC = res.market_data.market_cap.usd;
        const lastPoint = rawDataRef.current[rawDataRef.current.length - 1];
        
        const newPoint: ChartDataPoint = {
          time: Math.floor(Date.now() / 1000),
          open: lastPoint ? lastPoint.close : currentPrice,
          close: currentPrice,
          high: Math.max(lastPoint ? lastPoint.close : currentPrice, currentPrice),
          low: Math.min(lastPoint ? lastPoint.close : currentPrice, currentPrice),
          volume: (res.market_data.total_volume.usd / 1440) / 20, 
          marketCap: currentMC
        };
        
        const updatedRaw = [...rawDataRef.current, newPoint];
        if (updatedRaw.length > 5000) updatedRaw.shift();
        rawDataRef.current = updatedRaw;
        processDataForTimeframe(updatedRaw, timeframe);

      } catch (err) {
        setIsLive(false);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [timeframe, processDataForTimeframe]);

  const handleTimeframeChange = (tf: Timeframe) => {
    setTimeframe(tf);
    processDataForTimeframe(rawDataRef.current, tf);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Stats Row */}
        <StatsPanel data={data} loading={loading} />
        
        {/* Main Chart Section */}
        <div className="max-w-7xl mx-auto px-4 mb-20 animate-fade-in-up delay-300">
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            QUB/USDC Price Feed
                            {isLive && <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>}
                        </h3>
                        {data && <p className="text-2xl font-mono text-cyan-400 font-bold mt-1 flex items-center gap-2">
                            ${data.market_data.current_price.usd.toFixed(6)}
                            <span className={`text-sm ml-2 ${data.market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {data.market_data.price_change_percentage_24h >= 0 ? '+' : ''}
                                {data.market_data.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </p>}
                    </div>
                    <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        <TimeframeSelector selected={timeframe} onSelect={handleTimeframeChange} />
                    </div>
                </div>

                <div className="h-[350px] md:h-[500px] w-full bg-[#0b0e14] rounded-lg border border-slate-800/50 overflow-hidden relative">
                     {loading && chartData.candles.length === 0 ? (
                        <ChartSkeleton />
                     ) : (
                        <ChartContainer data={chartData} timeframe={timeframe} />
                     )}
                     
                     {/* Watermark */}
                     <div className="absolute bottom-4 left-4 pointer-events-none opacity-20">
                        <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                </div>
            </div>
        </div>

        <FeaturesSection />
        <ComputationSection />

        {/* CTA Section */}
        <div className="py-24 px-4 text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-6">Start Your Journey with Qubic MarketView</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join the Qubic community. Buy, trade, and earn with the native token of the Qubic network.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors transform hover:-translate-y-1">
                    Get Started
                </button>
                <button className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-colors transform hover:-translate-y-1">
                    Join Community
                </button>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default App;