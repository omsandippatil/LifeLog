import React from 'react';

const SleepCard = () => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-gray-400 uppercase tracking-wider">SLEEP</h2>
      <div className="flex flex-col justify-center flex-1">
        <div className="text-2xl font-bold text-white mb-2">7.2H</div>
        <div className="text-[10px] text-gray-500 space-y-1">
          <div>DEEP: 2.1H</div>
          <div>LIGHT: 4.8H</div>
        </div>
      </div>
    </div>
  );
};

export default SleepCard;