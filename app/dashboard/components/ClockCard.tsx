import React, { useState, useEffect } from 'react';

const ClockCard = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    if (pomodoroRunning && pomodoroTime > 0) {
      const timer = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pomodoroRunning, pomodoroTime]);

  const getAccentColor = () => {
    if (!currentTime) return '#007AFF';
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 8) return '#FFCC00';
    if (hour >= 8 && hour < 12) return '#FF9500';
    if (hour >= 12 && hour < 17) return '#007AFF';
    if (hour >= 17 && hour < 20) return '#FF6482';
    return '#BF5AF2';
  };

  const getWeatherIcon = () => {
    if (!currentTime) return '☀️';
    const hour = currentTime.getHours();
    const isRaining = Math.random() > 0.7;
    if (isRaining) return '🌧️';
    if (hour >= 6 && hour < 18) return '☀️';
    return '🌙';
  };

  const accentColor = getAccentColor();

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return { hours, minutes };
  };

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDate();
    return `${days[date.getDay()]} ${day}`;
  };

  const getWeekDays = () => {
    if (!currentTime) return [];
    const today = currentTime.getDay();
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDate = currentTime.getDate();
    const currentDay = currentTime.getDay();
    
    return days.map((day, idx) => {
      const dayDiff = idx - currentDay;
      const date = new Date(currentTime);
      date.setDate(currentDate + dayDiff);
      
      return {
        label: day,
        date: date.getDate(),
        isCurrent: idx === today,
        isPast: idx < today
      };
    });
  };

  const formatPomodoroTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Skeleton Loading State
  if (!isClient || !currentTime) {
    return (
      <div 
        className="relative bg-black rounded-xl p-4 h-full min-h-[180px] flex flex-col justify-between animate-pulse"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
      >
        <div className="flex justify-between items-start">
          <div className="h-3 w-24 bg-gray-800 rounded"></div>
          <div className="h-2 w-6 bg-gray-800 rounded"></div>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div className="h-14 w-28 bg-gray-800 rounded"></div>
          <div className="h-14 w-3 bg-gray-800 rounded opacity-20"></div>
          <div className="h-14 w-28 bg-gray-800 rounded"></div>
        </div>

        <div>
          <div className="rounded-lg px-2.5 py-1.5 mb-2 bg-gray-800">
            <div className="flex justify-between items-center">
              {[...Array(7)].map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-0.5">
                  <div className="h-2 w-2 bg-gray-700 rounded"></div>
                  <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-8 bg-gray-800 rounded"></div>
              <div className="h-6 w-12 bg-gray-800 rounded"></div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-6 bg-gray-800 rounded"></div>
              <div className="h-4 w-8 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const time = formatTime(currentTime);
  const weekDays = getWeekDays();
  const aqi = 42;
  const temp = 25;

  return (
    <div 
      className="relative bg-black rounded-xl p-4 h-full min-h-[180px] flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace' }}
    >
      <div className="flex justify-between items-start">
        <div className="text-white text-xs font-normal tracking-tight opacity-60">
          {pomodoroRunning ? 'Focus Mode' : formatDate(currentTime)}
        </div>
        <div className="text-white text-[10px] font-normal opacity-25">
          {pomodoroRunning ? `${Math.floor(pomodoroTime / 60)}m left` : `+${Math.floor(currentTime.getSeconds() / 10)}`}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1">
        {pomodoroRunning ? (
          <div 
            className="text-white font-medium leading-none tracking-tight"
            style={{ 
              fontSize: '52px',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {formatPomodoroTime(pomodoroTime)}
          </div>
        ) : (
          <>
            <div 
              className="text-white font-medium leading-none tracking-tight"
              style={{ 
                fontSize: '52px',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {time.hours}
            </div>
            <div className="text-white font-medium leading-none opacity-20" style={{ fontSize: '52px' }}>:</div>
            <div 
              className="text-white font-medium leading-none tracking-tight"
              style={{ 
                fontSize: '52px',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {time.minutes}
            </div>
            <div className="text-sm font-normal text-white opacity-20 self-start mt-2">
              +{Math.floor(currentTime.getSeconds() / 10)}
            </div>
          </>
        )}
      </div>

      <div>
        <div 
          className="rounded-lg px-2.5 py-1.5 mb-2"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex justify-between items-center">
            {weekDays.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-0.5">
                <div className="text-black text-[8px] font-semibold tracking-tight opacity-50">
                  {day.label}
                </div>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  day.isCurrent ? 'bg-black' : ''
                }`}>
                  <div className={`text-[9px] font-semibold ${
                    day.isCurrent ? 'text-white' : day.isPast ? 'text-black opacity-30' : 'text-black opacity-50'
                  }`}>
                    {day.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{getWeatherIcon()}</span>
            <div className="text-white text-xl font-medium tracking-tight">
              {temp}°C
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="text-white text-[9px] opacity-30 font-medium">AQI</div>
            <div className="text-white text-base font-medium">{aqi}</div>
          </div>
        </div>
      </div>

      {isHovered && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-96 rounded-xl flex flex-col justify-between p-4 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="text-xs opacity-0">placeholder</div>
            <div className="text-[10px] opacity-0">+0</div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <div className="text-white font-medium leading-none tracking-tight" style={{ fontSize: '52px', fontVariantNumeric: 'tabular-nums' }}>
              {formatPomodoroTime(pomodoroTime)}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {!pomodoroRunning ? (
              <>
                <div className="flex gap-3 items-center justify-center">
                  <button
                    onClick={() => setPomodoroMinutes(Math.max(5, pomodoroMinutes - 5))}
                    className="text-white text-2xl font-normal hover:opacity-70 transition-opacity px-2"
                  >
                    −
                  </button>
                  <div className="text-white text-sm font-medium w-12 text-center">
                    {pomodoroMinutes}m
                  </div>
                  <button
                    onClick={() => setPomodoroMinutes(Math.min(60, pomodoroMinutes + 5))}
                    className="text-white text-2xl font-normal hover:opacity-70 transition-opacity px-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    setPomodoroTime(pomodoroMinutes * 60);
                    setPomodoroRunning(true);
                  }}
                  className="px-6 py-2 rounded-full text-black text-xs font-semibold transition-all hover:scale-105 self-center"
                  style={{ backgroundColor: accentColor }}
                >
                  START
                </button>
              </>
            ) : (
              <div className="flex gap-3 items-center justify-center">
                <button
                  onClick={() => setPomodoroRunning(false)}
                  className="px-6 py-2 rounded-full text-black text-xs font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: accentColor }}
                >
                  PAUSE
                </button>
                <button
                  onClick={() => {
                    setPomodoroTime(pomodoroMinutes * 60);
                    setPomodoroRunning(false);
                  }}
                  className="text-white text-xs opacity-50 hover:opacity-100 transition-opacity font-normal"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockCard;