import { useRef, useCallback } from 'react';
import { UseMediaRecorderProps, UseMediaRecorderReturn } from './types';
import { createMediaRecorder, handleDataAvailable, handleStop, handleError } from './utils';

export function useMediaRecorder({
  onDataAvailable,
  onStop,
  onError,
}: UseMediaRecorderProps = {}): UseMediaRecorderReturn {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const setupMediaRecorder = useCallback((stream: MediaStream) => {
    const mediaRecorder = createMediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      handleDataAvailable(event, recordedChunksRef.current, onDataAvailable);
    };

    mediaRecorder.onstop = () => {
      handleStop(recordedChunksRef.current, onStop);
    };

    mediaRecorder.onerror = (event) => {
      handleError(event, onError);
    };

    mediaRecorderRef.current = mediaRecorder;
  }, [onDataAvailable, onStop, onError]);

  const startRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start(1000); // Collect data every second
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const resetRecording = useCallback(() => {
    recordedChunksRef.current = [];
  }, []);

  return {
    mediaRecorder: mediaRecorderRef.current,
    recordedChunks: recordedChunksRef.current,
    setupMediaRecorder,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
