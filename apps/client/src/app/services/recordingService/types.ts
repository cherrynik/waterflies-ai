export interface RecordingData {
  blob: Blob;
  endTime: string;
  timestamp: string;
}

export interface ProcessingResult {
  transcript: string;
  summary: string;
  actionItems: { items: string[] };
}

export interface UploadResponse {
  status: number;
  statusText: string;
  data: ProcessingResult;
}

export interface DownloadOptions {
  filename?: string;
  mimeType?: string;
}

export interface UploadOptions {
  endpoint: string;
  fieldName?: string;
}
