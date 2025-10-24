import { ProcessingOverlayProps } from './types';

export function ProcessingOverlay({
  isVisible,
  title = "Processing Meeting",
  message = "Stopping recording and preparing data...",
}: ProcessingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
