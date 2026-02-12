
import React, { useState } from 'react';
import { Mail, MailOpen, Sparkles, Heart } from 'lucide-react';
import TTSButton from '../components/TTSButton.tsx';

interface LettersProps {
  isDarkMode: boolean;
}

const Letters: React.FC<LettersProps> = ({ isDarkMode }) => {
  const letters = [
    {
      title: "About Our Bond",
      bangla: "মেঘ, আমাদের এই বন্ধুত্বটা অনেক স্পেশাল। ১০ই জুন থেকে দিনগুলো অন্যরকম কেটেছে। তোর সাথে কাটানো প্রতিটা মুহূর্ত আমার কাছে খুব দামি।",
      english: "Megh, our bond is truly special. Since June 10, days have felt different. Every moment we share is precious to me."
    },
    {
      title: "To My Bestie",
      bangla: "তোর সাথে কথা না বললে দিনটা অসম্পূর্ণ মনে হয়। তুই যেমন আছিস, ঠিক তেমনি থাকিস। তুই আমার লাইফে আসা অন্যতম সেরা মানুষ।",
      english: "The day feels incomplete without talking to you. Stay just as you are. You are one of the best people to ever enter my life."
    },
    {
      title: "A Promise of Time",
      bangla: "সময় বদলে যেতে পারে, কিন্তু আমাদের আড্ডা আর এই মেঘলা আকাশের গল্পগুলো কখনো বদলাবে না। আমি সবসময় তোর পাশে থাকবো।",
      english: "Times may change, but our chats and these stories under the cloudy sky will never fade. I promise to always be by your side."
    },
    {
      title: "Small Moments",
      bangla: "ছোট ছোট কথা, হাসি আর তোর ওই পাগল করা আবদারগুলোই আমার দিনটাকে সুন্দর করে দেয়। এভাবেই আমারা সারাজীবন বন্ধু হয়ে থাকবো।",
      english: "The little words, the laughs, and your silly requests are what make my day beautiful. This is how we'll stay friends forever."
    },
    {
      title: "Morning Echoes",
      bangla: "সকালের প্রথম আলো যেমন শান্ত থাকে, তোর মেসেজগুলোও আমার মনকে তেমনি শান্ত করে দেয়। তুই আছিস বলেই আমার পৃথিবীটা এত রঙিন।",
      english: "Like the calm morning light, your messages bring peace to my heart. My world is colorful just because you are in it."
    },
    {
      title: "Hidden Strength",
      bangla: "যখনই আমি একটু মন খারাপ করি, তুই ঠিক বুঝে যাস। তোর এই না বলা কথাগুলো বুঝে যাওয়ার ক্ষমতাটাই আমার সবচেয়ে বড় শক্তি।",
      english: "Whenever I'm a bit down, you just know. Your ability to understand my unspoken words is my greatest strength."
    },
    {
      title: "Future Hopes",
      bangla: "আমরা হয়তো একে অপরের থেকে অনেক দূরে থাকি, কিন্তু আমাদের মনের দূরত্বটা যেন সবসময় এমনই শূন্য থাকে। ভালো থাকিস মেঘ।",
      english: "We might be far apart physically, but may our hearts always stay as close as they are now. Stay happy, Megh."
    },
    {
      title: "Just Because",
      bangla: "মাঝে মাঝে কোনো কারণ ছাড়াই ধন্যবাদ দিতে ইচ্ছা করে। আমার সব পাগলামি সহ্য করার জন্য আর পাশে থাকার জন্য থ্যাংক ইউ।",
      english: "Sometimes I just want to say thank you for no reason. Thank you for putting up with my craziness and for always being there."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <div className="text-center mb-12">
        <div className={`inline-block p-3 rounded-2xl mb-4 transition-colors duration-500 ${isDarkMode ? 'bg-indigo-500/10' : 'bg-pink-50'}`}>
          <Heart className={`w-6 h-6 animate-pulse transition-colors duration-500 ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
        <h2 className={`text-4xl md:text-5xl font-romantic transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>Hidden Surprise Notes 💌</h2>
        <p className={`mt-2 text-xs uppercase tracking-[0.3em] transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Whispers from the heart</p>
      </div>
      
      <div className="grid gap-6">
        {letters.map((letter, idx) => (
          <LetterItem key={idx} letter={letter} isDarkMode={isDarkMode} />
        ))}
      </div>

      <div className="mt-16 text-center opacity-40">
        <Sparkles size={20} className={`mx-auto mb-2 transition-colors duration-500 ${isDarkMode ? 'text-indigo-500' : 'text-pink-200'}`} />
        <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>Expanded just for you</p>
      </div>
    </div>
  );
};

const LetterItem: React.FC<{ letter: { title: string; bangla: string; english: string }; isDarkMode: boolean }> = ({ letter, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer p-5 md:p-7 rounded-[2.5rem] border transition-all duration-500 flex items-center justify-between shadow-sm
          ${isOpen 
            ? (isDarkMode ? 'bg-slate-900 border-indigo-500/30 shadow-indigo-900/20 translate-y-[-4px]' : 'bg-white border-pink-100 shadow-lg translate-y-[-4px]') 
            : (isDarkMode ? 'bg-slate-900/30 border-white/5 hover:bg-slate-800/50 hover:shadow-md' : 'bg-white/50 border-white hover:bg-white/80 hover:shadow-md')}
        `}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`p-4 rounded-2xl transition-all duration-500 ${isOpen ? (isDarkMode ? 'bg-indigo-600 text-white rotate-12' : 'bg-pink-500 text-white rotate-12') : (isDarkMode ? 'bg-slate-800 text-slate-500 group-hover:bg-indigo-950' : 'bg-gray-100 text-gray-400 group-hover:bg-pink-50')}`}>
            {isOpen ? <MailOpen size={22} /> : <Mail size={22} />}
          </div>
          <div>
            <h3 className={`text-base md:text-xl font-bold tracking-tight transition-colors duration-500 ${isOpen ? (isDarkMode ? 'text-indigo-100' : 'text-gray-900') : (isDarkMode ? 'text-slate-400' : 'text-gray-700')}`}>
              {letter.title}
            </h3>
            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-0.5 transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>
              {isOpen ? 'Tap to hide' : 'Tap to read'}
            </p>
          </div>
        </div>
        {isOpen && (
          <div onClick={(e) => e.stopPropagation()} className="animate-in fade-in zoom-in duration-300">
             <TTSButton text={`${letter.bangla} ${letter.english}`} />
          </div>
        )}
      </div>

      <div className={`overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'max-h-[600px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`p-8 rounded-[3rem] border shadow-inner relative transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-indigo-900/20 border-indigo-500/20 shadow-indigo-900/10' : 'bg-gradient-to-br from-white to-pink-50/30 border-pink-100'}`}>
          <div className={`absolute top-6 right-8 opacity-50 transition-colors duration-500 ${isDarkMode ? 'text-indigo-900' : 'text-pink-100'}`}>
            <Sparkles size={40} />
          </div>
          
          <p className={`text-lg md:text-2xl mb-6 font-['Hind_Siliguri'] leading-relaxed font-medium transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-800'}`}>
            {letter.bangla}
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-px flex-1 bg-gradient-to-r transition-all duration-500 ${isDarkMode ? 'from-indigo-900 to-transparent' : 'from-pink-200 to-transparent'}`} />
            <Heart size={12} className={`transition-all duration-500 ${isDarkMode ? 'text-indigo-700 fill-indigo-900' : 'text-pink-200 fill-pink-200'}`} />
            <div className={`h-px flex-1 bg-gradient-to-l transition-all duration-500 ${isDarkMode ? 'from-indigo-900 to-transparent' : 'from-pink-200 to-transparent'}`} />
          </div>
          
          <p className={`text-sm md:text-base italic font-light leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-indigo-300' : 'text-gray-500'}`}>
            {letter.english}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Letters;
