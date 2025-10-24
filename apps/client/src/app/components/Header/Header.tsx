import { DownloadButton } from '../DownloadButton/DownloadButton';
import { formatRecordingTime } from '../../utils/timeUtils';
import { HeaderProps } from './types';

export function Header({
  isRecording,
  callEnded,
  recordingTime,
  hasRecording,
  onDownloadRecording,
  recordingEndTime,
}: HeaderProps) {
  return (
    <div className="bg-gray-900 border-b border-gray-700 text-white p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <h1 className="text-sm sm:text-lg font-medium text-white">
            Doodle Meet
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          {/* Demo notice */}
          <span className="text-xs text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded whitespace-nowrap">
            <span role="img" aria-label="target">
              🎯
            </span>{' '}
            Demo Version - 1 minute recording limit
          </span>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {!callEnded && (
              <>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isRecording ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                ></div>
                <span className="text-xs text-gray-400">
                  {isRecording && recordingTime !== undefined
                    ? `Recording ${formatRecordingTime(recordingTime)}`
                    : 'Not recording'}
                </span>
              </>
            )}
            {hasRecording && onDownloadRecording && (
              <DownloadButton
                onDownload={onDownloadRecording}
                endTime={recordingEndTime}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
