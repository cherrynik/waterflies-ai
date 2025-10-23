import { Participant } from '../../types';

export interface MeetingViewProps {
  participants: Participant[];
  isRecording: boolean;
  isAudioOn: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onEndCall: () => void;
  onToggleAudio: () => void;
}
