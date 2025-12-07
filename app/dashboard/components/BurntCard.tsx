import React from 'react';

const BurntCard = () => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-gray-400 uppercase tracking-wider">BURNT</h2>
      <div className="flex flex-col justify-center flex-1">
        <div className="text-2xl font-bold text-white mb-2">2,240</div>
        <div className="text-[10px] text-gray-500 space-y-1">
          <div>GYM: 580 CAL</div>
          <div>STEPS: 8,420</div>
        </div>
      </div>
    </div>
  );
};

export default BurntCard;