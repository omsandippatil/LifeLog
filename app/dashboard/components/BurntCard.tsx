import React, { useState, useEffect } from 'react';

const BurntCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getAccentColor = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return '#FFCC00';
    if (hour >= 8 && hour < 12) return '#FF9500';
    if (hour >= 12 && hour < 17) return '#007AFF';
    if (hour >= 17 && hour < 20) return '#FF6482';
    return '#BF5AF2';
  };

  const accentColor = getAccentColor();

  // Data
  const totalBurnt = 2240;
  const workout = 580;
  const steps = 8420;
  const stepsCalories = 420;
  const activeCalories = 1240;
  
  const targetCalories = 2500;
  const targetSteps = 10000;
  const targetActive = 1500;

  // Calculate percentages
  const activePercent = Math.min((activeCalories / targetActive) * 100, 100);
  const stepsPercent = Math.min((steps / targetSteps) * 100, 100);
  const workoutPercent = Math.min((workout / 800) * 100, 100);

  // Convert percentage to degrees (360 = full circle)
  const getCircleProgress = (percent: number) => {
    return (percent / 100) * 360;
  };

  // Create SVG circle path
  const createArc = (percent: number, radius: number, strokeWidth: number) => {
    const degrees = getCircleProgress(percent);
    const radians = (degrees - 90) * (Math.PI / 180);
    const centerX = 50;
    const centerY = 50;
    const startX = centerX;
    const startY = centerY - radius;
    const endX = centerX + radius * Math.cos(radians);
    const endY = centerY + radius * Math.sin(radians);
    const largeArc = degrees > 180 ? 1 : 0;

    if (percent === 0) return '';
    if (percent >= 100) {
      return `M ${centerX},${centerY - radius} A ${radius},${radius} 0 1,1 ${centerX},${centerY - radius + 0.01}`;
    }

    return `M ${startX},${startY} A ${radius},${radius} 0 ${largeArc},1 ${endX},${endY}`;
  };

  // Skeleton Loading State
  if (!isClient) {
    return (
      <div 
        className="relative bg-black rounded-xl p-4 w-full aspect-square flex flex-col justify-between animate-pulse"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="h-3 w-16 bg-gray-800 rounded"></div>
          <div className="h-2 w-8 bg-gray-800 rounded"></div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-800 rounded-full"></div>
        </div>

        <div className="flex justify-around mt-2">
          <div className="flex flex-col items-center gap-1">
            <div className="h-2 w-8 bg-gray-800 rounded"></div>
            <div className="h-3 w-12 bg-gray-800 rounded"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-2 w-8 bg-gray-800 rounded"></div>
            <div className="h-3 w-12 bg-gray-800 rounded"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-2 w-8 bg-gray-800 rounded"></div>
            <div className="h-3 w-12 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-black rounded-xl p-4 w-full aspect-square flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="text-white text-xs font-normal tracking-tight opacity-60">
          Burnt
        </div>
        <div className="text-white text-[10px] font-normal opacity-25">
          {Math.round((totalBurnt / targetCalories) * 100)}%
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center -mt-2">
        <div className="relative w-36 h-36">
          {/* SVG Rings */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circles */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="6"
            />

            {/* Active ring (outer) */}
            <path
              d={createArc(activePercent, 38, 6)}
              fill="none"
              stroke="#FF0080"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Steps ring (middle) */}
            <path
              d={createArc(stepsPercent, 30, 6)}
              fill="none"
              stroke="#00FF88"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Workout ring (inner) */}
            <path
              d={createArc(workoutPercent, 22, 6)}
              fill="none"
              stroke="#00D4FF"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-around -mt-2">
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-white text-[9px] opacity-40 font-medium">ACTIVE</div>
          <div className="text-white text-xs font-medium">{activeCalories}</div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-white text-[9px] opacity-40 font-medium">STEPS</div>
          <div className="text-white text-xs font-medium">{steps.toLocaleString()}</div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-white text-[9px] opacity-40 font-medium">WORKOUT</div>
          <div className="text-white text-xs font-medium">{workout}</div>
        </div>
      </div>

      {/* Hover State */}
      {isHovered && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-96 rounded-xl flex flex-col justify-between p-4 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-white text-xs font-normal tracking-tight opacity-60">
              Activity Details
            </div>
            <div className="text-white text-[10px] font-normal opacity-25">
              Today
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-3">
            {/* Total calories bar */}
            <div className="flex items-center gap-2 pb-2">
              <div className="flex-1 h-1.5 bg-white bg-opacity-10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((totalBurnt / targetCalories) * 100, 100)}%`,
                    backgroundColor: accentColor
                  }}
                ></div>
              </div>
            </div>

            {/* Active */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF0080' }}></div>
                <div className="text-white text-xs font-medium opacity-50">Active</div>
              </div>
              <div className="text-white text-xs font-medium">{activeCalories} cal</div>
            </div>

            {/* Steps */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00FF88' }}></div>
                <div className="text-white text-xs font-medium opacity-50">Steps</div>
              </div>
              <div className="text-white text-xs font-medium">{steps.toLocaleString()} steps</div>
            </div>

            {/* Workout */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00D4FF' }}></div>
                <div className="text-white text-xs font-medium opacity-50">Workout</div>
              </div>
              <div className="text-white text-xs font-medium">{workout} cal</div>
            </div>
          </div>

          {/* Rest */}
          <div className="flex items-center justify-between">
            <div className="text-white text-xs font-medium opacity-50">Rest</div>
            <div className="text-white text-xs font-medium">
              {totalBurnt - activeCalories - workout} cal
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurntCard;