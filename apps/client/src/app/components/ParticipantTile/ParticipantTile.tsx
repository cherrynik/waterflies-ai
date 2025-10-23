import { User, Mic, MicOff, Video, VideoOff, Bot } from 'lucide-react';
import { ParticipantTileProps } from './types';

export function ParticipantTile({ participant, index, isCurrentUserVideoOn, isCurrentUserAudioOn }: ParticipantTileProps) {
  return (
    <div
      className={`relative bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-750 transition-all duration-300 ${
        index === 2 ? 'bg-gray-700 hover:bg-gray-650' : ''
      }`}
    >
      {/* Video Placeholder */}
      <div className="w-full h-full flex items-center justify-center">
        {participant.isAI ? (
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bot className="w-6 h-6 text-white" />
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
      <div className="absolute bottom-3 left-3 flex space-x-2">
        <div className="w-6 h-6 flex items-center justify-center">
          {participant.name === 'Alex Johnson (You)' ? (
            isCurrentUserAudioOn ? (
              <Mic className="w-4 h-4 text-green-500" />
            ) : (
              <MicOff className="w-4 h-4 text-red-500" />
            )
          ) : (
            participant.isAudioOn ? (
              <Mic className="w-4 h-4 text-green-500" />
            ) : (
              <MicOff className="w-4 h-4 text-red-500" />
            )
          )}
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          {participant.name === 'Alex Johnson (You)' ? (
            isCurrentUserVideoOn ? (
              <Video className="w-4 h-4 text-green-500" />
            ) : (
              <VideoOff className="w-4 h-4 text-red-500" />
            )
          ) : (
            participant.isVideoOn ? (
              <Video className="w-4 h-4 text-green-500" />
            ) : (
              <VideoOff className="w-4 h-4 text-red-500" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
