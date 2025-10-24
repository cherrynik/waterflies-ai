import { useState } from 'react';
import { UseRecordingReturn } from './types';

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
