"use client"
import React, { useState } from 'react';
import Header from './components/Header';
import MoodCard from './components/MoodCard';
import ScoreCard from './components/ScoreCard';
import IntakeCard from './components/IntakeCard';
import BurntCard from './components/BurntCard';
import SleepCard from './components/SleepCard';
import TodoCard from './components/TodoCard';
import GoalsCard from './components/GoalsCard';
import ScreenCard from './components/ScreenCard';
import HabitsCard from './components/HabitsCard';
import ClockCard from './components/ClockCard';
import CalendarCard from './components/CalendarCard';
import CaptureCard from './components/CaptureCard';
import PeopleCard from './components/PeopleCard';
import SpendingCard from './components/SpendingCard';
import TimeUseCard from './components/TimeUseCard';

const Page = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { message: 'You are getting fat! Time to hit the gym.', time: '2h ago', type: 'warning' },
    { message: 'Great job! You completed all tasks today.', time: '5h ago', type: 'success' },
    { message: 'Water intake is low. Drink more water!', time: '1d ago', type: 'info' },
    { message: 'Sleep quality improved by 15%', time: '2d ago', type: 'success' }
  ];

  const todoItems = [
    { task: 'Morning workout', done: true },
    { task: 'Team meeting at 2pm', done: true },
    { task: 'Code review PR #234', done: false },
    { task: 'Grocery shopping', done: false },
    { task: 'Call dentist', done: false } 
  ];

  const screenTimeData = [
    { name: 'Work', hours: 6.2, color: '#3B82F6' },
    { name: 'Social', hours: 3.5, color: '#8B5CF6' },
    { name: 'Games', hours: 1.8, color: '#10B981' },
    { name: 'Reading', hours: 2.1, color: '#F59E0B' }
  ];

  const goals = [
    { goal: 'Read 24 books', progress: 75 },
    { goal: 'Exercise 150 days', progress: 65 },
    { goal: 'Save $10k', progress: 62 }
  ];

  const spending = [
    { category: 'Food', amount: 1240, icon: '🍔' },
    { category: 'Transport', amount: 680, icon: '🚗' },
    { category: 'Bills', amount: 2200, icon: '💡' },
    { category: 'Entertainment', amount: 450, icon: '🎬' }
  ];

  const people = [
    { name: 'Sarah Chen', status: 'online' as const, avatar: '👩' },
    { name: 'Mike Ross', status: 'offline' as const, avatar: '👨' },
    { name: 'Emma Wilson', status: 'online' as const, avatar: '👩‍💼' } 
  ];

  const timeAnalysis = [
    { name: 'Productive', value: 8.5, color: '#10B981' },
    { name: 'Wasted', value: 3.2, color: '#EF4444' },
    { name: 'Rest', value: 7.5, color: '#3B82F6' },
    { name: 'Other', value: 4.8, color: '#8B5CF6' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-2 sm:p-4" style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace' }}>
      <Header 
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notifications={notifications}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 mt-4">
        {/* Row 1 - 6 single cards */}
        <div className="col-span-1 h-full">
          <MoodCard />
        </div>
        
        <div className="col-span-1 h-full">
          <ScoreCard />
        </div>
        
        <div className="col-span-1 h-full">
          <ClockCard />
        </div>
        
        <div className="col-span-1 h-full">
          <CalendarCard />
        </div>
        
        <div className="col-span-1 h-full">
          <IntakeCard />
        </div>
        
        <div className="col-span-1 h-full">
          <BurntCard />
        </div>

        {/* Row 2 - PeopleCard (2 cols) + HabitsCard (1 col) + TodoCard (2 cols) + SleepCard (1 col) = 6 cols */}
        <div className="col-span-2 h-full">
          <PeopleCard people={people} />
        </div>
        
        <div className="col-span-1 h-full">
          <HabitsCard />
        </div>
        
        <div className="col-span-2 h-full">
          <TodoCard items={todoItems} />
        </div>
        
        <div className="col-span-1 h-full">
          <SleepCard />
        </div>

        {/* Row 3 - CaptureCard + ScreenCard + GoalsCard (3 cols) + SpendingCard (2 cols) + TimeUseCard (1 col) = 6 cols */}
        <div className="col-span-1 h-full">
          <CaptureCard />
        </div>
        
        <div className="col-span-1 h-full">
          <ScreenCard data={screenTimeData}/>
        </div>
        
        <div className="col-span-1 h-full">
          <GoalsCard goals={goals} />
        </div>
        
        <div className="col-span-2 h-full">
          <SpendingCard data={spending} />
        </div>
        
        <div className="col-span-1 h-full">
          <TimeUseCard data={timeAnalysis} />
        </div>
      </div>
    </div>
  );
};

export default Page;