
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface PandaGuideProps {
  activeIdx: number;
}

const PandaGuide: React.FC<PandaGuideProps> = ({ activeIdx }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');

  const messages = [
    "Welcome to your cloud! Scroll to explore our memories! 🐼✨",
    "Look at how far we've come since June! Tap the cards! 🐼🐾",
    "Hold the heart for a squeeze! It vibrates like a real hug! 🐼🫂",
    "Pinky promises are forever! Tap to see why I made them. 🐼💖",
    "I wrote these just for you. Click 'Hear Note' to listen! 🐼💌",
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
        <div className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-100 hover:scale-110 transition-transform animate-bounce [animation-duration:3s]">
          <span className="text-3xl">🐼</span>
        </div>
        
        {/* Decorative hearts around panda */}
        <div className="absolute -top-2 -right-2 text-pink-400 animate-pulse">
          <Heart size={12} fill="currentColor" />
        </div>
        <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-spin-slow">
          <Sparkles size={10} />
        </div>
      </div>

      {/* Speech Bubble */}
      <div className={`transition-all duration-500 ease-out transform ${showBubble ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}>
        <div className="glass px-5 py-3 rounded-[1.5rem] rounded-bl-none max-w-[220px] shadow-2xl border border-white/60 relative">
          <p className="text-[11px] font-bold text-gray-700 leading-relaxed italic">
            {message}
          </p>
          <div className="absolute -left-2 bottom-0 w-3 h-3 bg-white/40 backdrop-blur-md transform rotate-45 border-l border-b border-white/60"></div>
        </div>
      </div>
    </div>
  );
};

export default PandaGuide;
