import React, { useState, useEffect } from 'react';

const IntakeCard = () => {
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
  const totalCalories = 1840;
  const breakfast = 420;
  const lunch = 680;
  const dinner = 740;
  
  const protein = 82; // grams
  const carbs = 195; // grams
  const fats = 58; // grams
  
  const proteinTarget = 120;
  const carbsTarget = 250;
  const fatsTarget = 70;
  
  const waterIntake = 2.1; // liters
  const waterTarget = 3.0; // liters

  // Skeleton Loading State
  if (!isClient) {
    return (
      <div 
        className="relative bg-black rounded-xl p-4 h-full min-h-[180px] flex flex-col justify-between animate-pulse"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="h-3 w-16 bg-gray-800 rounded"></div>
          <div className="h-2 w-8 bg-gray-800 rounded"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="h-12 w-32 bg-gray-800 rounded mb-4"></div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-12 bg-gray-800 rounded"></div>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="h-2 w-8 bg-gray-800 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-12 bg-gray-800 rounded"></div>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="h-2 w-8 bg-gray-800 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-12 bg-gray-800 rounded"></div>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="h-2 w-8 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="h-2 w-12 bg-gray-800 rounded"></div>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full"></div>
          <div className="h-2 w-12 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-black rounded-xl p-4 h-full min-h-[180px] flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-white text-xs font-normal tracking-tight opacity-60">
          Intake
        </div>
        <div className="text-white text-[10px] font-normal opacity-25">
          {Math.round((totalCalories / 2200) * 100)}%
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div 
          className="text-white font-medium leading-none tracking-tight mb-2"
          style={{ 
            fontSize: '40px',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {totalCalories.toLocaleString()}
        </div>
        
        <div className="space-y-2">
          {/* Protein */}
          <div className="flex items-center gap-2">
            <div className="text-white text-[9px] opacity-40 font-medium w-10">PRO</div>
            <div className="flex-1 h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((protein / proteinTarget) * 100, 100)}%`,
                  backgroundColor: accentColor
                }}
              ></div>
            </div>
            <div className="text-white text-[9px] font-medium opacity-60 w-8 text-right">
              {protein}g
            </div>
          </div>

          {/* Carbs */}
          <div className="flex items-center gap-2">
            <div className="text-white text-[9px] opacity-40 font-medium w-10">CARB</div>
            <div className="flex-1 h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((carbs / carbsTarget) * 100, 100)}%`,
                  backgroundColor: accentColor,
                  opacity: 0.7
                }}
              ></div>
            </div>
            <div className="text-white text-[9px] font-medium opacity-60 w-8 text-right">
              {carbs}g
            </div>
          </div>

          {/* Fats */}
          <div className="flex items-center gap-2">
            <div className="text-white text-[9px] opacity-40 font-medium w-10">FAT</div>
            <div className="flex-1 h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((fats / fatsTarget) * 100, 100)}%`,
                  backgroundColor: accentColor,
                  opacity: 0.5
                }}
              ></div>
            </div>
            <div className="text-white text-[9px] font-medium opacity-60 w-8 text-right">
              {fats}g
            </div>
          </div>
        </div>
      </div>

      {/* Water Intake */}
      <div className="flex items-center gap-2 mt-2">
        <div className="text-white text-[9px] opacity-40 font-medium w-10">H₂O</div>
        <div className="flex-1 h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min((waterIntake / waterTarget) * 100, 100)}%`,
              backgroundColor: '#007AFF'
            }}
          ></div>
        </div>
        <div className="text-white text-[9px] font-medium opacity-60 w-14 text-right">
          {waterIntake}L / {waterTarget}L
        </div>
      </div>

      {/* Hover State */}
      {isHovered && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-96 rounded-xl flex flex-col justify-between p-4 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-white text-xs font-normal tracking-tight opacity-60">
              Meals Today
            </div>
            <div className="text-white text-[10px] font-normal opacity-25">
              3 of 3
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-3">
            {/* Total calories bar */}
            <div className="flex items-center gap-2 pb-2">
              <div className="flex-1 h-1.5 bg-white bg-opacity-10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((totalCalories / 2200) * 100, 100)}%`,
                    backgroundColor: accentColor
                  }}
                ></div>
              </div>
            </div>

            {/* Breakfast */}
            <div className="flex items-center justify-between">
              <div className="text-white text-xs font-medium opacity-50">Breakfast</div>
              <div className="text-white text-xs font-medium">{breakfast} cal</div>
            </div>

            {/* Lunch */}
            <div className="flex items-center justify-between">
              <div className="text-white text-xs font-medium opacity-50">Lunch</div>
              <div className="text-white text-xs font-medium">{lunch} cal</div>
            </div>

            {/* Dinner */}
            <div className="flex items-center justify-between">
              <div className="text-white text-xs font-medium opacity-50">Dinner</div>
              <div className="text-white text-xs font-medium">{dinner} cal</div>
            </div>
          </div>

          {/* Water in hover state */}
          <div className="flex items-center justify-between">
            <div className="text-white text-xs font-medium opacity-50">Water</div>
            <div className="text-white text-xs font-medium">
              {waterIntake}L / {waterTarget}L
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntakeCard;