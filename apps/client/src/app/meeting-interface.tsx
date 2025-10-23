import { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Square, CircleOffIcon, PhoneOff, User, Voicemail } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isAI?: boolean;
  isVideoOn?: boolean;
  isAudioOn?: boolean;
}

interface TranscriptItem {
  speaker: string;
  text: string;
  timestamp: string;
}

export function MeetingInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const participants: Participant[] = [
    { id: '1', name: 'Alex Johnson (You)', isVideoOn: true, isAudioOn: true },
    { id: 'ai', name: 'Waterflies.ai', isAI: true, isVideoOn: false, isAudioOn: false },
    { id: '2', name: 'Sarah Chen', isVideoOn: true, isAudioOn: true },
  ];

  const mockTranscript: TranscriptItem[] = [
    { speaker: 'Alex Johnson (You)', text: 'Hi everyone! How is the project going?', timestamp: '00:01:23' },
    { speaker: 'Sarah Chen', text: 'Hi! Everything is going well, we finished the first iteration.', timestamp: '00:01:45' },
    { speaker: 'Alex Johnson (You)', text: 'Great! What are our next steps?', timestamp: '00:02:12' },
    { speaker: 'Sarah Chen', text: 'We need to test the new functionality and prepare a presentation.', timestamp: '00:02:35' },
    { speaker: 'Alex Johnson (You)', text: 'Good, let\'s schedule a meeting for next week.', timestamp: '00:03:01' }
  ];

  const mockSummary = `
    Discussion of project progress and planning next steps. 
    Participants agreed on completing the first iteration and the need 
    to test new functionality. A meeting is scheduled for next week 
    to present the results.
  `;

  const mockActionItems = [
    'Test the new functionality',
    'Prepare presentation of results',
    'Schedule meeting for next week',
    'Prepare report on first iteration'
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Stop recording but don't end the call
  };

  const handleEndCall = () => {
    setCallEnded(true);
  };

  const handleResetCall = () => {
    setIsRecording(false);
    setCallEnded(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <h1 className="text-lg font-medium text-white">
            Doodle Meet
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-500'}`}></div>
          <span className="text-xs text-gray-400">{isRecording ? 'Recording' : 'Not recording'}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {!callEnded ? (
          /* Meeting View */
          <div className="flex-1 flex flex-col">
            {/* Video Grid */}
            <div className="flex-1 grid grid-cols-3 h-full">
              {participants.map((participant, index) => (
                <div
                  key={participant.id}
                  className={`relative bg-gray-800 border-r border-gray-700 last:border-r-0 hover:bg-gray-750 transition-all duration-300 ${
                    index === 2 ? 'bg-gray-700 hover:bg-gray-650' : ''
                  }`}
                >
                  {/* Video Placeholder */}
                  <div className="w-full h-full flex items-center justify-center">
                    {participant.isAI ? (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-black font-bold text-sm">AI</span>
                        </div>
                        <p className="text-white text-sm">{participant.name}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          participant.name === 'Alex Johnson (You)' ? 'bg-blue-500 ring-2 ring-blue-300' : 'bg-gray-600'
                        }`}>
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-white text-sm">{participant.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Audio/Video Status */}
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      {participant.isAudioOn ? (
                        <Mic className="w-3 h-3 text-green-500" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                    <div className="w-4 h-4 flex items-center justify-center">
                      {participant.isVideoOn ? (
                        <Video className="w-3 h-3 text-green-500" />
                      ) : (
                        <VideoOff className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="bg-gray-900 border-t border-gray-700 p-4 flex justify-center space-x-6">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="text-red-500 hover:bg-red-500 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 group"
                  title="Start Recording"
                >
                  <Voicemail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="text-gray-400 hover:bg-gray-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30 group"
                  title="Stop Recording"
                >
                  <Square className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              )}
              
              <button
                onClick={handleEndCall}
                className="text-red-500 hover:bg-red-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 group"
                title="End Call"
              >
                <PhoneOff className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>
        ) : (
          /* Transcript View */
          <div className="flex-1 flex">
            {/* Transcript */}
            <div className="flex-1 bg-gray-900 p-6">
              <h2 className="text-xl font-medium text-white mb-6">
                Transcript
              </h2>
              <div className="space-y-4">
                {mockTranscript.map((item, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded border border-gray-700 hover:bg-gray-750 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-white text-sm group-hover:text-blue-300 transition-colors duration-200">{item.speaker}</span>
                      <span className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-200">{item.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary and Action Items */}
            <div className="w-80 bg-gray-800 border-l border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Summary
              </h3>
              <div className="bg-gray-700 p-4 rounded mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">{mockSummary}</p>
              </div>

              <h3 className="text-lg font-medium text-white mb-4">
                Action Items
              </h3>
              <div className="space-y-3">
                {mockActionItems.map((item, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded hover:bg-gray-600 transition-all duration-300 hover:scale-[1.02] group">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-white rounded hover:scale-110 transition-transform duration-200" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200">{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleResetCall}
                className="w-full mt-6 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                New Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeetingInterface;