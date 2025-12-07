import React from 'react';

interface SpendingData {
  category: string;
  amount: number;
  icon: string;
}

interface SpendingCardProps {
  data: SpendingData[];
}

const SpendingCard: React.FC<SpendingCardProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">SPENDING</h2>
        <span className="text-xl font-bold text-white">₹{total.toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
        {data.map((item, idx) => (
          <div key={idx} className="bg-[#242424] p-2.5 rounded-lg flex flex-col items-center justify-center border border-[#2A2A2A]">
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-[9px] text-gray-400 mb-1">{item.category.toUpperCase()}</span>
            <span className="text-xs text-white font-semibold">₹{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingCard;