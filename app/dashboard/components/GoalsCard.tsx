import React from 'react';

interface Goal {
  goal: string;
  progress: number;
}

interface GoalsCardProps {
  goals: Goal[];
}

const GoalsCard: React.FC<GoalsCardProps> = ({ goals }) => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-3 text-gray-400 uppercase tracking-wider">GOALS</h2>
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {goals.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-white font-medium">{item.goal}</span>
              <span className="text-gray-400">{item.progress}%</span>
            </div>
            <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" 
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsCard;