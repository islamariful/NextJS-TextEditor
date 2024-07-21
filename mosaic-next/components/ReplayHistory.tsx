'use client';

import { useState, useEffect, useRef } from 'react';
import { Slider } from '@mui/material';
import { Play, Pause, X, SkipBack, SkipForward } from 'lucide-react';

interface ReplayHistoryProps {
  history: { content: string; timestamp: Date }[];
  onSliderChange: (index: number) => void;
  onDismiss: () => void;
  onPausePlay: () => void;
  isPlaying: boolean;
}

const ReplayHistory: React.FC<ReplayHistoryProps> = ({ history, onSliderChange, onDismiss, onPausePlay, isPlaying }) => {
  const [value, setValue] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setValue(prev => {
          const nextValue = prev + 1;
          if (nextValue < history.length) {
            onSliderChange(nextValue);
            return nextValue;
          } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            return prev;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPlaying, history.length, onSliderChange]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
    onSliderChange(newValue as number);
  };

  const skipToStart = () => {
    setValue(0);
    onSliderChange(0);
  };

  const skipToEnd = () => {
    const lastIndex = history.length - 1;
    setValue(lastIndex);
    onSliderChange(lastIndex);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-12">
          <button onClick={skipToStart} className="text-blue-500">
            <SkipBack size={24} />
          </button>
          <button onClick={onPausePlay} className="text-blue-500">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={skipToEnd} className="text-blue-500">
            <SkipForward size={24} />
          </button>
        </div>
        <button onClick={onDismiss} className="text-red-500">
          <X size={24} />
        </button>
      </div>
      <Slider
        value={value}
        onChange={handleSliderChange}
        step={1}
        min={0}
        max={history.length - 1}
        className="mb-4"
      />
      <div className="flex-1 overflow-auto p-4 border border-gray-700 rounded-lg bg-gray-900">
        <div dangerouslySetInnerHTML={{ __html: history[value]?.content || '' }} />
      </div>
    </div>
  );
};

export default ReplayHistory;
