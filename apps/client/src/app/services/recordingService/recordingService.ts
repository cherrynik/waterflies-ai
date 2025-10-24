/**
 * Service for handling recording operations
 */

import { RecordingData, ProcessingResult } from './types';
import { createRecordingData } from './utils';
import { RecordingStorage } from './storage';
import { RecordingDownload } from './download';
import { RecordingUpload } from './upload';

export class RecordingService {
  private static instance: RecordingService;
  private storage: RecordingStorage;
  private download: RecordingDownload;
  private upload: RecordingUpload;

  constructor() {
    this.storage = new RecordingStorage();
    this.download = new RecordingDownload();
    this.upload = new RecordingUpload();
  }

  static getInstance(): RecordingService {
    if (!RecordingService.instance) {
      RecordingService.instance = new RecordingService();
    }
    return RecordingService.instance;
  }

  /**
   * Save recording data
   */
  saveRecording(blob: Blob): RecordingData {
    const recordingData = createRecordingData(blob);
    return this.storage.saveRecording(recordingData);
  }

  /**
   * Get current recording
   */
  getCurrentRecording(): RecordingData | null {
    return this.storage.getCurrentRecording();
  }

  /**
   * Check if there's a recording available
   */
  hasRecording(): boolean {
    return this.storage.hasRecording();
  }

  /**
   * Download current recording
   */
  downloadRecording(): void {
    const currentRecording = this.storage.getCurrentRecording();
    if (!currentRecording) {
      console.warn('No recording available to download');
      return;
    }
    this.download.downloadRecording(currentRecording);
  }

  /**
   * Upload recording to backend and get processing results
   */
  async uploadRecording(): Promise<ProcessingResult> {
    const currentRecording = this.storage.getCurrentRecording();
    if (!currentRecording) {
      throw new Error('No recording available to upload');
    }
    return this.upload.uploadRecording(currentRecording);
  }

  /**
   * Clear current recording
   */
  clearRecording(): void {
    this.storage.clearRecording();
  }

  /**
   * Get recording info for logging
   */
  getRecordingInfo(): { size: number; type: string; timestamp: string; endTime: string } | null {
    return this.storage.getRecordingInfo();
  }
}
