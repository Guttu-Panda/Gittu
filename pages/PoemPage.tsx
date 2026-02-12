
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface PoemPageProps {
  isDarkMode: boolean;
}

const PoemPage: React.FC<PoemPageProps> = ({ isDarkMode }) => {
  const stanzas = [
    { lines: ["জুন মাসের সেই দশ তারিখ, দিনটি ছিল এক মায়াবী ক্ষণ,", "ঝিরিঝিরি বৃষ্টির ফুটাঁয় ভিজেছিল আমাদের দু’জনার মন।"], highlight: "নদীর পাড়ে বসে দুজনায় মত্ত হওয়ায় ছিল এক অলৌকিক সুর—" },
    { lines: ["নদীর স্রোতে ভেসে গিয়েছিল আমাদের কথামালা, বহুদূর... বহুদূর।", "যেখানে সময়ের কাঁটা থমকে ছিল, ছিল শুধু হৃদয়ের গূঢ় আনাগোনা।"] },
    { lines: ["গন্তব্যহীন পথে আমাদের সেই গুটি গুটি পায়ে চলা,", "চোখে চোখে ছিল অনেক কিছু, মুখে ছিল না কিছু বলা।"], highlight: "পথের কোনো শেষ ছিল না, ছিল না কোনো ফেরার তাড়া, তুমি পাশে ছিলে বলেই পৃথিবীটা হয়েছিল দিকহারা!" },
    { lines: ["আড়চোখে, পরম সংগোপনে তোমাকে দেখার সেই চপল তৃষ্ণা,", "প্রতিটি পলকে তুমি যেন এক মর্ত্যের দেবতা, এক অমলজ্যোতি কৃষ্ণা।"] },
    { lines: ["প্রথমবার যখন তোমাকে সেই নিবিড় আলিঙ্গনে নিলাম টেনে,", "হৃদস্পন্দন থেমে গিয়েছিল এক পরম নির্ভরতার ব্যাকরণ জেনে।"], highlight: "কেবল মাএ গটা কয়েক দিন এর মায়ায় আবদ্ধ হয়ে বুঝতে পারলাম,,, আমি তোমাতেই আমার সবটুকু আড়াল করলাম।​" },
    { lines: ["প্রতিটি চাউনিতে তোমার আমি এক অদ্ভুত মায়া খুঁজেছি,", "পৃথিবীর সব ছেড়ে শুধু তোমার ওই মায়াতেই নিজেকে বুঝেছি।"] },
    { lines: ["আমাদের এই অদ্ভুত মায়ায় জড়ানো এক নিবিড় বন্ধুত্ব,", "যেখানে তোমার ভালোবাসাই আমার একমাত্র চিরন্তন সত্য।"] },
    { lines: ["অসম্ভব সেই ভালোবাসার টানে আমি বারবার ফিরে আসি,", "তোমার চোখের গভীরে আজও আমি সেই আদিম রহস্যই ভালোবাসি।"] }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 pb-24">
      <div className="text-center mb-12">
        <div className={`inline-block p-3 rounded-[1.5rem] mb-6 shadow-lg ${isDarkMode ? 'bg-indigo-900/40 border border-indigo-500/30' : 'bg-white border border-pink-100'}`}>
          <Heart className={`w-8 h-8 ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
        <h2 className={`text-3xl md:text-5xl font-romantic transition-colors duration-500 mb-2 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900'}`}>
          মায়াবী ক্ষণ
        </h2>
        <div className={`w-16 h-0.5 mx-auto rounded-full ${isDarkMode ? 'bg-indigo-900' : 'bg-pink-100'}`} />
      </div>

      <div className="space-y-12">
        {stanzas.map((stanza, sIdx) => (
          <div key={sIdx} className="text-center animate-in fade-in slide-in-from-bottom-6 duration-1000" style={{ animationDelay: `${sIdx * 0.1}s`, animationFillMode: 'both' }}>
            <div className="flex flex-col gap-4">
              {stanza.lines.map((line, lIdx) => (
                <p key={lIdx} className={`text-lg md:text-2xl font-['Hind_Siliguri'] leading-relaxed ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>
                  {line}
                </p>
              ))}
              {stanza.highlight && (
                <p className={`text-xl md:text-3xl font-romantic italic px-4 mt-2 ${isDarkMode ? 'text-indigo-400' : 'text-pink-500'}`}>
                  {stanza.highlight}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center opacity-30">
        <Sparkles className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-indigo-800' : 'text-pink-100'}`} />
        <p className="text-[8px] uppercase font-black tracking-[0.3em]">End of Verse</p>
      </div>
    </div>
  );
};

export default PoemPage;
