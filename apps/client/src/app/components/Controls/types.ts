export interface ControlsProps {
  isRecording: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
}
