
import React, { useState } from 'react';
import { Heart, Sparkles, Wand2, BookOpen, Loader2, Quote } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface PoemPageProps {
  isDarkMode: boolean;
}

const PoemPage: React.FC<PoemPageProps> = ({ isDarkMode }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

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

  const fullPoemText = stanzas.map(s => s.lines.join(' ') + (s.highlight ? ' ' + s.highlight : '')).join('\n');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following Bangla poem. Discuss its emotional depth, the significance of the June 10th date, and the theme of an unbreakable bond. Keep it under 40 words in sweet, modern Banglish. Poem: ${fullPoemText}`,
      });
      setAnalysis(response.text || "Eita ekta khub e govir kobita, Megh. Mayar bondhon ta sposto.");
    } catch (e) {
      setAnalysis("Cloud connection weak, analysis failed. But the heart knows the meaning! ☁️");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the essence of this Bangla poem in exactly one beautiful, poetic sentence in Banglish. Focus on the 'Mayabi' (magical) bond between two souls. Poem: ${fullPoemText}`,
      });
      setSummary(response.text || "Ei kobita ta holo amader sei moshoka ar mayar golpo.");
    } catch (e) {
      setSummary("Bondhutto r kono songkhitto rup hoy na, Megh! ❤️");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-32">
      <div className="text-center mb-20">
        <div className={`inline-block p-5 rounded-[2.5rem] mb-8 shadow-sm transition-all duration-700 ${isDarkMode ? 'bg-indigo-900/20 border border-indigo-500/20' : 'bg-white border border-pink-100'}`}>
          <Heart className={`w-10 h-10 ${isDarkMode ? 'text-indigo-400 fill-indigo-400' : 'text-pink-400 fill-pink-400'}`} />
        </div>
        <h2 className={`text-6xl md:text-8xl font-serif font-medium tracking-tight mb-4 transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-950'}`}>
          মায়াবী ক্ষণ
        </h2>
        <div className={`w-16 h-0.5 mx-auto rounded-full opacity-30 ${isDarkMode ? 'bg-indigo-500' : 'bg-pink-400'}`} />
        <p className={`text-[11px] uppercase tracking-[0.7em] font-bold mt-6 opacity-50 ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>Dedicated to Mim</p>
      </div>

      <div className="space-y-24 mb-32">
        {stanzas.map((stanza, sIdx) => (
          <div key={sIdx} className="text-center animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${sIdx * 0.15}s`, animationFillMode: 'both' }}>
            <div className="flex flex-col gap-6">
              {stanza.lines.map((line, lIdx) => (
                <p key={lIdx} className={`text-2xl md:text-3xl font-bangla font-light leading-relaxed ${isDarkMode ? 'text-indigo-100' : 'text-slate-800'}`}>
                  {line}
                </p>
              ))}
              {stanza.highlight && (
                <div className="mt-6 px-6 relative">
                   <Quote className={`absolute -top-6 -left-2 w-12 h-12 opacity-5 ${isDarkMode ? 'text-indigo-400' : 'text-pink-400'}`} />
                  <p className={`text-3xl md:text-5xl font-serif font-medium italic leading-tight tracking-tight ${isDarkMode ? 'text-indigo-400/90' : 'text-pink-500/90'}`}>
                    "{stanza.highlight}"
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Literary Tools Section */}
      <div className="mt-40 border-t border-dashed border-white/10 pt-20">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleSummarize}
              disabled={isSummarizing}
              className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50 ${
                isDarkMode ? 'bg-indigo-600 text-white shadow-indigo-900/20' : 'bg-gray-950 text-white shadow-xl'
              }`}
            >
              {isSummarizing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {isSummarizing ? 'Condensing...' : 'Generate Essence'}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50 ${
                isDarkMode ? 'bg-slate-800 text-indigo-100 border border-indigo-500/20' : 'bg-white text-slate-800 border-2 border-slate-100'
              }`}
            >
              {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
              {isAnalyzing ? 'Deep Diving...' : 'Analyse Depth'}
            </button>
          </div>

          <div className="w-full space-y-8">
            {summary && (
              <div className={`glass p-10 md:p-14 rounded-[3.5rem] animate-in slide-in-from-top-4 fade-in duration-700 ${isDarkMode ? 'border-indigo-500/20 shadow-indigo-950/40' : 'border-pink-100 bg-white/60'}`}>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <BookOpen size={14} />
                  <span className="text-[9px] uppercase font-black tracking-widest">The Essence</span>
                </div>
                <p className={`text-2xl md:text-3xl font-serif italic leading-relaxed ${isDarkMode ? 'text-indigo-50' : 'text-slate-900'}`}>
                  "{summary}"
                </p>
              </div>
            )}

            {analysis && (
              <div className={`glass p-10 md:p-14 rounded-[3.5rem] animate-in slide-in-from-top-4 fade-in duration-1000 ${isDarkMode ? 'border-indigo-500/10 bg-slate-950/40' : 'border-slate-100 bg-slate-50/50'}`}>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <Wand2 size={14} />
                  <span className="text-[9px] uppercase font-black tracking-widest">Cloud Critique</span>
                </div>
                <p className={`text-base md:text-lg font-light leading-relaxed font-sans ${isDarkMode ? 'text-indigo-200/80' : 'text-slate-600'}`}>
                  {analysis}
                </p>
                <div className="mt-8 flex justify-end">
                    <Heart size={16} className={isDarkMode ? 'text-indigo-900' : 'text-pink-100'} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-32 text-center">
        <Sparkles className={`w-6 h-6 mx-auto mb-6 opacity-20 ${isDarkMode ? 'text-indigo-400' : 'text-pink-300'}`} />
        <p className={`text-[9px] uppercase font-black tracking-[0.5em] opacity-30 ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>Eternal Verse • Cloud Insight Engine</p>
      </div>
    </div>
  );
};

export default PoemPage;
