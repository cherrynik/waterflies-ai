import { URL_CONFIG } from '@waterflies/utils';

export const APP_CONFIG = {
  port: parseInt(process.env['PORT'] || URL_CONFIG.server.port, 10),
  openaiApiKey: process.env['OPENAI_API_KEY'] || '',
  cors: {
    origins: URL_CONFIG.cors.origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  fileUpload: {
    maxFileSize: 25 * 1024 * 1024, // 25MB
    allowedMimeTypes: ['audio/'],
    uploadDirectory: './uploads',
  },
} as const;
