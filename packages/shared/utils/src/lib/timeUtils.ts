/**
 * Utility functions for time formatting and manipulation
 */

/**
 * Format current time as HH:MM in 24-hour format
 */
export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Format recording time from seconds to MM:SS
 */
export const formatRecordingTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Get a human-readable timestamp
 */
export const getTimestamp = (): string => {
  return new Date().toISOString().slice(0, 19).replace(/:/g, '-');
};
