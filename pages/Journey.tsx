
import React, { useState } from 'react';
import { Calendar, Laugh, MessageCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface TimelineEvent {
  title: string;
  icon: React.ReactNode;
  bangla: string;
  english: string;
}

interface JourneyProps {
  isDarkMode: boolean;
}

const Journey: React.FC<JourneyProps> = ({ isDarkMode }) => {
  const events: TimelineEvent[] = [
    { title: 'Beginning', icon: <Calendar className="text-green-500" />, bangla: 'শুরুটা বেশ সাধারণ ছিল।', english: 'It all started so quietly, yet so meaningful.' },
    { title: 'Laughs', icon: <Laugh className="text-yellow-500" />, bangla: 'সেই অদ্ভুত হাসাহাসি গুলো।', english: 'Countless jokes and shared smiles.' },
    { title: 'Late Talks', icon: <MessageCircle className="text-blue-500" />, bangla: 'রাত জেগে কথা বলা।', english: 'Endless conversations under the stars.' },
    { title: 'Support', icon: <ShieldCheck className="text-purple-500" />, bangla: 'সব সময় পাশে থাকা।', english: 'Quiet support in every storm.' },
    { title: 'Still Here', icon: <Heart className="text-pink-500" />, bangla: 'এখনও আমরা আমরাই আছি।', english: 'Growing closer with every sunrise.' }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className={`text-2xl md:text-4xl font-romantic ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>Our Journey</h2>
        <p className={`text-[8px] uppercase tracking-widest mt-1 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Since June 2024</p>
      </div>
      
      <div className="relative">
        <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 hidden xs:block ${isDarkMode ? 'bg-indigo-900/50' : 'bg-pink-100'}`} />
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-start md:items-center md:justify-center">
              <div className={`flex flex-col md:flex-row items-start md:items-center w-full gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 w-full pl-12 xs:pl-16 md:pl-0">
                  <FlipCard event={event} isDarkMode={isDarkMode} />
                </div>
                <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 hidden xs:block">
                  <div className={`p-2 rounded-full border shadow-sm ${isDarkMode ? 'bg-slate-900 border-indigo-500/30 text-indigo-400' : 'bg-white border-pink-50'}`}>
                    {React.cloneElement(event.icon as React.ReactElement<any>, { size: 14 })}
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FlipCard: React.FC<{ event: TimelineEvent, isDarkMode: boolean }> = ({ event, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full min-h-[100px] md:min-h-[140px] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className={`absolute inset-0 backface-hidden backdrop-blur-md rounded-[1.5rem] border flex flex-col items-center justify-center p-4 transition-all ${isDarkMode ? 'bg-slate-900/60 border-white/10' : 'bg-white/70 border-white/60'}`}>
          <h3 className={`text-sm md:text-lg font-bold ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>{event.title}</h3>
          <span className={`text-[8px] uppercase font-bold mt-1 opacity-50 ${isDarkMode ? 'text-indigo-400' : 'text-pink-400'}`}>Tap</span>
        </div>
        <div className={`absolute inset-0 backface-hidden rotate-y-180 backdrop-blur-md rounded-[1.5rem] border flex flex-col items-center justify-center p-4 text-center transition-all ${isDarkMode ? 'bg-slate-900 border-indigo-500/20' : 'bg-pink-50/95 border-pink-100'}`}>
          <p className={`text-xs md:text-sm font-bold font-['Hind_Siliguri'] ${isDarkMode ? 'text-indigo-50' : 'text-gray-800'}`}>{event.bangla}</p>
        </div>
      </div>
    </div>
  );
};

export default Journey;
