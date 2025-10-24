export interface UseMeetingRecordingProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
  maxTimeSeconds?: number;
  warningTimeSeconds?: number;
  onTimeLimitWarning?: () => void;
  onTimeLimitReached?: () => void;
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
  
  // Time monitoring
  currentTime: number;
  maxTime: number;
  warningTime: number;
  showTimeWarning: boolean;
  timeLimitReached: boolean;
  getTimePercentage: () => number;
  getRemainingTime: () => number;
  getFormattedTime: (seconds: number) => string;
}
