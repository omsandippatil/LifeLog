import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface TimeData {
  name: string;
  value: number;
  color: string;
}

interface TimeUseCardProps {
  data: TimeData[];
}

const TimeUseCard: React.FC<TimeUseCardProps> = ({ data }) => {
  const wastedTime = data.find(d => d.name === 'Wasted')?.value || 0;

  // Transform data to match Recharts expected format
  const chartData = data.map(item => ({
    ...item,
    fill: item.color
  }));

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-2 text-gray-400 uppercase tracking-wider">TIME USE</h2>
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="75%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-white">{wastedTime}H</div>
          <div className="text-[10px] text-gray-400 mt-1">WASTED</div>
        </div>
      </div>
    </div>
  );
};

export default TimeUseCard;