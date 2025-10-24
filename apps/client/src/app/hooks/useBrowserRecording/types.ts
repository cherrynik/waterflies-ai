export interface UseBrowserRecordingProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export interface UseBrowserRecordingReturn {
  isRecording: boolean;
  isSupported: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  downloadRecording: () => void;
  uploadRecording: (blob: Blob) => Promise<void>;
  error: string | null;
  updateAudioStream: (isAudioOn: boolean) => Promise<void>;
}
