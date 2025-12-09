import React, { useState, useEffect, useRef } from 'react';

interface TodoItem {
  task: string;
  done: boolean;
}

interface TodoCardProps {
  items?: TodoItem[];
}

const TodoCard: React.FC<TodoCardProps> = ({ items = [
  { task: 'Review project proposal', done: true },
  { task: 'Update design system', done: true },
  { task: 'Team sync meeting', done: false },
  { task: 'Code review feedback', done: false },
  { task: 'Deploy staging build', done: false },
  { task: 'Write documentation', done: false },
] }) => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localItems, setLocalItems] = useState(items);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const completedCount = localItems.filter(t => t.done).length;
  const totalCount = localItems.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = Math.min(prev + 1, localItems.length - 1);
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(selectedIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, localItems.length, selectedIndex]);

  const scrollToItem = (index: number) => {
    if (itemRefs.current[index] && scrollContainerRef.current) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  const toggleItem = (index: number) => {
    setLocalItems(prev => prev.map((item, i) => 
      i === index ? { ...item, done: !item.done } : item
    ));
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      setLocalItems(prev => [...prev, { task: newTaskText.trim(), done: false }]);
      setNewTaskText('');
      setIsAddingTask(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskText('');
    }
  };

  useEffect(() => {
    if (isAddingTask && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingTask]);

  useEffect(() => {
    if (isHovered) {
      setSelectedIndex(0);
      scrollToItem(0);
    }
  }, [isHovered]);

  // Skeleton Loading State
  if (!isClient) {
    return (
      <div 
        className="bg-black rounded-xl p-4 flex flex-col animate-pulse"
        style={{ 
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
          aspectRatio: '2 / 1',
          minHeight: '180px'
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 w-16 bg-gray-800 rounded"></div>
          <div className="h-3 w-12 bg-gray-800 rounded"></div>
        </div>
        
        <div className="flex-1 space-y-2.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-800 rounded-full flex-shrink-0"></div>
              <div className="h-3 flex-1 bg-gray-800 rounded" style={{ width: `${80 - i * 10}%` }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-black rounded-xl p-4 flex flex-col overflow-hidden transition-all duration-400 ease-in-out"
      style={{ 
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
        aspectRatio: '2 / 1',
        minHeight: '180px',
        transform: isHovered ? 'scale(1.01) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered ? '0 12px 35px rgba(0, 0, 0, 0.35)' : '0 0 0 rgba(0, 0, 0, 0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 
          className="text-white text-xs font-normal tracking-tight transition-all duration-400 ease-in-out"
          style={{ opacity: isHovered ? 0.9 : 0.6 }}
        >
          TODOLIST
        </h2>
        <div className="flex items-center gap-2">
          <span 
            className="text-[9px] text-white tracking-wide transition-all duration-400 ease-in-out"
            style={{ opacity: isHovered ? 0.7 : 0.4 }}
          >
            {completedCount}/{totalCount} DONE
          </span>
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-5 h-5 rounded-full bg-white flex items-center justify-center transition-all duration-400 ease-in-out"
            style={{
              opacity: isHovered ? 0.2 : 0.05,
              transform: isHovered ? 'scale(1.15) rotate(90deg)' : 'scale(1) rotate(0deg)'
            }}
            aria-label="Add task"
          >
            <span 
              className="text-white text-sm leading-none transition-all duration-400 ease-in-out"
              style={{ opacity: isHovered ? 0.9 : 0.6 }}
            >
              +
            </span>
          </button>
        </div>
      </div>

      {/* Todo Items - Scrollable */}
      <div 
        className="relative flex-1 overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0.85,
        }}
      >
        <div 
          ref={scrollContainerRef}
          className="overflow-y-auto h-full pr-2 transition-all duration-300"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: `rgba(255, 255, 255, ${isHovered ? 0.3 : 0.2}) transparent`
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 3px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, ${isHovered ? 0.3 : 0.2});
              border-radius: 2px;
              transition: background 0.3s ease;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.4);
            }
          `}</style>
          <div className="space-y-1.5 pb-2">
            {isAddingTask && (
              <div 
                className="rounded-md px-2.5 py-2 flex items-center gap-2.5 bg-white transition-all duration-300 ease-out"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                <div className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-gray-400 transition-all duration-300"></div>
                <input
                  ref={inputRef}
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={() => {
                    if (!newTaskText.trim()) {
                      setIsAddingTask(false);
                    }
                  }}
                  placeholder="New task..."
                  className="text-[10px] font-medium tracking-tight text-black bg-transparent outline-none flex-1 placeholder:text-gray-400"
                />
              </div>
            )}
            {localItems
              .filter(item => !isHovered || !item.done)
              .map((item, i) => {
                const originalIndex = localItems.indexOf(item);
                const isSelected = isHovered && selectedIndex === originalIndex;
                return (
              <div 
                key={originalIndex}
                ref={(el) => { itemRefs.current[originalIndex] = el; }}
                className="rounded-md px-2.5 py-2 flex items-center gap-2.5 cursor-pointer transition-all duration-400 ease-in-out"
                style={{
                  backgroundColor: isSelected ? '#ffffff' : '#1a1a1a',
                  transform: isSelected ? 'translateX(4px) scale(1.02)' : 'translateX(0) scale(1)',
                  opacity: isHovered ? 1 : (item.done ? 0.5 : 0.9)
                }}
                onClick={() => {
                  setSelectedIndex(originalIndex);
                  toggleItem(originalIndex);
                }}
                onMouseEnter={() => isHovered && setSelectedIndex(originalIndex)}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-400 ease-in-out"
                  style={{
                    backgroundColor: item.done ? '#10b981' : 'transparent',
                    borderColor: item.done ? '#10b981' : (isSelected ? '#9ca3af' : '#4b5563'),
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  {item.done && (
                    <span 
                      className="text-white font-bold"
                      style={{ 
                        fontSize: '11px',
                        textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
                        filter: 'brightness(1.5)'
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                <span 
                  className="text-[10px] font-medium tracking-tight transition-all duration-400 ease-in-out"
                  style={{
                    textDecoration: item.done ? 'line-through' : 'none',
                    color: item.done 
                      ? (isSelected ? '#000000' : '#ffffff')
                      : (isSelected ? '#000000' : '#ffffff'),
                    opacity: item.done ? 0.4 : 1
                  }}
                >
                  {item.task}
                </span>
              </div>
            );
          })}
          </div>
        </div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent)',
            opacity: isHovered ? 0.8 : 1
          }}
        ></div>
      </div>
    </div>
  );
};

export default TodoCard;