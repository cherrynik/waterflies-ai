import { PhoneOff } from 'lucide-react';
import { EndCallButtonProps } from './types';

export function EndCallButton({ onEndCall }: EndCallButtonProps) {
  return (
    <button
      onClick={onEndCall}
      className="text-red-500 hover:bg-red-600 hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 group"
      title="End Call"
    >
      <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
    </button>
  );
}
