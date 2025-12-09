import React from 'react';

const CaptureCard = () => {
  return (
    <div className="rounded-xl overflow-hidden h-full min-h-[180px]">
      <img 
        src="https://github.com/durva24.png" 
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CaptureCard;