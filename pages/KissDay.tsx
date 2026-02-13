
import React, { useState, useCallback, useRef } from 'react';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import confetti from 'canvas-confetti';

interface KissDayProps {
  isDarkMode: boolean;
}

interface KissParticle {
  id: number;
  x: number;
  y: number;
}

interface RippleEffect {
  id: number;
}

const KissDay: React.FC<KissDayProps> = ({ isDarkMode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [kissNote, setKissNote] = useState<string | null>(null);
  const [activeKisses, setActiveKisses] = useState<KissParticle[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isGlowing, setIsGlowing] = useState(false);
  const lastInteractionRef = useRef<number>(0);

  const spawnKiss = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setActiveKisses(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setActiveKisses(prev => prev.filter(k => k.id !== id));
    }, 800);
  };

  const handleInteraction = useCallback(async (e: React.PointerEvent) => {
    const now = Date.now();
    if (now - lastInteractionRef.current < 100) return;
    lastInteractionRef.current = now;

    const x = e.clientX;
    const y = e.clientY;
    spawnKiss(x, y);

    if (isProcessing) return;

    const rid = Date.now() + Math.random();
    setRipples(prev => [...prev, { id: rid }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rid));
    }, 1000);

    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 300);

    setIsProcessing(true);
    
    const scalar = 2.5;
    const kiss = confetti.shapeFromText({ text: '💋', scalar });
    const heart = confetti.shapeFromText({ text: '❤️', scalar: 1.5 });

    const softColors = isDarkMode 
        ? ['#818cf8', '#a78bfa', '#f472b6', '#e879f9'] 
        : ['#fecdd3', '#fda4af', '#fbcfe8', '#e9d5ff'];

    const defaults = {
      spread: 80,
      ticks: 120,
      gravity: 0.6,
      decay: 0.94,
      startVelocity: 30,
      shapes: [kiss, heart, 'circle'] as any[],
      colors: softColors
    };

    confetti({
      ...defaults,
      particleCount: 30,
      origin: { y: 0.6 },
    });

    if ("vibrate" in navigator) {
      navigator.vibrate([40, 30, 60]);
    }

    await fetchKissNote();
    setIsProcessing(false);
  }, [isDarkMode, isProcessing]);

  const fetchKissNote = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Today is Kiss Day. Write a very sweet, romantic, and poetic Banglish note for Megh (Mim). Keep it under 15 words. Mention the magic in our bond.",
      });
      setKissNote(response.text || "Amar sob moshoka tor jonno, Megh! 💋✨");
    } catch (e) {
      setKissNote("Toke ekta jadu moshoka dilam, Megh! ❤️");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center py-12 select-none touch-none">
      {activeKisses.map(k => (
        <div 
          key={k.id}
          className="fixed pointer-events-none z-[110] text-4xl animate-kiss-pop"
          style={{ left: k.x, top: k.y }}
        >
          💋
        </div>
      ))}

      <div className="mb-12 animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className={`glass inline-block px-5 py-2 rounded-full mb-6 border transition-all duration-500 shadow-sm ${isDarkMode ? 'border-indigo-500/30 text-indigo-400' : 'border-pink-200 text-pink-600 bg-white/50'}`}>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">February 13 • Kiss Day</span>
        </div>
        <h2 className={`text-6xl md:text-8xl font-serif font-medium mb-6 tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-950'}`}>A Virtual Kiss</h2>
        <p className={`text-sm md:text-lg font-light italic max-w-sm mx-auto opacity-70 leading-relaxed ${isDarkMode ? 'text-indigo-300' : 'text-slate-600'}`}>
          "Two souls, one tiny moment."
        </p>
      </div>

      <div className="relative mb-24 group">
        {ripples.map(r => (
          <div 
            key={r.id} 
            className={`absolute inset-0 rounded-full border-[6px] animate-ripple pointer-events-none z-0 ${isDarkMode ? 'border-indigo-400/30' : 'border-pink-300/30'}`} 
          />
        ))}

        <div className={`absolute inset-0 blur-[120px] opacity-20 rounded-full transition-all duration-700 group-hover:opacity-40 group-hover:scale-125 ${isDarkMode ? 'bg-indigo-500' : 'bg-pink-400'}`} />
        
        <button 
          onPointerDown={handleInteraction}
          className={`relative w-44 h-44 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center transition-all duration-500 active:scale-90 select-none z-10
            ${isDarkMode 
              ? 'bg-slate-900 border border-indigo-500/20 hover:border-indigo-500/50 shadow-[0_30px_60px_rgba(0,0,0,0.6)]' 
              : 'bg-white border-2 border-pink-50 hover:border-pink-200 shadow-[0_30px_60px_rgba(244,63,94,0.1)]'}
            ${isGlowing ? (isDarkMode ? 'shadow-[0_0_100px_rgba(99,102,241,0.5)]' : 'shadow-[0_0_100px_rgba(244,63,94,0.5)]') : ''}
          `}
        >
          <div className={`transition-all duration-700 ease-out ${isProcessing ? 'scale-125 rotate-6' : 'animate-kiss-pulse'}`}>
            <span className="text-8xl md:text-[10rem] drop-shadow-2xl">💋</span>
          </div>
          
          <div className={`absolute bottom-8 flex flex-col items-center transition-all duration-500 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>
             <span className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>
               Press For Magic
             </span>
          </div>
        </button>

        {isProcessing && Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute pointer-events-none animate-ping text-pink-400 opacity-60`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          >
            <Heart size={24} fill="currentColor" />
          </div>
        ))}
      </div>

      <div className="w-full max-w-md h-56 flex items-start justify-center">
        {isProcessing && !kissNote ? (
          <div className="flex flex-col items-center gap-4 text-gray-400 animate-pulse py-10">
            <Loader2 className="animate-spin w-8 h-8 opacity-50" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Summoning...</span>
          </div>
        ) : kissNote && (
          <div 
            onPointerDown={(e) => spawnKiss(e.clientX, e.clientY)}
            className={`glass p-12 rounded-[3.5rem] shadow-2xl border animate-in slide-in-from-bottom-12 fade-in zoom-in duration-1000 relative overflow-hidden transition-all duration-500 cursor-pointer active:scale-[0.98] ${isDarkMode ? 'border-indigo-500/30 bg-slate-900/90 shadow-indigo-950/40' : 'border-pink-100 bg-white/95 shadow-pink-100/30'}`}
          >
            <Sparkles className={`absolute -top-8 -right-8 opacity-10 animate-pulse ${isDarkMode ? 'text-indigo-400' : 'text-pink-400'}`} size={160} />
            <p className={`text-2xl md:text-3xl font-serif italic leading-relaxed relative z-10 transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900 font-medium'}`}>
              "{kissNote}"
            </p>
            <div className="mt-10 flex justify-center gap-6 items-center">
              <div className={`w-12 h-px transition-colors duration-500 opacity-20 ${isDarkMode ? 'bg-indigo-300' : 'bg-pink-300'}`} />
              <Heart className={`w-5 h-5 transition-all duration-500 ${isDarkMode ? 'text-indigo-500 fill-indigo-500 animate-pulse' : 'text-pink-500 fill-pink-500 animate-pulse'}`} />
              <div className={`w-12 h-px transition-colors duration-500 opacity-20 ${isDarkMode ? 'bg-indigo-300' : 'bg-pink-300'}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KissDay;
