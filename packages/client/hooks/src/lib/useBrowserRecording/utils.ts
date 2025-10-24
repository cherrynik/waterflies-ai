/**
 * Utility functions for browser recording functionality
 */

/**
 * Checks if browser supports required recording features
 */
export const checkRecordingSupport = (): boolean => {
  const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasMediaRecorder = typeof window !== 'undefined' && 'MediaRecorder' in window;
  return hasMediaDevices && hasMediaRecorder;
};

/**
 * Creates a standardized error from unknown error types
 */
export const createStandardError = (error: unknown, defaultMessage: string): Error => {
  return error instanceof Error ? error : new Error(defaultMessage);
};

/**
 * Handles recording errors with consistent error handling
 */
export const handleRecordingError = (
  error: unknown,
  defaultMessage: string,
  onError?: (error: Error) => void
): Error => {
  const err = createStandardError(error, defaultMessage);
  onError?.(err);
  return err;
};
