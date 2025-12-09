import React, { useState, useEffect } from 'react';

const ScoreCard = () => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const score = 89;
  
  // Generate 7 data points for 7 days
  const generateGraphData = (): number[] => {
    return [62, 58, 71, 67, 78, 82, 89];
  };
  
  const graphData = generateGraphData();
  
  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#32d74b';
    if (score >= 60) return '#ffd60a';
    return '#ff453a';
  };
  
  const scoreColor = getScoreColor(score);
  
  // Create ultra-smooth path using Catmull-Rom spline
  const createSmoothPath = (data: number[]): string => {
    const width = 100;
    const height = 100;
    const points = data.map((value: number, index: number) => ({
      x: (index / (data.length - 1)) * width,
      y: height - (value / 100) * height
    }));
    
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      
      const tension = 0.5;
      const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
      const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;
      const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
      const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    
    return path;
  };
  
  // Create gradient fill area
  const createFillPath = (data: number[]): string => {
    const linePath = createSmoothPath(data);
    return `${linePath} L 100 100 L 0 100 Z`;
  };
  
  if (!isClient) {
    return (
      <div 
        className="bg-black rounded-3xl p-6 flex flex-col aspect-square animate-pulse"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
      >
        <div className="h-6 w-24 bg-gray-800 rounded mb-3"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="h-24 w-24 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-gradient-to-br from-zinc-950 to-black rounded-3xl p-6 flex flex-col aspect-square overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:shadow-2xl"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-5 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${scoreColor}, transparent 70%)`,
          opacity: isHovered ? 0.08 : 0.03
        }}
      />

      {/* Header */}
      <div 
        className={`relative z-10 mb-3 flex items-center justify-between transition-all duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h2 className="text-white text-xs font-medium tracking-wide opacity-50 uppercase">
          Performance
        </h2>
        <div>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path 
              d="M2 10L8 4L14 10" 
              stroke={scoreColor}
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Score Display - Default View */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
          isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="text-center">
          <div 
            className="leading-none tracking-tighter"
            style={{
              fontSize: '92px',
              fontWeight: '700',
              color: scoreColor,
              textShadow: `0 0 80px ${scoreColor}40, 0 0 40px ${scoreColor}30, 0 0 20px ${scoreColor}20`,
            }}
          >
            {score}
            <span 
              className="opacity-60"
              style={{ fontSize: '48px', fontWeight: '600' }}
            >
              %
            </span>
          </div>
        </div>
      </div>

      {/* Graph View - On Hover */}
      <div 
        className={`absolute inset-0 flex flex-col p-6 transition-all duration-700 ease-out ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="text-white text-xs font-medium tracking-wide opacity-50 uppercase mb-6">
          Last 7 Days
        </div>
        
        {/* Graph Container */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative w-full h-full flex items-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Gradient for the line */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={scoreColor} stopOpacity="0.4" />
                  <stop offset="30%" stopColor={scoreColor} stopOpacity="0.9" />
                  <stop offset="70%" stopColor={scoreColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={scoreColor} stopOpacity="1" />
                </linearGradient>
                
                {/* Gradient for the fill area */}
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={scoreColor} stopOpacity="0.3" />
                  <stop offset="50%" stopColor={scoreColor} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={scoreColor} stopOpacity="0" />
                </linearGradient>
                
                {/* Enhanced glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Filled area under the curve */}
              <path
                d={createFillPath(graphData)}
                fill="url(#areaGradient)"
                opacity="0.6"
              />
              
              {/* Main smooth curve line */}
              <path
                d={createSmoothPath(graphData)}
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              
              {/* End point with glow */}
              <circle
                cx="100"
                cy={100 - (graphData[graphData.length - 1] / 100) * 100}
                r="3.5"
                fill={scoreColor}
                style={{
                  filter: `drop-shadow(0 0 8px ${scoreColor}) drop-shadow(0 0 4px ${scoreColor})`,
                }}
              />
              
              {/* Outer ring for end point */}
              <circle
                cx="100"
                cy={100 - (graphData[graphData.length - 1] / 100) * 100}
                r="6"
                fill="none"
                stroke={scoreColor}
                strokeWidth="1.5"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
        
        {/* Current value indicator */}
        <div className="mt-4 flex items-baseline justify-end">
          <span 
            className="text-4xl font-bold tracking-tight"
            style={{ 
              color: scoreColor,
              textShadow: `0 0 20px ${scoreColor}40`
            }}
          >
            {score}
          </span>
          <span 
            className="text-xl font-semibold ml-1 opacity-60"
            style={{ color: scoreColor }}
          >
            %
          </span>
        </div>
      </div>

      {/* Status indicator dot - only show when not hovered */}
      <div 
        className={`absolute bottom-6 right-6 z-10 transition-all duration-500 ${
          isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: scoreColor,
            boxShadow: `0 0 12px ${scoreColor}, 0 0 6px ${scoreColor}`,
          }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;