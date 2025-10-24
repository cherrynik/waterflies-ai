export interface ControlsProps {
  isRecording: boolean;
  isAudioOn: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onEndCall: () => void;
  onToggleAudio: () => void;
}
