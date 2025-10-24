/**
 * Utility functions for audio stream management
 */

/**
 * Checks if audio tracks are enabled in a stream
 */
export const isAudioEnabled = (stream: MediaStream | null): boolean => {
  if (!stream) return false;
  const audioTracks = stream.getAudioTracks();
  return audioTracks.length > 0 && audioTracks.some(track => track.enabled);
};

/**
 * Gets audio tracks from a stream
 */
export const getAudioTracks = (stream: MediaStream) => {
  return stream.getAudioTracks();
};

/**
 * Enables or disables audio tracks
 */
export const setAudioTracksEnabled = (stream: MediaStream, enabled: boolean) => {
  const audioTracks = getAudioTracks(stream);
  audioTracks.forEach(track => {
    track.enabled = enabled;
  });
};

/**
 * Gets disabled audio tracks from a stream
 */
export const getDisabledAudioTracks = (stream: MediaStream) => {
  const audioTracks = getAudioTracks(stream);
  return audioTracks.filter(track => !track.enabled);
};

/**
 * Adds tracks from one stream to another
 */
export const addTracksToStream = (sourceStream: MediaStream, targetStream: MediaStream) => {
  sourceStream.getTracks().forEach(track => {
    targetStream.addTrack(track);
  });
};
