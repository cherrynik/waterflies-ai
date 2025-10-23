import { Square, Voicemail, PhoneOff, Mic, MicOff } from 'lucide-react';
import { ControlsProps } from './types';

export function Controls({ isRecording, isAudioOn, onStartRecording, onStopRecording, onEndCall, onToggleAudio }: ControlsProps) {
  return (
    <div className="bg-gray-900 border-t border-gray-700 p-2 sm:p-4 flex justify-center flex-wrap gap-2 sm:gap-4 lg:gap-6">
      <button
        onClick={onToggleAudio}
        className={`${isAudioOn ? 'text-green-500 hover:bg-green-500' : 'text-red-500 hover:bg-red-500'} hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
        title={isAudioOn ? 'Mute microphone' : 'Unmute microphone'}
      >
        {isAudioOn ? (
          <Mic className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <MicOff className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>


      {!isRecording ? (
        <button
          onClick={onStartRecording}
          className="text-red-500 hover:bg-red-500 hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 group"
          title="Start Recording"
        >
          <Voicemail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      ) : (
        <button
          onClick={onStopRecording}
          className="text-gray-400 hover:bg-gray-600 hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30 group"
          title="Stop Recording"
        >
          <Square className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      )}
      
      <button
        onClick={onEndCall}
        className="text-red-500 hover:bg-red-600 hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 group"
        title="End Call"
      >
        <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
}
