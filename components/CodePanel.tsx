import React, { useState } from 'react';
import { Play, RotateCcw, Table as TableIcon, ChevronDown, ChevronUp, Database, Layout } from 'lucide-react';
import { SqlResult, QuestionData } from '../types';

interface CodePanelProps {
  question: QuestionData;
  code: string;
  setCode: (code: string) => void;
  onRunQuery: () => void;
  isRunning: boolean;
  result: SqlResult | null;
  onExploreData: () => void;
}

export const CodePanel: React.FC<CodePanelProps> = ({ 
  question, 
  code, 
  setCode, 
  onRunQuery, 
  isRunning, 
  result,
  onExploreData 
}) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'tables'>('problem');
  const [isProblemExpanded, setProblemExpanded] = useState(true);

  return (
    <div className="w-[45%] border-l border-gray-200 bg-gray-50 flex flex-col h-full overflow-hidden">
      
      {/* Problem Description Area */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
         <div 
           className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
           onClick={() => setProblemExpanded(!isProblemExpanded)}
         >
            <div className="flex items-center gap-2">
               <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">{question.id}</span>
               <h2 className="text-sm font-semibold text-gray-800">Current Question</h2>
            </div>
            {isProblemExpanded ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
         </div>
         
         {isProblemExpanded && (
           <div className="px-4 pb-4 animate-fadeIn">
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {question.description}
              </p>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                 <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                      <TableIcon size={12}/> Tables
                    </span>
                    {question.tables.length > 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onExploreData(); }}
                        className="text-xs border border-gray-300 rounded px-2 py-0.5 hover:bg-white hover:text-indigo-600 hover:border-indigo-300 transition-colors bg-white flex items-center gap-1"
                      >
                        <Layout size={10} /> Explore data
                      </button>
                    )}
                 </div>
                 <div className="p-3 bg-white space-y-2">
                    {question.tables.length === 0 && (
                        <p className="text-xs text-gray-400 italic">No tables defined for this problem.</p>
                    )}
                    {question.tables.map((table, idx) => (
                      <div key={idx} className="font-mono text-xs">
                        <span className="font-bold text-gray-800">{table.tableName}</span>
                        <span className="text-gray-500">
                          ({table.columns.map(c => c.name).join(', ')})
                        </span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
         )}
      </div>

      {/* Editor & Results Container */}
      <div className="flex-1 flex flex-col min-h-0">
        
        {/* Editor Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="border border-gray-200 rounded px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
               <Database size={14} className="text-gray-500"/>
               <span className="text-xs font-medium text-gray-700">SQLite</span>
               <ChevronDown size={12} className="text-gray-400"/>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 bg-white relative overflow-auto">
          <div className="flex h-full">
            <div className="w-10 bg-gray-50 border-r border-gray-100 flex flex-col items-end py-4 px-2 text-xs text-gray-400 font-mono select-none">
              {Array.from({length: 20}).map((_, i) => <div key={i} className="h-6 leading-6">{i + 1}</div>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-mono text-sm outline-none resize-none text-gray-800 leading-6 whitespace-pre"
              spellCheck="false"
              placeholder="-- Write your SQL query here"
            />
          </div>
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
              title="Reset Code"
              onClick={() => setCode('')}
            >
              <RotateCcw size={16} />
            </button>
            <button 
              onClick={onRunQuery}
              disabled={isRunning}
              className={`h-10 px-4 rounded-lg flex items-center gap-2 text-white font-medium shadow-sm transition-all ${isRunning ? 'bg-slate-400 cursor-wait' : 'bg-slate-900 hover:bg-slate-800'}`}
            >
              {isRunning ? (
                <>Processing...</>
              ) : (
                <>
                  <Play size={16} fill="currentColor" /> Run Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Pane */}
        <div className="h-[40%] bg-white border-t-4 border-gray-100 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-200 bg-white flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Query Results</h3>
            {result?.error && <span className="text-xs text-red-500">Error</span>}
            {result && !result.error && <span className="text-xs text-emerald-600">{result.rows.length} rows returned</span>}
          </div>
          
          <div className="flex-1 overflow-auto p-0">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                <Layout size={32} className="mb-2 opacity-20" />
                <p>Run a query to see results</p>
              </div>
            ) : result.error ? (
              <div className="p-4 text-red-600 text-sm font-mono bg-red-50 h-full">
                {result.error}
              </div>
            ) : (
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                  <tr>
                    {result.columns.map((col, idx) => (
                      <th key={idx} className="px-6 py-3 font-medium text-gray-600 border-b border-gray-200 text-xs uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {result.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-6 py-3 text-gray-700 border-b border-gray-100 font-mono text-xs">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};