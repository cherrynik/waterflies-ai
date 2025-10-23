import { Download } from 'lucide-react';
import { HeaderProps } from './types';

export function Header({ isRecording, callEnded, recordingTime, hasRecording, onDownloadRecording, recordingEndTime }: HeaderProps) {
  return (
    <div className="bg-gray-900 border-b border-gray-700 text-white p-2 sm:p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">D</span>
        </div>
        <h1 className="text-sm sm:text-lg font-medium text-white">
          Doodle Meet
        </h1>
      </div>
      {!callEnded && (
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-500'}`}></div>
          <span className="text-xs text-gray-400">
            {isRecording && recordingTime !== undefined ? 
              `Recording ${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}` : 
              'Not recording'
            }
          </span>
          {hasRecording && onDownloadRecording && (
            <button
              onClick={onDownloadRecording}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
              title="Download Last Recording"
            >
              <Download className="w-3 h-3" />
              <span className="text-xs">
                Download Last {recordingEndTime && `(${recordingEndTime})`}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
