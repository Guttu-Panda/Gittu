
import React, { useState } from 'react';
import { Camera, X, Sparkles, Loader2, Heart } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface GalleryProps {
  isDarkMode: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ isDarkMode }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [postcard, setPostcard] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const images = [
    { url: 'https://picsum.photos/800/1000?random=11', label: 'Cloudy Dreams', date: 'June 2024' },
    { url: 'https://picsum.photos/800/1000?random=12', label: 'Quiet Talk', date: 'Aug 2024' },
    { url: 'https://picsum.photos/800/1000?random=13', label: 'Magic Hour', date: 'Oct 2024' },
    { url: 'https://picsum.photos/800/1000?random=14', label: 'Sparkle Vibe', date: 'Dec 2024' },
    { url: 'https://picsum.photos/800/1000?random=15', label: 'Pure Sky', date: 'Jan 2025' },
    { url: 'https://picsum.photos/800/1000?random=16', label: 'Soft Echo', date: 'Feb 2025' },
  ];

  const generatePostcard = async (url: string) => {
    setAnalyzing(true);
    setPostcard(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentLabel = images.find(img => img.url === url)?.label || "A memory";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short 1-sentence poetic Banglish note as if written on the back of a photo postcard titled "${currentLabel}". Must be supportive and soft. No quotes.`,
      });
      setPostcard(response.text || "Eita ekta khub e sundor memory...");
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <div className={`w-16 h-16 shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-indigo-400' : 'bg-white text-gray-400'}`}>
          <Camera size={32} />
        </div>
        <h2 className={`text-4xl md:text-6xl font-romantic tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900'}`}>Postcards of Us</h2>
        <p className={`mt-4 font-light tracking-widest uppercase text-xs transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>A collection of soft moments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => {
              setSelectedImg(img.url);
              setPostcard(null);
            }}
            className={`group relative p-4 pb-12 shadow-2xl transition-all hover:scale-[1.05] hover:-rotate-2 cursor-pointer border ${isDarkMode ? 'bg-slate-900 border-indigo-500/20' : 'bg-white border-gray-100'}`}
            style={{ transform: `rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'})` }}
          >
            <div className={`aspect-[4/5] overflow-hidden mb-4 transition-colors duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <img 
                src={img.url} 
                alt={img.label}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className={`font-handwriting text-2xl transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-700'}`}>{img.label}</span>
              <span className={`text-[10px] uppercase tracking-widest mt-1 font-bold transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-gray-300'}`}>{img.date}</span>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart size={20} className={`${isDarkMode ? 'text-indigo-500 fill-indigo-500' : 'text-pink-400 fill-pink-400'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Modern Lightbox / Postcard Back */}
      {selectedImg && (
        <div 
          className={`fixed inset-0 z-[100] backdrop-blur-3xl flex flex-col items-center justify-center p-6 sm:p-12 transition-all duration-500 ${isDarkMode ? 'bg-slate-950/95' : 'bg-white/95'}`}
          onClick={() => setSelectedImg(null)}
        >
          <button className={`absolute top-10 right-10 transition-colors ${isDarkMode ? 'text-indigo-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
            <X size={36} />
          </button>

          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl w-full" onClick={e => e.stopPropagation()}>
            <div className={`w-full lg:w-1/2 shadow-2xl rounded-sm border-[12px] overflow-hidden rotate-[-2deg] transition-all duration-500 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
              <img src={selectedImg} className="w-full h-full object-cover" />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
               <h3 className={`font-romantic text-4xl mb-6 transition-colors duration-500 ${isDarkMode ? 'text-indigo-50' : 'text-gray-900'}`}>Write a Note...</h3>
               <p className={`text-sm mb-10 leading-relaxed text-center lg:text-left transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                 Every picture tells a story, but AI can help find the hidden words behind the clouds.
               </p>
               
               <button
                  onClick={() => generatePostcard(selectedImg)}
                  disabled={analyzing}
                  className={`px-10 py-5 rounded-full shadow-xl flex items-center gap-3 font-bold text-xs tracking-widest transition-all active:scale-95 disabled:opacity-50 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-gray-950 hover:bg-black text-white'}`}
               >
                  {analyzing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} className="text-yellow-400" />}
                  {analyzing ? 'FLIPPING POSTCARD...' : 'REVEAL CLOUD NOTE'}
               </button>

               {postcard && (
                 <div className={`mt-12 p-8 rounded-xl border-l-4 animate-in slide-in-from-left-4 duration-500 w-full transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-indigo-500 shadow-indigo-900/10' : 'bg-gray-50 border-pink-400'}`}>
                    <p className={`font-handwriting text-3xl leading-snug transition-colors duration-500 ${isDarkMode ? 'text-indigo-100' : 'text-gray-700'}`}>
                      "{postcard}"
                    </p>
                    <div className="flex items-center gap-2 mt-6">
                      <div className={`w-8 h-px transition-colors duration-500 ${isDarkMode ? 'bg-indigo-900' : 'bg-pink-200'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${isDarkMode ? 'text-indigo-500' : 'text-pink-300'}`}>Cloudy Insight</span>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
