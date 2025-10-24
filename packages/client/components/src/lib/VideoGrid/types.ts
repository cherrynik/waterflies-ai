import { Participant } from '../ParticipantTile/types';

export interface VideoGridProps {
  participants: Participant[];
  isCurrentUserAudioOn?: boolean;
}
