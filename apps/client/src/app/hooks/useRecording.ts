import { useState } from 'react';

export interface UseRecordingReturn {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  resetRecording: () => void;
}

export function useRecording(): UseRecordingReturn {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const resetRecording = () => {
    setIsRecording(false);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
