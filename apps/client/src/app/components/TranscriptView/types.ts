import { TranscriptItem } from '../../types';

export interface TranscriptViewProps {
  transcript: TranscriptItem[];
  summary: string;
  actionItems: string[];
  onNewCall: () => void;
}
