import React from 'react';

const ScoreCard = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-xl border border-blue-700 flex flex-col items-center justify-center h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-blue-200 uppercase tracking-wider">SCORE</h2>
      <div className="text-5xl font-bold text-white">8.4</div>
      <div className="text-[10px] text-blue-200 mt-2">OUT OF 10</div>
    </div>
  );
};

export default ScoreCard;