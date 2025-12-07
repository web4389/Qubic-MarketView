import React from 'react';

const ChartSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden flex">
      {/* Chart Area */}
      <div className="flex-1 relative flex flex-col">
        {/* Horizontal Grid Lines & Skeletons */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-1 border-b border-slate-800/50 relative group">
            {/* Random "Candle" placeholders scatter across the grid line */}
            <div className="absolute inset-0 flex items-end justify-around px-4 opacity-20">
              {[...Array(8)].map((_, j) => (
                <div 
                  key={j} 
                  className="w-8 bg-slate-700/50 rounded-sm animate-pulse"
                  style={{ 
                    height: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${j * 100}ms`
                  }} 
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Time Axis (Bottom) */}
        <div className="h-8 border-t border-slate-800 flex justify-between items-center px-4">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="h-3 w-12 bg-slate-800 rounded animate-pulse" />
           ))}
        </div>
      </div>

      {/* Price Axis (Right) */}
      <div className="w-14 border-l border-slate-800 flex flex-col justify-between py-4 items-center bg-slate-900/20">
         {[...Array(8)].map((_, i) => (
            <div key={i} className="h-3 w-8 bg-slate-800 rounded animate-pulse" />
         ))}
      </div>
      
      {/* Loading Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/10 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-2xl backdrop-blur-md">
            <div className="relative">
                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-slate-200">Initializing Data</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Fetching history & calculating candles...</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ChartSkeleton;