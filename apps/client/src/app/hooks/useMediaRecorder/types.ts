export interface UseMediaRecorderProps {
  onDataAvailable?: (data: Blob) => void;
  onStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export interface UseMediaRecorderReturn {
  mediaRecorder: MediaRecorder | null;
  recordedChunks: Blob[];
  setupMediaRecorder: (stream: MediaStream) => void;
  startRecording: () => void;
  stopRecording: () => void;
  resetRecording: () => void;
}
