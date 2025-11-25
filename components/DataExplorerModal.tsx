import React, { useState, useEffect } from 'react';
import { X, Table as TableIcon } from 'lucide-react';
import { TableSchema } from '../types';

interface DataExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: TableSchema[];
}

export const DataExplorerModal: React.FC<DataExplorerModalProps> = ({ isOpen, onClose, tables }) => {
  const [activeTableIndex, setActiveTableIndex] = useState(0);

  // Reset active table when modal opens or tables change
  useEffect(() => {
    if (isOpen) {
      setActiveTableIndex(0);
    }
  }, [isOpen, tables]);

  if (!isOpen) return null;

  // Handle case where no tables exist
  if (!tables || tables.length === 0) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center animate-fadeIn">
               <p className="text-gray-600 mb-4">No data available for this question.</p>
               <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">Close</button>
            </div>
        </div>
    );
  }

  const activeTable = tables[activeTableIndex];
  
  // Safety fallback if index is out of bounds
  if (!activeTable) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
               <TableIcon size={20} />
            </div>
            <div>
               <h2 className="text-lg font-bold text-gray-900">Data Explorer</h2>
               <p className="text-xs text-gray-500">Previewing sample data for current problem</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 min-h-0">
          
          {/* Sidebar - Table List */}
          <div className="w-48 border-r border-gray-200 bg-gray-50 p-4 space-y-2 overflow-y-auto">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Available Tables</h3>
             {tables.map((table, idx) => (
               <button
                 key={idx}
                 onClick={() => setActiveTableIndex(idx)}
                 className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                   activeTableIndex === idx 
                     ? 'bg-white text-indigo-600 shadow-sm border border-gray-100' 
                     : 'text-gray-600 hover:bg-white hover:text-gray-900'
                 }`}
               >
                 {table.tableName}
               </button>
             ))}
          </div>

          {/* Table Data */}
          <div className="flex-1 overflow-auto bg-white p-6">
            <div className="mb-4">
               <h3 className="text-md font-semibold text-gray-800">{activeTable.tableName}</h3>
               <p className="text-sm text-gray-500">
                 Columns: <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-700">
                   {activeTable.columns.map(c => c.name).join(', ')}
                 </span>
               </p>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
                     {activeTable.columns.map((col, idx) => (
                       <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         {col.name} <span className="text-gray-300 ml-1 font-normal normal-case">({col.type})</span>
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {activeTable.data && activeTable.data.length > 0 ? (
                     activeTable.data.map((row, rIdx) => (
                       <tr key={rIdx} className="hover:bg-gray-50">
                         {activeTable.columns.map((col, cIdx) => (
                           <td key={cIdx} className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-mono">
                             {row[col.name]}
                           </td>
                         ))}
                       </tr>
                     ))
                   ) : (
                     <tr>
                       <td colSpan={activeTable.columns.length} className="px-4 py-8 text-center text-gray-400 text-sm italic">
                         No sample data available for this table.
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};