
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Cloud, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import Hero from './pages/Hero.tsx';
import Journey from './pages/Journey.tsx';
import Promises from './pages/Promises.tsx';
import Letters from './pages/Letters.tsx';
import HugDay from './pages/HugDay.tsx';
import Fun from './pages/Fun.tsx';
import Gallery from './pages/Gallery.tsx';
import Final from './pages/Final.tsx';
import AIChat from './components/AIChat.tsx';
import AdminPanel from './components/AdminPanel.tsx';

const FloatingBackground: React.FC<{ superMode: boolean, globalVFX: string }> = ({ superMode, globalVFX }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const count = isMobile ? (superMode ? 20 : 8) : (superMode ? 40 : 15);
  
  const getEmojis = () => {
    if (globalVFX === 'hearts') return ['💖', '❤️', '💝', '💕'];
    if (globalVFX === 'stars') return ['✨', '⭐', '🌟', '💫'];
    return superMode ? ['💖', '✨', '🌈', '🦋', '🌸'] : ['☁️', '🤍', '✨'];
  };

  const emojis = useMemo(getEmojis, [superMode, globalVFX]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`absolute text-2xl transition-all duration-1000 ease-in-out ${superMode ? 'opacity-40 scale-125' : 'opacity-20'}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${superMode ? 2 + Math.random() * 2 : 5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {emojis[i % emojis.length]}
        </div>
      ))}
      {(superMode || globalVFX === 'hearts') && Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-pink-400 opacity-30 animate-heart-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 25}px`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [superMode, setSuperMode] = useState(false);
  const [globalVFX, setGlobalVFX] = useState('default'); // default, hearts, stars
  const [aiAutopilot, setAiAutopilot] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const sections = [
    { id: 'home', component: <Hero /> },
    { id: 'journey', component: <Journey /> },
    { id: 'hug', component: <HugDay /> },
    { id: 'promises', component: <Promises /> },
    { id: 'letters', component: <Letters /> },
    { id: 'fun', component: <Fun /> },
    { id: 'gallery', component: <Gallery /> },
    { id: 'final', component: <Final /> }
  ];

  const startAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    if (oscillatorRef.current) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 10);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscillatorRef.current = osc;
    gainRef.current = gain;
  };

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        oscillatorRef.current?.stop();
        oscillatorRef.current = null;
      }, 600);
    }
  };

  useEffect(() => {
    if (!isMuted) startAudio();
    else stopAudio();
    return () => oscillatorRef.current?.stop();
  }, [isMuted]);

  const changePage = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= sections.length || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className={`page-deck transition-all duration-1000 ${superMode ? 'bg-[#fff5f8]' : 'bg-[#fdfcfb]'} text-gray-900`}>
      <FloatingBackground superMode={superMode} globalVFX={globalVFX} />

      <div className="fixed top-0 left-0 w-full h-1 z-[80] flex gap-1 px-6 pt-6">
        {sections.map((_, i) => (
          <div key={i} onClick={() => changePage(i)} className="flex-1 h-full cursor-pointer relative group">
            <div className={`h-full rounded-full transition-all duration-700 ${i <= activeIdx ? (superMode ? 'bg-pink-400' : 'bg-pink-300') : 'bg-gray-100/30'} shadow-sm`} />
          </div>
        ))}
      </div>

      <div className="fixed top-8 left-8 z-[90] flex items-center gap-3">
        <div onClick={() => setShowAdmin(true)} className="cursor-pointer opacity-20 hover:opacity-100 transition-all active:scale-90">
          <Cloud className={`w-8 h-8 ${superMode ? 'text-pink-400' : 'text-blue-100'}`} />
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="glass p-2.5 rounded-full text-gray-400 hover:text-pink-500 transition-all active:scale-75 shadow-sm">
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className={`page-content custom-scrollbar transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 animate-cloud-slide'}`}>
        <div className="w-full max-w-7xl mx-auto px-4">
          {sections[activeIdx].component}
        </div>
      </div>

      <div className="fixed bottom-10 left-0 w-full z-[90] flex items-center justify-between px-8 pointer-events-none">
        <button onClick={() => changePage(activeIdx - 1)} disabled={activeIdx === 0 || isTransitioning} className={`glass p-4 rounded-full text-gray-400 hover:text-pink-500 transition-all active:scale-75 pointer-events-auto disabled:opacity-0 ${activeIdx === 0 ? 'invisible' : 'visible'}`}>
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
            <div className="glass px-4 py-1.5 rounded-full mb-4 pointer-events-auto">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Section {activeIdx + 1}</span>
            </div>
            {activeIdx < sections.length - 1 && (
                <button onClick={() => changePage(activeIdx + 1)} className="p-2.5 bg-gray-950 text-white rounded-full shadow-2xl hover:scale-105 hover:bg-black active:scale-90 transition-all pointer-events-auto flex items-center gap-2 pr-4 group">
                    <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Continue</span>
                </button>
            )}
        </div>
        <div className="w-[48px]" />
      </div>

      <AIChat aiAutopilot={aiAutopilot} />

      {showAdmin && (
        <AdminPanel 
          onClose={() => setShowAdmin(false)} 
          superMode={superMode} 
          setSuperMode={setSuperMode}
          globalVFX={globalVFX}
          setGlobalVFX={setGlobalVFX}
          aiAutopilot={aiAutopilot}
          setAiAutopilot={setAiAutopilot}
        />
      )}
    </div>
  );
};

export default App;
