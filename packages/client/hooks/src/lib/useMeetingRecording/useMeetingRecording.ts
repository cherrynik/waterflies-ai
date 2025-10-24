import { useCallback } from 'react';
import { useBrowserRecording } from '../useBrowserRecording';
import { useRecordingTimer } from '../useRecordingTimer';
import { useTimeLimit } from '../useTimeLimit';
import { UseMeetingRecordingProps, UseMeetingRecordingReturn } from './types';

export function useMeetingRecording(props: UseMeetingRecordingProps = {}): UseMeetingRecordingReturn {
  const { 
    onRecordingStart, 
    onRecordingStop, 
    onError, 
    maxTimeSeconds = 60,
    warningTimeSeconds = 45,
    onTimeLimitWarning, 
    onTimeLimitReached 
  } = props;

  // Time limit hook
  const timeLimit = useTimeLimit({
    maxTimeSeconds,
    warningTimeSeconds,
    onTimeLimitWarning,
    onTimeLimitReached,
  });

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
      timeLimit.startTimer(); // Start time limit monitoring
    } catch {
      // Error is handled by useBrowserRecording
    }
  }, [startBrowserRecording, startTimer, timeLimit]);

  // Combined stop recording
  const stopRecording = useCallback(() => {
    stopBrowserRecording();
    stopTimer();
    timeLimit.stopTimer(); // Stop time limit monitoring
  }, [stopBrowserRecording, stopTimer, timeLimit]);

  // Combined reset timer
  const resetTimerCombined = useCallback(() => {
    resetTimer();
    timeLimit.resetTimer(); // Reset time limit monitoring
  }, [resetTimer, timeLimit]);

  return {
    isRecording: isBrowserRecording || isTimerRecording,
    recordingTime,
    isSupported,
    error,
    startRecording,
    stopRecording,
    downloadRecording,
    uploadRecording,
    resetTimer: resetTimerCombined,
    updateAudioStream,
    currentTime: timeLimit.currentTime,
    maxTime: timeLimit.maxTime,
    warningTime: timeLimit.warningTime,
    showTimeWarning: timeLimit.showTimeWarning,
    timeLimitReached: timeLimit.timeLimitReached,
    getTimePercentage: timeLimit.getTimePercentage,
    getRemainingTime: timeLimit.getRemainingTime,
    getFormattedTime: timeLimit.getFormattedTime,
  };
}
