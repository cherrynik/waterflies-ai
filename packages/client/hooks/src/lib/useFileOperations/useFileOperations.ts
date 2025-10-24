import { useRef, useCallback } from 'react';
import { UseFileOperationsProps, UseFileOperationsReturn } from './types';
import {
  generateDefaultFilename,
  triggerDownload,
  createUploadFormData,
  handleUploadError,
  createStandardError,
} from './utils';

export function useFileOperations({
  onError,
}: UseFileOperationsProps = {}): UseFileOperationsReturn {
  const downloadUrlsRef = useRef<Set<string>>(new Set());

  const createDownloadUrl = useCallback((blob: Blob): string => {
    const url = URL.createObjectURL(blob);
    downloadUrlsRef.current.add(url);
    return url;
  }, []);

  const revokeDownloadUrl = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    downloadUrlsRef.current.delete(url);
  }, []);

  const downloadFile = useCallback(
    (blob: Blob, filename?: string) => {
      try {
        const url = createDownloadUrl(blob);
        const downloadFilename = filename || generateDefaultFilename();
        triggerDownload(url, downloadFilename);

        // Clean up after a short delay to ensure download starts
        setTimeout(() => revokeDownloadUrl(url), 100);
      } catch (error) {
        const err = createStandardError(error, 'Download failed');
        onError?.(err);
      }
    },
    [createDownloadUrl, revokeDownloadUrl, onError]
  );

  const uploadFile = useCallback(
    async (blob: Blob, endpoint: string): Promise<Response> => {
      try {
        const formData = createUploadFormData(blob);

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          handleUploadError(response);
        }

        return response;
      } catch (error) {
        const err = createStandardError(error, 'Upload failed');
        onError?.(err);
        throw err;
      }
    },
    [onError]
  );

  return {
    downloadFile,
    uploadFile,
    createDownloadUrl,
    revokeDownloadUrl,
  };
}
