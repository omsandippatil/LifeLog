import React, { useState, useEffect } from 'react';

const CalendarCard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const events = [
    { title: 'Project Review', date: 'Sep 3' },
    { title: 'Lunch Break', date: 'Sep 3' },
    { title: 'Code Review', date: 'Sep 4' },
    { title: 'Team Standup', date: 'Sep 5' },
    { title: 'Design Review', date: 'Sep 6' }
  ];

  // Skeleton Loading State
  if (!isClient) {
    return (
      <div 
        className="bg-black rounded-xl p-4 flex flex-col aspect-square animate-pulse"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      >
        <div className="h-6 w-24 bg-gray-800 rounded mb-3"></div>
        
        <div className="mb-3">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-2 w-2 bg-gray-800 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-6 w-6 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg h-8"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-black rounded-xl p-4 flex flex-col aspect-square"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
    >
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-white text-xs font-normal tracking-tight opacity-60">Sep 2024</h2>
      </div>

      {/* Calendar Grid */}
      <div className="mb-2">
        <div className="grid grid-cols-7 gap-2 text-[8px] text-center mb-1.5">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-white opacity-30 font-medium">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-[10px] text-center">
          {[1, 2, 3, 4, 5, 6, 7].map((date, i) => (
            <div key={i} className="relative">
              <div 
                className={`w-5 h-5 flex items-center justify-center rounded-full ${
                  date === 3 
                    ? 'bg-white text-black font-semibold' 
                    : 'text-white opacity-40'
                }`}
              >
                {date}
              </div>
              {[1, 2, 4, 6, 7].includes(date) && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white opacity-30 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Events List - Scrollable */}
      <div className="relative flex-1 overflow-hidden">
        <div className="overflow-y-auto h-full pr-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-1">
            {events.map((event, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-md px-2 py-1.5 flex items-center justify-between">
                <div className="text-white text-[10px] font-medium tracking-tight">{event.title}</div>
                <div className="text-white text-[9px] opacity-40">{event.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CalendarCard;