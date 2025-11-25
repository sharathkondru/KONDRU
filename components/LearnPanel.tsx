import React from 'react';
import { GraduationCap, BookOpen, ChevronRight, Database } from 'lucide-react';

export const LearnPanel: React.FC = () => {
  const tips = [
    { title: "Mastering Joins", description: "Understand the difference between INNER, LEFT, RIGHT, and FULL joins with visual examples.", level: "Beginner" },
    { title: "Window Functions 101", description: "Learn how to use ROW_NUMBER(), RANK(), and DENSE_RANK() for advanced analytics.", level: "Intermediate" },
    { title: "CTEs vs Subqueries", description: "When to use Common Table Expressions for cleaner, more readable code.", level: "Intermediate" },
    { title: "Performance Tuning", description: "Indexing strategies and query optimization techniques for large datasets.", level: "Advanced" },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <GraduationCap className="text-indigo-600" /> Learning Center
        </h1>
        <p className="text-gray-500 mb-8">Boost your SQL skills with curated tips and tutorials.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tip.level}
                        </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors">{tip.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{tip.description}</p>
                    <div className="flex items-center text-indigo-600 text-sm font-medium">
                        Read Guide <ChevronRight size={16} className="ml-1" />
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold mb-2">Practice makes perfect</h2>
                <p className="text-slate-300 max-w-md">Applying these concepts in the Workspace is the best way to retain knowledge.</p>
            </div>
            <Database size={64} className="text-slate-700" />
        </div>
      </div>
    </div>
  );
};