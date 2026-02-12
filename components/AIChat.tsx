
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, X, Sparkles, Zap, Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

// Define a proper interface for messages to avoid type inference issues
interface Message {
  role: 'user' | 'model' | 'error' | 'admin';
  text: string;
  timestamp: number;
}

interface AIChatProps {
  aiAutopilot: boolean;
}

const AIChat: React.FC<AIChatProps> = ({ aiAutopilot }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('cloudy_chat_logs');
    return saved ? JSON.parse(saved) : [{ role: 'model', text: 'Hey Megh! ☁️ Ki khobor? Ajke bol ki bolte chas...', timestamp: Date.now() }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync logs with localStorage for Admin to intercept
  useEffect(() => {
    localStorage.setItem('cloudy_chat_logs', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Listen for Manual Replies from Admin
  useEffect(() => {
    const handleAdminReply = (e: any) => {
      const { text, role } = e.detail;
      setMessages(prev => [...prev, { role: role || 'model', text, timestamp: Date.now() }]);
      if (role !== 'admin') triggerPositiveVibe();
    };
    window.addEventListener('cloudy-admin-reply', handleAdminReply);
    return () => window.removeEventListener('cloudy-admin-reply', handleAdminReply);
  }, []);

  const triggerPositiveVibe = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.9, x: 0.85 },
      colors: ['#FFC0CB', '#B0E0E6', '#FFD700']
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    // Fix: Explicitly type newMessages as Message[] to ensure the 'role' property literal is correctly typed
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg, timestamp: Date.now() }];
    setMessages(newMessages);

    // If Autopilot is OFF, we don't call Gemini. Admin must reply manually.
    if (!aiAutopilot) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are Cloudy, Megh's (Mim) best friend's AI assistant. 
          Respond as a warm, funny, and supportive bestie. 
          Use Banglish and lots of cloud/star emojis. 
          Keep it short (max 20 words).`,
        },
      });
      
      const text = response.text || "Ki bolbi bol, ami sunchi...";
      setMessages(prev => [...prev, { role: 'model', text, timestamp: Date.now() }]);
      
      const positiveKeywords = ['✨', 'happy', 'bhalo', 'smile', 'love', 'valobashi', 'joy', 'magic', 'hug'];
      if (positiveKeywords.some(k => text.toLowerCase().includes(k))) triggerPositiveVibe();

    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'error', text: "Cloud signal weak... try again? ☁️", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-3xl w-[88vw] sm:w-80 h-[500px] rounded-[3rem] shadow-2xl border border-white/50 flex flex-col overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-6 duration-300">
          <div className="bg-gradient-to-r from-pink-100/40 to-blue-50/40 p-5 border-b border-pink-50/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Sparkles size={14} className="text-pink-500 animate-pulse" />
              </div>
              <div>
                <span className="font-bold text-gray-800 text-xs tracking-tight">Cloudy AI</span>
                {!aiAutopilot && (
                  <div className="flex items-center gap-1">
                    <ShieldAlert size={8} className="text-orange-500" />
                    <span className="text-[7px] font-black text-orange-500 uppercase">Manual Mode</span>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/50 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[12px] leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-gray-900 text-white rounded-tr-none' : 
                  m.role === 'error' ? 'bg-red-50 text-red-600 rounded-tl-none' :
                  m.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 italic rounded-tl-none' :
                  'glass text-gray-800 rounded-tl-none border-gray-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1 h-1 bg-pink-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-pink-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-pink-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            {!aiAutopilot && !isTyping && lastMessage?.role === 'user' && (
              <p className="text-[10px] text-center text-gray-300 italic">Cloudy is thinking deeply...</p>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2 bg-white/50">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Bol ki bolbi..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-xs outline-none focus:ring-2 focus:ring-pink-100"
            />
            <button onClick={handleSend} disabled={isTyping || !input.trim()} className="bg-gray-950 text-white p-3 rounded-2xl hover:bg-black disabled:opacity-50 transition-all active:scale-90">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-gray-950 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all relative group">
          <Zap size={24} className="relative z-10" />
          <div className="absolute inset-0 bg-pink-400 blur-xl opacity-40 animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default AIChat;
