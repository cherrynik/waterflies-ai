/**
 * Utility functions for media recorder functionality
 */

/**
 * Creates a MediaRecorder with default configuration
 */
export const createMediaRecorder = (stream: MediaStream): MediaRecorder => {
  return new MediaRecorder(stream, {
    mimeType: 'audio/webm',
  });
};

/**
 * Handles MediaRecorder data available event
 */
export const handleDataAvailable = (
  event: BlobEvent,
  recordedChunks: Blob[],
  onDataAvailable?: (data: Blob) => void
) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    onDataAvailable?.(event.data);
  }
};

/**
 * Handles MediaRecorder stop event
 */
export const handleStop = (
  recordedChunks: Blob[],
  onStop?: (blob: Blob) => void
) => {
  const blob = new Blob(recordedChunks, { type: 'audio/webm' });
  onStop?.(blob);
};

/**
 * Handles MediaRecorder error event
 */
export const handleError = (
  event: Event,
  onError?: (error: Error) => void
) => {
  const error = new Error(`MediaRecorder error: ${event}`);
  onError?.(error);
};
