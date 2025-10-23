import { ParticipantTile } from '../ParticipantTile';
import { VideoGridProps } from './types';

export function VideoGrid({ participants, isCurrentUserAudioOn }: VideoGridProps) {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full p-2 sm:p-4 lg:p-6 gap-2 sm:gap-4 lg:gap-6">
      {participants.map((participant, index) => (
        <ParticipantTile
          key={participant.id}
          participant={participant}
          index={index}
          isCurrentUserAudioOn={isCurrentUserAudioOn}
        />
      ))}
    </div>
  );
}
