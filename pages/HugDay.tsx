
import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import confetti from 'canvas-confetti';

const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

interface HugDayProps {
  isDarkMode: boolean;
}

const HugDay: React.FC<HugDayProps> = ({ isDarkMode }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hugNote, setHugNote] = useState<string | null>(null);
  const [loadingNote, setLoadingNote] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const whisperSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const hugGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueG56Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Jm09Zw/PHZ7v9tfQu0o0/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHNwd29yeGdzbmJidmJidmJidmJidmJidmJidmJidmJidmJidmJidmJm09Zw/3M4NpbLCTxBqU/giphy.gif"
  ];
  const selectedGif = useRef(hugGifs[Math.floor(Math.random() * hugGifs.length)]);

  const startHug = async () => {
    if (isCompleted) return;
    setIsPressing(true);
    
    if ("vibrate" in navigator) {
      heartbeatRef.current = window.setInterval(() => {
        navigator.vibrate([40, 100, 40, 500]);
      }, 800);
    }

    triggerWhisper();

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          completeHug();
          return 100;
        }
        return prev + 1.2;
      });
    }, 30);
  };

  const triggerWhisper = async () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Softly say: I'm right here with you, Megh. Feel the warmth of this hug." }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio && audioCtxRef.current) {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        
        const audioBuffer = await decodeAudioData(bytes, audioCtxRef.current, 24000, 1);
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = audioBuffer;
        
        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.4, audioCtxRef.current.currentTime + 0.5);
        
        source.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        source.start();
        whisperSourceRef.current = source;
      }
    } catch (e) {
      console.error("Whisper failed:", e);
    }
  };

  const stopHug = () => {
    setIsPressing(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    if (whisperSourceRef.current) {
      try { whisperSourceRef.current.stop(); } catch(e) {}
    }
    if (!isCompleted) setProgress(0);
  };

  const completeHug = () => {
    setIsCompleted(true);
    setIsPressing(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: isDarkMode ? ['#818cf8', '#6366f1'] : ['#fb7185', '#fda4af']
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    fetchHugNote();
  };

  const fetchHugNote = async () => {
    setLoadingNote(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Today is Hug Day. Write a tiny, super-warm Banglish note for Megh (Mim) to accompany a virtual hug. 12 words max. Use 'Cloudy' style.",
      });
      setHugNote(response.text || "Eita ekta boro jadur jhappi tor jonno! ❤️");
    } catch (e) {
      setHugNote("Asol jhappi ta thaklo, Megh! 🤗");
    } finally {
      setLoadingNote(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[85vh] px-6 text-center py-12 relative transition-all duration-700 ${isPressing ? 'scale-[0.98]' : 'scale-100'}`}>
      <div className={`fixed inset-0 transition-opacity duration-1000 pointer-events-none z-[-1] ${isPressing ? (isDarkMode ? 'opacity-20' : 'opacity-100') : 'opacity-0'}`}
           style={{ background: isDarkMode ? 'radial-gradient(circle at center, #1e1b4b 0%, transparent 70%)' : 'radial-gradient(circle at center, #fff7ed 0%, transparent 70%)' }} />
      
      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className={`glass inline-block px-6 py-2 rounded-full mb-4 ring-1 transition-colors duration-500 ${isDarkMode ? 'ring-indigo-500/20' : 'ring-pink-100'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${isDarkMode ? 'text-indigo-400' : 'text-pink-400'}`}>February 12 • Hug Day</span>
        </div>
        <h2 className={`text-5xl md:text-7xl font-serif font-medium mb-4 tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900'}`}>The Warmest Embrace</h2>
        <p className={`text-sm md:text-xl font-light italic max-w-md mx-auto leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>
          {isCompleted 
            ? "Hug Delivered. Warmth received? 🫂" 
            : "Sometimes words can't squeeze tight enough."}
        </p>
      </div>

      {!isCompleted ? (
        <div className="relative mb-16 select-none group">
          <svg className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90 relative z-10">
            <circle cx="50%" cy="50%" r="48%" fill="none" stroke={isDarkMode ? "#0f172a" : "#f3f4f6"} strokeWidth="1" />
            <circle
              cx="50%" cy="50%" r="48%"
              fill="none"
              stroke={isDarkMode ? "#6366f1" : "#fb923c"}
              strokeWidth="4"
              strokeDasharray="100%"
              strokeDashoffset={`${100 - progress}%`}
              className="transition-all duration-100 ease-linear"
              strokeLinecap="round"
            />
          </svg>

          <div 
            onMouseDown={startHug}
            onMouseUp={stopHug}
            onMouseLeave={stopHug}
            onTouchStart={startHug}
            onTouchEnd={stopHug}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer shadow-2xl z-20
              ${isPressing 
                ? (isDarkMode ? 'scale-[1.1] bg-slate-900 ring-4 ring-indigo-900/40' : 'scale-[1.1] bg-white ring-4 ring-orange-50') 
                : (isDarkMode ? 'scale-100 bg-slate-900 border border-white/5 shadow-indigo-900/20' : 'scale-100 bg-white shadow-pink-100')}
            `}
          >
            <div className={`transition-all duration-500 ${isPressing ? 'animate-pulse' : ''}`}>
               <Heart 
                 size={isPressing ? 80 : 64} 
                 className={`transition-all duration-500 ${isPressing ? (isDarkMode ? 'text-indigo-500 fill-indigo-600' : 'text-pink-500 fill-pink-500') : (isDarkMode ? 'text-slate-800' : 'text-pink-100')}`} 
               />
            </div>
            <div className="mt-4 flex flex-col items-center gap-1">
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                {isPressing ? 'Squeezing...' : 'Hold To Hug'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto flex flex-col items-center mb-16 animate-in zoom-in fade-in duration-1000">
           <div className={`w-full max-w-[300px] aspect-square rounded-[3rem] overflow-hidden border-4 shadow-2xl relative mb-12 rotate-[-2deg] transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white'}`}>
              <img 
                src={selectedGif.current} 
                alt="Hug Animation" 
                className={`w-full h-full object-cover transition-all duration-700 ${isDarkMode ? 'grayscale-[40%] brightness-75' : 'grayscale-[20%]'}`} 
              />
              <Heart className={`absolute bottom-4 right-4 w-8 h-8 animate-pulse transition-all duration-500 ${isDarkMode ? 'text-indigo-500 fill-indigo-600' : 'text-pink-500 fill-pink-500'}`} />
           </div>

           {loadingNote ? (
                <div className="flex items-center gap-4 text-gray-300 text-xs justify-center py-8">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="tracking-[0.4em] uppercase font-bold">Summoning...</span>
                </div>
            ) : hugNote && (
                <div className={`glass p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl ring-1 w-full transition-all duration-500 ${isDarkMode ? 'bg-slate-900/80 border-indigo-500/20 ring-indigo-900/10' : 'border-pink-50 ring-pink-50'}`}>
                    <Sparkles className={`absolute -top-4 -right-4 p-8 opacity-5 ${isDarkMode ? 'text-indigo-500' : 'text-pink-500'}`} size={80} />
                    <p className={`text-2xl md:text-3xl font-serif font-medium leading-relaxed italic transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900'}`}>
                        "{hugNote}"
                    </p>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <div className={`w-10 h-px opacity-30 ${isDarkMode ? 'bg-indigo-300' : 'bg-pink-300'}`}></div>
                        <Heart size={14} className={`transition-all duration-500 ${isDarkMode ? 'text-indigo-700 fill-indigo-900' : 'text-pink-200 fill-pink-200'}`} />
                        <div className={`w-10 h-px opacity-30 ${isDarkMode ? 'bg-indigo-300' : 'bg-pink-300'}`}></div>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default HugDay;
