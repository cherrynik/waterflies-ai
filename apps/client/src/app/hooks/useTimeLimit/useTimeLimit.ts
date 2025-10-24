import { useState, useCallback, useRef, useEffect } from 'react';
import { UseTimeLimitProps, UseTimeLimitReturn } from './types';
import { calculateTimePercentage, calculateRemainingTime, formatTime, shouldShowWarning, isTimeLimitReached } from './utils';

export function useTimeLimit({
  maxTimeSeconds = 60, // 1 minute default
  warningTimeSeconds = 45, // Warning at 45 seconds
  onTimeLimitWarning,
  onTimeLimitReached,
}: UseTimeLimitProps = {}): UseTimeLimitReturn {
  const [currentTime, setCurrentTime] = useState(0);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [timeLimitReached, setTimeLimitReached] = useState(false);
  
  const maxTime = maxTimeSeconds;
  const warningTime = warningTimeSeconds;
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredWarning = useRef(false);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentTime(0);
    setShowTimeWarning(false);
    setTimeLimitReached(false);
    hasTriggeredWarning.current = false;
    
    intervalRef.current = setInterval(() => {
      setCurrentTime(prevTime => {
        const newTime = prevTime + 1;
        
        // Check if we should show warning
        if (shouldShowWarning(newTime, warningTime, hasTriggeredWarning.current)) {
          setShowTimeWarning(true);
          hasTriggeredWarning.current = true;
          onTimeLimitWarning?.();
        }
        
        // Check if limit is reached
        if (isTimeLimitReached(newTime, maxTime) && !timeLimitReached) {
          setTimeLimitReached(true);
          onTimeLimitReached?.();
        }
        
        return newTime;
      });
    }, 1000);
  }, [warningTime, maxTime, timeLimitReached, onTimeLimitWarning, onTimeLimitReached]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setCurrentTime(0);
    setShowTimeWarning(false);
    setTimeLimitReached(false);
    hasTriggeredWarning.current = false;
  }, [stopTimer]);

  const getTimePercentage = useCallback(() => {
    return calculateTimePercentage(currentTime, maxTime);
  }, [currentTime, maxTime]);

  const getRemainingTime = useCallback(() => {
    return calculateRemainingTime(currentTime, maxTime);
  }, [currentTime, maxTime]);

  const getFormattedTime = useCallback((seconds: number) => {
    return formatTime(seconds);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentTime,
    maxTime,
    warningTime,
    showTimeWarning,
    timeLimitReached,
    startTimer,
    stopTimer,
    resetTimer,
    getTimePercentage,
    getRemainingTime,
    getFormattedTime,
  };
}
