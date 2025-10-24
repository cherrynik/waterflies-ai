export interface TranscriptItem {
  speaker: string;
  text: string;
  timestamp: string;
}

export interface TranscriptProps {
  transcript: TranscriptItem[];
}
