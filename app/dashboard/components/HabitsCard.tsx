import React from 'react';

interface Habit {
  name: string;
  streak: number;
  completed: boolean;
  icon: string;
}

interface HabitsCardProps {
  habits?: Habit[];
}

const HabitsCard: React.FC<HabitsCardProps> = ({ 
  habits = [
    { name: 'Workout', streak: 12, completed: true, icon: '💪' },
    { name: 'Meditate', streak: 8, completed: true, icon: '🧘' },
    { name: 'Read', streak: 5, completed: false, icon: '📚' } 
  ]
}) => {
  const completedCount = habits.filter(h => h.completed).length;
  const completionRate = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">HABITS</h2>
        <span className="text-[10px] text-gray-500">{completedCount}/{habits.length}</span>
      </div>
      
      <div className="flex-1 space-y-2">
        {habits.map((habit, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#0F0F0F] border border-[#2A2A2A]"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{habit.icon}</span>
              <span className={`text-xs ${habit.completed ? 'text-gray-300' : 'text-gray-500'}`}>
                {habit.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">{habit.streak}🔥</span>
              <div 
                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  habit.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-600'
                }`}
              >
                {habit.completed && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#2A2A2A]">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-500">Completion Rate</span>
          <span className="text-green-400 font-medium">{completionRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default HabitsCard;