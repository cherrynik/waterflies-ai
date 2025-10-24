export interface ProcessingRequest {
  audio: Express.Multer.File;
}

export interface ProcessingResponse {
  transcript: string;
  summary: string;
  actionItems: string[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
