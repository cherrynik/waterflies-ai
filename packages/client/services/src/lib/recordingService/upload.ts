import { RecordingData, ProcessingResult, UploadOptions } from './types';
import {
  createUploadFormData,
  handleUploadError,
  logUploadInfo,
  logProcessingResult,
  createStandardError,
} from './utils';

/**
 * Upload module for recording files
 */
export class RecordingUpload {
  private defaultEndpoint = 'http://localhost:3000/api/recording/process';

  /**
   * Upload recording to backend and get processing results
   */
  async uploadRecording(
    recordingData: RecordingData,
    options?: UploadOptions
  ): Promise<ProcessingResult> {
    if (!recordingData) {
      throw new Error('No recording available to upload');
    }

    try {
      const formData = createUploadFormData(recordingData, options);
      const endpoint = options?.endpoint || this.defaultEndpoint;

      logUploadInfo(recordingData);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        await handleUploadError(response);
      }

      const result: ProcessingResult = await response.json();
      logProcessingResult(result);

      return result;
    } catch (error) {
      console.error('Upload error:', error);
      throw createStandardError(error, 'Upload failed');
    }
  }

  /**
   * Upload blob directly
   */
  async uploadBlob(
    blob: Blob,
    options?: UploadOptions
  ): Promise<ProcessingResult> {
    const recordingData: RecordingData = {
      blob,
      endTime: new Date().toISOString(),
      timestamp: Date.now().toString(),
    };

    return this.uploadRecording(recordingData, options);
  }
}
