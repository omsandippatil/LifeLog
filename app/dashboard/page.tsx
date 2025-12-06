"use client"
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bell } from 'lucide-react';

const LifelogDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const moodData = [
    { day: 'M', mood: 4 },
    { day: 'T', mood: 3 },
    { day: 'W', mood: 5 },
    { day: 'T', mood: 4 },
    { day: 'F', mood: 5 },
    { day: 'S', mood: 4 },
    { day: 'S', mood: 3 }
  ];

  const screenTimeData = [
    { app: 'Social', hours: 3.5 },
    { app: 'Work', hours: 6.2 },
    { app: 'Games', hours: 1.8 },
    { app: 'Read', hours: 2.1 }
  ];

  const todoItems = [
    { task: 'Morning workout', done: true },
    { task: 'Team meeting', done: true },
    { task: 'Code review', done: false },
    { task: 'Grocery shop', done: false }
  ];

  const goals = [
    { goal: 'Read 24 books', progress: 75 },
    { goal: 'Exercise 150 days', progress: 65 },
    { goal: 'Save $10k', progress: 62 }
  ];

  const people = [
    { name: 'Sarah', relation: 'Friend', lastContact: '2 days ago' },
    { name: 'Mom', relation: 'Family', lastContact: '5 days ago' },
    { name: 'Alex', relation: 'Colleague', lastContact: '1 week ago' }
  ];

  const spending = [
    { category: 'Food', amount: 1240 },
    { category: 'Transport', amount: 680 },
    { category: 'Bills', amount: 2200 },
    { category: 'Other', amount: 420 }
  ];

  const calorieIntake = [
    { meal: 'Breakfast', cal: 420 },
    { meal: 'Lunch', cal: 680 }
  ];

  const caloriesBurnt = [
    { activity: 'Gym', cal: 580 },
    { activity: 'Walking', cal: 320 }
  ];

  const timeAnalysis = [
    { name: 'Productive', value: 8.5, color: '#0e5558' },
    { name: 'Wasted', value: 3.2, color: '#c25c1c' },
    { name: 'Rest', value: 7.5, color: '#f2a21a' },
    { name: 'Other', value: 4.8, color: '#888' }
  ];

  const notifications = [
    { message: 'You are getting fat! Time to hit the gym.', time: '2h ago', type: 'warning' },
    { message: 'Great job! You completed all tasks today.', time: '5h ago', type: 'success' },
    { message: 'Water intake is low. Drink more water!', time: '1d ago', type: 'warning' },
    { message: 'Sleep quality improved by 15%', time: '2d ago', type: 'success' }
  ];

  return (
    <div className="h-screen bg-white p-6 overflow-hidden font-mono">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-wider text-black">LIFELOG</h1>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:opacity-70 transition-opacity"
            >
              <Bell size={20} className="text-black" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-[#0e5558] border border-black z-50">
                <div className="p-3">
                  <h3 className="text-xs font-bold text-white mb-2">NOTIFICATIONS</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif, idx) => (
                    <div key={idx} className="p-3 bg-white bg-opacity-10 mb-1 hover:bg-opacity-20">
                      <div className="text-xs font-bold text-white mb-1">{notif.message}</div>
                      <div className="text-[10px] text-white opacity-60">{notif.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="px-4 py-2 bg-black border border-black text-xs font-bold text-white hover:opacity-80 transition-opacity">
            LISTS
          </button>
          <div className="px-4 py-2 bg-[#0e5558] border border-black text-xs font-bold text-white">
            <span className="opacity-80">DURVA: </span>9.1
          </div>
          <div className="px-4 py-2 bg-[#c25c1c] border border-black text-xs font-bold text-white">
            STREAK: 47
          </div>
          <button className="px-4 py-2 bg-black border border-black text-white text-xs font-bold hover:opacity-80 transition-opacity">
            LOGOUT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-[calc(100vh-96px)]" style={{ gridTemplateRows: '1fr 1fr 1fr' }}>
        
        <div className="bg-[#0e5558] p-4 border border-black">
          <h2 className="text-xs font-bold mb-2 text-white">MOOD</h2>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-3xl">😊</div>
            <div>
              <div className="text-xl font-bold text-white">GOOD</div>
              <div className="text-xs text-white opacity-80">AVG: 4.1/5</div>
            </div>
          </div>
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <Line type="monotone" dataKey="mood" stroke="#FFF" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0e5558] p-4 flex flex-col items-center justify-center border border-black">
          <h2 className="text-xs font-bold mb-1 text-white">DAILY SCORE</h2>
          <div className="text-5xl font-bold text-white">8.4</div>
          <div className="text-xs text-white opacity-80 mt-1">OUT OF 10</div>
          <div className="mt-2 text-xs font-bold text-white">ABOVE AVERAGE</div>
        </div>

        <div className="bg-[#c25c1c] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">INTAKE</h2>
          <div className="text-2xl font-bold mb-1.5 text-white">1,840</div>
          <div className="space-y-0.5">
            {calorieIntake.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-[10px]">{item.meal}</span>
                <span className="font-bold text-white text-[10px]">{item.cal} cal</span>
              </div>
            ))}
            <div className="pt-1 border-t border-white border-opacity-30 mt-1">
              <div className="text-[10px] text-white opacity-80 mb-0.5">WATER</div>
              <div className="text-sm font-bold text-white">2.1L / 3L</div>
              <div className="h-2 bg-black bg-opacity-20 mt-0.5">
                <div className="h-full bg-white" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0e5558] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">BURNT</h2>
          <div className="text-2xl font-bold mb-1.5 text-white">2,240</div>
          <div className="space-y-0.5">
            {caloriesBurnt.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-[10px]">{item.activity}</span>
                <span className="font-bold text-white text-[10px]">{item.cal} cal</span>
              </div>
            ))}
            <div className="pt-1 border-t border-white border-opacity-30 mt-1">
              <div className="text-[10px] text-white opacity-80 mb-0.5">STEPS</div>
              <div className="text-sm font-bold text-white">8,420</div>
              <div className="text-[10px] font-bold text-white">TARGET: 10,000</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0e5558] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">GOALS</h2>
          <div className="space-y-1.5">
            {goals.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="font-bold text-white text-[10px]">{item.goal}</span>
                  <span className="font-bold text-white text-[10px]">{item.progress}%</span>
                </div>
                <div className="h-1.5 bg-black bg-opacity-20">
                  <div className="h-full bg-white" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f2a21a] p-3 border border-black">
          <div className="flex justify-between mb-1.5">
            <h2 className="text-xs font-bold text-white">TO-DO LIST</h2>
            <span className="text-xs font-bold text-white">2/4</span>
          </div>
          <div className="space-y-1.5">
            {todoItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div className={`w-3.5 h-3.5 border border-white flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-white' : 'bg-black bg-opacity-20'}`}>
                  {item.done && <span className="text-[#f2a21a] text-[10px] font-bold">✓</span>}
                </div>
                <span className={`font-bold text-white ${item.done ? 'line-through opacity-60' : ''}`}>{item.task}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#c25c1c] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">SPENDING</h2>
          <div className="text-2xl font-bold mb-0.5 text-white">₹4,540</div>
          <div className="text-xs mb-1.5 font-bold text-white opacity-80">THIS WEEK</div>
          <div className="space-y-1">
            {spending.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center text-xs mb-0.5">
                  <span className="font-bold text-white text-[10px]">{item.category}</span>
                  <span className="font-bold text-white text-[10px]">₹{item.amount}</span>
                </div>
                <div className="h-1.5 bg-black bg-opacity-20">
                  <div className="h-full bg-white" style={{ width: `${(item.amount / 2200) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#c25c1c] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">PEOPLE</h2>
          <div className="space-y-1.5">
            {people.map((person, idx) => (
              <div key={idx} className="bg-black bg-opacity-20 p-2 border border-white border-opacity-30">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] font-bold text-white">{person.name}</div>
                    <div className="text-[9px] text-white opacity-60">{person.relation}</div>
                  </div>
                  <div className="text-[9px] text-white opacity-60">{person.lastContact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0e5558] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">SLEEP</h2>
          <div className="text-2xl font-bold mb-0.5 text-white">7.2h</div>
          <div className="text-[10px] mb-1.5 text-white opacity-70">LAST NIGHT</div>
          <div className="space-y-0.5 text-[10px]">
            <div className="flex justify-between font-bold text-white">
              <span>DEEP</span>
              <span>2.1h</span>
            </div>
            <div className="flex justify-between font-bold text-white">
              <span>LIGHT</span>
              <span>4.8h</span>
            </div>
            <div className="flex justify-between font-bold text-white">
              <span>REM</span>
              <span>0.3h</span>
            </div>
          </div>
        </div>

        <div className="bg-[#c25c1c] p-3 border border-black">
          <h2 className="text-xs font-bold mb-2 text-white">SCREEN TIME</h2>
          <div className="text-2xl font-bold mb-2 text-white">8.2h</div>
          <div className="space-y-1.5">
            {screenTimeData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-[10px]">{item.app}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-black bg-opacity-20">
                    <div className="h-full bg-white" style={{ width: `${(item.hours / 10) * 100}%` }}></div>
                  </div>
                  <span className="font-bold w-8 text-right text-white text-[10px]">{item.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#c25c1c] p-3 border border-black">
          <h2 className="text-xs font-bold mb-2 text-white">TIME ANALYSIS</h2>
          <div className="h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeAnalysis}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  strokeWidth={0}
                >
                  {timeAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-white">3.2h</div>
              <div className="text-[10px] font-bold text-white">WASTED</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0e5558] p-3 border border-black">
          <h2 className="text-xs font-bold mb-1.5 text-white">HABITS</h2>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-white">Meditation</span>
              <div className="flex gap-0.5">
                {[1,1,1,1,0,1,1].map((done, idx) => (
                  <div key={idx} className={`w-2.5 h-2.5 border border-white ${done ? 'bg-white' : 'bg-black bg-opacity-20'}`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-white">Reading</span>
              <div className="flex gap-0.5">
                {[1,1,0,1,1,1,1].map((done, idx) => (
                  <div key={idx} className={`w-2.5 h-2.5 border border-white ${done ? 'bg-white' : 'bg-black bg-opacity-20'}`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-white">Exercise</span>
              <div className="flex gap-0.5">
                {[1,0,1,1,1,0,1].map((done, idx) => (
                  <div key={idx} className={`w-2.5 h-2.5 border border-white ${done ? 'bg-white' : 'bg-black bg-opacity-20'}`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-white">Journaling</span>
              <div className="flex gap-0.5">
                {[1,1,1,0,1,1,1].map((done, idx) => (
                  <div key={idx} className={`w-2.5 h-2.5 border border-white ${done ? 'bg-white' : 'bg-black bg-opacity-20'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifelogDashboard;