import { VideoGrid, Controls } from '../../components';
import { MeetingViewProps } from './types';

export function MeetingView({ 
  participants, 
  isRecording, 
  isVideoOn,
  isAudioOn,
  onStartRecording, 
  onStopRecording, 
  onEndCall,
  onToggleVideo,
  onToggleAudio
}: MeetingViewProps) {
  return (
    <div className="flex-1 flex flex-col">
      <VideoGrid 
        participants={participants} 
        isCurrentUserVideoOn={isVideoOn}
        isCurrentUserAudioOn={isAudioOn}
      />
      <Controls
        isRecording={isRecording}
        isVideoOn={isVideoOn}
        isAudioOn={isAudioOn}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        onEndCall={onEndCall}
        onToggleVideo={onToggleVideo}
        onToggleAudio={onToggleAudio}
      />
    </div>
  );
}
