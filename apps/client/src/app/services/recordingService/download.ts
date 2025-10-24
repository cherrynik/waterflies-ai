import { RecordingData, DownloadOptions } from './types';
import { generateRecordingFilename, triggerRecordingDownload } from './utils';

/**
 * Download module for recording files
 */
export class RecordingDownload {
  /**
   * Download current recording
   */
  downloadRecording(recordingData: RecordingData, options?: DownloadOptions): void {
    if (!recordingData) {
      console.warn('No recording available to download');
      return;
    }

    const filename = generateRecordingFilename(recordingData.timestamp, options);
    triggerRecordingDownload(recordingData.blob, filename);
  }

  /**
   * Download blob with custom filename
   */
  downloadBlob(blob: Blob, filename: string): void {
    triggerRecordingDownload(blob, filename);
  }
}
