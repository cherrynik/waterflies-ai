export interface UseAutoRecordingProps {
  onStartRecording: () => Promise<void>;
}

export interface UseAutoRecordingReturn {
  micPermissionGranted: boolean;
  autoRecordingStarted: boolean;
  resetAutoRecording: () => void;
}
