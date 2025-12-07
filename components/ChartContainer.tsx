import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { 
  createChart, 
  IChartApi, 
  ISeriesApi, 
  CandlestickData, 
  LineData, 
  HistogramData,
  Time, 
  LineSeries, 
  CandlestickSeries, 
  HistogramSeries,
  ColorType 
} from 'lightweight-charts';
import { ChartState, Timeframe } from '../types';
import { COLORS } from '../constants';

interface ChartContainerProps {
  data: ChartState;
  timeframe: Timeframe;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ data, timeframe }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const marketCapSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  // Initialize Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: COLORS.textColor,
      },
      grid: {
        vertLines: { color: 'rgba(30, 41, 59, 0.5)' }, // fainter grid
        horzLines: { color: 'rgba(30, 41, 59, 0.5)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: timeframe === Timeframe.M1 || timeframe === Timeframe.M5,
        borderColor: COLORS.grid,
      },
      rightPriceScale: {
        borderColor: COLORS.grid,
        visible: true,
      },
      leftPriceScale: {
        visible: true,
        borderColor: COLORS.grid,
      },
    });

    chartApiRef.current = chart;

    // 1. Market Cap Series (Line) - On Left Scale
    const mcSeries = chart.addSeries(LineSeries, {
      color: 'rgba(99, 102, 241, 0.5)', // faded indigo
      lineWidth: 2,
      priceScaleId: 'left',
      lineStyle: 0,
      crosshairMarkerVisible: false,
    });
    marketCapSeriesRef.current = mcSeries;

    // 2. Volume Series (Histogram) - Overlay at Bottom
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', 
    });
    
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    volumeSeriesRef.current = volumeSeries;

    // 3. Candlestick Series - On Right Scale (Main)
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#06b6d4', // Cyan-500 for up
      downColor: '#3b82f6', // Blue-500 for down (keeping the cold theme)
      borderVisible: false,
      wickUpColor: '#06b6d4',
      wickDownColor: '#3b82f6',
    });
    candleSeriesRef.current = candleSeries;

    // Responsive sizing
    const handleResize = () => {
      if (chartContainerRef.current && chartApiRef.current) {
        chartApiRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  // Update Data
  useEffect(() => {
    if (!chartApiRef.current || !candleSeriesRef.current || !marketCapSeriesRef.current || !volumeSeriesRef.current) return;

    if (data.candles.length === 0) return;

    const candleData: CandlestickData[] = data.candles.map(d => ({
      time: d.time as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close
    }));

    const mcData: LineData[] = data.marketCaps.map(d => ({
      time: d.time as Time,
      value: d.value
    }));

    const volData: HistogramData[] = data.volumes.map(d => ({
      time: d.time as Time,
      value: d.value,
      color: d.color === COLORS.volumeUp ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.3)',
    }));

    candleSeriesRef.current.setData(candleData);
    marketCapSeriesRef.current.setData(mcData);
    volumeSeriesRef.current.setData(volData);
    
  }, [data]);

  return (
    <div className="relative w-full h-full">
       <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default ChartContainer;