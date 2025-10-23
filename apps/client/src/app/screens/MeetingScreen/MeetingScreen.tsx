import { useState } from 'react';
import { Header, TranscriptView } from '../../components';
import { MeetingView } from '../MeetingView';
import { PARTICIPANTS, MOCK_TRANSCRIPT, MOCK_SUMMARY, MOCK_ACTION_ITEMS } from '../../constants';
import { useMeetingRecording, useMediaControls } from '../../hooks';

export function MeetingScreen() {
  const [callEnded, setCallEnded] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingEndTime, setRecordingEndTime] = useState<string | null>(null);

  const {
    isAudioOn,
    toggleAudio,
    resetMedia,
  } = useMediaControls({
    initialAudioOn: false,
  });
  
  const {
    recordingTime,
    isRecording,
    startRecording,
    stopRecording,
    downloadRecording,
    uploadRecording,
    resetTimer,
    updateAudioStream,
  } = useMeetingRecording({
    onRecordingStart: () => {
      console.log('Recording started');
    },
    onRecordingStop: (blob) => {
      console.log('Recording stopped, blob size:', blob.size);
      
      // Save the recording end time
      const endTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setRecordingEndTime(endTime);
      console.log('Recording ended at:', endTime);
      
      // Reset hasRecording to false first, then set to true after a brief delay
      // This ensures the old "Download Last" disappears and new one appears
      setHasRecording(false);
      console.log('hasRecording reset to false');
      
      // Set hasRecording to true after a brief delay to show new recording
      setTimeout(() => {
        setHasRecording(true);
        console.log('hasRecording set to true for new recording');
      }, 100);
      
      // Auto-download the recording
      setTimeout(() => {
        downloadRecording();
      }, 500); // Small delay to ensure blob is ready
      
      // Upload to backend (placeholder)
      setTimeout(async () => {
        try {
          await uploadRecording(blob);
        } catch (error) {
          console.error('Failed to upload recording:', error);
        }
      }, 1000); // Upload after download
    },
    onError: (error) => {
      console.error('Recording error:', error);
    },
  });

  const handleEndCall = () => {
    setCallEnded(true);
    stopRecording();
  };

  const handleResetCall = () => {
    setCallEnded(false);
    setHasRecording(false);
    resetTimer();
    resetMedia();
  };

  const handleToggleAudio = async () => {
    const newAudioState = !isAudioOn;
    toggleAudio();
    
    // Update audio stream during recording
    if (isRecording) {
      await updateAudioStream(newAudioState);
    }
  };

  const handleStartRecording = async () => {
    // Don't reset hasRecording when starting new recording
    // It will be reset only after the new recording is completed
    console.log('Starting new recording, keeping previous hasRecording state');
    
    // Remember the original audio state
    const wasAudioOff = !isAudioOn;
    
    // Always start recording with audio enabled, regardless of UI state
    if (wasAudioOff) {
      toggleAudio(); // Enable audio in UI
    }
    
    startRecording().finally(() => {
      if (wasAudioOff) {
        updateAudioStream(false);
        toggleAudio();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        isRecording={isRecording} 
        callEnded={callEnded} 
        recordingTime={recordingTime}
        hasRecording={hasRecording}
        onDownloadRecording={downloadRecording}
        recordingEndTime={recordingEndTime}
      />
      
      <div className="flex-1 flex">
        {!callEnded ? (
          <MeetingView
            participants={[...PARTICIPANTS]}
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={stopRecording}
            onEndCall={handleEndCall}
            isAudioOn={isAudioOn}
            onToggleAudio={handleToggleAudio}
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
