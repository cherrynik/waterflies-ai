import { useState, useEffect, useRef, useCallback } from 'react';
import { UseAutoRecordingProps, UseAutoRecordingReturn } from './types';
import {
  requestMicrophonePermission,
  stopStreamTracks,
  handleMicrophoneError,
} from './utils';

export function useAutoRecording({
  onStartRecording,
}: UseAutoRecordingProps): UseAutoRecordingReturn {
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [autoRecordingStarted, setAutoRecordingStarted] = useState(false);
  const initializationStarted = useRef(false);

  const requestMicPermissionAndStartRecording = useCallback(async () => {
    try {
      const stream = await requestMicrophonePermission();
      setMicPermissionGranted(true);

      // Stop the test stream
      stopStreamTracks(stream);

      // Start recording automatically
      console.log('Starting automatic recording...');
      await onStartRecording();
      setAutoRecordingStarted(true);
    } catch (error) {
      handleMicrophoneError(error);
    }
  }, [onStartRecording]);

  // Auto-request microphone permission and start recording on component mount
  useEffect(() => {
    // Only run once on mount or when reset
    if (
      typeof window !== 'undefined' &&
      navigator?.mediaDevices &&
      !initializationStarted.current &&
      !micPermissionGranted &&
      !autoRecordingStarted
    ) {
      initializationStarted.current = true;
      requestMicPermissionAndStartRecording();
    }
  }, [micPermissionGranted, autoRecordingStarted, window, navigator]); // Add dependencies to re-run when reset

  const resetAutoRecording = useCallback(() => {
    setMicPermissionGranted(false);
    setAutoRecordingStarted(false);
    initializationStarted.current = false;
  }, []);

  return {
    micPermissionGranted,
    autoRecordingStarted,
    resetAutoRecording,
  };
}
