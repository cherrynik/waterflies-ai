import { useState } from 'react';

export interface UseMediaControlsProps {
  initialVideoOn?: boolean;
  initialAudioOn?: boolean;
}

export interface UseMediaControlsReturn {
  isVideoOn: boolean;
  isAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  setVideoOn: (on: boolean) => void;
  setAudioOn: (on: boolean) => void;
  resetMedia: () => void;
}

export function useMediaControls(props: UseMediaControlsProps = {}): UseMediaControlsReturn {
  const { initialVideoOn = true, initialAudioOn = true } = props;
  const [isVideoOn, setIsVideoOn] = useState(initialVideoOn);
  const [isAudioOn, setIsAudioOn] = useState(initialAudioOn);

  const toggleVideo = () => {
    setIsVideoOn(prev => !prev);
  };

  const toggleAudio = () => {
    setIsAudioOn(prev => !prev);
  };

  const setVideoOn = (on: boolean) => {
    setIsVideoOn(on);
  };

  const setAudioOn = (on: boolean) => {
    setIsAudioOn(on);
  };

  const resetMedia = () => {
    setIsVideoOn(initialVideoOn);
    setIsAudioOn(initialAudioOn);
  };

  return {
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    setVideoOn,
    setAudioOn,
    resetMedia,
  };
}
