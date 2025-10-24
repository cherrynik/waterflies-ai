import { Download } from 'lucide-react';
import { DownloadButtonProps } from './types';

export function DownloadButton({ onDownload, endTime }: DownloadButtonProps) {
  return (
    <button
      onClick={onDownload}
      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
      title="Download Last Recording"
    >
      <Download className="w-3 h-3" />
      <span className="text-xs">
        Download Last {endTime && `(${endTime})`}
      </span>
    </button>
  );
}
