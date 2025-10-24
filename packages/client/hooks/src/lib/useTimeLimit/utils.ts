/**
 * Utility functions for time limit management
 */

/**
 * Calculates time percentage based on current time and max time
 */
export const calculateTimePercentage = (currentTime: number, maxTime: number): number => {
  return Math.round((currentTime / maxTime) * 100);
};

/**
 * Calculates remaining time
 */
export const calculateRemainingTime = (currentTime: number, maxTime: number): number => {
  return Math.max(0, maxTime - currentTime);
};

/**
 * Formats seconds into MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Checks if warning should be shown
 */
export const shouldShowWarning = (currentTime: number, warningTime: number, hasTriggeredWarning: boolean): boolean => {
  return currentTime >= warningTime && !hasTriggeredWarning;
};

/**
 * Checks if time limit has been reached
 */
export const isTimeLimitReached = (currentTime: number, maxTime: number): boolean => {
  return currentTime >= maxTime;
};
