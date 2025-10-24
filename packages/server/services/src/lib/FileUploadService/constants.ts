
export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 25 * 1024 * 1024, // 25MB
  allowedMimeTypes: ['audio/'],
  uploadDirectory: './uploads',
} as const;