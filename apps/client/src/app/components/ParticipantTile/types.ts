import { Participant } from '../../types';

export interface ParticipantTileProps {
  participant: Participant;
  index: number;
  isCurrentUserAudioOn?: boolean;
}
