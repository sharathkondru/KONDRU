import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Clock, RefreshCw, Send, Mic, Sparkles, Share2, HelpCircle, Eye, Play, Pause } from 'lucide-react';
import { Message, QuestionData } from '../types';

interface ChatPanelProps {
  question: QuestionData;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
  onBack: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ question, messages, onSendMessage, isTyping, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 bg-white">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Questions
        </button>
        
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-gray-900">{question.title}</h1>
          <div className="flex items-center text-xs text-gray-500 gap-2">
            <span>Company: <span className="font-semibold text-gray-700">{question.company}</span></span>
            <span>•</span>
            <span>Difficulty: <span className="text-indigo-600 font-medium">{question.difficulty}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 gap-2 bg-gray-50 shadow-sm">
            <span className={`font-mono w-10 text-center ${isTimerRunning ? 'text-indigo-600 font-bold' : ''}`}>
              {formatTime(seconds)}
            </span>
            <div className="border-l border-gray-300 h-4"></div>
            <button 
              onClick={toggleTimer}
              className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-indigo-600 transition-colors"
              title={isTimerRunning ? "Pause" : "Start"}
            >
              {isTimerRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            <button 
              onClick={resetTimer}
              className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-indigo-600 transition-colors"
              title="Reset"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                msg.role === 'model' ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-900 border-slate-700'
              }`}>
                 {msg.role === 'model' ? (
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Dawn&backgroundColor=e0e7ff`} alt="AI" className="w-full h-full rounded-full" />
                 ) : (
                   <span className="text-white text-xs font-bold">You</span>
                 )}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col gap-1">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-100 text-slate-800 rounded-tr-sm' 
                    : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100 shadow-sm'
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="min-h-[1rem]">{line}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="flex gap-3 max-w-[85%]">
               <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Dawn&backgroundColor=e0e7ff`} alt="AI" className="w-full h-full" />
               </div>
               <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-2 flex gap-2 overflow-x-auto no-scrollbar py-2 border-t border-gray-50 bg-gray-50/50">
        <ActionButton icon={<HelpCircle size={14} />} text="I have a question" onClick={() => onSendMessage("I have a question about the schema.")} />
        <ActionButton icon={<Share2 size={14} />} text="Share my approach" onClick={() => onSendMessage("Here is my approach: I will join the suppliers table with deliveries...")} />
        <ActionButton icon={<Sparkles size={14} />} text="Give me a hint" onClick={() => onSendMessage("Can you give me a small hint?")} />
        <ActionButton icon={<Eye size={14} />} text="Reveal answer" onClick={() => onSendMessage("I give up, can you reveal the answer?")} />
      </div>

      {/* Input Area */}
      <div className="p-6 pt-2 bg-white">
        <div className="relative border border-gray-200 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all shadow-sm">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message to Dawn..."
            className="w-full bg-transparent p-4 pr-12 text-sm outline-none resize-none h-16 max-h-32 text-gray-700 placeholder-gray-400"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition">
              <Mic size={18} />
            </button>
            <button 
              onClick={handleSend}
              className={`p-2 rounded-lg transition-colors ${inputText.trim() ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              disabled={!inputText.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void }> = ({ icon, text, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-100 rounded-full text-xs font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all whitespace-nowrap shadow-sm"
  >
    {icon}
    {text}
  </button>
);