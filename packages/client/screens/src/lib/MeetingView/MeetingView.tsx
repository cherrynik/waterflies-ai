import { VideoGrid, Controls } from '@waterflies/client/components';
import { MeetingViewProps } from './types';

export function MeetingView({ 
  participants, 
  isRecording, 
  isAudioOn,
  onStartRecording, 
  onStopRecording, 
  onEndCall,
  onToggleAudio
}: MeetingViewProps) {
  return (
    <div className="flex-1 flex flex-col">
      <VideoGrid 
        participants={participants} 
        isCurrentUserAudioOn={isAudioOn}
      />
      <Controls
        isRecording={isRecording}
        isAudioOn={isAudioOn}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        onEndCall={onEndCall}
        onToggleAudio={onToggleAudio}
      />
    </div>
  );
}
