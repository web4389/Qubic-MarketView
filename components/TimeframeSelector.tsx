import React from 'react';
import { Timeframe } from '../types';

interface TimeframeSelectorProps {
  selected: Timeframe;
  onSelect: (tf: Timeframe) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-2">
      {Object.values(Timeframe).map((tf) => (
        <button
          key={tf}
          onClick={() => onSelect(tf)}
          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
            selected === tf
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {tf.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;