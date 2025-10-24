export interface UseMediaControlsProps {
  initialAudioOn?: boolean;
}

export interface UseMediaControlsReturn {
  isAudioOn: boolean;
  toggleAudio: () => void;
  setAudioOn: (on: boolean) => void;
  resetMedia: () => void;
}
