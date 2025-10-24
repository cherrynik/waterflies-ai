export const APP_CONFIG = {
  port: parseInt(process.env['PORT'] || '3000', 10),
  openaiApiKey: process.env['OPENAI_API_KEY'] || '',
  cors: {
    origins: ['http://localhost:4200', 'http://localhost:3000'],
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
