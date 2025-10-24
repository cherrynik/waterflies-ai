import { RecordingData } from './types';

/**
 * Storage module for recording data management
 */
export class RecordingStorage {
  private currentRecording: RecordingData | null = null;

  /**
   * Save recording data
   */
  saveRecording(recordingData: RecordingData): RecordingData {
    this.currentRecording = recordingData;
    return recordingData;
  }

  /**
   * Get current recording
   */
  getCurrentRecording(): RecordingData | null {
    return this.currentRecording;
  }

  /**
   * Check if there's a recording available
   */
  hasRecording(): boolean {
    return this.currentRecording !== null;
  }

  /**
   * Clear current recording
   */
  clearRecording(): void {
    this.currentRecording = null;
  }

  /**
   * Get recording info for logging
   */
  getRecordingInfo(): { size: number; type: string; timestamp: string; endTime: string } | null {
    if (!this.currentRecording) {
      return null;
    }

    return {
      size: this.currentRecording.blob.size,
      type: this.currentRecording.blob.type,
      timestamp: this.currentRecording.timestamp,
      endTime: this.currentRecording.endTime
    };
  }
}
