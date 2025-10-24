export const API_ENDPOINTS = {
  RECORDING_PROCESS: '/recording/process',
} as const;

export const ERROR_MESSAGES = {
  NO_AUDIO_FILE: 'No audio file provided',
  INVALID_FILE_TYPE: 'Only audio files are allowed',
  PROCESSING_FAILED: 'Failed to process recording',
  AI_PROCESSING_FAILED: 'AI processing failed',
  TRANSCRIPTION_FAILED: 'Audio transcription failed',
  SUMMARY_GENERATION_FAILED: 'Summary generation failed',
  ACTION_ITEMS_EXTRACTION_FAILED: 'Action items extraction failed',
  UNKNOWN_ERROR: 'Unknown error occurred',
} as const;

export const OPENAI_MODELS = {
  WHISPER: 'whisper-1',
  GPT_4O_MINI: 'gpt-4o-mini',
} as const;

export const DEFAULT_ACTION_ITEM = 'Plan next steps based on the discussion';
