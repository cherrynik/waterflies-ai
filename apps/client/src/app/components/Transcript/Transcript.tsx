import { TranscriptProps } from './types';

export function Transcript({ transcript }: TranscriptProps) {
  return (
    <div className="flex-1 bg-gray-900 p-3 sm:p-4 lg:p-6">
      <h2 className="text-lg sm:text-xl font-medium text-white mb-4 sm:mb-6">
        Transcript
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {transcript.map((item, index) => (
          <div key={index} className="bg-gray-800 p-3 sm:p-4 rounded border border-gray-700 hover:bg-gray-750 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-white text-xs sm:text-sm group-hover:text-blue-300 transition-colors duration-200">{item.speaker}</span>
              <span className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-200">{item.timestamp}</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
