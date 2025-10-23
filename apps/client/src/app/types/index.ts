export interface Participant {
  id: string;
  name: string;
  isAI?: boolean;
  isVideoOn?: boolean;
  isAudioOn?: boolean;
}

export interface TranscriptItem {
  speaker: string;
  text: string;
  timestamp: string;
}
