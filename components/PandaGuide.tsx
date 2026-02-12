
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Moon, Sun } from 'lucide-react';

interface PandaGuideProps {
  activeIdx: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const PandaGuide: React.FC<PandaGuideProps> = ({ activeIdx, isDarkMode, onToggleTheme }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');

  const messages = [
    "Welcome to your cloud! Scroll to explore our memories! 🐼✨",
    "Look at how far we've come since June! Tap the cards! 🐼🐾",
    "Hold the heart for a squeeze! It vibrates like a real hug! 🐼🫂",
    "Pinky promises are forever! Tap to see why I made them. 🐼💖",
    "I wrote these just for you. Click 'Hear Note' to listen! 🐼💌",
    "A special poem written just for our 10th June... 🐼📖",
    "Feeling a bit grey? Let's transform your mood! 🐼🪄",
    "Our polaroids! Tap one to read the secret note. 🐼📸",
    "Whatever happens, I'm always in your sky. Love you! 🐼☁️"
  ];

  useEffect(() => {
    setMessage(messages[activeIdx] || "Enjoy the journey! 🐼");
    setShowBubble(true);
    const timer = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(timer);
  }, [activeIdx]);

  return (
    <div className="fixed bottom-32 left-8 z-[100] flex items-end gap-3 pointer-events-none">
      <div className="relative group pointer-events-auto cursor-pointer" onClick={() => setShowBubble(!showBubble)}>
        {/* Panda Character */}
        <div className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center border-4 transition-all hover:scale-110 animate-bounce [animation-duration:3s] ${isDarkMode ? 'bg-slate-900 border-indigo-500/50' : 'bg-white border-gray-100'}`}>
          <span className="text-3xl">🐼</span>
        </div>
        
        {/* Decorative hearts/stars around panda */}
        <div className={`absolute -top-2 -right-2 animate-pulse ${isDarkMode ? 'text-yellow-400' : 'text-pink-400'}`}>
          {isDarkMode ? <Sparkles size={12} fill="currentColor" /> : <Heart size={12} fill="currentColor" />}
        </div>
      </div>

      {/* Speech Bubble */}
      <div className={`transition-all duration-500 ease-out transform ${showBubble ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}>
        <div className={`glass px-5 py-3 rounded-[1.5rem] rounded-bl-none max-w-[240px] shadow-2xl border relative flex flex-col gap-3 ${isDarkMode ? 'bg-slate-900/80 border-indigo-500/30' : 'bg-white/40 border-white/60'}`}>
          <p className={`text-[11px] font-bold leading-relaxed italic ${isDarkMode ? 'text-indigo-100' : 'text-gray-700'}`}>
            {message}
          </p>
          
          <div className="pt-2 border-t border-white/10 flex items-center justify-between pointer-events-auto">
            <span className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-gray-400'}`}>
               Switch {isDarkMode ? 'Light' : 'Dark'} Mode?
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleTheme();
              }}
              className={`p-2 rounded-full transition-all active:scale-75 ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/40' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>

          <div className={`absolute -left-2 bottom-0 w-3 h-3 transform rotate-45 border-l border-b ${isDarkMode ? 'bg-slate-900 border-indigo-500/30' : 'bg-white/40 border-white/60'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default PandaGuide;
