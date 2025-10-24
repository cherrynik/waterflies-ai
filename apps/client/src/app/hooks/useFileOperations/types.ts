export interface UseFileOperationsProps {
  onError?: (error: Error) => void;
}

export interface UseFileOperationsReturn {
  downloadFile: (blob: Blob, filename?: string) => void;
  uploadFile: (blob: Blob, endpoint: string) => Promise<Response>;
  createDownloadUrl: (blob: Blob) => string;
  revokeDownloadUrl: (url: string) => void;
}
