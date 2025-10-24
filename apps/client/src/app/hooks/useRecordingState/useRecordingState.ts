import { useState, useCallback } from 'react';
import { RecordingService } from '../../services';
import { ProcessingResult } from '../../services/recordingService/types';
import { UseRecordingStateReturn } from './types';
import { handleProcessingError } from './utils';

export function useRecordingState(): UseRecordingStateReturn {
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingEndTime, setRecordingEndTime] = useState<string | null>(null);
  const [processingResult, setProcessingResult] =
    useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);

  const recordingService = RecordingService.getInstance();

  const saveRecording = useCallback(
    (blob: Blob) => {
      const recordingData = recordingService.saveRecording(blob);
      setRecordingEndTime(recordingData.endTime);
      setHasRecording(true);
      // Reset processing state when new recording is saved
      setProcessingResult(null);
      setProcessingError(null);
    },
    [recordingService]
  );

  const downloadRecording = useCallback(() => {
    recordingService.downloadRecording();
  }, [recordingService]);

  const uploadRecording = useCallback(async () => {
    setIsProcessing(true);
    setProcessingError(null);

    try {
      const result = await recordingService.uploadRecording();
      setProcessingResult(result);
      console.log('Processing completed:', result);
    } catch (error) {
      const errorMessage = handleProcessingError(error);
      setProcessingError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [recordingService]);

  return {
    hasRecording,
    recordingEndTime,
    processingResult,
    isProcessing,
    processingError,
    saveRecording,
    downloadRecording,
    uploadRecording,
  };
}
