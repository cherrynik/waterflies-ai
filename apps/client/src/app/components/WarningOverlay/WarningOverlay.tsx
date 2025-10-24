import { WarningOverlayProps } from './types';

export function WarningOverlay({
  isVisible,
  title,
  message,
}: WarningOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg max-w-md mx-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-4">{message}</p>
      </div>
    </div>
  );
}
