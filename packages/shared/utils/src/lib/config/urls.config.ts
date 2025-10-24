/**
 * URL configuration for the application
 * All URLs are centralized here and can be overridden with environment variables
 */

export const URL_CONFIG = {
  // Server URLs
  server: {
    host: process.env['SERVER_HOST'] || 'localhost',
    port: process.env['SERVER_PORT'] || '3000',
    protocol: process.env['SERVER_PROTOCOL'] || 'http',
    get baseUrl() {
      return `${this.protocol}://${this.host}:${this.port}`;
    },
    get apiUrl() {
      return `${this.baseUrl}/api`;
    },
    get recordingEndpoint() {
      return `${this.apiUrl}/recording/process`;
    },
  },
  
  // Client URLs
  client: {
    host: process.env['CLIENT_HOST'] || 'localhost',
    port: process.env['CLIENT_PORT'] || '4200',
    protocol: process.env['CLIENT_PROTOCOL'] || 'http',
    get baseUrl() {
      return `${this.protocol}://${this.host}:${this.port}`;
    },
  },
  
  // CORS origins for server
  cors: {
    get origins() {
      return [
        `${URL_CONFIG.client.baseUrl}`,
        `${URL_CONFIG.server.baseUrl}`,
        // Add production URLs if needed
        ...(process.env['CORS_ORIGINS'] ? process.env['CORS_ORIGINS'].split(',') : []),
      ];
    },
  },
} as const;
