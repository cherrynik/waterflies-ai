import { useState, useCallback, useEffect } from 'react';
import { useMediaRecorder } from '../useMediaRecorder';
import { useAudioStream } from '../useAudioStream';
import { useFileOperations } from '../useFileOperations';
import { UseBrowserRecordingProps, UseBrowserRecordingReturn } from './types';
import { checkRecordingSupport, handleRecordingError } from './utils';

export function useBrowserRecording(props: UseBrowserRecordingProps = {}): UseBrowserRecordingReturn {
  const { 
    onRecordingStart, 
    onRecordingStop, 
    onError
  } = props;
  
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Note: Size limit functionality removed in favor of time-based limits

  // Use audio stream hook
  const audioStream = useAudioStream({
    onError: (err) => {
      setError(err.message);
      onError?.(err);
    },
  });

  // Use media recorder hook
  const mediaRecorder = useMediaRecorder({
    onDataAvailable: () => {
      // Data available - could be used for size monitoring if needed
    },
    onStop: (blob) => {
      onRecordingStop?.(blob);
    },
    onError: (err) => {
      setError(err.message);
      onError?.(err);
    },
  });

  // Use file operations hook
  const fileOperations = useFileOperations({
    onError: (err) => {
      setError(err.message);
      onError?.(err);
    },
  });

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      
      // Request audio access
      const stream = await audioStream.requestAudioAccess();
      
      // Setup media recorder with the stream
      mediaRecorder.setupMediaRecorder(stream);
      mediaRecorder.resetRecording();
      
      // Start recording
      mediaRecorder.startRecording();
      setIsRecording(true);
      onRecordingStart?.();

    } catch (err) {
      const error = handleRecordingError(err, 'Failed to start recording', onError);
      setError(error.message);
    }
  }, [audioStream, mediaRecorder, onRecordingStart, onError]);

  const stopRecording = useCallback(() => {
    if (isRecording) {
      mediaRecorder.stopRecording();
      setIsRecording(false);
    }
    
    // Stop audio stream
    audioStream.stopStream();
  }, [isRecording, mediaRecorder, audioStream]);

  const downloadRecording = useCallback(() => {
    // This would need to be implemented with a stored blob reference
    // For now, this is a placeholder
    console.warn('Download recording not implemented in refactored version');
  }, []);

  const uploadRecording = useCallback(async (blob: Blob) => {
    try {
      // Use the file operations hook for upload
      await fileOperations.uploadFile(blob, 'http://localhost:3000/api/recording/process');
    } catch (err) {
      const error = handleRecordingError(err, 'Upload failed', onError);
      setError(error.message);
    }
  }, [fileOperations, onError]);

  const updateAudioStream = useCallback(async (newIsAudioOn: boolean) => {
    if (!isRecording) {
      return;
    }

    try {
      await audioStream.updateAudioState(newIsAudioOn);
    } catch (err) {
      const error = handleRecordingError(err, 'Failed to update audio stream', onError);
      setError(error.message);
    }
  }, [isRecording, audioStream, onError]);

  // Check support on mount
  useEffect(() => {
    setIsSupported(checkRecordingSupport());
  }, []);

  return {
    isRecording,
    isSupported,
    startRecording,
    stopRecording,
    downloadRecording,
    uploadRecording,
    error,
    updateAudioStream,
  };
}
