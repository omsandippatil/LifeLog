"use client"

import React from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  message: string;
  time: string;
  type: string;
}

interface HeaderProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
}

const Header: React.FC<HeaderProps> = ({ showNotifications, setShowNotifications, notifications }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">LIFELOG</h1>
      <div className="flex gap-2 items-center flex-wrap">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#2A2A2A]"
          >
            <Bell size={16} className="text-white" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-11 w-72 sm:w-80 bg-[#1A1A1A] rounded-xl z-50 overflow-hidden shadow-2xl border border-[#2A2A2A]">
              <div className="p-3 border-b border-[#2A2A2A]">
                <h3 className="text-xs font-semibold text-white">NOTIFICATIONS</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif, idx) => (
                  <div key={idx} className="p-3 border-b border-[#2A2A2A]">
                    <div className="text-xs text-white mb-1">{notif.message}</div>
                    <div className="text-[10px] text-gray-500">{notif.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-3 py-1.5 bg-[#1A1A1A] text-xs font-medium text-white rounded-full border border-[#2A2A2A]">
          DURVA: 847
        </div>
        <button className="px-3 py-1.5 bg-[#1A1A1A] text-xs font-medium text-white rounded-full border border-[#2A2A2A]">
          LIST
        </button>
        <div className="px-3 py-1.5 bg-[#1A1A1A] text-xs font-medium text-white rounded-full border border-[#2A2A2A]">
          STREAK: 47
        </div>
      </div>
    </div>
  );
};

export default Header;