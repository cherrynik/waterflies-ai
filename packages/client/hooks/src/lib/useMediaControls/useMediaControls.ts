import { useState } from 'react';
import { UseMediaControlsProps, UseMediaControlsReturn } from './types';

export function useMediaControls(props: UseMediaControlsProps = {}): UseMediaControlsReturn {
  const { initialAudioOn = false } = props;
  const [isAudioOn, setIsAudioOn] = useState(initialAudioOn);

  const toggleAudio = () => {
    setIsAudioOn(prev => !prev);
  };

  const setAudioOn = (on: boolean) => {
    setIsAudioOn(on);
  };

  const resetMedia = () => {
    setIsAudioOn(initialAudioOn);
  };

  return {
    isAudioOn,
    toggleAudio,
    setAudioOn,
    resetMedia,
  };
}
