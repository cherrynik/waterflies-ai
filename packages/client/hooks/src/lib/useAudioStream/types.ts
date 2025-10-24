export interface UseAudioStreamProps {
  onStreamChange?: (stream: MediaStream | null) => void;
  onError?: (error: Error) => void;
}

export interface UseAudioStreamReturn {
  stream: MediaStream | null;
  requestAudioAccess: () => Promise<MediaStream>;
  updateAudioState: (isAudioOn: boolean) => Promise<void>;
  stopStream: () => void;
  isAudioEnabled: () => boolean;
}
