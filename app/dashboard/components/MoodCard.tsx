import React, { useState, useEffect } from 'react';

const MoodCard = () => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedMood, setSelectedMood] = useState('happy');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const moods = [
    { id: 'happy', label: 'Happy', color: '#32d74b' },
    { id: 'sad', label: 'Sad', color: '#64d2ff' },
    { id: 'angry', label: 'Angry', color: '#ff453a' },
    { id: 'lost', label: 'Lost', color: '#bf5af2' },
    { id: 'anxious', label: 'Anxious', color: '#ff9f0a' },
    { id: 'okay', label: 'Okay', color: '#ffd60a' },
  ];

  const MoodIcon = ({ mood }: { mood: string }) => {
    switch(mood) {
      case 'happy':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#32d74b" strokeWidth="2" fill="none"/>
            <path d="M 18 24 Q 22 20 26 24" stroke="#32d74b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M 38 24 Q 42 20 46 24" stroke="#32d74b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M 20 36 Q 32 45 44 36" stroke="#32d74b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'sad':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#64d2ff" strokeWidth="2" fill="none"/>
            <circle cx="23" cy="26" r="2.5" fill="#64d2ff"/>
            <circle cx="41" cy="26" r="2.5" fill="#64d2ff"/>
            <path d="M 22 42 Q 32 36 42 42" stroke="#64d2ff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'angry':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#ff453a" strokeWidth="2" fill="none"/>
            <circle cx="23" cy="26" r="2.5" fill="#ff453a"/>
            <circle cx="41" cy="26" r="2.5" fill="#ff453a"/>
            <path d="M 20 42 Q 32 36 44 42" stroke="#ff453a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M 18 22 L 26 26" stroke="#ff453a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 46 22 L 38 26" stroke="#ff453a" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'lost':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#bf5af2" strokeWidth="2" fill="none"/>
            <circle cx="23" cy="26" r="2.5" fill="#bf5af2"/>
            <circle cx="41" cy="26" r="2.5" fill="#bf5af2"/>
            <path d="M 24 40 Q 27 37 30 40 Q 34 37 38 40" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'anxious':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#ff9f0a" strokeWidth="2" fill="none"/>
            <circle cx="23" cy="24" r="3" fill="#ff9f0a"/>
            <circle cx="41" cy="24" r="3" fill="#ff9f0a"/>
            <path d="M 22 40 Q 32 36 42 40" stroke="#ff9f0a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'okay':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#ffd60a" strokeWidth="2" fill="none"/>
            <circle cx="23" cy="26" r="2.5" fill="#ffd60a"/>
            <circle cx="41" cy="26" r="2.5" fill="#ffd60a"/>
            <line x1="22" y1="40" x2="42" y2="40" stroke="#ffd60a" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const SmallMoodIcon = ({ mood }: { mood: string }) => {
    switch(mood) {
      case 'happy':
        return (
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#32d74b" strokeWidth="1.5" fill="none"/>
            <path d="M 11 14 Q 14 11 17 14" stroke="#32d74b" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M 19 14 Q 22 11 25 14" stroke="#32d74b" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M 12 20 Q 18 25 24 20" stroke="#32d74b" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'sad':
        return (
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#64d2ff" strokeWidth="1.5" fill="none"/>
            <circle cx="13" cy="14" r="1.8" fill="#64d2ff"/>
            <circle cx="23" cy="14" r="1.8" fill="#64d2ff"/>
            <path d="M 12 23 Q 18 19 24 23" stroke="#64d2ff" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'angry':
        return (
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#ff453a" strokeWidth="1.5" fill="none"/>
            <circle cx="13" cy="14" r="1.8" fill="#ff453a"/>
            <circle cx="23" cy="14" r="1.8" fill="#ff453a"/>
            <path d="M 12 23 Q 18 19 24 23" stroke="#ff453a" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M 11 12 L 15 14" stroke="#ff453a" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M 25 12 L 21 14" stroke="#ff453a" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        );
      case 'lost':
        return (
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#bf5af2" strokeWidth="1.5" fill="none"/>
            <circle cx="13" cy="14" r="1.8" fill="#bf5af2"/>
            <circle cx="23" cy="14" r="1.8" fill="#bf5af2"/>
            <path d="M 13 22 Q 15 20 17 22 Q 20 20 23 22" stroke="#bf5af2" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'anxious':
        return (
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#ff9f0a" strokeWidth="1.5" fill="none"/>
            <circle cx="13" cy="13" r="2" fill="#ff9f0a"/>
            <circle cx="23" cy="13" r="2" fill="#ff9f0a"/>
            <path d="M 12 22 Q 18 19 24 22" stroke="#ff9f0a" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'okay':
        return (
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#ffd60a" strokeWidth="1.5" fill="none"/>
            <circle cx="13" cy="14" r="1.8" fill="#ffd60a"/>
            <circle cx="23" cy="14" r="1.8" fill="#ffd60a"/>
            <line x1="12" y1="22" x2="24" y2="22" stroke="#ffd60a" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const currentMood = moods.find(m => m.id === selectedMood) || moods[0];

  if (!isClient) {
    return (
      <div 
        className="bg-black rounded-xl p-4 flex flex-col aspect-square animate-pulse"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      >
        <div className="h-6 w-16 bg-gray-800 rounded mb-3"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="h-12 w-12 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-black rounded-xl p-4 flex flex-col aspect-square overflow-hidden cursor-pointer transition-all duration-300"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`mb-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h2 className="text-white text-xs font-normal tracking-tight opacity-60">Mood</h2>
      </div>

      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="text-center">
          <div className="mb-3">
            <MoodIcon mood={currentMood.id} />
          </div>
          <div className="text-white text-lg font-medium tracking-tight mb-1">
            {currentMood.label}
          </div>
          <div className="text-white text-[9px] opacity-40 tracking-tight">
            01:02 PM
          </div>
        </div>
      </div>

      <div 
        className={`absolute inset-0 flex flex-col p-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="text-white text-xs font-normal tracking-tight opacity-60 mb-4">
          How are you feeling?
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-[220px]">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-200 aspect-square bg-[#0a0a0a] hover:bg-[#1a1a1a]"
              >
                <SmallMoodIcon mood={mood.id} />
                <span className="text-[9px] font-normal tracking-tight text-center text-white opacity-40">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;