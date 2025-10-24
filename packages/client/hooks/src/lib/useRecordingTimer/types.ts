export interface UseRecordingTimerReturn {
  recordingTime: number;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  resetTimer: () => void;
}
