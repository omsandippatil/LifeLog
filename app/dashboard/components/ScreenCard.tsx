import React from 'react';

interface ScreenData {
  name: string;
  hours: number;
  color: string;
}

interface ScreenCardProps {
  data: ScreenData[];
}

const ScreenCard: React.FC<ScreenCardProps> = ({ data }) => {
  const totalHours = data.reduce((a, b) => a + b.hours, 0);

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-gray-400 uppercase tracking-wider">SCREEN</h2>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-2xl font-bold text-white mb-3">{totalHours.toFixed(1)}H</div>
        <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden flex mb-3">
          {data.map((item, idx) => (
            <div 
              key={idx}
              className="h-full"
              style={{ 
                width: `${(item.hours / totalHours) * 100}%`,
                backgroundColor: item.color
              }}
            />
          ))}
        </div>
        <div className="space-y-1">
          {data.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex justify-between text-[10px]">
              <span className="text-gray-500">{item.name.toUpperCase()}</span>
              <span className="text-white font-medium">{item.hours}H</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenCard;