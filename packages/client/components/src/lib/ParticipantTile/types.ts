export interface Participant {
  id: string;
  name: string;
  isAI?: boolean;
  isVideoOn?: boolean;
  isAudioOn?: boolean;
}

export interface ParticipantTileProps {
  participant: Participant;
  index: number;
  isCurrentUserAudioOn?: boolean;
}
