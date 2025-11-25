import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatPanel } from './components/ChatPanel';
import { CodePanel } from './components/CodePanel';
import { QuestionsList } from './components/QuestionsList';
import { HistoryPanel } from './components/HistoryPanel';
import { LearnPanel } from './components/LearnPanel';
import { DataExplorerModal } from './components/DataExplorerModal';
import { chatWithDawn, mockExecuteSql } from './services/geminiService';
import { Message, QuestionData, SqlResult } from './types';
import { QUESTIONS } from './data';
import { Construction } from 'lucide-react';

// Define valid view types
export type ViewType = 'home' | 'workspace' | 'history' | 'learn' | 'profile' | 'settings';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeQuestion, setActiveQuestion] = useState<QuestionData>(QUESTIONS[0]);
  const [showDataModal, setShowDataModal] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm Tara, and I'll be your SQL interviewer. \n\nAre you ready to start coding or would you like to discuss your approach first?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Code State
  const [code, setCode] = useState<string>('SELECT * FROM suppliers LIMIT 10;');
  const [sqlResult, setSqlResult] = useState<SqlResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleSelectQuestion = (question: QuestionData) => {
    setActiveQuestion(question);
    setCurrentView('workspace');
    // Reset conversation for new question
    setMessages([{
      id: Date.now().toString(),
      role: 'model',
      text: `Hi! I'm Tara. We are working on: ${question.title}.\n\n${question.description}`,
      timestamp: new Date()
    }]);
    setCode('');
    setSqlResult(null);
  };

  const handleSendMessage = async (text: string) => {
    // Optimistic update
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Call API
    const responseText = await chatWithDawn(history, text);

    const newAiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newAiMsg]);
    setIsTyping(false);
  };

  const handleRunQuery = async () => {
    setIsExecuting(true);
    setSqlResult(null); // Clear previous result
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = await mockExecuteSql(code, activeQuestion.tables);
    setSqlResult(result);
    setIsExecuting(false);
  };

  // Render the main content area based on currentView
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="flex-1 flex overflow-hidden shadow-sm rounded-tl-3xl my-2 mr-2 border border-gray-200 bg-white">
            <QuestionsList 
              questions={QUESTIONS} 
              onSelectQuestion={handleSelectQuestion}
            />
          </div>
        );
      case 'workspace':
        return (
          <div className="flex-1 flex overflow-hidden shadow-2xl rounded-tl-3xl my-2 mr-2 border border-gray-200 bg-white">
            <ChatPanel 
              question={activeQuestion}
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isTyping={isTyping} 
              onBack={() => setCurrentView('home')}
            />
            <CodePanel 
              question={activeQuestion}
              code={code}
              setCode={setCode}
              onRunQuery={handleRunQuery}
              isRunning={isExecuting}
              result={sqlResult}
              onExploreData={() => setShowDataModal(true)}
            />
          </div>
        );
      case 'history':
        return (
          <div className="flex-1 flex overflow-hidden shadow-sm rounded-tl-3xl my-2 mr-2 border border-gray-200 bg-white">
            <HistoryPanel 
              questions={QUESTIONS} 
              onSelectQuestion={handleSelectQuestion}
            />
          </div>
        );
      case 'learn':
        return (
            <div className="flex-1 flex overflow-hidden shadow-sm rounded-tl-3xl my-2 mr-2 border border-gray-200 bg-white">
              <LearnPanel />
            </div>
        );
      default:
        // Placeholder for Profile, Settings
        return (
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden shadow-sm rounded-tl-3xl my-2 mr-2 border border-gray-200 bg-white p-8">
            <div className="bg-indigo-50 p-6 rounded-full mb-6">
              <Construction size={48} className="text-indigo-900" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{currentView}</h2>
            <p className="text-gray-500 text-center max-w-md">
              This feature is currently under development. Check back soon for updates to The Library.
            </p>
            <button 
              onClick={() => setCurrentView('home')}
              className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Go Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        activePage={currentView} 
        onNavigate={setCurrentView}
      />
      
      {renderContent()}

      {/* Modals */}
      <DataExplorerModal 
        isOpen={showDataModal} 
        onClose={() => setShowDataModal(false)}
        tables={activeQuestion.tables}
      />
    </div>
  );
};

export default App;