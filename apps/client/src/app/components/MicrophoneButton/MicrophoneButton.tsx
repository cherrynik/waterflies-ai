import { Mic, MicOff } from 'lucide-react';
import { MicrophoneButtonProps } from './types';

export function MicrophoneButton({ isAudioOn, onToggleAudio }: MicrophoneButtonProps) {
  return (
    <button
      onClick={onToggleAudio}
      className={`${
        isAudioOn 
          ? 'text-green-500 hover:bg-green-500' 
          : 'text-red-500 hover:bg-red-500'
      } hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
      title={isAudioOn ? 'Mute microphone' : 'Unmute microphone'}
    >
      {isAudioOn ? (
        <Mic className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
      ) : (
        <MicOff className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
      )}
    </button>
  );
}
