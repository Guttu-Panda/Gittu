
import React, { useState, useEffect, useMemo } from 'react';
import { Cloud, Heart, Sparkles, ExternalLink, Loader2, Clock as ClockIcon } from 'lucide-react';
import { calculateTimeDifference, TimeDiff } from '../utils/time.ts';
import { GoogleGenAI } from "@google/genai";

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState<TimeDiff | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fact, setFact] = useState<{ text: string, links: { title: string, uri: string }[] } | null>(null);
  const [loadingFact, setLoadingFact] = useState(false);
  const startDate = useMemo(() => new Date('2024-06-10T00:00:00'), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeDifference(startDate));
      setCurrentTime(new Date());
    }, 1000);
    fetchDailyFact();
    return () => clearInterval(timer);
  }, [startDate]);

  const fetchDailyFact = async () => {
    setLoadingFact(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Tell me one short, beautiful historical or fun fact that happened on June 10th or something sweet and supportive for today. Keep it under 18 words. Banglish is okay.",
        config: { tools: [{ googleSearch: {} }] },
      });

      const text = response.text || "Every day with you is a new history in the making.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter((c: any) => c.web && c.web.uri)
        .map((c: any) => ({ title: "Details", uri: c.web.uri }));

      setFact({ text, links });
    } catch (error) {
      setFact({ text: "Every day with you is a new history in the making.", links: [] });
    } finally {
      setLoadingFact(false);
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 pt-16 pb-32 text-center">
      <div className="mb-6 relative">
        <div className={`absolute inset-0 blur-[80px] opacity-20 rounded-full scale-150 ${isDarkMode ? 'bg-indigo-500' : 'bg-blue-200'}`}></div>
        <Cloud className={`w-16 h-16 md:w-24 md:h-24 mx-auto filter drop-shadow-2xl relative z-10 animate-float ${isDarkMode ? 'text-indigo-400' : 'text-blue-200'}`} />
        <div className={`absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg border animate-bounce ${isDarkMode ? 'bg-slate-800 border-indigo-500/50' : 'bg-pink-50 border-white'}`}>
          <Heart className={`w-4 h-4 ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
      </div>

      {/* Real Time Clock */}
      <div className="mb-4 animate-in fade-in zoom-in duration-1000">
        <div className={`glass px-8 py-4 rounded-[2rem] border shadow-xl inline-flex flex-col items-center ${isDarkMode ? 'border-indigo-500/20' : 'border-white'}`}>
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${isDarkMode ? 'text-indigo-500' : 'text-gray-400'}`}>Current Time</span>
          <span className={`text-4xl md:text-6xl font-mono font-bold tracking-tighter ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>
            {formattedTime}
          </span>
        </div>
      </div>
      
      <h1 className={`text-5xl md:text-8xl font-romantic mb-4 px-2 tracking-tight ${isDarkMode ? 'text-indigo-100' : 'text-gray-950'}`}>
        Megh's Cloud ☁️
      </h1>
      
      <p className={`text-xs md:text-lg mb-10 max-w-lg mx-auto font-light leading-relaxed italic opacity-80 ${isDarkMode ? 'text-indigo-300' : 'text-gray-400'}`}>
        "Building a sky full of promises, one tiny moment at a time."
      </p>

      {/* Countdown Section */}
      {timeLeft && (
        <div className="mb-16 w-full max-w-4xl px-4">
          <div className={`glass p-6 md:p-10 rounded-[3rem] relative overflow-hidden group border-white/50 ${isDarkMode ? 'border-indigo-500/10' : ''}`}>
            <div className={`absolute top-0 left-0 w-full h-full pointer-events-none ${isDarkMode ? 'bg-gradient-to-br from-indigo-900/10 to-transparent' : 'bg-gradient-to-br from-pink-50/10 to-blue-50/10'}`} />
            
            <div className="flex items-center justify-center gap-3 mb-6">
                <ClockIcon className={`w-4 h-4 animate-spin-slow ${isDarkMode ? 'text-indigo-400' : 'text-pink-300'}`} />
                <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-indigo-500' : 'text-gray-400'}`}>Our Journey Since June 10, 2024</span>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-4">
                <ClockUnit value={timeLeft.years} label="Years" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.months} label="Months" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.weeks} label="Weeks" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.days} label="Days" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.hours} label="Hrs" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.minutes} label="Min" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.seconds} label="Sec" highlight isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm mx-auto px-4">
        {loadingFact ? (
          <div className="flex items-center gap-3 text-gray-300 text-sm justify-center py-6">
            <Loader2 className="animate-spin w-4 h-4" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Summoning Stars...</span>
          </div>
        ) : fact && (
          <div className={`glass p-8 rounded-[2.5rem] border shadow-xl animate-in fade-in zoom-in-95 duration-1000 relative overflow-hidden group ${isDarkMode ? 'border-indigo-500/20' : 'border-white'}`}>
            <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000 ${isDarkMode ? 'bg-indigo-900/20' : 'bg-pink-100/30'}`}></div>
            <div className="flex items-center gap-2 mb-4 justify-center relative z-10">
              <Sparkles size={16} className="text-yellow-400" />
              <span className={`text-[9px] font-bold uppercase tracking-[0.4em] ${isDarkMode ? 'text-indigo-400' : 'text-pink-300'}`}>Daily Cloud Spark</span>
            </div>
            <p className={`text-sm md:text-lg font-medium leading-relaxed mb-6 italic relative z-10 ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>"{fact.text}"</p>
            {fact.links.length > 0 && (
              <a 
                href={fact.links[0].uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-[9px] px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all relative z-10 hover:translate-y-[-2px] ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-blue-50/80 text-blue-500 hover:bg-blue-100'}`}
              >
                <ExternalLink size={12} /> See More
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ClockUnit: React.FC<{ value: number; label: string; highlight?: boolean, isDarkMode: boolean }> = ({ value, label, highlight, isDarkMode }) => (
  <div className="flex flex-col items-center">
    <div className={`text-xl md:text-3xl font-bold tracking-tighter ${highlight ? (isDarkMode ? 'text-indigo-400' : 'text-pink-500') : (isDarkMode ? 'text-indigo-100' : 'text-gray-800')}`}>
      {value.toString().padStart(2, '0')}
    </div>
    <div className={`text-[7px] md:text-[8px] uppercase tracking-widest font-black mt-1 ${isDarkMode ? 'text-indigo-700' : 'text-gray-400'}`}>
      {label}
    </div>
  </div>
);

export default Hero;
