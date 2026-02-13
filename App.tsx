
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Cloud, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles, Wifi, WifiOff } from 'lucide-react';
import Hero from './pages/Hero.tsx';
import Journey from './pages/Journey.tsx';
import Promises from './pages/Promises.tsx';
import Letters from './pages/Letters.tsx';
import PoemPage from './pages/PoemPage.tsx';
import KissDay from './pages/KissDay.tsx';
import Fun from './pages/Fun.tsx';
import Gallery from './pages/Gallery.tsx';
import Final from './pages/Final.tsx';
import AIChat from './components/AIChat.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import PandaGuide from './components/PandaGuide.tsx';

const FloatingBackground: React.FC<{ superMode: boolean, globalVFX: string, isDarkMode: boolean }> = ({ superMode, globalVFX, isDarkMode }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const count = isMobile ? (superMode ? 20 : 8) : (superMode ? 40 : 15);
  
  const emojis = useMemo(() => {
    if (globalVFX === 'hearts') return ['💖', '❤️', '💝', '💕'];
    if (globalVFX === 'stars' || isDarkMode) return ['✨', '⭐', '🌟', '💫', '🌙'];
    return superMode ? ['💖', '✨', '🌈', '🦋', '🌸'] : ['☁️', '🤍', '✨'];
  }, [superMode, globalVFX, isDarkMode]);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      emojiIdx: Math.floor(Math.random() * 100)
    }));
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.slice(0, count).map((p, i) => (
        <div
          key={i}
          className={`absolute text-xl transition-all duration-1000 ease-in-out ${superMode ? 'opacity-40 scale-110' : 'opacity-20'}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animation: `float ${superMode ? p.duration / 2 : p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {emojis[p.emojiIdx % emojis.length]}
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
  const [globalVFX, setGlobalVFX] = useState('default');
  const [aiAutopilot, setAiAutopilot] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [aiOnline, setAiOnline] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const sections = useMemo(() => [
    { id: 'home', component: <Hero isDarkMode={isDarkMode} /> },
    { id: 'journey', component: <Journey isDarkMode={isDarkMode} /> },
    { id: 'kiss', component: <KissDay isDarkMode={isDarkMode} /> },
    { id: 'promises', component: <Promises isDarkMode={isDarkMode} /> },
    { id: 'letters', component: <Letters isDarkMode={isDarkMode} /> },
    { id: 'poem', component: <PoemPage isDarkMode={isDarkMode} /> },
    { id: 'fun', component: <Fun isDarkMode={isDarkMode} /> },
    { id: 'gallery', component: <Gallery isDarkMode={isDarkMode} /> },
    { id: 'final', component: <Final isDarkMode={isDarkMode} /> }
  ], [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const checkAI = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setAiOnline(hasKey);
      } else {
        setAiOnline(!!process.env.API_KEY);
      }
    };
    checkAI();
    const interval = setInterval(checkAI, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectCloud = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setAiOnline(true);
    }
  };

  const startAudio = async () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      if (oscillatorRef.current) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;
      gainRef.current = gain;
    } catch (err) { console.warn("Audio start failed."); }
  };

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      setTimeout(() => {
        oscillatorRef.current?.stop();
        oscillatorRef.current = null;
      }, 600);
    }
  };

  useEffect(() => {
    if (!isMuted) startAudio();
    else stopAudio();
    return () => { try { oscillatorRef.current?.stop(); } catch(e) {} };
  }, [isMuted]);

  const changePage = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= sections.length || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setIsTransitioning(false);
      const content = document.querySelector('.page-content');
      if (content) content.scrollTop = 0;
    }, 400);
  };

  return (
    <div className={`page-deck transition-colors duration-1000 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#fdfcfb] text-gray-900'}`}>
      <FloatingBackground superMode={superMode} globalVFX={globalVFX} isDarkMode={isDarkMode} />

      <div className="fixed top-0 left-0 w-full h-1 z-[80] flex gap-0.5 px-4 pt-4">
        {sections.map((_, i) => (
          <div key={i} onClick={() => changePage(i)} className="flex-1 h-full cursor-pointer relative">
            <div className={`h-full rounded-full transition-all duration-700 ${i <= activeIdx ? (isDarkMode ? 'bg-indigo-400' : 'bg-pink-300') : (isDarkMode ? 'bg-slate-800' : 'bg-gray-100/30')}`} />
          </div>
        ))}
      </div>

      <div className="fixed top-6 left-6 z-[90] flex items-center gap-2">
        <div onClick={() => setShowAdmin(true)} className="cursor-pointer group flex items-center gap-1.5">
          <Cloud className={`w-6 h-6 transition-all duration-500 ${isDarkMode ? 'text-indigo-400' : 'text-blue-200'}`} />
          <div className={`w-2 h-2 rounded-full ${aiOnline ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="glass p-2 rounded-full text-gray-400 shadow-sm active:scale-75">
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      <div className={`page-content custom-scrollbar transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 animate-cloud-slide'}`}>
        <div className="w-full max-w-7xl mx-auto px-4">
          {sections[activeIdx].component}
        </div>
      </div>

      <div className="fixed bottom-6 left-0 w-full z-[90] flex items-center justify-between px-6 pointer-events-none">
        <button onClick={() => changePage(activeIdx - 1)} disabled={activeIdx === 0 || isTransitioning} className={`glass p-3 rounded-full text-gray-400 pointer-events-auto disabled:opacity-0 ${activeIdx === 0 ? 'invisible' : 'visible'}`}>
          <ChevronLeft size={18} />
        </button>
        <div className="flex flex-col items-center">
            <div className="glass px-3 py-1 rounded-full mb-3 pointer-events-auto">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">{activeIdx + 1}/{sections.length}</span>
            </div>
            {activeIdx < sections.length - 1 && (
                <button onClick={() => changePage(activeIdx + 1)} className={`p-1.5 rounded-full shadow-xl pointer-events-auto flex items-center gap-2 pr-3 group ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-gray-950 text-white'}`}>
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                        <ChevronRight size={14} />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em]">Next</span>
                </button>
            )}
        </div>
        <div className="w-[44px]" />
      </div>

      <AIChat aiAutopilot={aiAutopilot} />
      <PandaGuide activeIdx={activeIdx} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

      {showAdmin && (
        <AdminPanel 
          onClose={() => setShowAdmin(false)} 
          superMode={superMode} 
          setSuperMode={setSuperMode}
          globalVFX={globalVFX}
          setGlobalVFX={setGlobalVFX}
          aiAutopilot={aiAutopilot}
          setAiAutopilot={setAiAutopilot}
          aiOnline={aiOnline}
          onReconnect={handleConnectCloud}
        />
      )}
    </div>
  );
};

export default App;
