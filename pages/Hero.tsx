
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
        contents: "Tell me one short, beautiful historical or fun fact that happened on June 10th. Max 15 words.",
        config: { tools: [{ googleSearch: {} }] },
      });
      const text = response.text || "Every day with you is a new history in the making.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks.filter((c: any) => c.web && c.web.uri).map((c: any) => ({ title: "Details", uri: c.web.uri }));
      setFact({ text, links });
    } catch (error) {
      setFact({ text: "Every day with you is a new history in the making.", links: [] });
    } finally {
      setLoadingFact(false);
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 pt-10 pb-20 text-center">
      <div className="mb-4 relative">
        <Cloud className={`w-12 h-12 md:w-20 md:h-20 mx-auto animate-float ${isDarkMode ? 'text-indigo-400' : 'text-blue-200'}`} />
        <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full shadow-lg border ${isDarkMode ? 'bg-slate-800 border-indigo-500/50' : 'bg-pink-50 border-white'}`}>
          <Heart className={`w-3 h-3 ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
      </div>

      <div className="mb-3 animate-in fade-in zoom-in duration-1000">
        <div className={`glass px-6 py-2 rounded-[1.5rem] border shadow-md inline-flex flex-col items-center ${isDarkMode ? 'border-indigo-500/20' : 'border-white'}`}>
          <span className={`text-[8px] font-black uppercase tracking-[0.3em] mb-0.5 ${isDarkMode ? 'text-indigo-500' : 'text-gray-400'}`}>Current Time</span>
          <span className={`text-3xl md:text-5xl font-mono font-bold tracking-tighter ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>
            {formattedTime}
          </span>
        </div>
      </div>
      
      <h1 className={`text-4xl md:text-7xl font-romantic mb-3 tracking-tight ${isDarkMode ? 'text-indigo-100' : 'text-gray-950'}`}>
        Megh's Cloud ☁️
      </h1>
      
      <p className={`text-[10px] md:text-base mb-8 max-w-xs mx-auto font-light leading-relaxed italic opacity-80 ${isDarkMode ? 'text-indigo-300' : 'text-gray-400'}`}>
        "Building a sky full of promises, one tiny moment at a time."
      </p>

      {timeLeft && (
        <div className="mb-10 w-full max-w-2xl">
          <div className={`glass p-4 md:p-8 rounded-[2rem] border-white/50 ${isDarkMode ? 'border-indigo-500/10' : ''}`}>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-3">
                <ClockUnit value={timeLeft.years} label="Yrs" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.months} label="Mth" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.weeks} label="Wk" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.days} label="Day" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.hours} label="Hr" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.minutes} label="Min" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.seconds} label="Sec" highlight isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-xs mx-auto">
        {loadingFact ? (
          <div className="flex items-center gap-2 text-gray-300 text-[10px] justify-center py-4">
            <Loader2 className="animate-spin w-3 h-3" />
            <span className="uppercase tracking-[0.2em] font-bold">Summoning...</span>
          </div>
        ) : fact && (
          <div className={`glass p-5 rounded-[2rem] border shadow-md animate-in fade-in duration-1000 ${isDarkMode ? 'border-indigo-500/20' : 'border-white'}`}>
            <p className={`text-[11px] md:text-sm font-medium italic ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>"{fact.text}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ClockUnit: React.FC<{ value: number; label: string; highlight?: boolean, isDarkMode: boolean }> = ({ value, label, highlight, isDarkMode }) => (
  <div className="flex flex-col items-center">
    <div className={`text-base md:text-2xl font-bold tracking-tighter ${highlight ? (isDarkMode ? 'text-indigo-400' : 'text-pink-500') : (isDarkMode ? 'text-indigo-100' : 'text-gray-800')}`}>
      {value.toString().padStart(2, '0')}
    </div>
    <div className={`text-[6px] md:text-[8px] uppercase tracking-widest font-black mt-0.5 ${isDarkMode ? 'text-indigo-700' : 'text-gray-400'}`}>
      {label}
    </div>
  </div>
);

export default Hero;
