import React from 'react';

const WeatherCard = () => {
  return (
    <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-4 rounded-xl border border-orange-700 flex flex-col items-center justify-center h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-orange-200 uppercase tracking-wider">WEATHER</h2>
      <div className="text-5xl mb-2">☀️</div>
      <div className="text-3xl font-bold text-white">28°C</div>
      <div className="text-[10px] text-orange-200 mt-2">SUNNY</div>
    </div>
  );
};

export default WeatherCard;