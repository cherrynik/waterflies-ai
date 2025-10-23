import { Participant } from '../../types';

export interface ParticipantTileProps {
  participant: Participant;
  index: number;
  isCurrentUserVideoOn?: boolean;
  isCurrentUserAudioOn?: boolean;
}
