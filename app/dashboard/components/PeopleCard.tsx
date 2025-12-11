import React, { useState, useEffect, useRef } from 'react';
import { User, Calendar, MessageSquare, Gift, Coffee, Briefcase } from 'lucide-react';

interface Person {
  name: string;
  reason: string;
  icon?: 'user' | 'calendar' | 'message' | 'gift' | 'coffee' | 'briefcase';
  lastContact?: string;
}

const ContactReminderCard: React.FC = () => {
  const people: Person[] = [
    { name: 'Sarah Chen', reason: 'Birthday next week', icon: 'gift', lastContact: '2d ago' },
    { name: 'Marcus Rivera', reason: 'Project follow-up', icon: 'briefcase', lastContact: '1w ago' },
    { name: 'Emma Wilson', reason: 'Catch up over coffee', icon: 'coffee', lastContact: '3w ago' },
    { name: 'David Park', reason: 'Schedule meeting', icon: 'calendar', lastContact: '5d ago' },
    { name: 'Lisa Anderson', reason: 'Reply to message', icon: 'message', lastContact: '2w ago' },
    { name: 'Alex Thompson', reason: 'General check-in', icon: 'user', lastContact: '4d ago' },
    { name: 'Rachel Green', reason: 'Discuss collaboration', icon: 'briefcase', lastContact: '1w ago' },
    { name: 'Tom Hardy', reason: 'Send thank you note', icon: 'message', lastContact: '6d ago' },
  ];
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getIcon = (iconType?: string) => {
    const iconProps = { size: 12, strokeWidth: 2 };
    switch (iconType) {
      case 'calendar':
        return <Calendar {...iconProps} />;
      case 'message':
        return <MessageSquare {...iconProps} />;
      case 'gift':
        return <Gift {...iconProps} />;
      case 'coffee':
        return <Coffee {...iconProps} />;
      case 'briefcase':
        return <Briefcase {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = Math.min(prev + 1, people.length - 1);
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          scrollToItem(newIndex);
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, people.length, selectedIndex]);

  const scrollToItem = (index: number) => {
    if (itemRefs.current[index] && scrollContainerRef.current) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  useEffect(() => {
    if (isHovered) {
      setSelectedIndex(0);
      scrollToItem(0);
    }
  }, [isHovered]);

  // Skeleton Loading State
  if (!isClient) {
    return (
      <div 
        className="bg-black rounded-xl p-4 flex flex-col animate-pulse"
        style={{ 
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
          aspectRatio: '2 / 1',
          minHeight: '180px'
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 w-24 bg-gray-800 rounded"></div>
          <div className="h-3 w-16 bg-gray-800 rounded"></div>
        </div>
        
        <div className="flex-1 space-y-2.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 w-24 bg-gray-800 rounded"></div>
                <div className="h-2 w-32 bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-black rounded-xl p-4 flex flex-col overflow-hidden transition-all duration-400 ease-in-out"
      style={{ 
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
        aspectRatio: '2 / 1',
        minHeight: '180px',
        transform: isHovered ? 'scale(1.01) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered ? '0 12px 35px rgba(0, 0, 0, 0.35)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 
          className="text-white text-xs font-normal tracking-tight transition-all duration-400 ease-in-out"
          style={{ opacity: isHovered ? 0.9 : 0.6 }}
        >
          STAY IN TOUCH
        </h2>
        <span 
          className="text-[9px] text-white tracking-wide transition-all duration-400 ease-in-out"
          style={{ opacity: isHovered ? 0.7 : 0.4 }}
        >
          {people.length} CONTACTS
        </span>
      </div>

      {/* People Items - Scrollable */}
      <div 
        className="relative flex-1 overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0.85,
        }}
      >
        <div 
          ref={scrollContainerRef}
          className="overflow-y-auto h-full pr-2 transition-all duration-300"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: `rgba(255, 255, 255, ${isHovered ? 0.3 : 0.2}) transparent`
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
              background: rgba(255, 255, 255, ${isHovered ? 0.3 : 0.2});
              border-radius: 2px;
              transition: background 0.3s ease;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.4);
            }
          `}</style>
          <div className="space-y-1 pb-2">
            {people.map((person, i) => {
              const isSelected = isHovered && selectedIndex === i;
              return (
                <div 
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="rounded-md px-2 py-1.5 flex items-center gap-2 cursor-pointer transition-all duration-400 ease-in-out"
                  style={{
                    backgroundColor: isSelected ? '#ffffff' : '#1a1a1a',
                    transform: isSelected ? 'translateX(4px) scale(1.02)' : 'translateX(0) scale(1)',
                    opacity: isHovered ? 1 : 0.9
                  }}
                  onClick={() => setSelectedIndex(i)}
                  onMouseEnter={() => isHovered && setSelectedIndex(i)}
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ease-in-out"
                    style={{
                      backgroundColor: isSelected ? '#f3f4f6' : '#262626',
                      border: `2px solid ${isSelected ? '#e5e7eb' : '#404040'}`,
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      color: isSelected ? '#000000' : '#ffffff'
                    }}
                  >
                    {getIcon(person.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-[10px] font-medium tracking-tight transition-all duration-400 ease-in-out flex items-center gap-1"
                      style={{
                        color: isSelected ? '#000000' : '#ffffff'
                      }}
                    >
                      <span>{person.name}</span>
                      {person.lastContact && (
                        <>
                          <span 
                            style={{
                              opacity: isSelected ? 0.4 : 0.3,
                              fontSize: '8px'
                            }}
                          >
                            •
                          </span>
                          <span 
                            className="text-[8px]"
                            style={{
                              color: isSelected ? '#9ca3af' : '#525252',
                              opacity: isSelected ? 0.6 : 0.4
                            }}
                          >
                            {person.lastContact}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right ml-2">
                    <div 
                      className="text-[8px] tracking-tight transition-all duration-400 ease-in-out"
                      style={{
                        color: isSelected ? '#6b7280' : '#737373',
                        opacity: isSelected ? 0.9 : 0.7
                      }}
                    >
                      {person.reason}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent)',
            opacity: isHovered ? 0.8 : 1
          }}
        ></div>
      </div>
    </div>
  );
};

export default ContactReminderCard;