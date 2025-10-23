export interface HeaderProps {
  isRecording: boolean;
  callEnded?: boolean;
  recordingTime?: number;
  hasRecording?: boolean;
  onDownloadRecording?: () => void;
  recordingEndTime?: string | null;
}
