
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
      color: "hover:shadow-blue-100 dark:hover:shadow-blue-900/20", 
      delay: "0s" 
    },
    { 
      text: "I promise to respect your space.", 
      detail: "Your peace is priority. I understand that sometimes the best way to be there for you is to give you the room to breathe and find yourself.",
      color: "hover:shadow-pink-100 dark:hover:shadow-pink-900/20", 
      delay: "100ms" 
    },
    { 
      text: "I promise to support you quietly.", 
      detail: "I don't need to shout my support from the rooftops. I'll be the steady force in the background, making sure you never have to walk alone.",
      color: "hover:shadow-purple-100 dark:hover:shadow-purple-900/20", 
      delay: "200ms" 
    },
    { 
      text: "I promise to celebrate your wins.", 
      detail: "Every tiny victory of yours is a festival for me. I'll always be your biggest cheerleader, even for the wins you think are too small to mention.",
      color: "hover:shadow-green-100 dark:hover:shadow-green-900/20", 
      delay: "300ms" 
    },
    { 
      text: "I promise to always listen.", 
      detail: "Listening isn't just hearing words; it's understanding the silence between them. I promise to hear your heart even when you can't find the words.",
      color: "hover:shadow-yellow-100 dark:hover:shadow-yellow-900/20", 
      delay: "400ms" 
    },
    { 
      text: "I promise to keep our secrets.", 
      detail: "Our talks are sacred. Everything you trust me with is locked safely in the clouds, where only we have the key. Your trust is my greatest treasure.",
      color: "hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20", 
      delay: "500ms" 
    },
    { 
      text: "I promise to be your calm.", 
      detail: "When your world gets too loud and the storms feel heavy, I'll be the calm sky you can come back to. I'll help you find your steady ground again.",
      color: "hover:shadow-teal-100 dark:hover:shadow-teal-900/20", 
      delay: "600ms" 
    },
    { 
      text: "I promise to keep learning you.", 
      detail: "People change, and that's beautiful. I promise to keep discovering new things about you every day, and falling for this friendship all over again.",
      color: "hover:shadow-orange-100 dark:hover:shadow-orange-900/20", 
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
      className={`relative max-w-5xl mx-auto px-6 py-12 md:py-20 text-center transition-all duration-1000 ease-out transform overflow-hidden rounded-[4rem] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Animated Background Gradient */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-mesh-bg {
            background: linear-gradient(-45deg, #fdfcfb, #fff1f2, #f5f3ff, #fdfcfb);
            background-size: 400% 400%;
            animation: gradient-move 15s ease infinite;
          }
          .dark .animated-mesh-bg {
            background: linear-gradient(-45deg, #020617, #1e1b4b, #0f172a, #020617);
            background-size: 400% 400%;
            animation: gradient-move 15s ease infinite;
          }
        `}
      </style>
      <div className="absolute inset-0 z-[-1] animated-mesh-bg opacity-40" />

      <div className="mb-14 relative z-10">
        <div className={`inline-block p-3 rounded-full mb-6 transition-colors duration-500 ${isDarkMode ? 'bg-indigo-500/10' : 'bg-pink-50'}`}>
          <Heart className={`w-6 h-6 animate-pulse ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
        <h2 className={`text-4xl md:text-7xl font-romantic mb-6 tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>
          Vows for the Sky, Megh ☁️
        </h2>
        <p className={`mb-3 font-semibold text-xs md:text-sm tracking-[0.4em] uppercase transition-colors duration-500 ${isDarkMode ? 'text-indigo-400' : 'text-gray-400'}`}>
          Deepening our roots, one word at a time.
        </p>
        <p className={`text-[11px] font-medium italic transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-300'}`}>
          Tap any card to see the 'why' behind the promise
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10 relative z-10">
        {promises.map((promise, idx) => (
          <div 
            key={idx} 
            style={{ transitionDelay: isVisible ? promise.delay : '0ms' }}
            className={`transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <PromiseCard promise={promise} isDarkMode={isDarkMode} />
          </div>
        ))}
      </div>
      
      <div className="mt-24 opacity-20">
        <Sparkles size={20} className={`mx-auto animate-spin-slow ${isDarkMode ? 'text-indigo-500' : 'text-pink-200'}`} />
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
        particleCount: 20,
        spread: 50,
        origin: { x, y },
        colors: isDarkMode ? ['#818cf8', '#6366f1', '#4f46e5'] : ['#FFC0CB', '#FFD700', '#B0E0E6'],
        scalar: 0.7,
        shapes: ['circle'],
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative p-7 md:p-12 rounded-[3rem] transition-all duration-500 cursor-pointer shadow-sm active:scale-[0.98] overflow-hidden border
        ${isDarkMode 
          ? 'bg-slate-900/40 border-slate-800 backdrop-blur-md' 
          : 'bg-white/40 border-white/80 backdrop-blur'}
        ${active 
          ? `ring-2 scale-[1.03] shadow-2xl ${isDarkMode ? 'ring-indigo-500/30 bg-slate-900/80' : 'ring-pink-100 bg-white/95'} ${promise.color}` 
          : 'hover:bg-white/80 dark:hover:bg-slate-800/60 hover:scale-[1.02]'}
      `}
    >
      {/* Decorative gradient background for active state */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`} />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className={`p-3 rounded-2xl transition-all duration-500 shadow-sm ${
              active 
                ? (isDarkMode ? 'bg-indigo-600 text-white rotate-6' : 'bg-pink-500 text-white rotate-6') 
                : (isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-gray-50 text-gray-300')
            }`}>
              {active ? (
                <CheckCircle2 size={20} className="animate-in zoom-in duration-300" />
              ) : (
                <Sparkles size={20} className="group-hover:text-pink-300 dark:group-hover:text-indigo-400 transition-colors" />
              )}
            </div>
            <span className={`text-lg md:text-2xl font-bold tracking-tight text-left transition-colors duration-300 ${
              active ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-slate-400' : 'text-gray-600')
            }`}>
              {promise.text}
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${
            active ? `rotate-180 ${isDarkMode ? 'text-indigo-400' : 'text-pink-400'}` : 'opacity-0 group-hover:opacity-100 text-gray-300'
          }`} />
        </div>
        
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${active ? 'max-h-60 opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
          <div className={`pt-5 border-t ${isDarkMode ? 'border-slate-800' : 'border-pink-50'}`}>
            <p className={`text-[13px] md:text-base text-left leading-relaxed font-medium italic pl-5 border-l-2 transition-colors duration-500 ${
              isDarkMode ? 'text-slate-300 border-indigo-500/50' : 'text-gray-500 border-pink-200'
            }`}>
              {promise.detail}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle indicator for interactivity */}
      {!active && (
        <div className="absolute bottom-5 right-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-indigo-500' : 'text-pink-300'}`}>
             Reveal Why
           </span>
        </div>
      )}
    </div>
  );
};

export default Promises;
