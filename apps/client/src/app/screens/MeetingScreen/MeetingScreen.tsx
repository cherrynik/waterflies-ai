import { useState, useCallback } from 'react';
import {
  Header,
  TranscriptView,
  Notification,
  TranscriptSkeleton,
} from '../../components';
import { MeetingView } from '../MeetingView';
import { PARTICIPANTS } from '../../constants';
import { useMeetingRecording, useAutoRecording } from '../../hooks';
import { useMediaControls } from '../../hooks/useMediaControls';
import { useRecordingState } from '../../hooks/useRecordingState';

export function MeetingScreen() {
  const [callEnded, setCallEnded] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [timeLimitReached, setTimeLimitReached] = useState(false);

  // Use the new recording state hook
  const {
    hasRecording,
    recordingEndTime,
    processingResult,
    saveRecording,
    downloadRecording: downloadLastRecording,
    uploadRecording: uploadLastRecording,
  } = useRecordingState();

  const { isAudioOn, toggleAudio, resetMedia } = useMediaControls({
    initialAudioOn: true,
  });

  const {
    recordingTime,
    isRecording,
    startRecording,
    stopRecording,
    resetTimer,
    updateAudioStream,
    currentTime,
    maxTime,
    getFormattedTime,
  } = useMeetingRecording({
    maxTimeSeconds: 60,
    warningTimeSeconds: 45,
    onRecordingStart: () => {
      console.log('Recording started');
    },
    onRecordingStop: (blob) => {
      console.log('Recording stopped, blob size:', blob.size);
      saveRecording(blob);
      uploadLastRecording().catch((error) => {
        console.error('Failed to upload recording:', error);
      });
    },
    onError: (error) => {
      console.error('Recording error:', error);
    },
    onTimeLimitWarning: () => {
      console.log('Time limit warning triggered');
      setShowTimeWarning(true);
    },
    onTimeLimitReached: () => {
      console.log('Time limit reached, ending call immediately');
      setTimeLimitReached(true);
      setShowTimeWarning(false);
      handleEndCall();
    },
  });

  const handleEndCall = async () => {
    setShowTimeWarning(false);
    stopRecording();
    setCallEnded(true);
  };

  const handleResetCall = () => {
    setCallEnded(false);
    setShowTimeWarning(false);
    setTimeLimitReached(false);
    resetAutoRecording();
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

  const handleStartRecording = useCallback(async () => {
    console.log('Starting new recording');

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
  }, [isAudioOn, toggleAudio, startRecording, updateAudioStream]);

  // Use auto recording hook
  const { resetAutoRecording } = useAutoRecording({
    onStartRecording: handleStartRecording,
  });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        isRecording={isRecording}
        callEnded={callEnded}
        recordingTime={recordingTime}
        hasRecording={hasRecording}
        onDownloadRecording={downloadLastRecording}
        recordingEndTime={recordingEndTime}
      />

      <Notification
        isVisible={showTimeWarning}
        title={
          timeLimitReached ? 'Demo Time Limit Reached' : 'Demo Time Warning'
        }
        message={
          timeLimitReached
            ? `Demo recording has reached the 1-minute limit. Call is ending and will be processed automatically.`
            : `Demo recording time is running out (${getFormattedTime(
                currentTime
              )}/${getFormattedTime(
                maxTime
              )}). Please be aware that recording will stop automatically when the 1-minute demo limit is reached.`
        }
        type={timeLimitReached ? 'error' : 'warning'}
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
        ) : processingResult ? (
          <TranscriptView
            transcript={[
              {
                speaker: 'AI Transcription',
                text: processingResult.transcript,
                timestamp: recordingEndTime || '',
              },
            ]}
            summary={processingResult.summary}
            actionItems={processingResult.actionItems.items}
            onNewCall={handleResetCall}
          />
        ) : (
          <TranscriptSkeleton />
        )}
      </div>
    </div>
  );
}

export default MeetingScreen;
