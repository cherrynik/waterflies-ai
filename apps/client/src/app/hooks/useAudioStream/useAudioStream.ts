import { useRef, useCallback } from 'react';
import { UseAudioStreamProps, UseAudioStreamReturn } from './types';
import { isAudioEnabled, setAudioTracksEnabled, getDisabledAudioTracks, addTracksToStream } from './utils';

export function useAudioStream({
  onStreamChange,
  onError,
}: UseAudioStreamProps = {}): UseAudioStreamReturn {
  const streamRef = useRef<MediaStream | null>(null);

  const requestAudioAccess = useCallback(async (): Promise<MediaStream> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      onStreamChange?.(stream);
      return stream;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to access microphone');
      onError?.(err);
      throw err;
    }
  }, [onStreamChange, onError]);

  const updateAudioState = useCallback(async (isAudioOn: boolean) => {
    if (!streamRef.current) {
      return;
    }

    try {
      const hasAudio = isAudioEnabled(streamRef.current);

      // If turning off audio, just disable the audio track
      if (!isAudioOn && hasAudio) {
        setAudioTracksEnabled(streamRef.current, false);
        return;
      }

      // If turning on audio, either enable existing track or add new one
      if (isAudioOn && !hasAudio) {
        // First try to enable existing disabled tracks
        const disabledAudioTracks = getDisabledAudioTracks(streamRef.current);
        if (disabledAudioTracks.length > 0) {
          setAudioTracksEnabled(streamRef.current, true);
          return;
        }

        // If no disabled tracks, get new audio stream
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Add new audio track to existing stream
        addTracksToStream(newStream, streamRef.current);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to update audio stream');
      onError?.(err);
      throw err;
    }
  }, [onError]);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      onStreamChange?.(null);
    }
  }, [onStreamChange]);

  const isAudioEnabledCallback = useCallback((): boolean => {
    return isAudioEnabled(streamRef.current);
  }, []);

  return {
    stream: streamRef.current,
    requestAudioAccess,
    updateAudioState,
    stopStream,
    isAudioEnabled: isAudioEnabledCallback,
  };
}
