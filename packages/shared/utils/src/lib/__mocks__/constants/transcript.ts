import { PARTICIPANTS } from "./participants";

const PARTICIPANT_ONE = PARTICIPANTS[0];
const PARTICIPANT_TWO = PARTICIPANTS[2];

export const MOCK_TRANSCRIPT = [
  { speaker: PARTICIPANT_ONE.name, text: 'Hi everyone! How is the project going?', timestamp: '00:01:23' },
  { speaker: PARTICIPANT_TWO.name, text: 'Hi! Everything is going well, we finished the first iteration.', timestamp: '00:01:45' },
  { speaker: PARTICIPANT_ONE.name, text: 'Great! What are our next steps?', timestamp: '00:02:12' },
  { speaker: PARTICIPANT_TWO.name, text: 'We need to test the new functionality and prepare a presentation.', timestamp: '00:02:35' },
  { speaker: PARTICIPANT_ONE.name, text: 'Good, let\'s schedule a meeting for next week.', timestamp: '00:03:01' }
] as const;
