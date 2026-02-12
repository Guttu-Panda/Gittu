
import React, { useState, useEffect } from 'react';
import { Settings, Shield, Zap, RefreshCw, X, MessageSquare, Terminal, Eye, Heart, Sparkles, Send, Trash2, EyeOff } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AdminPanelProps {
  onClose: () => void;
  superMode: boolean;
  setSuperMode: (val: boolean) => void;
  globalVFX: string;
  setGlobalVFX: (val: string) => void;
  aiAutopilot: boolean;
  setAiAutopilot: (val: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'interceptor' | 'system'>('general');
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [adminReply, setAdminReply] = useState('');

  useEffect(() => {
    if (isAuthorized) {
      const interval = setInterval(() => {
        const saved = localStorage.getItem('cloudy_chat_logs');
        if (saved) setChatLogs(JSON.parse(saved));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthorized]);

  const checkAuth = () => {
    if (password === 'megh2024') setIsAuthorized(true);
    else alert('Unauthorized access blocked. 😂');
  };

  const sendManualReply = (role: 'model' | 'admin' = 'model') => {
    if (!adminReply.trim()) return;
    window.dispatchEvent(new CustomEvent('cloudy-admin-reply', { 
      detail: { text: adminReply, role } 
    }));
    setAdminReply('');
  };

  const clearLogs = () => {
    if (confirm('Clear all chat history?')) {
      localStorage.removeItem('cloudy_chat_logs');
      setChatLogs([]);
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[85vh]">
        
        {/* Admin Header */}
        <div className="bg-gray-950 p-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400/20 rounded-xl">
              <Terminal className="text-yellow-400" size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-widest uppercase">Cloud Control</h2>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Root Console v2.0</p>
            </div>
          </div>
          <button onClick={props.onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
        </div>

        {!isAuthorized ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-8">
             <Shield className="w-16 h-16 text-gray-200" />
             <input 
              type="password"
              placeholder="System Passcode..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-gray-900 transition-all outline-none text-center font-mono"
            />
            <button onClick={checkAuth} className="w-full bg-gray-950 text-white font-bold py-5 rounded-2xl hover:bg-black transition-all">Authenticate Session</button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-1 shrink-0">
              <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<Settings size={14}/>} label="General" />
              <TabButton active={activeTab === 'interceptor'} onClick={() => setActiveTab('interceptor')} icon={<Eye size={14}/>} label="Interceptor" />
              <TabButton active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={<Zap size={14}/>} label="System" />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {activeTab === 'general' && (
                <div className="space-y-4">
                   <ControlRow 
                    label="Super Mode" 
                    sub="Global VFX Boost" 
                    active={props.superMode} 
                    onClick={() => props.setSuperMode(!props.superMode)} 
                    icon={<Zap size={18} className={props.superMode ? "text-pink-500 fill-pink-500" : ""} />}
                   />
                   <div className="p-4 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">Global VFX Overrides</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['default', 'hearts', 'stars'].map(v => (
                          <button 
                            key={v}
                            onClick={() => props.setGlobalVFX(v)}
                            className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${props.globalVFX === v ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-500'}`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                   </div>
                   <button onClick={() => window.location.reload()} className="w-full flex items-center justify-center gap-3 p-5 bg-gray-50 text-gray-600 font-bold rounded-[2rem] text-xs">
                    <RefreshCw size={18} /> Hard Reset App
                   </button>
                </div>
              )}

              {activeTab === 'interceptor' && (
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <div>
                        <p className="text-xs font-bold text-orange-700">AI Autopilot</p>
                        <p className="text-[9px] text-orange-600/70 uppercase">Disable to manual reply</p>
                      </div>
                      <button 
                        onClick={() => props.setAiAutopilot(!props.aiAutopilot)}
                        className={`w-12 h-6 rounded-full transition-all relative ${props.aiAutopilot ? 'bg-green-500' : 'bg-orange-500'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${props.aiAutopilot ? 'left-7' : 'left-1'}`}></div>
                      </button>
                   </div>

                   {/* Chat History */}
                   <div className="bg-gray-900 rounded-3xl p-5 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {chatLogs.length === 0 && <p className="text-[10px] text-gray-600 text-center italic">No active logs detected...</p>}
                      {chatLogs.map((log, i) => (
                        <div key={i} className={`flex flex-col ${log.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <span className="text-[8px] text-gray-500 mb-1 font-bold uppercase">{log.role === 'user' ? 'Megh' : 'Cloudy'}</span>
                          <div className={`px-3 py-2 rounded-xl text-[10px] max-w-[90%] ${log.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                            {log.text}
                          </div>
                        </div>
                      ))}
                   </div>

                   {/* Manual Controls */}
                   <div className="space-y-3">
                      <div className="relative">
                        <textarea 
                          value={adminReply}
                          onChange={e => setAdminReply(e.target.value)}
                          placeholder="Type response as AI..."
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs min-h-[80px] outline-none focus:ring-2 focus:ring-blue-100"
                        />
                        <div className="absolute bottom-3 right-3 flex gap-2">
                           <button onClick={() => sendManualReply('admin')} className="p-2 bg-indigo-100 text-indigo-600 rounded-lg" title="Send as System Note"><Terminal size={14}/></button>
                           <button onClick={() => sendManualReply('model')} className="p-2 bg-green-100 text-green-600 rounded-lg" title="Send as Cloudy"><Send size={14}/></button>
                        </div>
                      </div>
                      <button onClick={clearLogs} className="w-full flex items-center justify-center gap-2 py-3 text-red-400 text-[10px] font-bold uppercase hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={12} /> Wipe Session Logs
                      </button>
                   </div>
                </div>
              )}

              {activeTab === 'system' && (
                <div className="space-y-4">
                  <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <h3 className="text-xs font-bold text-indigo-900 mb-2">Memory Matrix</h3>
                    <div className="grid grid-cols-2 gap-2">
                       <MetricCard label="Uptime" val="99.9%" />
                       <MetricCard label="Bond Strength" val="∞" />
                       <MetricCard label="Last Sync" val="Just Now" />
                       <MetricCard label="Latency" val="42ms" />
                    </div>
                  </div>
                  <div className="p-5 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center gap-4 py-10 opacity-40">
                    <EyeOff size={32} className="text-gray-300" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ghost Mode Inactive</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: any, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all ${active ? 'bg-white shadow-sm text-gray-900 ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon} {label}
  </button>
);

const ControlRow: React.FC<{ label: string, sub: string, active: boolean, onClick: () => void, icon: any }> = ({ label, sub, active, onClick, icon }) => (
  <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[2rem] border border-gray-100">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl ${active ? 'bg-pink-100' : 'bg-gray-200'}`}>{icon}</div>
      <div>
        <p className="font-bold text-gray-800 text-sm">{label}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{sub}</p>
      </div>
    </div>
    <button onClick={onClick} className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-pink-500' : 'bg-gray-300'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${active ? 'left-7' : 'left-1'}`}></div>
    </button>
  </div>
);

const MetricCard: React.FC<{ label: string, val: string }> = ({ label, val }) => (
  <div className="bg-white/60 p-3 rounded-2xl border border-indigo-100/50">
    <p className="text-[8px] uppercase font-bold text-indigo-400 mb-1">{label}</p>
    <p className="text-xs font-black text-indigo-900">{val}</p>
  </div>
);

export default AdminPanel;
