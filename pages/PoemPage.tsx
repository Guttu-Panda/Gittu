
import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, Cloud } from 'lucide-react';

interface PoemPageProps {
  isDarkMode: boolean;
}

const PoemPage: React.FC<PoemPageProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stanzas = [
    {
      lines: [
        "জুন মাসের সেই দশ তারিখ, দিনটি ছিল এক মায়াবী ক্ষণ,",
        "ঝিরিঝিরি বৃষ্টির ফুটাঁয় ভিজেছিল আমাদের দু’জনার মন।"
      ],
      highlight: "নদীর পাড়ে বসে দুজনায় মত্ত হওয়ায় ছিল এক অলৌকিক সুর—"
    },
    {
      lines: [
        "নদীর স্রোতে ভেসে গিয়েছিল আমাদের কথামালা, বহুদূর... বহুদূর।",
        "যেখানে সময়ের কাঁটা থমকে ছিল, ছিল শুধু হৃদয়ের গূঢ় আনাগোনা।"
      ]
    },
    {
      lines: [
        "গন্তব্যহীন পথে আমাদের সেই গুটি গুটি পায়ে চলা,",
        "চোখে চোখে ছিল অনেক কিছু, মুখে ছিল না কিছু বলা।"
      ],
      highlight: "পথের কোনো শেষ ছিল না, ছিল না কোনো ফেরার তাড়া, তুমি পাশে ছিলে বলেই পৃথিবীটা হয়েছিল দিকহারা!"
    },
    {
      lines: [
        "আড়চোখে, পরম সংগোপনে তোমাকে দেখার সেই চপল তৃষ্ণা,",
        "প্রতিটি পলকে তুমি যেন এক মর্ত্যের দেবতা, এক অমলজ্যোতি কৃষ্ণা।"
      ]
    },
    {
      lines: [
        "প্রথমবার যখন তোমাকে সেই নিবিড় আলিঙ্গনে নিলাম টেনে,",
        "হৃদস্পন্দন থেমে গিয়েছিল এক পরম নির্ভরতার ব্যাকরণ জেনে।"
      ],
      highlight: "কেবল মাএ গটা কয়েক দিন এর মায়ায় আবদ্ধ হয়ে বুঝতে পারলাম,,, আমি তোমাতেই আমার সবটুকু আড়াল করলাম।​"
    },
    {
      lines: [
        "প্রতিটি চাউনিতে তোমার আমি এক অদ্ভুত মায়া খুঁজেছি,",
        "পৃথিবীর সব ছেড়ে শুধু তোমার ওই মায়াতেই নিজেকে বুঝেছি।"
      ]
    },
    {
      lines: [
        "আমাদের এই অদ্ভুত মায়ায় জড়ানো এক নিবিড় বন্ধুত্ব,",
        "যেখানে তোমার ভালোবাসাই আমার একমাত্র চিরন্তন সত্য।"
      ]
    },
    {
      lines: [
        "অসম্ভব সেই ভালোবাসার টানে আমি বারবার ফিরে আসি,",
        "তোমার চোখের গভীরে আজও আমি সেই আদিম রহস্যই ভালোবাসি।"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-6 py-20 pb-40">
      <div className="text-center mb-16 md:mb-24">
        <div className={`inline-block p-4 rounded-[2rem] mb-8 transition-all duration-500 shadow-xl ${isDarkMode ? 'bg-indigo-900/40 border border-indigo-500/30' : 'bg-white border border-pink-100'}`}>
          <Heart className={`w-10 h-10 animate-pulse ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
        <h2 className={`text-4xl md:text-7xl font-romantic transition-colors duration-500 mb-4 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900'}`}>
          মায়াবী ক্ষণ (Magical Moment) - By Megh
        </h2>
        <div className={`w-24 h-1 mx-auto rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-indigo-900' : 'bg-pink-100'}`} />
      </div>

      <div className="space-y-16 md:space-y-24">
        {stanzas.map((stanza, sIdx) => (
          <div 
            key={sIdx} 
            className={`stanza-group transition-all duration-1000 transform animate-in fade-in slide-in-from-bottom-10`}
            style={{ animationDelay: `${sIdx * 0.2}s`, animationFillMode: 'both' }}
          >
            <div className="flex flex-col gap-6 text-center">
              {stanza.lines.map((line, lIdx) => (
                <p 
                  key={lIdx} 
                  className={`text-xl md:text-3xl font-['Hind_Siliguri'] leading-relaxed tracking-wide transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}
                >
                  {line}
                </p>
              ))}
              
              {stanza.highlight && (
                <div className="mt-4 relative inline-block">
                  <div className={`absolute inset-0 blur-2xl opacity-10 rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-indigo-500' : 'bg-pink-300'}`} />
                  <p className={`text-2xl md:text-4xl font-romantic italic transition-colors duration-500 px-6 relative z-10 ${isDarkMode ? 'text-indigo-400' : 'text-pink-500'}`}>
                    {stanza.highlight}
                  </p>
                </div>
              )}
            </div>

            {sIdx < stanzas.length - 1 && (
              <div className="flex justify-center mt-16 md:mt-24 opacity-20">
                 <div className={`w-1 h-1 rounded-full mx-1 ${isDarkMode ? 'bg-indigo-500' : 'bg-pink-300'}`} />
                 <div className={`w-1 h-1 rounded-full mx-1 ${isDarkMode ? 'bg-indigo-500' : 'bg-pink-300'}`} />
                 <div className={`w-1 h-1 rounded-full mx-1 ${isDarkMode ? 'bg-indigo-500' : 'bg-pink-300'}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-32 text-center flex flex-col items-center gap-6">
        <Sparkles className={`w-12 h-12 transition-colors duration-500 ${isDarkMode ? 'text-indigo-800' : 'text-pink-100'}`} />
        <p className={`text-[10px] uppercase font-black tracking-[0.5em] transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'}`}>
          Infinite Poetry in Every Breath
        </p>
      </div>
    </div>
  );
};

export default PoemPage;
