import { Participant } from '../../types';

export interface VideoGridProps {
  participants: Participant[];
  isCurrentUserVideoOn?: boolean;
  isCurrentUserAudioOn?: boolean;
}
