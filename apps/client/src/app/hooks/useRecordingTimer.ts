import { useTimer } from './useTimer';
import { useRecording } from './useRecording';

export interface UseRecordingTimerReturn {
  recordingTime: number;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  resetTimer: () => void;
}

export function useRecordingTimer(): UseRecordingTimerReturn {
  const { time, start, stop, reset } = useTimer();
  const { isRecording, startRecording, stopRecording, resetRecording } = useRecording();

  const handleStartRecording = () => {
    startRecording();
    reset();
    start();
  };

  const handleStopRecording = () => {
    stopRecording();
    stop();
  };

  const handleResetTimer = () => {
    resetRecording();
    reset();
  };

  return {
    recordingTime: time,
    isRecording,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    resetTimer: handleResetTimer,
  };
}
