/**
 * Utility functions for file operations
 */

/**
 * Generates a default filename for audio recordings
 */
export const generateDefaultFilename = (): string => {
  return `audio-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
};

/**
 * Creates a download link element and triggers download
 */
export const triggerDownload = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * Creates FormData for file upload
 */
export const createUploadFormData = (blob: Blob): FormData => {
  const formData = new FormData();
  formData.append('audio', blob, `recording-${Date.now()}.webm`);
  return formData;
};

/**
 * Handles upload response errors
 */
export const handleUploadError = (response: Response): never => {
  throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
};

/**
 * Creates a standardized error from unknown error types
 */
export const createStandardError = (error: unknown, defaultMessage: string): Error => {
  return error instanceof Error ? error : new Error(defaultMessage);
};
