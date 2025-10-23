import { Transcript, SummaryPanel } from '../';
import { TranscriptViewProps } from './types';

export function TranscriptView({ transcript, summary, actionItems, onNewCall }: TranscriptViewProps) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <Transcript transcript={transcript} />
      <SummaryPanel
        summary={summary}
        actionItems={actionItems}
        onNewCall={onNewCall}
      />
    </div>
  );
}
