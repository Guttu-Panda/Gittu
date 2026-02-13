
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2, ChevronDown, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromisesProps {
  isDarkMode: boolean;
}

const Promises: React.FC<PromisesProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const promises = [
    { 
      text: "I promise to stay real.", 
      detail: "In a world where everyone wears masks, I promise to always be the person you first met. Honesty is what keeps our 'cloudy' bond grounded.",
      color: "hover:shadow-blue-200/20 dark:hover:shadow-blue-900/40", 
      delay: "0s" 
    },
    { 
      text: "I promise to respect your space.", 
      detail: "Your peace is priority. I understand that sometimes the best way to be there for you is to give you the room to breathe and find yourself.",
      color: "hover:shadow-pink-200/20 dark:hover:shadow-pink-900/40", 
      delay: "100ms" 
    },
    { 
      text: "I promise to support you quietly.", 
      detail: "I don't need to shout my support from the rooftops. I'll be the steady force in the background, making sure you never have to walk alone.",
      color: "hover:shadow-purple-200/20 dark:hover:shadow-purple-900/40", 
      delay: "200ms" 
    },
    { 
      text: "I promise to celebrate your wins.", 
      detail: "Every tiny victory of yours is a festival for me. I'll always be your biggest cheerleader, even for the wins you think are too small to mention.",
      color: "hover:shadow-green-200/20 dark:hover:shadow-green-900/40", 
      delay: "300ms" 
    },
    { 
      text: "I promise to always listen.", 
      detail: "Listening isn't just hearing words; it's understanding the silence between them. I promise to hear your heart even when you can't find the words.",
      color: "hover:shadow-yellow-200/20 dark:hover:shadow-yellow-900/40", 
      delay: "400ms" 
    },
    { 
      text: "I promise to keep our secrets.", 
      detail: "Our talks are sacred. Everything you trust me with is locked safely in the clouds, where only we have the key. Your trust is my greatest treasure.",
      color: "hover:shadow-indigo-200/20 dark:hover:shadow-indigo-900/40", 
      delay: "500ms" 
    },
    { 
      text: "I promise to be your calm.", 
      detail: "When your world gets too loud and the storms feel heavy, I'll be the calm sky you can come back to. I'll help you find your steady ground again.",
      color: "hover:shadow-teal-200/20 dark:hover:shadow-teal-900/40", 
      delay: "600ms" 
    },
    { 
      text: "I promise to keep learning you.", 
      detail: "People change, and that's beautiful. I promise to keep discovering new things about you every day, and falling for this friendship all over again.",
      color: "hover:shadow-orange-200/20 dark:hover:shadow-orange-900/40", 
      delay: "700ms" 
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center transition-all duration-1000 ease-out transform overflow-hidden rounded-[4rem] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Refined Animated Background Gradient */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .promises-mesh-bg {
            background: linear-gradient(-45deg, #fff7ed, #fff1f2, #f5f3ff, #fff7ed);
            background-size: 400% 400%;
            animation: gradient-move 20s ease infinite;
          }
          .dark .promises-mesh-bg {
            background: linear-gradient(-45deg, #020617, #0f172a, #020617);
            background-size: 400% 400%;
            animation: gradient-move 20s ease infinite;
          }
        `}
      </style>
      <div className="absolute inset-0 z-[-1] promises-mesh-bg opacity-40" />

      <div className="mb-16 relative z-10">
        <div className={`inline-block p-3 rounded-2xl mb-8 transition-all duration-500 shadow-xl ${isDarkMode ? 'bg-indigo-600/20 border border-indigo-500/40' : 'bg-white border border-pink-100 shadow-pink-100/50'}`}>
          <Heart className={`w-6 h-6 animate-pulse ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-600 fill-pink-600'}`} />
        </div>
        <h2 className={`text-5xl md:text-7xl font-romantic mb-6 tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-slate-950 font-black'}`}>
          Vows for the Sky, Megh
        </h2>
        <p className={`mb-4 font-black text-[11px] md:text-sm tracking-[0.6em] uppercase transition-colors duration-500 ${isDarkMode ? 'text-indigo-400' : 'text-slate-600'}`}>
          Our digital pinky promises
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {promises.map((promise, idx) => (
          <div 
            key={idx} 
            style={{ transitionDelay: isVisible ? promise.delay : '0ms' }}
            className={`transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <PromiseCard promise={promise} isDarkMode={isDarkMode} />
          </div>
        ))}
      </div>
      
      <div className="mt-20 opacity-20">
        <Sparkles size={24} className={`mx-auto animate-spin-slow ${isDarkMode ? 'text-indigo-500' : 'text-pink-300'}`} />
      </div>
    </div>
  );
};

const PromiseCard: React.FC<{ promise: { text: string; detail: string; color: string }; isDarkMode: boolean }> = ({ promise, isDarkMode }) => {
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setActive(!active);
    
    if (!active) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x, y },
        colors: isDarkMode ? ['#818cf8', '#c084fc'] : ['#f43f5e', '#ec4899', '#fcd34d'],
        scalar: 0.7,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative p-8 md:p-10 rounded-[3rem] transition-all duration-500 cursor-pointer shadow-xl active:scale-[0.97] overflow-hidden border
        ${isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/40 backdrop-blur-xl' 
          : 'bg-white/95 border-slate-200/50 hover:border-pink-300 backdrop-blur-lg shadow-gray-200/50'}
        ${active 
          ? `translate-y-[-6px] ${isDarkMode ? 'ring-2 ring-indigo-500/30' : 'ring-2 ring-pink-400/20'}` 
          : ''}
        ${promise.color}
      `}
    >
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className={`shrink-0 p-3 rounded-2xl transition-all duration-500 shadow-md ${
              active 
                ? (isDarkMode ? 'bg-indigo-600 text-white scale-110 rotate-12' : 'bg-pink-600 text-white scale-110 rotate-12') 
                : (isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-pink-400')
            }`}>
              {active ? <CheckCircle2 size={18} /> : <Sparkles size={18} />}
            </div>
            <span className={`text-lg md:text-xl font-black tracking-tight text-left leading-tight transition-colors duration-300 ${
              active ? (isDarkMode ? 'text-white' : 'text-slate-950') : (isDarkMode ? 'text-slate-300' : 'text-slate-800')
            }`}>
              {promise.text}
            </span>
          </div>
          <ChevronDown className={`shrink-0 w-5 h-5 transition-transform duration-500 ${
            active ? 'rotate-180 text-indigo-500' : 'opacity-0 group-hover:opacity-100 text-gray-400'
          }`} />
        </div>
        
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className={`pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <p className={`text-sm md:text-lg text-left leading-relaxed font-bold italic transition-colors duration-500 ${
              isDarkMode ? 'text-indigo-100/90' : 'text-slate-700'
            }`}>
              {promise.detail}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default Promises;
