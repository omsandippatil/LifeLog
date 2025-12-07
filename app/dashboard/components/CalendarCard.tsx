import React from 'react';

const CalendarCard = () => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-gray-400 uppercase tracking-wider">DECEMBER</h2>
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1 text-[10px] text-center">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} className="text-gray-600 font-medium pb-1">{d}</div>
          ))}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map((d, i) => (
            <div 
              key={i} 
              className={`py-1 rounded-lg ${
                d === 7 
                  ? 'bg-blue-500 text-white font-semibold' 
                  : 'text-gray-400'
              }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;