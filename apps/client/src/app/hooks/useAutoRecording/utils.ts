/**
 * Utility functions for auto recording functionality
 */

/**
 * Requests microphone permission and returns a test stream
 */
export const requestMicrophonePermission = async (): Promise<MediaStream> => {
  console.log('Requesting microphone permission...');
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  console.log('Microphone permission granted');
  return stream;
};

/**
 * Stops all tracks in a stream
 */
export const stopStreamTracks = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => track.stop());
};

/**
 * Handles microphone permission errors
 */
export const handleMicrophoneError = (error: unknown) => {
  console.error('Failed to get microphone permission:', error);
  // Handle permission denied or other errors
};
