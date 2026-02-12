
import React, { useEffect, useRef } from 'react';
import { Heart, Cloud, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalProps {
  isDarkMode: boolean;
}

const Final: React.FC<FinalProps> = ({ isDarkMode }) => {
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          triggerCelebration();
        }
      },
      { threshold: 0.6 }
    );

    const element = document.getElementById('final-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: isDarkMode ? ['#818cf8', '#6366f1'] : ['#ffc0cb', '#fb7185']
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: isDarkMode ? ['#818cf8', '#6366f1'] : ['#ffc0cb', '#fb7185']
      });
    }, 250);
  };

  return (
    <div id="final-section" className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="relative mb-12">
        <Cloud className={`w-24 h-24 md:w-32 md:h-32 animate-pulse-slow transition-colors duration-500 ${isDarkMode ? 'text-indigo-900/40' : 'text-blue-100'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Heart className={`w-10 h-10 md:w-12 md:h-12 animate-bounce transition-all duration-500 ${isDarkMode ? 'text-indigo-500 fill-indigo-600' : 'text-pink-400 fill-pink-400'}`} />
        </div>
        <Sparkles className="absolute -top-2 -right-2 text-yellow-300 w-6 h-6 animate-spin-slow" />
      </div>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <h2 className={`text-3xl md:text-5xl font-romantic max-w-2xl leading-tight transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-800'}`}>
          However many years pass, <br />
          10 June will always mean something special.
        </h2>

        <div className={`w-16 h-1 mx-auto rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-indigo-900' : 'bg-pink-100'}`} />

        <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-xl mx-auto italic transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          "Bondhutto thakbe, thakte hobe... <br />
          like the sky, constant and calm."
        </p>

        <div className="pt-8">
          <p className={`text-xs tracking-[0.2em] uppercase font-bold mb-6 max-w-sm mx-auto leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>
            I'm always with you if I'm not there. Love you, Megh &lt;3
          </p>
          <div className={`flex justify-center gap-4 transition-colors duration-500 ${isDarkMode ? 'text-indigo-900' : 'text-pink-200'}`}>
             <Heart size={14} fill="currentColor" />
             <Heart size={14} fill="currentColor" className="scale-125" />
             <Heart size={14} fill="currentColor" />
          </div>
        </div>
      </div>
      
      <div className="mt-20 opacity-10 hover:opacity-50 transition-opacity">
        <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Built with magic for Mim</p>
      </div>
    </div>
  );
};

export default Final;
