import { useState } from 'react';
import { Header, TranscriptView } from '../../components';
import { MeetingView } from '../MeetingView';
import { PARTICIPANTS, MOCK_TRANSCRIPT, MOCK_SUMMARY, MOCK_ACTION_ITEMS } from '../../constants';
import { useRecordingTimer, useMediaControls } from '../../hooks';

export function MeetingScreen() {
  const [callEnded, setCallEnded] = useState(false);
  
  const {
    recordingTime,
    isRecording,
    startRecording,
    stopRecording,
    resetTimer,
  } = useRecordingTimer();

  const {
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    resetMedia,
  } = useMediaControls({
    initialVideoOn: true,
    initialAudioOn: true,
  });

  const handleEndCall = () => {
    setCallEnded(true);
    stopRecording();
  };

  const handleResetCall = () => {
    setCallEnded(false);
    resetTimer();
    resetMedia();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        isRecording={isRecording} 
        callEnded={callEnded} 
        recordingTime={recordingTime} 
      />
      
      <div className="flex-1 flex">
        {!callEnded ? (
          <MeetingView
            participants={[...PARTICIPANTS]}
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onEndCall={handleEndCall}
            isVideoOn={isVideoOn}
            isAudioOn={isAudioOn}
            onToggleVideo={toggleVideo}
            onToggleAudio={toggleAudio}
          />
        ) : (
          <TranscriptView
            transcript={[...MOCK_TRANSCRIPT]}
            summary={MOCK_SUMMARY}
            actionItems={[...MOCK_ACTION_ITEMS]}
            onNewCall={handleResetCall}
          />
        )}
      </div>
    </div>
  );
}

export default MeetingScreen;
