import React from 'react';

const IntakeCard = () => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-gray-400 uppercase tracking-wider">INTAKE</h2>
      <div className="flex flex-col justify-center flex-1">
        <div className="text-2xl font-bold text-white mb-2">1,840</div>
        <div className="text-[10px] text-gray-500 space-y-1">
          <div>BREAKFAST: 420 CAL</div>
          <div>LUNCH: 680 CAL</div>
          <div className="pt-1 border-t border-[#2A2A2A]">WATER: 2.1L / 3L</div>
        </div>
      </div>
    </div>
  );
};

export default IntakeCard;