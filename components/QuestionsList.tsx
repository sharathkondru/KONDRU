import React, { useState } from 'react';
import { Clock, Filter, Share2, Zap, CheckCircle } from 'lucide-react';
import { QuestionData } from '../types';

interface QuestionsListProps {
  questions: QuestionData[];
  onSelectQuestion: (question: QuestionData) => void;
}

export const QuestionsList: React.FC<QuestionsListProps> = ({ questions, onSelectQuestion }) => {
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter Logic
  const filteredQuestions = questions.filter(q => {
    if (filterDifficulty === 'All') return true;
    return q.difficulty === filterDifficulty;
  });

  const inProgressQuestions = filteredQuestions.filter(q => q.status === 'In Progress');
  const availableQuestions = filteredQuestions.filter(q => q.status !== 'In Progress');

  return (
    <div className="flex-1 h-full overflow-y-auto bg-gray-50 p-8">
      
      {/* Welcome Banner */}
      <div className="mb-8">
         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
               {/* No logo here, Sidebar has it */}
              <div>
                 <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    The Library
                 </h1>
                 <p className="text-gray-500 text-sm">Dashboard</p>
              </div>
            </div>
            
            <div className="flex gap-3">
               <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-amber-100 shadow-sm">
                  <Zap size={16} fill="currentColor"/> 2 Day Streak
               </div>
               <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm">
                  Pro Access
               </button>
            </div>
         </div>
         
         <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 rounded-xl shadow-lg flex items-center justify-between text-white relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h3 className="font-bold text-lg">Daily SQL Challenge</h3>
               </div>
               <p className="text-indigo-100 text-sm max-w-lg leading-relaxed">
                  Join the 24-Day SQL Advent Challenge starting December 1st. Master advanced joins and window functions.
               </p>
               <button className="mt-4 text-xs font-bold bg-white text-indigo-900 px-4 py-2 rounded hover:bg-gray-100 transition">
                  Join Now →
               </button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
               <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8C4 5.79086 5.79086 4 8 4H32C34.2091 4 36 5.79086 36 8V24C36 32.8366 28.8366 40 20 40C11.1634 40 4 32.8366 4 24V8Z" /></svg>
            </div>
         </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-8">
         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-4">
            <div className="flex gap-2">
               <button className="bg-slate-900 text-white border border-slate-900 px-4 py-1.5 rounded-md text-xs font-medium shadow-sm">SQL / Python</button>
               <button className="bg-white text-gray-500 border border-gray-200 px-4 py-1.5 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors">Case Studies</button>
            </div>
         </div>
         <div className="flex items-center justify-between text-sm text-gray-500 relative">
            <div className="flex items-center gap-6">
               <div className="relative">
                 <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center gap-2 font-medium hover:text-gray-900 px-2 py-1 rounded transition-colors ${showFilterDropdown ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                 >
                    <Filter size={16} /> Filter: <span className="text-indigo-600">{filterDifficulty}</span>
                 </button>
                 
                 {showFilterDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 shadow-xl rounded-lg z-50 overflow-hidden animate-fadeIn">
                       {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                          <div 
                             key={diff}
                             onClick={() => {
                                setFilterDifficulty(diff as any);
                                setShowFilterDropdown(false);
                             }}
                             className={`px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between text-xs font-medium ${filterDifficulty === diff ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'}`}
                          >
                             {diff}
                             {filterDifficulty === diff && <CheckCircle size={12}/>}
                          </div>
                       ))}
                    </div>
                 )}
               </div>

               <div className="h-4 w-px bg-gray-200"></div>
               <span className="text-indigo-700 font-semibold border-b-2 border-indigo-600 pb-0.5">{filteredQuestions.length} Questions</span>
            </div>
            <button 
               onClick={() => setFilterDifficulty('All')}
               className="text-gray-400 hover:text-gray-600 text-xs font-medium"
            >
               Reset filters
            </button>
         </div>
      </div>

      {/* In Progress Section */}
      {inProgressQuestions.length > 0 && (
          <div className="mb-10">
             <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                   <Clock size={20} className="text-indigo-500"/> Continue Learning
                </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressQuestions.map(q => (
                   <QuestionCard key={q.id} question={q} onClick={() => onSelectQuestion(q)} />
                ))}
             </div>
          </div>
      )}

      {/* Available Questions */}
      <div>
         <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
            <div className="text-slate-900 text-xl">📚</div> Practice Questions
         </h2>
         {availableQuestions.length === 0 ? (
            <p className="text-gray-400 italic">No questions match your filter.</p>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableQuestions.map(q => (
                   <QuestionCard key={q.id} question={q} onClick={() => onSelectQuestion(q)} />
                ))}
            </div>
         )}
      </div>

    </div>
  );
};

const QuestionCard: React.FC<{ question: QuestionData; onClick: () => void }> = ({ question, onClick }) => {
   const difficultyColor = 
      question.difficulty === 'Easy' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 
      question.difficulty === 'Medium' ? 'text-amber-700 bg-amber-50 border-amber-100' : 
      'text-rose-700 bg-rose-50 border-rose-100';

   return (
      <div 
         onClick={onClick}
         className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
      >
         <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-indigo-600 transition-colors"></div>
         
         <div className="flex items-center justify-between mb-3">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${difficultyColor}`}>
               {question.difficulty}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
               {question.tags.slice(0,2).map(t => (
                  <span key={t} className="border border-gray-100 px-1.5 py-0.5 rounded bg-gray-50">{t}</span>
               ))}
               {question.tags.length > 2 && <span>+{question.tags.length - 2}</span>}
            </div>
         </div>
         
         <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors text-base">
            {question.title}
         </h3>
         
         <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed flex-1">
            {question.description}
         </p>
         
         <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
             <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                     {question.company.charAt(0)}
                  </div>
                  {question.company}
             </span>
            
            <div className="flex items-center gap-3">
               {question.status === 'In Progress' && (
                  <span className="text-[10px] text-indigo-600 font-semibold flex items-center gap-1">
                     <Clock size={12} /> Resuming
                  </span>
               )}
               <Share2 size={14} className="text-gray-300 hover:text-gray-600" />
            </div>
         </div>
      </div>
   );
};