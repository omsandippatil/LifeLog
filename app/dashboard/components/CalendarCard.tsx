import React, { useState, useEffect, useRef } from 'react';

const CalendarCard = () => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const events = [
    { title: 'Project Review', date: 'Sep 3' },
    { title: 'Lunch Break', date: 'Sep 3' },
    { title: 'Code Review', date: 'Sep 4' },
    { title: 'Team Standup', date: 'Sep 5' },
    { title: 'Design Review', date: 'Sep 6' },
    { title: 'Client Meeting', date: 'Sep 7' },
    { title: 'Sprint Planning', date: 'Sep 8' },
    { title: 'Team Sync', date: 'Sep 9' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = Math.min(prev + 1, events.length - 1);
          scrollToEvent(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          scrollToEvent(newIndex);
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, events.length]);

  const scrollToEvent = (index: number) => {
    if (eventRefs.current[index] && scrollContainerRef.current) {
      eventRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  useEffect(() => {
    if (isHovered) {
      setSelectedIndex(0);
      scrollToEvent(0);
    }
  }, [isHovered]);

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
      className="bg-black rounded-xl p-4 flex flex-col aspect-square overflow-hidden"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div 
        className="mb-2 transition-all duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          height: isHovered ? 0 : 'auto',
          marginBottom: isHovered ? 0 : '0.5rem'
        }}
      >
        <h2 className="text-white text-xs font-normal tracking-tight opacity-60">Sep 2024</h2>
      </div>

      {/* Calendar Grid */}
      <div 
        className="transition-all duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? 'translateY(-20px)' : 'translateY(0)',
          height: isHovered ? 0 : 'auto',
          marginBottom: isHovered ? 0 : '0.75rem',
          overflow: 'hidden'
        }}
      >
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
      <div 
        className="relative flex-1 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0.6,
        }}
      >
        <div 
          ref={scrollContainerRef}
          className="overflow-y-auto h-full pr-2"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 3px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 2px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          `}</style>
          <div className="space-y-1.5 pb-2">
            {events.map((event, i) => (
              <div 
                key={i}
                ref={(el) => { eventRefs.current[i] = el; }}
                className={`rounded-md px-2.5 py-2 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                  isHovered && selectedIndex === i 
                    ? 'bg-white text-black' 
                    : 'bg-[#1a1a1a] text-white'
                }`}
                onClick={() => setSelectedIndex(i)}
                onMouseEnter={() => isHovered && setSelectedIndex(i)}
              >
                <div className={`text-[10px] font-medium tracking-tight ${
                  isHovered && selectedIndex === i ? 'text-black' : 'text-white'
                }`}>
                  {event.title}
                </div>
                <div className={`text-[9px] ${
                  isHovered && selectedIndex === i ? 'opacity-60' : 'opacity-40'
                }`}>
                  {event.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CalendarCard;