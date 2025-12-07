import React from 'react';

interface Person {
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

interface PeopleCardProps {
  people: Person[];
}

const PeopleCard: React.FC<PeopleCardProps> = ({ people }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex flex-col h-full min-h-[180px]">
      <h2 className="text-[10px] font-medium mb-3 text-gray-400 uppercase tracking-wider">PEOPLE</h2>
      <div className="space-y-2.5 overflow-y-auto flex-1">
        {people.map((person, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 bg-[#242424] rounded-full flex items-center justify-center text-lg border border-[#2A2A2A]">
                {person.avatar}
              </div>
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor(person.status)} rounded-full border-2 border-[#1A1A1A]`}></div>
            </div>
            <span className="text-xs text-white">{person.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleCard;