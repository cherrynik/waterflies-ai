/**
 * URL configuration for the application
 * All URLs are centralized here and can be overridden with environment variables
 */

export const URL_CONFIG = {
  // Server URLs
  server: {
    hostname: process.env['SERVER_HOSTNAME'] || 'localhost',
    port: process.env['SERVER_PORT'] || '3000',
    get baseUrl() {
      return process.env['SERVER_BASE_URL'] || `http://${this.hostname}:${this.port}`;
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
    hostname: process.env['CLIENT_HOSTNAME'] || 'localhost',
    port: process.env['CLIENT_PORT'] || '4200',
    get baseUrl() {
      return process.env['CLIENT_BASE_URL'] || `http://${this.hostname}:${this.port}`;
    },
  },
  
  // CORS origins for server
  cors: {
    get origins() {
      return [
        URL_CONFIG.client.baseUrl,
        URL_CONFIG.server.baseUrl,
        // Add custom CORS origins
        ...(process.env['CORS_ORIGINS'] ? process.env['CORS_ORIGINS'].split(',') : []),
      ];
    },
  },
} as const;
