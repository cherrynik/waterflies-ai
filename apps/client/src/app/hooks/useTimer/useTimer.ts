import { useState, useEffect } from 'react';
import { UseTimerReturn } from './types';

export function useTimer(): UseTimerReturn {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
  };
}
