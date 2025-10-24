import { MicrophoneButton } from '../MicrophoneButton/MicrophoneButton';
import { EndCallButton } from '../EndCallButton/EndCallButton';
import { ControlsProps } from './types';

export function Controls({ isAudioOn, onEndCall, onToggleAudio }: ControlsProps) {
  return (
    <div className="bg-gray-900 border-t border-gray-700 p-2 sm:p-4 flex justify-center flex-wrap gap-2 sm:gap-4 lg:gap-6">
      <MicrophoneButton 
        isAudioOn={isAudioOn} 
        onToggleAudio={onToggleAudio} 
      />
      
      <EndCallButton onEndCall={onEndCall} />
    </div>
  );
}
