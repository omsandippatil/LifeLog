import React from 'react';

interface TodoItem {
  task: string;
  done: boolean;
}

interface TodoCardProps {
  items: TodoItem[];
}

const TodoCard: React.FC<TodoCardProps> = ({ items }) => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">TODAY</h2>
        <span className="text-[10px] text-gray-500">{items.filter(t => t.done).length}/{items.length} DONE</span>
      </div>
      <div className="space-y-2.5 overflow-y-auto flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
              item.done ? 'bg-blue-500 border-blue-500' : 'border-gray-600'
            }`}>
              {item.done && <span className="text-white text-[10px]">✓</span>}
            </div>
            <span className={`text-xs ${
              item.done ? 'line-through text-gray-600' : 'text-white'
            }`}>{item.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoCard;