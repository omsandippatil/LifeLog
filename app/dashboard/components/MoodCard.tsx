import React from 'react';

const MoodCard = () => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-auto text-gray-400 uppercase tracking-wider">MOOD</h2>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-4xl mb-2">😊</div>
        <div className="text-xl font-semibold text-white">GOOD</div>
        <div className="text-[10px] text-gray-500 mt-1">AVG: 4.1/5</div>
      </div>
    </div>
  );
};

export default MoodCard;