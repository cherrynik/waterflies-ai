import { useCallback } from 'react';
import { useBrowserRecording } from './useBrowserRecording';
import { useRecordingTimer } from './useRecordingTimer';

export interface UseMeetingRecordingProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export interface UseMeetingRecordingReturn {
  // Recording state
  isRecording: boolean;
  recordingTime: number;
  isSupported: boolean;
  error: string | null;
  
  // Recording controls
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  downloadRecording: () => void;
  uploadRecording: (blob: Blob) => Promise<void>;
  
  // Timer controls
  resetTimer: () => void;
  
  // Audio stream controls
  updateAudioStream: (isAudioOn: boolean) => Promise<void>;
}

export function useMeetingRecording(props: UseMeetingRecordingProps = {}): UseMeetingRecordingReturn {
  const { onRecordingStart, onRecordingStop, onError } = props;

  // Browser recording hook
  const {
    isRecording: isBrowserRecording,
    isSupported,
    startRecording: startBrowserRecording,
    stopRecording: stopBrowserRecording,
    downloadRecording,
    uploadRecording,
    error,
    updateAudioStream,
  } = useBrowserRecording({
    onRecordingStart,
    onRecordingStop,
    onError,
  });

  // Timer hook
  const {
    recordingTime,
    isRecording: isTimerRecording,
    startRecording: startTimer,
    stopRecording: stopTimer,
    resetTimer,
  } = useRecordingTimer();

  // Combined start recording
  const startRecording = useCallback(async () => {
    try {
      await startBrowserRecording();
      startTimer();
    } catch {
      // Error is handled by useBrowserRecording
    }
  }, [startBrowserRecording, startTimer]);

  // Combined stop recording
  const stopRecording = useCallback(() => {
    stopBrowserRecording();
    stopTimer();
  }, [stopBrowserRecording, stopTimer]);

  return {
    isRecording: isBrowserRecording || isTimerRecording,
    recordingTime,
    isSupported,
    error,
    startRecording,
    stopRecording,
    downloadRecording,
    uploadRecording,
    resetTimer,
    updateAudioStream,
  };
}
