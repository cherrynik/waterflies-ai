import { ProcessingResult } from '@waterflies/client/services';

export interface UseRecordingStateReturn {
  hasRecording: boolean;
  recordingEndTime: string | null;
  processingResult: ProcessingResult | null;
  isProcessing: boolean;
  processingError: string | null;
  saveRecording: (blob: Blob) => void;
  downloadRecording: () => void;
  uploadRecording: () => Promise<void>;
}
