
import React, { useState, useEffect, useMemo } from 'react';
import { Cloud, Heart, Loader2 } from 'lucide-react';
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
        <Cloud className={`w-14 h-14 md:w-20 md:h-20 mx-auto animate-float ${isDarkMode ? 'text-indigo-400' : 'text-blue-200'}`} />
        <div className={`absolute -bottom-1 -right-1 p-2 rounded-full shadow-lg border ${isDarkMode ? 'bg-slate-800 border-indigo-500/50' : 'bg-pink-50 border-white'}`}>
          <Heart className={`w-3 h-3 ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
      </div>

      <div className="mb-6 animate-in fade-in zoom-in duration-1000">
        <div className={`glass px-8 py-3 rounded-[2rem] border shadow-sm inline-flex flex-col items-center ${isDarkMode ? 'border-indigo-500/20' : 'border-white/50'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-1 opacity-50 ${isDarkMode ? 'text-indigo-300' : 'text-gray-400'}`}>Current Time</span>
          <span className={`text-4xl md:text-6xl font-medium tracking-tighter ${isDarkMode ? 'text-indigo-50' : 'text-slate-800'}`}>
            {formattedTime}
          </span>
        </div>
      </div>
      
      <h1 className={`text-6xl md:text-9xl font-serif font-medium mb-1 tracking-tighter leading-none ${isDarkMode ? 'text-indigo-100' : 'text-gray-950'}`}>
        Megh
      </h1>
      <h2 className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] mb-8 transition-colors duration-500 ${isDarkMode ? 'text-indigo-400' : 'text-pink-500'}`}>
        Mim
      </h2>
      
      <p className={`text-sm md:text-lg mb-12 max-w-xs mx-auto font-light leading-relaxed italic opacity-60 ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>
        "Building a sky full of promises, one tiny moment at a time."
      </p>

      {timeLeft && (
        <div className="mb-12 w-full max-w-2xl px-2">
          <div className={`glass p-6 md:p-10 rounded-[2.5rem] border-white/50 ${isDarkMode ? 'border-indigo-500/10' : ''}`}>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
                <ClockUnit value={timeLeft.years} label="Years" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.months} label="Months" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.weeks} label="Weeks" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.days} label="Days" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.hours} label="Hours" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.minutes} label="Mins" isDarkMode={isDarkMode} />
                <ClockUnit value={timeLeft.seconds} label="Secs" highlight isDarkMode={isDarkMode} />
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
          <div className={`glass p-6 rounded-[2rem] border shadow-sm animate-in fade-in duration-1000 ${isDarkMode ? 'border-indigo-500/20' : 'border-white/50'}`}>
            <p className={`text-xs md:text-sm font-light leading-relaxed ${isDarkMode ? 'text-indigo-100' : 'text-slate-700'}`}>
              <span className="font-bold mr-2">Did you know?</span>
              {fact.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ClockUnit: React.FC<{ value: number; label: string; highlight?: boolean, isDarkMode: boolean }> = ({ value, label, highlight, isDarkMode }) => (
  <div className="flex flex-col items-center">
    <div className={`text-xl md:text-3xl font-semibold tracking-tighter ${highlight ? (isDarkMode ? 'text-indigo-400' : 'text-pink-500') : (isDarkMode ? 'text-indigo-50' : 'text-slate-800')}`}>
      {value.toString().padStart(2, '0')}
    </div>
    <div className={`text-[8px] uppercase tracking-widest font-bold mt-1 opacity-40 ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>
      {label}
    </div>
  </div>
);

export default Hero;
