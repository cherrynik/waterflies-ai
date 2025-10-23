import { Participant } from '../../types';

export interface VideoGridProps {
  participants: Participant[];
  isCurrentUserAudioOn?: boolean;
}
