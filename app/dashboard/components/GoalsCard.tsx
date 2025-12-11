import React, { useState, useEffect } from 'react';

interface Goal {
  goal: string;
  progress: number;
}

const GoalsCard: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goals: Goal[] = [
    { goal: 'Complete Q4 Projects', progress: 75 },
    { goal: 'Learn React Advanced', progress: 60 },
    { goal: 'Fitness Routine', progress: 45 },
    { goal: 'Read 12 Books', progress: 83 },
    { goal: 'Network Building', progress: 50 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate overall progress
  const overallProgress = Math.round(
    goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
  );

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const overallColor = getScoreColor(overallProgress);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, goals.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, goals.length, selectedIndex]);

  useEffect(() => {
    if (isHovered) {
      setSelectedIndex(0);
    }
  }, [isHovered]);

  // Skeleton Loading State
  if (!isClient) {
    return (
      <div 
        className="bg-black rounded-xl p-4 flex flex-col animate-pulse"
        style={{ 
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
          aspectRatio: '1 / 1',
          minHeight: '180px'
        }}
      >
        <div className="h-3 w-16 bg-gray-800 rounded mb-4"></div>
        
        <div className="flex-1 space-y-4 flex flex-col justify-center">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <div className="h-2 w-28 bg-gray-800 rounded"></div>
                <div className="h-2 w-8 bg-gray-800 rounded"></div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-black rounded-xl p-4 flex flex-col overflow-hidden transition-all duration-700 ease-out"
      style={{ 
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
        aspectRatio: '1 / 1',
        minHeight: '180px',
        transform: isHovered ? 'scale(1.01) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered ? '0 12px 35px rgba(0, 0, 0, 0.35)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${overallColor}, transparent 70%)`,
          opacity: isHovered ? 0.08 : 0.03
        }}
      />

      {/* Header - Default View */}
      <div 
        className={`relative z-10 mb-4 transition-all duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h2 
          className="text-white text-xs font-normal tracking-tight transition-all duration-400 ease-in-out"
          style={{ opacity: 0.6 }}
        >
          GOALS
        </h2>
      </div>

      {/* Goals List - Default View */}
      <div 
        className={`relative z-10 flex-1 space-y-3 flex flex-col justify-center transition-all duration-700 ease-out ${
          isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {goals.map((item, idx) => (
          <div 
            key={idx}
            className="transition-all duration-400 ease-in-out"
          >
            <div className="flex justify-between text-[10px] mb-1.5">
              <span 
                className="font-medium tracking-tight"
                style={{
                  color: '#ffffff',
                  opacity: 0.8
                }}
              >
                {item.goal}
              </span>
              <span 
                className="tracking-tight"
                style={{
                  color: '#737373',
                  opacity: 0.6
                }}
              >
                {item.progress}%
              </span>
            </div>
            <div 
              className="h-1.5 rounded-full overflow-hidden"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #262626'
              }}
            >
              <div 
                className="h-full rounded-full transition-all duration-400 ease-in-out"
                style={{ 
                  width: `${item.progress}%`,
                  background: 'linear-gradient(to right, #059669, #10b981)',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Progress Display - On Hover */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="text-center">
          <div 
            className="mb-3 text-white text-[10px] font-normal tracking-tight uppercase"
            style={{ opacity: 0.5 }}
          >
            Overall Progress
          </div>
          <div 
            className="leading-none tracking-tighter"
            style={{
              fontSize: '92px',
              fontWeight: '700',
              color: overallColor,
              textShadow: `0 0 80px ${overallColor}40, 0 0 40px ${overallColor}30, 0 0 20px ${overallColor}20`,
            }}
          >
            {overallProgress}
            <span 
              className="opacity-60"
              style={{ fontSize: '48px', fontWeight: '600' }}
            >
              %
            </span>
          </div>
        </div>
      </div>

      {/* Status indicator dot - only show when hovered */}
      <div 
        className={`absolute bottom-4 right-4 z-10 transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: overallColor,
            boxShadow: `0 0 12px ${overallColor}, 0 0 6px ${overallColor}`,
          }}
        />
      </div>
    </div>
  );
};

export default GoalsCard;