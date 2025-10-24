export interface Participant {
  id: string;
  name: string;
  isAI?: boolean;
  isVideoOn?: boolean;
  isAudioOn?: boolean;
}

export interface MeetingViewProps {
  participants: Participant[];
  isRecording: boolean;
  isAudioOn: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onEndCall: () => void;
  onToggleAudio: () => void;
}
