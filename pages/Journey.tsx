
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
    {
      title: 'Beginning',
      icon: <Calendar className="text-green-500" />,
      bangla: 'শুরুটা বেশ সাধারণ ছিল।',
      english: 'It all started so quietly, yet so meaningful.'
    },
    {
      title: 'Laughs',
      icon: <Laugh className="text-yellow-500" />,
      bangla: 'সেই অদ্ভুত হাসাহাসি গুলো।',
      english: 'Countless jokes and shared smiles.'
    },
    {
      title: 'Late Talks',
      icon: <MessageCircle className="text-blue-500" />,
      bangla: 'রাত জেগে কথা বলা।',
      english: 'Endless conversations under the stars.'
    },
    {
      title: 'Support',
      icon: <ShieldCheck className="text-purple-500" />,
      bangla: 'সব সময় পাশে থাকা।',
      english: 'Quiet support in every storm.'
    },
    {
      title: 'Still Here',
      icon: <Heart className="text-pink-500" />,
      bangla: 'এখনও আমরা আমরাই আছি।',
      english: 'Growing closer with every sunrise.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <div className="text-center mb-8 md:mb-16">
        <h2 className={`text-3xl md:text-5xl font-romantic transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>Our Small Journey Together</h2>
        <p className={`mt-2 text-[10px] md:text-sm font-light uppercase tracking-widest transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Since June 10, 2024</p>
      </div>
      
      <div className="relative">
        {/* Central Vertical Line */}
        <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 hidden xs:block transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-b from-indigo-900 via-indigo-500/20 to-indigo-900' : 'bg-gradient-to-b from-pink-100 via-blue-50 to-pink-100'}`} />

        <div className="space-y-12 md:space-y-24">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-start md:items-center md:justify-center">
              <div className={`flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 w-full pl-12 xs:pl-16 md:pl-0">
                  <div className="perspective-1000 w-full">
                    <FlipCard event={event} isDarkMode={isDarkMode} />
                  </div>
                </div>
                <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 hidden xs:block">
                  <div className={`p-2 md:p-3 rounded-full border-2 shadow-lg text-gray-600 transition-all duration-500 hover:scale-110 ${isDarkMode ? 'bg-slate-900 border-indigo-500/30 text-indigo-400' : 'bg-white border-pink-50'}`}>
                    {React.cloneElement(event.icon as React.ReactElement<any>, { size: 18 })}
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
              <div className={`xs:hidden absolute left-0 top-6 p-1 rounded-full border shadow-sm ${isDarkMode ? 'bg-slate-900 border-indigo-500/30' : 'bg-white border-pink-50'}`}>
                {React.cloneElement(event.icon as React.ReactElement<any>, { size: 14 })}
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
    <div
      className="relative w-full min-h-[140px] md:min-h-[180px] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden backdrop-blur-md rounded-[2rem] shadow-sm border flex flex-col items-center justify-center p-6 transition-all duration-500 ${isDarkMode ? 'bg-slate-900/60 border-white/10 hover:bg-slate-900/80' : 'bg-white/70 border-white/60 hover:bg-white/90'}`}>
          <h3 className={`text-lg md:text-xl font-bold tracking-tight text-center transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>{event.title}</h3>
          <div className={`mt-3 flex items-center gap-2 ${isDarkMode ? 'text-indigo-400' : 'text-pink-400'}`}>
            <Sparkles size={12} className="animate-pulse" />
            <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em]">Tap to Read</p>
          </div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 backdrop-blur-md rounded-[2rem] shadow-inner border flex flex-col items-center justify-center p-6 text-center overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-indigo-900/40 border-indigo-500/20' : 'bg-gradient-to-br from-pink-50/95 to-white/95 border-pink-100'}`}>
          <p className={`text-sm md:text-lg font-bold mb-2 font-['Hind_Siliguri'] leading-snug transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-800'}`}>
            {event.bangla}
          </p>
          <div className={`w-6 h-0.5 mb-2 rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-indigo-500/40' : 'bg-pink-200/50'}`} />
          <p className={`text-[10px] md:text-xs italic font-light leading-relaxed px-2 transition-colors duration-500 ${isDarkMode ? 'text-indigo-300' : 'text-gray-500'}`}>
            {event.english}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journey;
