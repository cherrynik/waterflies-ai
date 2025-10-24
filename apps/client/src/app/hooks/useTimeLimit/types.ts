export interface UseTimeLimitProps {
  maxTimeSeconds?: number;
  warningTimeSeconds?: number;
  onTimeLimitWarning?: () => void;
  onTimeLimitReached?: () => void;
}

export interface UseTimeLimitReturn {
  currentTime: number;
  maxTime: number;
  warningTime: number;
  showTimeWarning: boolean;
  timeLimitReached: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  getTimePercentage: () => number;
  getRemainingTime: () => number;
  getFormattedTime: (seconds: number) => string;
}
