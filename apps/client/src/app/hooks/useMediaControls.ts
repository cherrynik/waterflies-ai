import { useState } from 'react';

export interface UseMediaControlsProps {
  initialAudioOn?: boolean;
}

export interface UseMediaControlsReturn {
  isAudioOn: boolean;
  toggleAudio: () => void;
  setAudioOn: (on: boolean) => void;
  resetMedia: () => void;
}

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
