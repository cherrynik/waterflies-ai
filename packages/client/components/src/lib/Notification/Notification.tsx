import { NotificationProps } from './types';

export function Notification({
  isVisible,
  title,
  message,
  type = 'warning',
}: NotificationProps) {
  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-600 border-red-500';
      case 'info':
        return 'bg-blue-600 border-blue-500';
      case 'warning':
      default:
        return 'bg-yellow-600 border-yellow-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm opacity-80">
      <div className={`${getTypeStyles()} text-white p-4 rounded-lg shadow-lg border-l-4`}>
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-xs opacity-90">{message}</p>
      </div>
    </div>
  );
}
