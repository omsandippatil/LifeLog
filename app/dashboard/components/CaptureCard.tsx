import React from 'react';

const CaptureCard = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl border border-purple-700 flex flex-col items-center justify-center h-full min-h-[180px]">
      <div className="text-5xl mb-2">📸</div>
      <div className="text-[10px] text-white font-medium">DAILY CAPTURE</div>
    </div>
  );
};

export default CaptureCard;