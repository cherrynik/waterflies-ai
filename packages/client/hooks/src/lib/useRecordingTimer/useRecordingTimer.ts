import { useTimer } from '../useTimer';
import { useRecording } from '../useRecording';
import { UseRecordingTimerReturn } from './types';

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
