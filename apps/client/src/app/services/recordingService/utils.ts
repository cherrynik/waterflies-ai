import { getCurrentTime, getTimestamp } from '../../utils/timeUtils';
import { RecordingData, DownloadOptions, UploadOptions } from './types';

/**
 * Utility functions for recording service
 */

/**
 * Creates recording data from blob
 */
export const createRecordingData = (blob: Blob): RecordingData => {
  return {
    blob,
    endTime: getCurrentTime(),
    timestamp: getTimestamp()
  };
};

/**
 * Generates filename for recording download
 */
export const generateRecordingFilename = (timestamp: string, options?: DownloadOptions): string => {
  return options?.filename || `audio-recording-${timestamp}.webm`;
};

/**
 * Creates download link and triggers download
 */
export const triggerRecordingDownload = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Creates FormData for recording upload
 */
export const createUploadFormData = (recordingData: RecordingData, options?: UploadOptions): FormData => {
  const formData = new FormData();
  const fieldName = options?.fieldName || 'audio';
  const filename = `recording-${recordingData.timestamp}.webm`;
  
  formData.append(fieldName, recordingData.blob, filename);
  return formData;
};

/**
 * Handles upload response errors
 */
export const handleUploadError = async (response: Response): Promise<never> => {
  const errorText = await response.text();
  throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
};

/**
 * Logs recording upload information
 */
export const logUploadInfo = (recordingData: RecordingData): void => {
  console.log('Uploading recording to backend...', {
    size: recordingData.blob.size,
    type: recordingData.blob.type,
    timestamp: recordingData.timestamp,
    endTime: recordingData.endTime
  });
};

/**
 * Logs successful processing result
 */
export const logProcessingResult = (result: import('./types').ProcessingResult): void => {
  console.log('Recording processed successfully:', {
    transcriptLength: result.transcript.length,
    summaryLength: result.summary.length
  });
};

/**
 * Creates standardized error from unknown error types
 */
export const createStandardError = (error: unknown, defaultMessage: string): Error => {
  return error instanceof Error ? error : new Error(defaultMessage);
};
