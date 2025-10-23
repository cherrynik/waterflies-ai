import { Phone } from 'lucide-react';
import { SummaryPanelProps } from './types';

export function SummaryPanel({ summary, actionItems, onNewCall }: SummaryPanelProps) {
  return (
    <div className="w-full lg:w-80 bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-700 p-4 lg:p-6 flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-base lg:text-lg font-medium text-white mb-3 lg:mb-4">
          Summary
        </h3>
        <div className="bg-gray-700 p-3 lg:p-4 rounded mb-4 lg:mb-6">
          <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">{summary}</p>
        </div>

        <h3 className="text-base lg:text-lg font-medium text-white mb-3 lg:mb-4">
          Action Items
        </h3>
        <div className="space-y-2 lg:space-y-3 max-h-40 lg:max-h-none overflow-y-auto">
          {actionItems.map((item, index) => (
            <div key={index} className="bg-gray-700 p-2 lg:p-3 rounded hover:bg-gray-600 transition-colors duration-300 group">
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 w-3 h-3 lg:w-4 lg:h-4 text-white rounded" />
                <span className="text-gray-300 text-xs lg:text-sm group-hover:text-white transition-colors duration-200">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNewCall}
        className="w-full mt-4 lg:mt-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 flex items-center justify-center space-x-2 group"
      >
        <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        <span>New Call</span>
      </button>
    </div>
  );
}
