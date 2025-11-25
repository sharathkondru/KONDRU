import React from 'react';
import { History, CheckCircle, CircleDashed } from 'lucide-react';
import { QuestionData } from '../types';

interface HistoryPanelProps {
  questions: QuestionData[];
  onSelectQuestion: (question: QuestionData) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ questions, onSelectQuestion }) => {
  const historyItems = questions.filter(q => q.status === 'In Progress' || q.status === 'Completed');

  return (
    <div className="flex-1 h-full overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <History className="text-indigo-600" /> Activity History
        </h1>
        <p className="text-gray-500 mb-8">Track your progress and revisit past challenges.</p>

        {historyItems.length === 0 ? (
            <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
                <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
                    <History size={40} className="text-gray-300"/>
                </div>
                <h3 className="text-gray-900 font-medium">No history yet</h3>
                <p className="text-gray-500 text-sm mt-1">Start a question from the dashboard to see it here.</p>
            </div>
        ) : (
            <div className="space-y-4">
                {historyItems.map(item => (
                    <div 
                        key={item.id} 
                        onClick={() => onSelectQuestion(item)}
                        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {item.status === 'Completed' ? <CheckCircle size={20} /> : <CircleDashed size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{item.title}</h3>
                                <p className="text-xs text-gray-500">Last worked on: Today • {item.company}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-600">{item.difficulty}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};