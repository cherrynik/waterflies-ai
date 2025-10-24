/**
 * Utility functions for recording state management
 */

/**
 * Creates a standardized error message from unknown error types
 */
export const createErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error occurred';
};

/**
 * Handles processing errors with consistent error handling
 */
export const handleProcessingError = (error: unknown): string => {
  const errorMessage = createErrorMessage(error);
  console.error('Processing failed:', errorMessage);
  return errorMessage;
};
